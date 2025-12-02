<template>
  <main>
    <HeroImageComponent/>
    <article class="container">
      <section>
        <h2>Sobre nosotros.</h2>
        <p>En nuestra tienda creemos que los accesorios no son solo objetos: son detalles que acompañan tu día a día, expresan tu estilo y hacen que cada momento sea especial.</p>
        <p>Nacimos con la idea de ofrecer productos prácticos, modernos y llenos de personalidad, siempre pensando en quienes disfrutan de llevar algo único. Desde bolsas y carteras hasta llaveros, termos y más, cada artículo es elegido cuidadosamente para combinar calidad, diseño y funcionalidad.</p>
        <p>Nos apasiona brindar una experiencia cercana, transparente y confiable. Trabajamos para que encuentres ese accesorio que te haga sentir bien, que complemente tu estilo y que te acompañe en todas tus aventuras.</p>
        <p>Gracias por ser parte de nuestra historia. Estamos aquí para ayudarte a encontrar lo que necesitas… y sorprenderte con algo más.</p>
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
        <img src="../assets/images/contact.webp" alt="">
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

  @media screen and (min-width: 576px){
    section {
      width: 90%;
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
