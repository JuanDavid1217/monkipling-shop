<template>
    <main>
        Productos
    </main>
</template>

<script>
    import { getAll } from '@/services/ProductService';
    
    export default {
        name: "ProductsView",
        mounted() {
            const body = {"search": this.$route.params.search, "filters": this.$route.query};
            const response = getAll(body);
            console.log(response);
        },
    }
</script>