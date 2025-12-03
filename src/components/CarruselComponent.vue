<!-- CarruselComponent.vue -->
<template>
  <section class="hero">
    <div class="container">
      <div class="title-wrapper">
        <h2 class="title animate-fade-up">{{ titulo }}</h2>
        <p class="subtitle">{{ descripcion }}</p>
      </div>

      <Swiper
        :modules="[Navigation, Pagination, Autoplay]"
        :slides-per-view="1"
        :space-between="24"
        :loop="true"
        :autoplay="{ delay: 4000, disableOnInteraction: false }"
        :pagination="{ clickable: true }"
        :navigation="true"
        :breakpoints="{
          768:  { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 4 }
        }"
        class="my-swiper"
      >
        <SwiperSlide v-for="(p, i) in productos" :key="i">
          <div class="card">
            <div class="glow"></div>
            <span class="badge">{{ p.categoria }}</span>
            <div class="img-box">
              <img :src="p.imagen" />
              <div class="overlay"></div>
            </div>
            <div class="info">
              <h3>{{ p.nombre }}</h3>
              <div class="footer">
                <p class="price">{{ p.precio }}</p>
                <button class="btn">Agregar al Carrito   →</button>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  </section>
</template>

<script setup>
/* global defineProps */
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

defineProps({
  titulo: {
    type: String,
    default: 'Productos Destacados'
  },
  descripcion: {
    type: String,
    default: 'Las mejores piezas del momento'
  }
})

const productos = [
  { imagen: new URL('@/assets/images/bolso1.webp', import.meta.url).href, categoria: 'Bolsos', nombre: 'Marc Jacobs Snapshot Lila', precio: '$289' },
  { imagen: new URL('@/assets/images/bolso2.webp', import.meta.url).href, categoria: 'Bolsos', nombre: 'Louis Vuitton Speedy 25', precio: '$1,290' },
  { imagen: new URL('@/assets/images/bolso1.webp', import.meta.url).href, categoria: 'Coach', nombre: 'Set Coach Cherry + Llavero', precio: '$499' },
  { imagen: new URL('@/assets/images/bolso1.webp', import.meta.url).href, categoria: 'Stanley', nombre: 'Quencher H2.0 Crema 40oz', precio: '$85' },
  { imagen: new URL('@/assets/images/bolso1.webp', import.meta.url).href, categoria: 'Lujo', nombre: 'Bottega Veneta Cassette', precio: '$2,800' },
  { imagen: new URL('@/assets/images/bolso1.webp', import.meta.url).href, categoria: 'Dior', nombre: 'Lady Dior Mini Pearl', precio: '$4,200' }
]
</script>




<style scoped>

/* SECCIÓN */
.hero{
  background: transparent;
  padding:80px 0;
}

.container{
  width:100%;
  margin:auto;
}

/* TITULOS */
.title-wrapper{
  text-align:center;
  margin-bottom:32px;
}
.title{
  color:#A40138;
  font-size:48px;
  margin:0;
}
.subtitle{
  color:#6b7280;
  font-size:16px;
}

/* ANIMACIÓN */
.animate-fade-up{
  animation: fadeUp .9s ease both;
}
@keyframes fadeUp{
  from {opacity:0; transform:translateY(20px)}
  to {opacity:1; transform:translateY(0)}
}

/* CARD */
.card{
  background:white;
  border-radius:28px;
  overflow:hidden;
  box-shadow:0 15px 35px rgba(0,0,0,.15);
  transition:.4s ease;
  position:relative;
}
.card:hover{
  transform:translateY(-12px);
  box-shadow:0 20px 45px rgba(164,1,56,.35);
}

/* GLOW */
.glow{
  position:absolute;
  bottom:-25px;
  left:20px;
  right:20px;
  height:10px;
  background:#A40138;
  filter:blur(28px);
  opacity:0;
  transition:.5s;
}
.card:hover .glow{
  opacity:.6;
}

/* BADGE */
.badge{
  position:absolute;
  top:14px;
  left:14px;
  background:linear-gradient(45deg,#A40138,#d946ef);
  padding:6px 12px;
  border-radius:20px;
  font-size:11px;
  font-weight:600;
  color:white;
  z-index:2;
}

/* IMAGEN */
.img-box{
  height:230px;
  position:relative;
  overflow:hidden;
}
.img-box img{
  width:100%;
  height:100%;
  object-fit:cover;
  transition:transform .6s;
}
.card:hover img{
  transform:scale(1.1);
}

/* OVERLAY */
.overlay{
  position:absolute;
  inset:0;
  background:linear-gradient(to top,rgba(0,0,0,.45),transparent);
  opacity:0;
  transition:.5s;
}
.card:hover .overlay{
  opacity:1;
}

/* INFO SOBRE LA IMAGEN */
.info{
  position:absolute;
  inset:0;
  background:linear-gradient(to top, rgba(0,0,0,0.65), rgba(0,0,0,0.15), transparent);
  color:white;
  padding:16px;
  display:flex;
  flex-direction:column;
  justify-content:flex-end;

  opacity:0;
  transform: translateY(20px);
  transition:.4s ease;
}

/* Mostrar info al hacer hover */
.card:hover .info{
  opacity:1;
  transform: translateY(0);
}

/* Texto */
.info h3{
  color:white;
  font-size:15px;
}

/* FOOTER */
.footer{
  display:flex;
  justify-content:space-between;
  align-items:center;
  gap:8px;
}

/* PRECIO */
.price{
  font-size:20px;
  font-weight:800;
  color:white;
  text-shadow:0 2px 4px rgba(0,0,0,.4);
}

/* BOTÓN */
.card:hover .btn{
  opacity:1;
  transform:translateY(0);
}



/* BOTÓN */
.btn{
  background:linear-gradient(45deg,#000000,#d946ef);
  border:none;
  padding:18px 18px;
  border-radius:25px;
  color:white;
  font-size:12px;
  cursor:pointer;
  transform:translateY(8px);
  opacity:0;
  transition:.4s;
}
.card:hover .btn{
  transform:translateY(0);
  opacity:1;
}
.btn:hover{
  transform:scale(1.05);
}

/* SWIPER */
.my-swiper{
  padding:30px 20px 70px;
}

/* CONTROLES SWIPER COLOR */
:deep(.swiper-button-next),
:deep(.swiper-button-prev){
  color:#A40138 !important;
}

:deep(.swiper-pagination-bullet){
  background:#A40138;
  opacity:.3;
}

:deep(.swiper-pagination-bullet-active){
  background:#A40138;
  opacity:1;
}

/* MOBILE */
@media(max-width:480px){
  .title{
    font-size:28px;
  }
  .img-box{
    height:200px;
  }
  .btn{
    width:100%;
    text-align:center;
  }
}

/* TABLET */
@media(min-width:481px) and (max-width:900px){
  .title{
    font-size:36px;
  }
  .img-box{
    height:220px;
  }
}

/* DESKTOP */
@media(min-width:1200px){
  .img-box{
    height:270px;
  }
}
@media(max-width:768px){
  .info{
    opacity:1;
    transform:none;
  }

  .btn{
    opacity:1;
    transform:none;
  }
}


</style>
