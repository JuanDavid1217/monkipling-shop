import { ref } from "vue";

export const currentPage = ref(0);

export const url = "../assets/data/products_002.json";

export const handleError = (error) => {
    console.log(error);
}
