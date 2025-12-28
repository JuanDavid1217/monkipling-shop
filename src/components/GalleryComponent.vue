<template>
    <div class="content">
        <div class="principal-image">
            <img :src="isChanging?images[beforeImage]:images[activeImage]" :class="{changing: isChanging}" @click="openFullScreen">
            <div class="backward" @click="backward"><svg class="swiper-navigation-icon" width="11" height="20" viewBox="0 0 11 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.38296 20.0762C0.111788 19.805 0.111788 19.3654 0.38296 19.0942L9.19758 10.2796L0.38296 1.46497C0.111788 1.19379 0.111788 0.754138 0.38296 0.482966C0.654131 0.211794 1.09379 0.211794 1.36496 0.482966L10.4341 9.55214C10.8359 9.9539 10.8359 10.6053 10.4341 11.007L1.36496 20.0762C1.09379 20.3474 0.654131 20.3474 0.38296 20.0762Z" fill="currentColor"></path></svg></div>
            <div class="forward" @click="forward"><svg class="swiper-navigation-icon" width="11" height="20" viewBox="0 0 11 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.38296 20.0762C0.111788 19.805 0.111788 19.3654 0.38296 19.0942L9.19758 10.2796L0.38296 1.46497C0.111788 1.19379 0.111788 0.754138 0.38296 0.482966C0.654131 0.211794 1.09379 0.211794 1.36496 0.482966L10.4341 9.55214C10.8359 9.9539 10.8359 10.6053 10.4341 11.007L1.36496 20.0762C1.09379 20.3474 0.654131 20.3474 0.38296 20.0762Z" fill="currentColor"></path></svg></div>
            <div class="expand" @click="openFullScreen"><i class="bi bi-arrows-angle-expand"></i></div>
        </div>
        <div class="gallery">
            <img v-for="(image, index) in images" :key="`gallery-image-${index}`" :src="image" :class="{active: index==activeImage}" @click="selectImage(index)" :ref="item => galleryImages[index] = item">
        </div>
    </div>
    <div :class="['full-screen', {'open-full-screen': isFull}]">
        <div class="full-screen-wrapper">
            <img :src="isChanging?images[beforeImage]:images[activeImage]" :class="{changing: isChanging}">
            <div class="backward" @click="backward"><svg class="swiper-navigation-icon" width="11" height="20" viewBox="0 0 11 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.38296 20.0762C0.111788 19.805 0.111788 19.3654 0.38296 19.0942L9.19758 10.2796L0.38296 1.46497C0.111788 1.19379 0.111788 0.754138 0.38296 0.482966C0.654131 0.211794 1.09379 0.211794 1.36496 0.482966L10.4341 9.55214C10.8359 9.9539 10.8359 10.6053 10.4341 11.007L1.36496 20.0762C1.09379 20.3474 0.654131 20.3474 0.38296 20.0762Z" fill="currentColor"></path></svg></div>
            <div class="forward" @click="forward"><svg class="swiper-navigation-icon" width="11" height="20" viewBox="0 0 11 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.38296 20.0762C0.111788 19.805 0.111788 19.3654 0.38296 19.0942L9.19758 10.2796L0.38296 1.46497C0.111788 1.19379 0.111788 0.754138 0.38296 0.482966C0.654131 0.211794 1.09379 0.211794 1.36496 0.482966L10.4341 9.55214C10.8359 9.9539 10.8359 10.6053 10.4341 11.007L1.36496 20.0762C1.09379 20.3474 0.654131 20.3474 0.38296 20.0762Z" fill="currentColor"></path></svg></div>
            <div title="Cerrar" class="close-full-screen" @click="closeFullScreen"><i class="bi bi-x"></i></div>
        </div>
    </div>
</template>

