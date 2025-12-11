# monkipling-shop

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


## Dependencies

## Backend functions (will be moved in a future version)

### Fuse.js

**[Fuse.js](https://www.fusejs.io/)** is used to filter results with a basic fuzzy search.

### Stopword
**[Stopword](https://www.npmjs.com/package/stopword?activeTab=readme)** is used to eliminate words that generate noise in a search, such as 'a', 'de', 'en', etc.
For this example, it is used with the Spanish (spa) language only.

### ¿How to connect with the front?

**Searh and Filters**

The frontend displays the products on the `/products` route. This route loads all products and their metadata by default.

The default JSON response structure is:

```
{
    "metadata": {
        "total_products": 1000,
        "sections": [
            {
                "id": "size",
                "section_name": "Tamaño",
                "items": [
                    {
                        "item_name": "M",
                        "total": 210
                    },
                    ...
                ]
            },
            ...
        ],
        "page_size": 60,
        "total_pages": 17,
        "current_page": 1,
        "previous_page": null,
        "next_page": 2
    }
    "data": [
        {
            "id": "398b00d6-bf92-45b4-bc72-7e6eb764d0e8",
            "name": "Termos modelo 1",
            "description": "Producto termos de alta calidad, modelo 1.",
            "price": 73.44,
            "url": "../assets/images/bolso1.jpg",
            "size": "M",
            "color": "azul",
            "gender": "hombre",
            "authenticity": true,
            "discount": null,
            "category": "termos"
        },
        ...
    ]
}
```

The `/products` route also receives an optional parameter `:search?` and query parameters in the format `?query-param=value.`

The `:search?` parameter is used as the search value, and the query parameters are used as additional filters.

If no value is provided for `:search?`, the filters will be applied to all products.

The available filters depend on the `IDs` returned in the metadata sections. These can be:

- **size**: All values for `item_name` inside `items`

- **color**: All values for `item_name` inside `items`

- **gender**: All values for `item_name` inside `items`

- **authenticity**: All values for `item_name` inside `items`

- **category**: All values for `item_name` inside `items`

- **price**: two difernts values between `min` and `max` separated by `,`

- **discount**: All values for `item_name` inside `items`

**Examples**

If you want to search for "Vestidos de calidad" your path should be:
`/products/vestidos de calidad`

If you only want to apply filters:
`/products/?color=rojo`

If you want to apply both, a search and filters:
`/products/vestido de calidad?color=rojo&discount=true`

Intern, the script performs the search and filters in order:

1. Apply the search (if provided) and update the metadata.
2. Filter by color "rojo" only if the color exists in the metadata, then update it.
3. Filter by products with a discount (`discount=true`) only if the discount exists in the metadata, then update it.
4. Finally, return the filtered products and their updated metadata.

**Special Filters: Order and Page**

In the example `/products/vestido de calidad?color=rojo&discount=true`, the order and page are set by default (`order=min_price`, `page=1`).

**Order**

- There are 2 options: `min_price` and `max_price`.

- `min_price` is the default value and orders the products from minimum to maximum price.

- `max_price` orders the products from maximum to minimum price.

**Page**

- Receives a possible integer number like "1", "9", "199", etc.

- Should be a number between 1 and the `total_pages` value in `metadata`.

- If the value is a decimal number like "1.1", it will be converted to 1; "3.5" will be converted to 3.

- Finally, if the value is not a number like "aaaa", the default value will be 1.

**Example**

The following example: `/products/vestido de calidad?color=rojo&discount=true&order=max_price&page=2`

1. Applies the search and filters.

2. Orders the results from maximum to minimum price (`max_price`).

3. Finally, returns all products on page 2.

**NOTE**: The number of products per page is 60.