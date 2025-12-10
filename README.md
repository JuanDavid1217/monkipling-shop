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
        ]
    },
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