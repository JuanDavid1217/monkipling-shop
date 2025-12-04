<template>
    <article class="hero">
        <section class="hero-kenburns">
            <img src="../assets/images/bolso1.webp">
            <img src="../assets/images/bolso2.webp">
            <img src="../assets/images/bolso3.webp">
            <img src="../assets/images/bolso4.webp">
        </section>
        <section class="hero-filter">
            <div class="message">
                <h2>
                    Monkipling Shop
                </h2>
                <p>
                    Agradecemos tu confianza.
                </p>
            </div>
        </section>
    </article>
</template>

<style scoped>
.hero {
    width: 100%;
    min-height: calc(100svh - var(--header-height));
    position: relative;
    display: flex;
}

.hero-filter {
    z-index: 2;
    width: 100%;
    min-height: inherit;
    background-color: #0009;
    display: flex;
    justify-content: center;
    align-items: center;
}

.hero-filter .message {
    text-align: center;
    padding: 1rem;
    margin: 1rem;
}

.hero-filter .message h2,
.hero-filter .message p {
    color: var(--color5);
}

.hero-kenburns {
    position: absolute;
    inset: 0;
    z-index: 1;
    overflow: hidden;
}

.hero-kenburns img {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0;
    animation: ken 17.5s infinite;
}

.hero-kenburns img:nth-child(1) { animation-delay: 0s; }
.hero-kenburns img:nth-child(2) { animation-delay: 4s; }
.hero-kenburns img:nth-child(3) { animation-delay: 8s; }
.hero-kenburns img:nth-child(4) { animation-delay: 12s; }

@keyframes ken {
  0%   { opacity: 0; transform: scale(1); }
  10%  { opacity: 1; transform: scale(1.1); }
  30%  { opacity: 1; transform: scale(1.2); }
  40%  { opacity: 0; transform: scale(1.2); }
  100% { opacity: 0; }
}

@media screen and (min-width: 576px){
    h2 {
        font-size: var(--step-2);
    }

    p {
        font-size: var(--step-0);
    }
}

@media screen and (min-width: 992px){
    h2 {
        font-size: var(--step-3);
    }
    
    p {
        font-size: var(--step-1);
    }
}

@media screen and (min-width: 1400px){
    h2 {
        font-size: var(--step-4);
    }
    
    p {
        font-size: var(--step-2);
    }
}

</style>

<script>
    export default {
        name: "HeroImageComponent",
    }
</script>