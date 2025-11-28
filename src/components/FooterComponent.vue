<template>
    <footer class="footer">
        <LogoComponent/>
        <section class="social-networks">
            <h2>Síguenos a través de:</h2>
            <nav>
                <a title="Facebook" class="facebook" href="https://www.facebook.com/moni.mon.134308" target="_blanck"><i class="bi bi-facebook"></i></a>
                <a title="Instagram" class="instagram" href="https://www.instagram.com/monkipling_shop3.0?utm_source=qr&igsh=OHBheHRpZzlpenVj" target="_blanck"><i class="bi bi-instagram"></i></a>
            </nav>
        </section>
        <section class="legal">
            <p>
                © 2025 Monkipling Shop - todos los derechos reservados.
            </p>
            <button type="button" @click="this.$router.push('/terms-and-conditions')">Términos y Condiciones</button>
            <button type="button" @click="this.$router.push('/privacy-policy')">Aviso de privacidad</button>
        </section>
    </footer>
</template>

<style scoped>
    .footer {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 1rem var(--padding-x);
        background-color: var(--color1);
        text-align: center;
    }

    .social-networks,
    .social-networks nav,
    .legal {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        gap: 1rem;
    }

    .social-networks > nav > a {
        color: var(--text-color-light);
        transition: color .3s ease;
    }

    .social-networks > nav > a > i {
        font-size: larger;
    }

    .footer p {
        font-size: smaller;
    }

    @keyframes shake {
        10%,
        90% {
            transform: translate(-1px, 0);
        }

        20%,
        80% {
            transform: translate(1px, 0);
        }

        30%,
        50%,
        70% {
            transform: translate(-2px, 0);
        }

        40%,
        60% {
            transform: translate(2px, 0);
        }
    }

    .facebook:hover,
    .instagram:hover {
        animation: shake 1s ease-in-out both;
    }

    .legal button {
        border: none;
        background: transparent;
        color: var(--text-color-light);
        cursor: pointer;
        transition: color .3s ease;
    }

    .legal button:hover {
        color: var(--color3);
        text-decoration: underline;
    }

    h2,
    p {
        color: var(--text-color-light);
    }

</style>

<script>
    import LogoComponent from "@/components/LogoComponent";

    export default {
        name: "FooterComponent",
        components: {
            LogoComponent
        }
    }
</script>