<template>
    <main class="products-container" :class="{'filters-open': showSidebar}" >

        <!-- Botón para abrir/cerrar filtros en móvil (oculto en desktop) -->
        <button class="toggle-filters-btn" @click="toggleSidebar">
            {{ showSidebar ? 'Cerrar Filtros' : 'Abrir Filtros' }}
        </button>

        <!-- Sidebar de Filtros -->
        <SidebarFilters 
            v-show="showSidebar"
            :metadata="metadata"
            :activeFilters="$route.query"
            :currentOrder="currentOrder"
            :search = "search"
            @update-search="updateSearch"
            @submit-search="submitSearch"
            @filter-changed="handleSidebarFilterChange"
            @order-changed="updateOrder"
            @clear-filters = "handleClearFilters"
            class="responsive-sidebar"
        />

        <!-- Contenido Principal -->
        <section class="content">
            <h1 class="title">Resultados ({{ metadata?.total_products || 0 }})</h1>

            <div v-if="loading">Cargando productos...</div>
            <div v-else-if="error" class="error">{{ error }}</div>
            
            <!-- Lista de Productos -->
            <div v-else class="product-list">
                <div v-for="product in products" :key="product.id" class="product-card">
                    <div class="img-box">
                        <!-- Placeholder para imagen -->
                        <img :src="product.url" alt="Product Image">
                    </div>
                    <!-- Contenedor de información para alinear elementos -->
                    <div class="product-info">
                        <span class="product-name">{{ product.name }}</span>
                        <span class="product-price">${{ product.price }}</span>
                        <button class="btn">Ver Detalles</button>
                    </div>
                </div>
            </div>

            <!-- Paginador -->
            <ProductPaginator 
                v-if="!loading && !error && metadata?.total_pages > 1"
                :currentPage="metadata?.current_page"
                :totalPages="metadata?.total_pages"
                :previousPage="metadata?.previous_page"
                :nextPage="metadata?.next_page"
                @page-changed="updatePage"
            />
            
        </section>
    </main>
</template>

<script>
import { getAll } from '@/services/ProductService';
import SidebarFilters from '@/components/SidebarFilters.vue';
import ProductPaginator from '@/components/ProductPaginator.vue';

export default {
    name: "ProductsView",
    components: {
        SidebarFilters,
        ProductPaginator
    },
    data() {
        return {
            products: [],
            metadata: null,
            loading: true,
            error: null,
            search: "",
            showSidebar: true, 
        };
    },
    computed: {
        currentOrder() {
            return this.$route.query.order || 'min_price'; 
        }
    },
    methods: {
        fetchData() {
            this.loading = true;
            this.error = null;
            this.search = this.$route.params.search;

            const body = {
                search: this.search,
                filters: this.$route.query 
            };

            // Nota: Asegúrate de que 'getAll(body)' maneje promesas (async/await)
            try {
                const response = getAll(body);
                this.products = response.data;
                this.metadata = response.metadata;
            } catch (error) {
                console.error("Error fetching products:", error);
                this.error = "No se pudieron cargar los productos.";
            } finally {
                this.loading = false;
            }
        },

        updateSearch(newSearch) { this.search = newSearch; },
        submitSearch() {
            if (this.search) {
                this.$router.push({
                    name: this.$route.name,
                    params: { search: this.search }
                });
            }
        },
        updateOrder(newOrder) { this.updateRouteQuery({ order: newOrder, page: undefined }); },
        updatePage(newPage) { if (newPage) { this.updateRouteQuery({ page: newPage }); } },
        handleSidebarFilterChange({ key, value }) { this.updateRouteQuery({ [key]: value, page: undefined }); },
        updateRouteQuery(newQueryParams) {
            this.$router.push({
                name: this.$route.name,
                params: this.$route.params,
                query: { ...this.$route.query, ...newQueryParams }
            }).catch(err => { if (err.name !== 'NavigationDuplicated') throw err; });
        },
        handleClearFilters(){
            this.$router.push({
                name: this.$route.name,
                 params: this.$route.params,
                query: {} 
            });
        },
        toggleSidebar() {
            this.showSidebar = !this.showSidebar;
        },
    },
    mounted() {
        this.fetchData();
        this.showSidebar = window.matchMedia("(min-width: 576px)").matches;
        window.matchMedia("(min-width: 576px)").addEventListener('change', (event) => {
             this.showSidebar = event.matches;
        });
    },
    watch: {
        '$route.query': {
            handler() { this.fetchData(); },
            deep: true,
        },
    }
};
</script>

