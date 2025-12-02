<template>
  <main>
    <HeroImageComponent/>
    <article class="container">
      <section>
        <h2>Sobre nosotros.</h2>
        <div class="about">
          <div class="about-1">
            <div>
              <h3>Más que accesorios...</h3>  
              <p>En nuestra tienda creemos que los accesorios no son solo objetos: son detalles que acompañan tu día a día, expresan tu estilo y hacen que cada momento sea especial.</p>
            </div>
            <img src="../assets/images/about1.jpg" alt="Llavero de monito color rojo.">
          </div>
          <div class="about-2">
            <div>
              <h3>Compañeros de aventuras...</h3>
              <p>Nacimos con la idea de ofrecer productos prácticos, modernos y llenos de personalidad, siempre pensando en quienes disfrutan de llevar algo único.</p>
              <p>Nos apasiona brindar una experiencia cercana, transparente y confiable. Trabajamos para que encuentres ese accesorio que te haga sentir bien, que complemente tu estilo y que te acompañe en todas tus aventuras.</p>
            </div>
            <img src="../assets/images/about2.jpg" alt="Mochila color blanco con un fondo natural.">
          </div>
          <div class="about-3">
            <div>
              <h3>Gracias...</h3>
              <p>Gracias por ser parte de nuestra historia. Estamos aquí para ayudarte a encontrar lo que necesitas… y sorprenderte con algo más.</p>
            </div>
            <img src="../assets/images/about3.jpg" alt="Pulsera color amarillo con la frase 'SMILE'.">
          </div>
        </div>
      </section>
    </article>
    <article class="container">
      <section>
        <h2>Nuestros productos.</h2>
        <p>Seleccionamos cada uno de nuestros productos con dedicación, buscando siempre el equilibrio perfecto entre estilo, calidad y funcionalidad.</p>
        <p>En nuestra tienda encontrarás una variedad de accesorios pensados para acompañarte en tu día a día: bolsas, carteras, llaveros, termos y muchos otros detalles que hacen tu rutina más práctica y especial.</p>
        <p>Trabajamos con materiales duraderos y diseños modernos, cuidando cada detalle para ofrecerte artículos que no solo se vean bien, sino que se sientan bien. Nuestro objetivo es que cada pieza se convierta en tu favorita y te acompañe en cada momento.</p>
        <p>Explora nuestra colección y descubre accesorios creados para inspirarte, complementarte y reflejar tu estilo único.</p>
        <CarruselComponent/>
      </section>
    </article>
    <article class="container contrast">
      <div>
        <img src="../assets/images/contact.webp" alt="Vista frontal de la carretera desde el interior de un automóvil.">
      </div>
      <section class="contact-section">
        <div>
          <h2>Contáctanos.</h2>
          <h3>¿Tienes alguna duda o necesitas atención personalizada?</h3>
          <p>Envíanos un mensaje y te atenderemos con gusto.</p>
        </div>
        <ContactFormComponent></ContactFormComponent>
      </section>
    </article>
  </main>
</template>

<style scoped>
  .container {
    padding: var(--padding-x);
  }

  section {
    width: 100%;
    margin: auto;
  }

  section > p {
    text-align: justify;
  }

  .contact-section {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    align-items: center;
    justify-content: space-between;
    z-index: 2;
  }

  .contact-section > div {
    padding: 1rem;
    background-color: var(--color5);
    text-align: center;
    margin: 0 auto;
  }

  .contrast {
    position: relative;
  }

  .contrast > div {
    position: absolute;
    inset: 0;
    z-index: 1;
    overflow: hidden;
  }

  .contrast > div img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .about {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-template-rows: repeat(6, 12rem);
    grid-template-areas:
    "about-1  about-1 about-1 about-1 about-1 about-1"
    "about-1  about-1 about-1 about-1 about-1 about-1"
    "about-2  about-2 about-2 about-2 about-2 about-2"
    "about-2  about-2 about-2 about-2 about-2 about-2"
    "about-3  about-3 about-3 about-3 about-3 about-3"
    "about-3  about-3 about-3 about-3 about-3 about-3";
  }

  .about-1 {
    grid-area: about-1;
  }
  
  .about-2 {
    grid-area: about-2;
  }
  
  .about-3 {
    grid-area: about-3;
  }

  

  .about > div {
    position: relative;
    overflow: hidden;
    display: flex;
    justify-content: left;
    align-items: end;
  }

  .about > div img {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    width: 101%;
    height: 101%;
    object-fit: cover;
    transition: transform .3s ease;
  }

  .about > div > div {
    position: relative;
    z-index: 2;
    padding: 1rem;
    background-color: #FBF5F699;
    backdrop-filter: blur(.2rem);

    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .about > div > div > h3 {
    margin: 0;
  }
  
  .about > div > div > p {
    display: none;
  }

  .about > div:hover img{
    transform: scale(1.2);
  }

  .about > div:hover div{
    width: 100%;
    height: 100%;
  }

  .about > div:hover div p {
    display: block;
  }

  @media screen and (min-width: 576px){
    section {
      width: 90%;
    }
  }

  @media screen and (min-width: 768px){
    .about {
      grid-template-rows: repeat(6, 8rem); 
      grid-template-areas:
      "about-1  about-1 about-1 about-2 about-2 about-2"
      "about-1  about-1 about-1 about-2 about-2 about-2"
      "about-1  about-1 about-1 about-2 about-2 about-2"
      "about-3  about-3 about-3 about-3 about-3 about-3"
      "about-3  about-3 about-3 about-3 about-3 about-3"
      "about-3  about-3 about-3 about-3 about-3 about-3";
    }
  }

  @media screen and (min-width: 992px){
    .about {
      grid-template-rows: repeat(6, 4rem);
      grid-template-areas:
      "about-1  about-1 about-2 about-2 about-3 about-3"
      "about-1  about-1 about-2 about-2 about-3 about-3"
      "about-1  about-1 about-2 about-2 about-3 about-3"
      "about-1  about-1 about-2 about-2 about-3 about-3"
      "about-1  about-1 about-2 about-2 about-3 about-3"
      "about-1  about-1 about-2 about-2 about-3 about-3";
    }
  }

</style>

<script>
import CarruselComponent from '@/components/CarruselComponent.vue';
import ContactFormComponent from '@/components/ContactFormComponent.vue';
import HeroImageComponent from '@/components/HeroImageComponent.vue';

export default {
  name: "HomeView",
  components: {
    HeroImageComponent,
    ContactFormComponent,
    CarruselComponent
  }
}

</script>
