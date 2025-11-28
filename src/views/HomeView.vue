<template>
  <main>
    <HeroImageComponent/>
    <article class="container">
      <section>
        <h2>Sobre nosotros.</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere error odio quae voluptatum officia cum quod dicta eaque iure tempore. Corrupti rerum tempora eaque suscipit veniam doloremque vero aut sapiente?</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate rem aperiam voluptatum incidunt, suscipit delectus aspernatur vitae hic asperiores mollitia fuga nisi sit ducimus animi laudantium consectetur laboriosam dolor odit.</p>
      </section>
    </article>
    <article class="container">
      <section>
        <h2>Nuestros productos.</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere error odio quae voluptatum officia cum quod dicta eaque iure tempore. Corrupti rerum tempora eaque suscipit veniam doloremque vero aut sapiente?</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate rem aperiam voluptatum incidunt, suscipit delectus aspernatur vitae hic asperiores mollitia fuga nisi sit ducimus animi laudantium consectetur laboriosam dolor odit.</p>
        <br>
      </section>
    </article>
    <article class="container">
      <section>
        <h2>Contáctanos.</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere error odio quae voluptatum officia cum quod dicta eaque iure tempore. Corrupti rerum tempora eaque suscipit veniam doloremque vero aut sapiente?</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate rem aperiam voluptatum incidunt, suscipit delectus aspernatur vitae hic asperiores mollitia fuga nisi sit ducimus animi laudantium consectetur laboriosam dolor odit.</p>
      </section>
    </article>
  </main>
</template>

<style scoped>
  .container {
    padding: 1rem var(--padding-x);
  }

  section {
    width: 100%;
    margin: auto;
  }

  @media screen and (min-width: 576px){
    section {
      width: 90%;
    }
  }
</style>

<script>
import HeroImageComponent from '@/components/HeroImageComponent.vue';

export default {
  name: "HomeView",
  components: {
    HeroImageComponent,
  }
}

</script>
