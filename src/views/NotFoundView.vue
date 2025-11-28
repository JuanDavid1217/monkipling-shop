<template>
    <main>
        <h1>
            404
        </h1>
        <p>
            Página no encontrada.
        </p>
    </main>
</template>

<style scoped>
    main {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        padding: 1rem;
    }

    main h1 {
        font-size: 7.5rem;
        margin: 0;
    }

    main p {
        font-size: x-large;
        margin: 0;
        text-align: center;
    }

    
</style>

<script>
    export default {
        name: "NotFoundView"
    }
</script>