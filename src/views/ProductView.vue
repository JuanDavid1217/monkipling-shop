<template>
    <main v-if="info">
        Aqui se mostrara toda la info del producto pasado como parametro.
        <pre>
            {{ info }}
        </pre>
    </main>
    <NotFoundView v-else></NotFoundView>
</template>

<style>

</style>

<script>
    import { getProduct } from '@/services/ProductService';
    import NotFoundView from './NotFoundView.vue';
    
    export default {
        name: "ProductView",
        components: {
            NotFoundView,
        },
        data() {
            return {
                info: null
            }
        },
        mounted() {
          this.info = getProduct(this.$route.params.id);
        },
    }
</script>