<style scoped>
    .content {
        --gallery-height: 6rem;
        --content-height: calc(100svh - var(--header-height) - (var(--padding-x) * 2) - 2.5rem);
        --min-height: 15rem;
        --max-height: 30rem;
        display: flex;
        flex-direction: column;
        gap: .5rem;
        width: 100%;
    }

    .principal-image {
        width: 100%;
        min-height: var(--min-height);
        height: calc(var(--content-height) - var(--gallery-height) - .5rem);
        max-height: var(--max-height);
        position: relative;
    }

    .principal-image img {
        width: 100%;
        min-height: inherit;
        height: inherit;
        max-height: inherit;
        object-fit: contain;
        object-position: center;
        transition: opacity .3s ease;
        cursor: pointer;
    }

    .principal-image .backward,
    .principal-image .forward,
    .principal-image .expand,
    .full-screen-wrapper .backward,
    .full-screen-wrapper .forward {
        position: absolute;
        opacity: .8;
        width: 3rem;
        height: 3rem;
        background-color: #FFF;
        box-shadow: 0 0 .2rem .02rem #0005;
        color: var(--color1);
        font-weight: bold;
        font-size: 1.5rem;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: transform .3s ease, opacity .3s ease;
        cursor: pointer;
    }

    .principal-image .backward,
    .principal-image .forward,
    .full-screen-wrapper .backward,
    .full-screen-wrapper .forward {
        border-radius: 50%;
    }

    .principal-image .backward:hover,
    .principal-image .forward:hover,
    .principal-image .expand:hover,
    .full-screen-wrapper .backward:hover,
    .full-screen-wrapper .forward:hover {
        transform: scale(1.1);
        opacity: 1;
    }

    .principal-image .backward {
        top: 50%;
        left: 0;
    }

    .principal-image .backward svg,
    .full-screen-wrapper .backward svg {
        transform: rotate(180deg);
    }
    
    .principal-image .forward {
        top: 50%;
        right: 0;
    }

    .principal-image .expand {
        bottom: 0;
        right: 0;
    }

    .gallery {
        width: 100%;
        height: var(--gallery-height);
        display: flex;
        flex-direction: row;
        gap: .5rem;
        overflow: auto;
    }

    .gallery img {
        width: 33%;
        height: 100%;
        flex-shrink: 0;
        object-fit: cover;
        opacity: .5;
        transition: opacity .3s ease;
        cursor: pointer;
    }

    .gallery img:hover {
        opacity: 1;
    }

    .active {
        opacity: 1 !important;
    }

    .changing {
        opacity: 0;
    }

    .full-screen {
        position: fixed;
        inset: 0;
        padding: 3rem;
        background-color: #0009;
        z-index: 999;
        opacity: 0;
        pointer-events: none;
        transition: opacity .3s ease;
        backdrop-filter: blur(5rem);

        display: flex;
        justify-content: center;
        align-items: center;
    }

    .full-screen-wrapper {
        width: 100%/*fit-content*/;
        max-width: 100%;
        height: 100%;
        max-height: 100%;
        position: relative;
    }

    .full-screen-wrapper img {
        width: 100%;
        max-width: 100%;
        height: 100%;
        max-height: 100%;
        object-fit: contain;
        object-position: center;
        filter: drop-shadow(0 0 .2rem #0005);
        transition: opacity .3s ease;
    }

    .full-screen-wrapper .backward {
        top: 50%;
        left: -1.5rem;
    }
    
    .full-screen-wrapper .forward {
        top: 50%;
        right: -1.5rem;
    }

    .open-full-screen {
        opacity: 1;
        pointer-events: auto;
    }

    .close-full-screen {
        width: 3rem;
        aspect-ratio: 1;
        border-radius: 50%;
        background-color: var(--color1);
        color: #FFF;
        font-weight: bold;
        font-size: 1.5rem;
        position: absolute;
        top: -1.5rem;
        right: -1.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        opacity: .8;
        box-shadow: 0 0 .2rem .02rem #0005;
        transition: transform .3s ease, opacity .3s ease;
    }

    .close-full-screen:hover {
        transform: scale(1.1);
        opacity: 1;
    }

    @media screen and (min-width: 992px) {
        .content {
            display: flex;
            flex-direction: row;
        }

        .principal-image {
            width: 80%;
            height: var(--content-height);
            order: 2;
        }

        .gallery {
            width: 20%;
            min-height: var(--min-height);
            height: var(--content-height);
            max-height: var(--max-height);
            order: 1;
            flex-direction: column;
        }

        .gallery img {
            width: 100%;
            height: 33%;
            object-fit: cover;
        }
    }
</style>

<script>
    export default {
        name: "GalleryComponent",
        props: {
            images: {
                type: Array,
                required: false,
                default: () => ["https://picsum.photos/200/300"]
            }
        },
        data() {
            return {
                activeImage: 0,
                beforeImage: 0,
                isChanging: false,
                galleryImages: [],
                isFull: false,
            }
        },
        methods: {
            scrollToActive() {
                const item = this.galleryImages[this.activeImage];
                if (!item) return;

                item.scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest',
                    inline: 'center'
                });
            },
            selectImage(index) {
                if (this.isChanging) return;
                
                if (index != this.activeImage) {
                    this.isChanging = true;
                    this.beforeImage = this.activeImage;
                    this.activeImage = index;
                    setTimeout (()=>{
                        this.isChanging = false;
                    }, 300)
                }
            },
            forward() {
                if (this.isChanging) return;

                this.isChanging = true;
                this.beforeImage = this.activeImage;
                if (this.activeImage == this.images.length-1) {
                    this.activeImage = 0;
                }else{
                    this.activeImage++;
                }
                setTimeout (()=>{
                    this.isChanging = false;
                }, 300);
                this.$nextTick(() => {
                    this.scrollToActive();
                });
            },
            backward() {
                if (this.isChanging) return;

                this.isChanging = true;
                this.beforeImage = this.activeImage;
                if (this.activeImage == 0) {
                    this.activeImage = this.images.length-1;
                }else{
                    this.activeImage--;
                }
                setTimeout (()=>{
                    this.isChanging = false;
                }, 300);
                this.$nextTick(() => {
                    this.scrollToActive();
                });
            },
            openFullScreen() {
                if (!this.isFull) this.isFull = !this.isFull;
            },
            closeFullScreen() {
                if (this.isFull) this.isFull = !this.isFull;
            }
        },
    }
</script>