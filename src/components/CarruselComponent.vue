<template>
  <section class="py-16 bg-pink-600">
    <div class="max-w-7xl mx-auto px-4">

      <Swiper
        :modules="[Navigation, Pagination, Autoplay]"
        :slides-per-view="1.2"
        :space-between="16"
        :loop="false"
        :autoplay="{ delay: 3500, disableOnInteraction: false }"
        :pagination="{ clickable: true }"
        :navigation="true"
        :breakpoints="{
          640:  { slidesPerView: 2.2 },
          768:  { slidesPerView: 3.2 },
          1024: { slidesPerView: 3.5 },
          1280: { slidesPerView: 4.5 }
        }"
        class="my-swiper pb-10"
      >
        <SwiperSlide v-for="(p, i) in productos" :key="i">
          <div class="bg-white rounded-2xl overflow-hidden shadow-xl h-80 flex flex-col">
            <div class="h-56 p-4 flex items-center justify-center bg-gray-50">
              <img 
                :src="p.imagen" 
                :alt="p.nombre"
                class="max-h-full max-w-full object-contain"
              />
            </div>
            <div class="px-4 pb-4 pt-2 flex-1 flex flex-col justify-end bg-white">
              <h3 class="font-bold text-gray-800 text-sm leading-tight line-clamp-2">
                {{ p.nombre }}
              </h3>
              <p class="text-lg font-bold text-pink-600 mt-2">
                {{ p.precio }}
              </p>
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
    { imagen: new URL('@/assets/images/bolso1.webp', import.meta.url).href, categoria: 'Bolsos', nombre: 'Marc Jacobs Snapshot Lila', precio: '$289' },
    { imagen: new URL('@/assets/images/bolso1.webp', import.meta.url).href, categoria: 'Bolsos', nombre: 'Marc Jacobs Snapshot Lila', precio: '$289' },
    { imagen: new URL('@/assets/images/bolso1.webp', import.meta.url).href, categoria: 'Coach', nombre: 'Set Coach Cherry + Llavero', precio: '$499' },
    { imagen: new URL('@/assets/images/bolso1.webp', import.meta.url).href, categoria: 'Stanley', nombre: 'Quencher H2.0 Crema 40oz', precio: '$85' },
]
</script>

<style scoped>

.my-swiper { background: #ec4899; padding-bottom: 40px; }

/* Flechas */
.my-swiper :deep(.swiper-button-next),
.my-swiper :deep(.swiper-button-prev) {
  background: rgb(209, 113, 166);
  width: 50px; height: 50px;
  border-radius: 50%;
  box-shadow: 0 4px 20px rgba(0,0,0,0.3);
}
.my-swiper :deep(.swiper-button-next:after),
.my-swiper :deep(.swiper-button-prev:after) {
  font-size: 24px;
  color: #ec4899;
  font-weight: bold;
}

/* Puntos del carrusel */
.my-swiper :deep(.swiper-pagination-bullet) {
  background: rgba(255,255,255,0.5);
}
.my-swiper :deep(.swiper-pagination-bullet-active) {
  background: white;
}

</style>