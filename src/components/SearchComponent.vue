<template>
    <div class="search-container">
        <input
            type="text"
            placeholder="Buscar..."
            class="search-input"
            :value="search"
            @input="$emit('update-search', $event.target.value?.trim())"
            @keyup.enter="$emit('submit-search')"
        />
        <div class="search-button" @click="$emit('submit-search')">
            <i class="bi bi-search search-ico"></i>
        </div>
    </div>
</template>

<style scoped>
    .search-container {
        max-width: 100%;
        background-color: #FFF;
        padding: .5rem;
        display: flex;
        justify-content: space-between;
    }

    .search-input {
        outline: none;
        border: none;
        padding-right: .5rem;
        font-size: inherit;
        color: inherit;
        font-family: inherit;
        max-width: 88%;
    }

    .search-button {
        position: relative;
        cursor: pointer;
        display: flex;
        flex-grow: 1;
        justify-content: right;
    }

    .search-button::before {
        content: "";
        position: absolute;
        background-color: #A9A9A9;
        left: 0;
        width: 1px;
        height: 100%;
    }

    .search-ico {
        color: #A9A9A9;
    }
</style>

<script>
    export default {
        name: "SearchComponent",
        props: {
            search: {
                type: String,
                default: "",
            }
        }
    }
</script>