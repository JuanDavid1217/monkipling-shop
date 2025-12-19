<template>
    <div class="paginator-nav" v-if="totalPages > 1">
        
        <!-- Botón Anterior -->
        <button
            @click="changePage(previousPage)"
            :disabled="!previousPage"
            class="nav-button"
        >
            Anterior
        </button>

        <!-- Información de la página actual -->
        <span class="page-info">
            Página {{ currentPage }} de {{ totalPages }}
        </span>

        <!-- Botón Siguiente -->
        <button
            @click="changePage(nextPage)"
            :disabled="!nextPage"
            class="nav-button"
        >
            Siguiente
        </button>

    </div>
</template>

<script>
export default {
    name: 'ProductPaginator',
    props: {
        currentPage: {
            type: Number,
            required: true
        },
        totalPages: {
            type: Number,
            required: true
        },
        previousPage: {
            type: Number,
            default: null
        },
        nextPage: {
            type: Number,
            default: null
        }
    },
    methods: {
        changePage(page) {
            if (page) {
                // Emitimos un evento al padre con el nuevo número de página
                this.$emit('page-changed', page);
            }
        }
    }
};
</script>

<style scoped>
.paginator-nav {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    padding: 10px 0;
    gap: 10px;
}

.nav-button {
    text-decoration: none;
    text-transform: uppercase;
    color: white;
    cursor: pointer;
    border: none;
    padding: 0.5rem 1rem;
    box-shadow: 1px 1px 0px 0px 2px 2px 0px 0px 3px 3px 0px 0px 4px 4px 0px 0px 5px 5px 0px 0px;
    position: relative;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    background-color: var(--color1);
    transition: background-color 0.3s;
}

.nav-button:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
}

.nav-button:hover:enabled {
    background-color: #7a002a;
}

.page-info {
    color: var(--text-color-base);
    min-width: 120px;
    text-align: center;
}
</style>
