<template>
    <section class="logo">
        <img src="../assets/images/logo.png" alt="Monkipling Shop Logo">
    </section>
</template>

<style>
    .logo {
        width: calc(var(--logo-size) * 3);
        height: var(--logo-size);
        display: flex;
        flex-grow: 0;
        flex-shrink: 1;
    }

    .logo img {
        object-fit: contain;
        object-position: center
    }
</style>

<script>
    export default {
        name: 'LogoComponent'
    }
</script>