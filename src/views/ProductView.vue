<template>
    <main v-if="info">
        <article class="container">
            <section>
                <h2>{{info.name}}</h2>
                <div>
                    <article class="images-container">
                        <GalleryComponent :images="info.url"/>
                    </article>
                    <article class="controls">
                        controls
                    </article>
                    <article class="descriptions">
                        {{info.description}}
                    </article>
                </div>
            </section>
        </article>
    </main>
    <NotFoundView v-else></NotFoundView>
</template>

<style scoped>
    h2 {
        margin: 0 0 1rem;
    }

    .container {
        padding: var(--padding-x);
    }

    .container > section {
        width: 100%;
        margin: auto;
    }

    .container > section > div {
        display: grid;
        gap: 1rem;
        grid-template-columns: 1fr;
        grid-template-rows: auto auto;
        grid-template-areas:
        "images-container"
        "controls"
        "descriptions";
    }

    .images-container {
        grid-area: images-container;
    }

    .controls {
        grid-area: controls;
        border: thin solid yellow;
    }

    .descriptions {
        grid-area: descriptions;
        border: thin solid red;
    }

    @media screen and (min-width: 576px){
        .container > section {
            width: 90%;
        }

        h2 {
            font-size: var(--step-2);
        }
    }

    @media screen and (min-width: 768px){
        .container > section > div {
            grid-template-columns: repeat(6, 1fr);
            grid-template-areas:
            "images-container   images-container    images-container    images-container    controls    controls"
            "descriptions       descriptions        descriptions        descriptions        controls    controls";
        }
    }

    @media screen and (min-width: 992px){
        h2 {
            font-size: var(--step-3);
        }
    }

    @media screen and (min-width: 1400px){
        h2 {
            font-size: var(--step-4);
        }
    }
</style>

<script>
    import { getProduct } from '@/services/ProductService';
    import NotFoundView from './NotFoundView.vue';
    import GalleryComponent from '@/components/GalleryComponent.vue';
    
    export default {
        name: "ProductView",
        components: {
            NotFoundView,
            GalleryComponent
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