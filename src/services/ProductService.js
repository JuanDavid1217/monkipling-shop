import { handleError } from "./GeneralService"
import data from "../assets/data/products_002.json"
import { booleanValue, cleanFilters, removeStopWords, numberValue, integerValue } from "./CleanFiltersService";
import Fuse from "fuse.js";

const classifyProductBySection = (results, value) => {
    let index = results["items"].findIndex(item => item["item_name"] === value);
    if (index > - 1) {
        results["items"][index]["total"] += 1;
    } else {
        results["items"].push(
            {
                "item_name": value,
                "total": 1
            }
        )
    }
}

const withDiscount = (product, results) => {
    let value = product["discount"] && product["discount"] > 0 ? true : false;
    classifyProductBySection(results, value);
}

const minMaxPrice = (products) => {
    if (products.length > 0) {
        return {
            "id": "price",
            "section_name": "Precio",
            "items": [
                {
                    "item_name": "min",
                    "total": Math.floor(Math.min(...products.map(product => product.price))) 
                },
                {
                    "item_name": "max",
                    "total": Math.ceil(Math.max(...products.map(product => product.price)))
                }
            ]
        };
    }
}

const classifyAllProducts = (products) => {
    const sections = {
        "size": {"id":"size", "section_name": "Tamaño", "items": []},
        "color": {"id":"color", "section_name": "Color", "items": []},
        "gender": {"id":"gender", "section_name": "Género", "items": []},
        "authenticity": {"id":"authenticity", "section_name": "Autenticidad", "items": []},
        "category": {"id":"category", "section_name": "Categoría", "items": []},
        "discount": {"id":"discount", "section_name": "Descuento", "items": []}
    }

    for (const product of products) {
        for (const key in sections) {
            key == "discount" ? withDiscount(product, sections[key]) : classifyProductBySection(sections[key], product[key]);
        }
    }

    return {
        "total_products": products.length,
        "sections": [
            ...Object.values(sections).filter(section => section["items"].length > 0),
            minMaxPrice(products)
        ].filter(Boolean)
    }
}

const search = (value) => {
    let search = value?.trim()?.toLowerCase();
    let productsFiltered = data;
    if (search && search!=""){
        search = removeStopWords(search);
        const fuse = new Fuse(
            productsFiltered,
            {
                //includeScore: true,
                ignoreLocation: true,
                ignoreDiacritics: true,
                useExtendedSearch: true,
                //ignoreFieldNorm: true,
                keys: [
                    {name: "name", weight: 0.6},
                    {name: "description", weight: 0.4}
                ],
                threshold: 0.3,
                //minMatchCharLength: 3
            }
        );
        productsFiltered = fuse.search(search).map(result => result.item);
    }
    return productsFiltered;
}

const filterByAuthenticity = (searchValue, key, results) => {
    searchValue = booleanValue(searchValue);
    if (searchValue != null) {
        results = results.filter((product) => product[key] == searchValue);
    }
    return results;
}

const filterByDiscount = (searchValue, key, results) => {
    searchValue = booleanValue (searchValue);
    if (searchValue != null) {
        results = results.filter((product) => searchValue
        ?
        product[key]!=null&&product[key]>0
        :
        product[key]==null||product[key]==0);
    }
    return results;
}

const filterByPrice = (searchValue, key, metadata, results) => {
    if (searchValue) {
        let newValue = searchValue?.toString()?.trim()?.toLowerCase();
        newValue = newValue.split(',').slice(0,2);
        newValue = newValue.map((item) => numberValue(item)).filter(Boolean);
        if (newValue.length > 0) {
            const min = Math.min(...newValue);
            const max = Math.max(...newValue);
            if (min != max && min>=metadata["items"][0]["total"] && max<=metadata["items"][1]["total"]) {
                results = results.filter((product) => product[key]>=min && product[key]<=max);
            }
        }
    }
    return results;
}

const orderBy = (option, results) => {
    switch (option) {
        case "max_price":
            results = results.sort((product1, product2) => product2["price"] - product1["price"]);
            break;
        default:
            results = results.sort((product1, product2) => product1["price"] - product2["price"]);
    }
    return results;
}

const paginateData = (data, metadata, page=1) => {
    page = integerValue(page);

    if (page == null) {
        page = 1;
    } 

    metadata["page_size"] = 60;
    metadata["total_pages"] = Math.ceil(metadata["total_products"] / metadata["page_size"]);
    metadata["current_page"] = page;
    metadata["previous_page"] = page > metadata["total_pages"] ? metadata["total_pages"] : page <= metadata["total_pages"] && page >= 2 ? page - 1 : null;
    metadata["next_page"] = page < 0 ? 1 : page < metadata["total_pages"] ? page + 1 : null;
    
    if (page < 0) {
        page = metadata["total_pages"] + 1;
    }
    
    data = data.slice((page - 1) * metadata["page_size"], page * metadata["page_size"]);

    return {"metadata": metadata, "data": data};
}

export const getAll = (body) => {
    try {
        //First load
        let productsFiltered = search(body['search']);
        let metadata = classifyAllProducts(productsFiltered);

        //Filters cleaning
        let filters = cleanFilters(["size", "color", "gender", "authenticity", "category", "price", "discount", "order", "page"], body["filters"]);
        
        //Especial filters
        const order = filters["order"];
        delete filters["order"]; 
        const page = filters["page"];
        delete filters["page"];

        //Filtering
        for (const [key, value] of Object.entries(filters)) {
            const metadataSection = metadata["sections"].find((section) => section["id"] == key.toLowerCase());
            if (key=='price') {
                productsFiltered = filterByPrice(value, key, metadataSection, productsFiltered);
                metadata = classifyAllProducts(productsFiltered);
            } else {
                const exists = metadataSection["items"].find((item) => item["item_name"]?.toString()?.toLowerCase() == value);
                if (exists) {
                    switch (key) {
                        case 'discount':
                            productsFiltered = filterByDiscount(value, key, productsFiltered);
                            break;
                        case 'authenticity':
                            productsFiltered = filterByAuthenticity(value, key, productsFiltered);
                            break;
                        default:
                            productsFiltered = productsFiltered.filter((product) => product[key].toLowerCase() == value);
                    }
                    metadata = classifyAllProducts(productsFiltered);
                }
            }
        }
        
        //Ordering
        productsFiltered = orderBy(order, productsFiltered);

        //Pagination
        return paginateData(productsFiltered, metadata, page);
    
    } catch(error) {
        handleError(error);
    }
}

/*fuzzy search fuse js*/