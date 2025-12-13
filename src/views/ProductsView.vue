<template>
    <main class="products-container">
        <!-- Sidebar de Filtros -->
        <SidebarFilters 
            :metadata="metadata"
            :activeFilters="$route.query"
            :currentOrder="currentOrder"
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
                        <img src="via.placeholder.com" alt="Product Image">
                    </div>
                    {{ product.name }} - ${{ product.price }}
                    <button class="btn">Ver Detalles</button>
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
        };
    },
    computed: {
        // Computed property para obtener el orden actual de la URL
        currentOrder() {
            return this.$route.query.order || 'min_price'; 
        }
    },
    methods: {
        // Método centralizado para obtener los datos basado en la URL actual
        fetchData() {
            this.loading = true;
            this.error = null;
            
            const body = {
                search: this.$route.params.search,
                filters: this.$route.query 
            };

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
        
        updateOrder(newOrder) {
            this.updateRouteQuery({ order: newOrder, page: undefined }); 
        },

        updatePage(newPage) {
            if (newPage) {
                this.updateRouteQuery({ page: newPage });
            }
        },

        handleSidebarFilterChange({ key, value }) {
            this.updateRouteQuery({ [key]: value, page: undefined });
        },

        updateRouteQuery(newQueryParams) {
            this.$router.push({
                name: this.$route.name,
                params: this.$route.params,
                query: { 
                    ...this.$route.query, 
                    ...newQueryParams 
                }
            }).catch(err => {
                if (err.name !== 'NavigationDuplicated') {
                    throw err;
                }
            });
        },
        handleClearFilters(){
            this.$router.push({
                name: this.$route.name,
                 params: this.$route.params, // Mantenemos el término de búsqueda de los params (si existe)
                query: {} // Limpiamos todos los query parameters

            });
        }

    },
    mounted() {
        this.fetchData();
    },
    watch: {
        '$route.query': {
            handler() {
                // No necesitamos comparar newQuery/oldQuery aquí 
                // porque Vue Router solo dispara el watcher si hay un cambio real.
                this.fetchData();
            },
            deep: true,
        },
    }
};
</script>

<style scoped>
/* Estilos Base (Mobile First) */
.products-container {
    display: flex;
    flex-direction: column; /* Apila sidebar y contenido verticalmente en móvil */
    gap: 20px;
    padding: 10px;
}

.content {
    flex-grow: 1;
}

.product-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); /* Columnas más pequeñas para móvil */
    gap: 15px;
    margin-top: 20px;
}

.product-card {
    border: 1px solid #ccc;
    padding: 10px;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.img-box img {
    max-width: 100%;
    height: auto;
    display: block;
}

.btn {
    display: inline-block;
    padding: 8px 12px;
    background-color: #007bff;
    color: white;
    text-decoration: none;
    border: none;
    cursor: pointer;
    margin-top: 10px;
}

.error {
    color: red;
    padding: 10px;
    background-color: #f8d7da;
    border: 1px solid #f5c6cb;
    border-radius: 4px;
}

/* --- Media Queries --- */

@media screen and (min-width: 576px){
    /* En pantallas de tablet en adelante, pon el sidebar al lado del contenido */
    .products-container {
        flex-direction: row; 
    }
    
    .title{
        font-size:28px;
    }
    .img-box{
        height:200px;
    }
    .btn{
        width:100%;
        text-align:center;
    }
    /* Comentadas porque las variables CSS no se incluyeron en este snippet */
    /* h2 { font-size: var(--step-2); } */
    /* p { font-size: var(--step-0); } */
}

@media screen and (min-width: 992px){
    .product-list {
         grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); /* Columnas más grandes en desktop */
    }
    /* h2 { font-size: var(--step-3); } */
    /* p { font-size: var(--step-1); } */
}

@media screen and (min-width: 1400px){
   .img-box{
    height:270px;
   }
   /* h2 { font-size: var(--step-4); } */
   /* p { font-size: var(--step-2); } */
}
</style>
