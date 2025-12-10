import { handleError } from "./GeneralService"
import data from "../assets/data/products_002.json"
import { booleanValue, cleanFilters, removeStopWords, integerValue } from "./CleanFiltersService";
import Fuse from "fuse.js";

const clasifyProductBySection = (results, value) => {
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
    clasifyProductBySection(results, value);
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

const clasifyAllProducts = (products) => {
    const sections = {
        "size": {"id":"size", "section_name": "Tamaño", "items": []},
        "color": {"id":"color", "section_name": "Color", "items": []},
        "gender": {"id":"gender", "section_name": "Genero", "items": []},
        "authenticity": {"id":"authenticity", "section_name": "Autenticidad", "items": []},
        "category": {"id":"category", "section_name": "Categoría", "items": []},
        "discount": {"id":"discount", "section_name": "Descuento", "items": []}
    }

    for (const product of products) {
        for (const key in sections) {
            key == "discount" ? withDiscount(product, sections[key]) : clasifyProductBySection(sections[key], product[key]);
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
        newValue = newValue.map((item) => integerValue(item)).filter(Boolean);
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

export const getAll = (body) => {
    try {
        let productsFiltered = search(body['search']);
        let metadata = clasifyAllProducts(productsFiltered);

        let filters = body["filters"];
        filters = cleanFilters(["size", "color", "gender", "authenticity", "category", "price", "discount"], filters);
        
        for (const [key, value] of Object.entries(filters)) {
            const metadataSection = metadata["sections"].find((section) => section["id"] == key.toLowerCase());
            if (key=='price') {
                productsFiltered = filterByPrice(value, key, metadataSection, productsFiltered);
                metadata = clasifyAllProducts(productsFiltered);
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
                    metadata = clasifyAllProducts(productsFiltered);
                }
            }
        }
        
        return ({"metadata": metadata, "data": productsFiltered})
    } catch(error) {
        handleError(error);
    }
}

/*fuzzy search fuse js*/