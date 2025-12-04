<template>
    <form action="">
        <label for="name">Nombre:</label>
        <input id="name" type="name" placeholder="Escribe tu nombre." required>
        <label for="email">Correo:</label>
        <input id="email" type="email" placeholder="Escribe tu correo electronico." required>
        <label for="message">Mensaje:</label>
        <textarea id="message" name="message" cols="50" rows="10" placeholder="¿En qué te podemos ayudar?" required></textarea>
        <div>
            <button type="reset">Limpiar</button>
            <button type="submit">Enviar</button>
        </div>
    </form>
</template>

<style scoped>
    form {
        display: flex;
        flex-direction: column;
        background: #FBF5F699;
        backdrop-filter: blur(.2rem);
        padding: 1rem;
        gap: 1rem;
        max-width: 100%;
        box-shadow: .3rem .3rem .5rem .02rem #0008;
        margin: 0 auto;
    }

    input, textarea {
        border: none;
        outline: none;
        box-shadow: none;
        border-bottom: medium solid var(--color1);
        background-color: transparent;
        font-size: inherit;
        font-family: inherit;
        max-width: 100%;
        color: inherit;
    }

    textarea {
        resize: none;
    }

    label:nth-child(1n+2) {
        margin-top: 1rem;
    }

    label {
        font-weight: bold;
    }

    form div {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 1rem;
    }

    button {
        font-size: inherit;
        font-family: inherit;
        flex: 1;
        border: medium solid var(--color1);
        padding: .5rem 1rem;
        font-weight: bold;
        background-color: transparent;/*var(--color1)*/;
        color: var(--color1);
        cursor: pointer;
        transition: background-color .3s ease, color .3s ease;
    }

    button:hover {
        background-color: var(--color1);
        color: var(--color5);
    }

</style>

<script>
    export default {
        name: "ConctactFormComponent"
    }
</script>