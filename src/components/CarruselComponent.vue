<template>
  <section class="py-20 bg-gradient-to-b from-pink-900 via-pink-700 to-pink-900 overflow-hidden">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      <!-- Título opcional -->
      <div class="text-center mb-12">
        <h2 class="text-4xl md:text-5xl font-bold text-white tracking-tight">
          Productos Destacados
        </h2>
        <p class="mt-3 text-pink-100 text-lg">Las mejores piezas del momento</p>
      </div>

      <Swiper
        :modules="[Navigation, Pagination, Autoplay]"
        :slides-per-view="1.2"
        :space-between="24"
        :loop="true"
        :autoplay="{ delay: 4000, disableOnInteraction: false }"
        :pagination="{ clickable: true }"
        :navigation="true"
        :centered-slides="false"  
        :breakpoints="{
          640:  { slidesPerView: 2, spaceBetween: 20 },
          768:  { slidesPerView: 3, spaceBetween: 24 },
          1024: { slidesPerView: 4, spaceBetween: 28 },
          1280: { slidesPerView: 5, spaceBetween: 32 }
        }"
        class="my-swiper"
      >
        <SwiperSlide v-for="(p, i) in productos" :key="i" class="pb-4">
          <!-- Tarjeta mejorada -->
          <div class="group relative bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 cursor-pointer">
            
            <!-- Badge categoría -->
            <div class="absolute top-4 left-4 z-10">
              <span class="bg-pink-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                {{ p.categoria }}
              </span>
            </div>

            <!-- Imagen con zoom -->
            <div class="relative h-64 overflow-hidden bg-gradient-to-br from-pink-50 to-gray-50">
              <img 
                :src="p.imagen" 
                :alt="p.nombre"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div class="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>

            <!-- Texto y precio -->
            <div class="p-5">
              <h3 class="font-bold text-gray-800 text-lg line-clamp-2">
                {{ p.nombre }}
              </h3>
              <div class="flex items-center justify-between mt-3">
                <p class="text-2xl font-bold text-pink-600">
                  {{ p.precio }}
                </p>
                <button class="opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-500 bg-pink-600 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-pink-700 shadow-lg">
                  Ver →
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
  { imagen: new URL('@/assets/images/bolso1.webp', import.meta.url).href, categoria: 'Dior', nombre: 'Lady Dior Mini Pearl', precio: '$4,200' },
]
</script>

<style scoped>
.my-swiper {
  padding: 20px 0 70px;
}

/* Flechas elegantes (flotando fuera del carrusel) */
.my-swiper :deep(.swiper-button-next),
.my-swiper :deep(.swiper-button-prev) {
  background: white;
  width: 56px; height: 56px;
  border-radius: 50%;
  box-shadow: 0 10px 30px rgba(0,0,0,0.3);
  top: 50%;
  margin-top: -28px;
}
.my-swiper :deep(.swiper-button-next:after),
.my-swiper :deep(.swiper-button-prev:after) {
  font-size: 22px;
  font-weight: bold;
  color: #ec4899;
}

/* Puntos bonitos debajo */
.my-swiper :deep(.swiper-pagination-bullet) {
  width: 12px;
  height: 12px;
  background: rgba(255,255,255,0.4);
  opacity: 1;
}
.my-swiper :deep(.swiper-pagination-bullet-active) {
  background: white;
  transform: scale(1.3);
}
</style>