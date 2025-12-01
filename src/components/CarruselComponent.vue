<template>
  <section class="hero">
    <div class="container">

      <!-- TITULO CON ANIMACION (CAMBIO) -->
      <div class="title-wrapper">
        <h2 class="title animate-fade-up">
          Productos Destacados
        </h2>
        <p class="subtitle">Las mejores piezas del momento</p>
      </div>

      <Swiper
        :modules="[Navigation, Pagination, Autoplay]"
        :slides-per-view="1.2"
        :space-between="24"
        :loop="true"
        :autoplay="{ delay: 4000, disableOnInteraction: false }"
        :pagination="{ clickable: true }"
        :navigation="true"
        :breakpoints="{
          640:  { slidesPerView: 2 },
          768:  { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
          1280: { slidesPerView: 5 }
        }"
        class="my-swiper"
      >

        <SwiperSlide v-for="(p, i) in productos" :key="i">

          <!-- CARD PREMIUM (CAMBIO TOTAL) -->
          <div class="card">

            <!-- GLOW EFECT (CAMBIO) -->
            <div class="glow"></div>

            <!-- BADGE CATEGORIA  (CAMBIO) -->
            <span class="badge">{{ p.categoria }}</span>

            <!-- IMAGEN -->
            <div class="img-box">
              <img :src="p.imagen" />
              <!-- OVERLAY GRADIENTE (CAMBIO) -->
              <div class="overlay"></div>
            </div>

            <!-- INFO -->
            <div class="info">
              <h3>{{ p.nombre }}</h3>

              <div class="footer">
                <!-- PRECIO (CAMBIO) -->
                <p class="price">{{ p.precio }}</p>

                <!-- BOTÓN CAMBIO) -->
                <button class="btn">
                  Ver producto →
                </button>
              </div>
            </div>

          </div>

        </SwiperSlide>
      </Swiper>

    </div>
  </section>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

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
  background: linear-gradient(180deg,#831843,#be185d,#831843);
  padding:80px 20px
}
.container{
  max-width:1300px;
  margin:auto;
}

/* TITULOS */
.title-wrapper{
  text-align:center;
  margin-bottom:30px
}
.title{
  color:white;
  font-size:48px;
  margin:0
}
.subtitle{
  color:#fbcfe8;
  font-size: 42px;
}

/* ANIMACIÓN (CAMBIO) */
.animate-fade-up{
  animation: fadeUp .9s ease both;
}
@keyframes fadeUp{
  from {opacity:0; transform:translateY(20px)}
  to {opacity:1; transform:translateY(0)}
}

/* CARD  del contenedor de las imagenes del carrusel*/
.card{
  background:white;
  border-radius:28px;
  overflow:hidden;
  box-shadow:0 15px 35px rgba(0,0,0,.15);
  transition:.4s ease;
  position:relative
}
.card:hover{
  transform:translateY(-12px);
  box-shadow:0 20px 45px rgba(236,72,153,.35);
}

/* GLOW */
.glow{
  position:absolute;
  bottom:-25px;
  left:20px;
  right:20px;
  height:10px;
  background:#ec4899;
  filter:blur(28px);
  opacity:0;
  transition:.5s;
}
.card:hover .glow{
  opacity:.6;
}

/* BADGE superior derecho */
.badge{
  position:absolute;
  top:14px;
  left:14px;
  background:linear-gradient(45deg,#ec4899,#d946ef);
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
  overflow:hidden;
  position:relative;
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

/* OVERLAY (CAMBIO) */
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

/* INFO */
.info{
  padding:16px
}
.info h3{
  font-size:15px;
  color:#1f2933;
  min-height:40px
}

/* FOOTER */
.footer{
  display:flex;
  justify-content:space-between;
  align-items:center;
  flex-wrap:wrap;
}

/* PRECIO (CAMBIO) */
.price{
  font-size:20px;
  font-weight:800;
  background:linear-gradient(45deg,#ec4899,#d946ef);
  -webkit-background-clip:text;
  color:transparent;
}

/* BOTÓN (CAMBIO) */
.btn{
  background:linear-gradient(45deg,#ec4899,#d946ef);
  border:none;
  padding:8px 18px;
  border-radius:25px;
  color:white;
  font-size:12px;
  cursor:pointer;
  transform:translateY(8px);
  opacity:0;
  transition:.4s;
  margin-top: 4px;
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
  padding:30px 0 70px;
}

/* TELEFONO */

@media(max-width:480px){
  .title{
    font-size: 30px;
  }
  .subtitle{
    font-size: 14px;
  }
  .img-box{
    height: 200px;
  }
  .info h3{
    font-size: 14px;
  }
  .btn{
    width: 100%;
    text-align: center;
  }
}

/* tablet */

@media(min-width:481px) and (max-width:900px){

  .title{
    font-size:36px;
  }

  .img-box{
    height:220px;
  }

}

/* compu */
@media(min-width:1200px){

  .title{
    font-size:48px;
  }

  .img-box{
    height:270px;
  }

}

</style>