<style scoped>
/* Paleta de Colores: 
   --color1: #A40138; (Acento fuerte/Botones principales)
   --color2: #CD8F9F; (Líneas divisorias/Detalles sutiles)
   --color3: #E8B3C0; (Hover background/Fondos muy sutiles)
   --color4: #F8EAED; (Fondo tarj/Secundario)
   --color5: #FBF5F6; (Fondo principal de la página)
   --text-color: #333333; (Texto principal oscuro)
*/

/* --- Estilos Base y Tipografía --- */
.products-container {
    display: flex;
    flex-direction: column;
    gap: 30px; /* Más espacio para respirar */
    padding: 20px;
    background-color: var(--color5);
    min-height: 100vh;
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; /* Tipografía limpia */
    color: var(--text-color);
}

.title {
    font-size: 2rem; /* Tamaño de fuente responsivo */
    font-weight: 700;
    color: var(--color1);
    margin-bottom: 20px;
}

/* --- Lista de Productos y Tarjetas --- */
.product-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); /* Tarjetas un poco más grandes */
    gap: 25px;
}

.product-card {
    border: none;
    padding: 0;
    border-radius: 8px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
    background-color: #ffffff; /* Tarjetas blancas puras para mayor contraste */
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    display: flex;
    flex-direction: column;
    overflow: hidden;
}

.product-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
}

.img-box {
    height: 180px; /* Altura uniforme para todas las imágenes */
    overflow: hidden;
}

.img-box img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.4s ease;
}

.product-card:hover .img-box img {
    transform: scale(1.05); /* Zoom sutil en la imagen al pasar el mouse */
}

.product-info {
    padding: 15px;
    display: flex;
    flex-direction: column;
    flex-grow: 1; /* Permite que este contenedor se expanda */
}

.product-name {
    font-weight: 600;
    margin-bottom: 5px;
    color: var(--text-color);
}

.product-price {
    font-weight: 700;
    color: var(--color1); /* Precio en color de marca */
    margin-bottom: 15px;
}


/* --- Botones --- */
.btn {
    display: block;
    padding: 10px 15px;
    background-color: var(--color1);
    color: white;
    border: none;
    cursor: pointer;
    border-radius: 4px;
    text-align: center;
    font-weight: 600;
    transition: background-color 0.2s ease, transform 0.1s ease;
    margin-top: auto; /* Empuja el botón hacia abajo en la tarjeta flexible */
    width: 100%;
}

.btn:hover {
    background-color: #7a002a;
    transform: translateY(-1px);
}

.error {
    color: white;
    padding: 15px;
    background-color: var(--color1);
    border-radius: 4px;
    font-weight: 500;
}

/* --- Botón de Alternar Filtros (Móvil) --- */
.toggle-filters-btn {
    display: block; 
    padding: 12px 15px;
    background-color: var(--color1);
    color: white;
    border: none;
    cursor: pointer;
    margin-bottom: 15px;
    width: 100%;
    border-radius: 5px;
    font-weight: 600;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}


/* --- Sidebar (Móvil/Desktop) --- */
.responsive-sidebar {
    width: 100%;
    background-color: #ffffff;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
    transition: all 0.3s ease;
    border-radius: 8px;
    padding: 20px;
}


/* --- Media Queries (Desktop View) --- */

@media screen and (min-width: 576px){
    .products-container { 
        display: grid;
        grid-template-columns: 280px 1fr;
        gap: 40px;
        padding: 30px;
    }
    
    .toggle-filters-btn {
        display: none; 
    }

    .responsive-sidebar {
        position: sticky;
        top: 30px; 
        height: fit-content;
        max-height: calc(100vh - 60px); 
        overflow-y: auto;
    }
    
    .title{ font-size: 2.5rem; } 
}

@media screen and (min-width: 992px){
    .product-list { grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); }
}

@media screen and (min-width: 1400px){
   .product-list { grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); }
}
</style>
