<template>
    <div class="content">
        <div class="principal-image">
            <img :src="images[activeImage]" :class="{changing: isChanging}">
            <div class="backward" @click="backward()"><svg class="swiper-navigation-icon" width="11" height="20" viewBox="0 0 11 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.38296 20.0762C0.111788 19.805 0.111788 19.3654 0.38296 19.0942L9.19758 10.2796L0.38296 1.46497C0.111788 1.19379 0.111788 0.754138 0.38296 0.482966C0.654131 0.211794 1.09379 0.211794 1.36496 0.482966L10.4341 9.55214C10.8359 9.9539 10.8359 10.6053 10.4341 11.007L1.36496 20.0762C1.09379 20.3474 0.654131 20.3474 0.38296 20.0762Z" fill="currentColor"></path></svg></div>
            <div class="forward" @click="forward()"><svg class="swiper-navigation-icon" width="11" height="20" viewBox="0 0 11 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.38296 20.0762C0.111788 19.805 0.111788 19.3654 0.38296 19.0942L9.19758 10.2796L0.38296 1.46497C0.111788 1.19379 0.111788 0.754138 0.38296 0.482966C0.654131 0.211794 1.09379 0.211794 1.36496 0.482966L10.4341 9.55214C10.8359 9.9539 10.8359 10.6053 10.4341 11.007L1.36496 20.0762C1.09379 20.3474 0.654131 20.3474 0.38296 20.0762Z" fill="currentColor"></path></svg></div>
            <div class="expand"><i class="bi bi-arrows-angle-expand"></i></div>
        </div>
        <div class="gallery">
            <img v-for="(image, index) in images" :key="`gallery-image-${index}`" :src="image" :class="{active: index==activeImage}" @click="selectImage(index)" :ref="item => galleryImages[index] = item">
        </div>
    </div>             
</template>

<style scoped>
    .content {
        display: flex;
        flex-direction: column;
        gap: .5rem;
        width: 100%;
    }

    .principal-image {
        width: 100%;
        height: 26rem;
        position: relative;
    }

    .principal-image img {
        width: 100%;
        height: inherit;
        object-fit: contain;
        transition: opacity .3s ease;
    }

    .principal-image .backward,
    .principal-image .forward,
    .principal-image .expand {
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
    }

    .principal-image .backward,
    .principal-image .forward {
        border-radius: 50%;
    }

    .principal-image .backward:hover,
    .principal-image .forward:hover,
    .principal-image .expand:hover {
        transform: scale(1.1);
        opacity: 1;
    }

    .principal-image .backward {
        top: 50%;
        left: 0;
    }

    .principal-image .backward svg {
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
        height: 6rem;
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

    @media screen and (min-width: 768px) {
        .content {
            display: flex;
            flex-direction: row;
        }

        .principal-image {
            width: 80%;
            height: 29.5rem;
            order: 2;
        }

        .gallery {
            width: 20%;
            height: 29.5rem;
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
                isChanging: false,
                galleryImages: []
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
                    this.activeImage = index;
                    setTimeout (()=>{
                        this.isChanging = false;
                    }, 300)
                }
            },
            forward() {
                if (this.isChanging) return;

                this.isChanging = true;
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
            }
        },
    }
</script>