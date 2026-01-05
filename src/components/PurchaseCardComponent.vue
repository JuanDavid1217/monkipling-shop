<template>
    <div class="purchase-card">
        <section :class="['product-status', {'sold-out': info?.available_stock==0}]">
            {{ info.available_stock > 0 ? "Disponible" : "Agotado" }}
        </section>
        <section class="product-info">
            <div v-if="info.discount" :class="['discount', {'sold-out': info?.available_stock==0}]"><small>-{{ info.discount }}% OFF</small></div>
            <div class="price">
                <label class="price-1"><b>${{ newPrice }}</b></label>
                <label v-if="info.discount" class="price-2">${{ info.price }}</label>
            </div>
            <hr :class="{'sold-out': info?.available_stock==0}"/>
            <small>Unidades disponibles: <b>{{ info?.available_stock === 1 ? '¡Última disponible!' : info?.available_stock }}</b></small>
            <div class="subtotal">
                <label>Subtotal:</label>
                <label>${{ subtotal }}</label>
            </div>
            <div class="quantity-controls">
                <button @click="minus()" :class="{'sold-out-3': quantity==1||info?.available_stock==0}" :disabled="quantity==1||info?.available_stock==0?true:false"><i class="bi bi-dash"></i></button>
                <div>{{ quantity }}</div>
                <button @click="plus()" :class="{'sold-out-3': info?.available_stock==quantity}" :disabled="info?.available_stock==quantity?true:false"><i class="bi bi-plus"></i></button>
            </div>
            <!-- <hr :class="{'sold-out': info?.available_stock==0}"/> -->
            <div class="options">
                <button :disabled="info?.available_stock==0 || quantity==0" :class="{'sold-out': info?.available_stock==0}"><label>Comprar ahora</label></button>
                <button :disabled="info?.available_stock==0 || quantity==0" :class="{'sold-out-2': info?.available_stock==0}"><i class="bi bi-cart-plus"></i><label>Agregar al carrito</label></button>
            </div>
        </section>
    </div>
</template>

<style scoped>
    .purchase-card {
        background-color: #FFF;
        border: thin solid #8c8c8c;
    }

    .product-status {
        border: thin solid var(--color1);
        background-color: var(--color1);
        color: var(--color5);
        padding: 1rem;
        text-align: center;
        text-transform: uppercase;
        font-weight: bold;
    }

    .sold-out {
        border: thin solid #8c8c8c !important;
        background-color: #8c8c8c !important;
        cursor: auto !important;
    }
    
    .sold-out-2 {
        border: thin solid #8c8c8c !important;
        color: #8c8c8c !important;
        cursor: auto !important;
    }

    .sold-out-3 {
        color: #8c8c8c !important;
        cursor: auto !important;
        box-shadow: none !important;
    }

    .sold-out-3:hover {
        transform: none !important;
    }

    .product-info {
        padding: 1rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .product-info .discount {
        align-self: end;
        border: thin solid var(--color1);
        background-color: var(--color1);
        width: fit-content;
        padding: .3rem .6rem;
        color: var(--color5);
    }

    .product-info .price {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
        justify-content: center;
        align-items: center;
        max-width: 100%;
    }

    .product-info .price .price-1 {
        font-size: var(--step-2);
    }

    .product-info .price .price-2 {
        text-decoration: line-through;
        color: #8c8c8c;
    }

    .product-info hr {
        border: thin solid var(--color1);
        width: 100%;
        max-width: 100%;
    }

    .product-info .subtotal {
        display: flex;
        gap: .5rem;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-top: 1rem;
    }

    .product-info .subtotal label:last-child {
        font-size: var(--step-1);
    }

    .product-info .quantity-controls {
        display: flex;
        gap: 1rem;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        margin-bottom: 1rem;
    }

    .product-info .quantity-controls button {
        background-color: transparent;
        border: none;
        width: auto;
        aspect-ratio: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        color: var(--color1);
        font-size: var(--step-1);
        cursor: pointer;
        box-shadow: 0 0 0.25rem 0.01rem #0003;
        transition: transform .3s ease;
    }

    .product-info .quantity-controls button:hover {
        transform: scale(1.1);
    }

    .product-info .quantity-controls div {
        min-width: 2rem;
        text-align: center;
    }

    .product-info .options {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
        justify-content: center;
        align-items: center;
    }

    .product-info .options button {
        display: flex;
        flex-grow: 1;
        gap: 1rem;
        padding: .3rem .6rem;
        justify-content: center;
    }

    .product-info .options button:hover {
        cursor: pointer;
    }

    .product-info .options button:first-child {
        border: thin solid var(--color1);
        background-color: var(--color1);
        color: var(--color5);
    }

    .product-info .options button:last-child {
        border: thin solid var(--color1);
        background-color: transparent;
        color: var(--color1);
    }

    label {
        pointer-events: none;
    }

</style>

<script>
    export default {
        name: "PurchaseCardComponent",
        props: {
            info: {
                type: Object,
                required: false,
                default: () => ({})
            }
        },
        data() {
            return {
                newPrice: null,
                quantity: 0,
                subtotal: 0,
            }
        },
        mounted() {
          if (this.info?.discount) {
            this.newPrice = (this.info.price - ((this.info.price * this.info.discount) / 100)).toFixed(2);
          } else {
            this.newPrice = this.info.price;
          }

          if (this.info?.available_stock > 0) {
            this.quantity = 1;
          }

          this.subtotal = this.newPrice * this.quantity;
        },
        methods: {
            plus() {
                if (this.quantity < this.info.available_stock) {
                    this.quantity ++;
                    this.subtotal = (this.newPrice * this.quantity).toFixed(2);
                }
            },
            minus() {
                if (this.quantity > 1) {
                    this.quantity --;
                    this.subtotal = (this.newPrice * this.quantity).toFixed(2);
                } 
            }
        },
    }
</script>