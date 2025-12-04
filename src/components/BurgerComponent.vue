<template>
    <section class="canvas">
        <input type="checkbox" class="canvas-btn" v-model="isChecked">
        <label class="canvas-burger"></label>
        <div :class="{'canvas-filter': true, 'canvas-filter-visible':isFilterVisible}" @click="closeFilter()"></div>
        <nav :class="{'canvas-container': true, 'canvas-container-visible': isChecked}">
            <div class="item" v-for="(item, id) in routes" :key="`menu-canvas-item-${id}`">
                <div v-if="item?.path" :class="{'subitem': true, 'subitem-selected': currentPage>=item.index&&currentPage<item.next, 'subitem-visible': item.isActive}" @click="navigate(item.path)">{{item.name}}</div>
                <div v-else :class="{'subitem': true, 'subitem-selected': currentPage>=item.index&&currentPage<item.next, 'subitem-visible': item.isActive}" @click="item.isActive=openSubMenu(item.isActive)">{{item.name}} <span :class="{'span': true, 'span-selected': item.isActive}">▼</span></div>
                <div v-for="(subitem, subitemId) in item?.subroutes" :class="{'subitem': true, 'subitem-selected': currentPage>=subitem.index&&currentPage<subitem.next, 'subitem-visible': item.isActive}" @click="navigate(subitem.path)" :key="`menu-canvas-subitem-${subitemId}`">{{subitem.name}}</div>
            </div>
        </nav>
    </section>
</template>

<style>
    .canvas {
        --burguer-size: 1.5rem;
        --burger-spacing: calc(var(--burguer-size) / 5);
        --burger-radius: calc(var(--burger-spacing) / 2);

        position: relative;
        width: calc(var(--burguer-size) * 1.5);
        height: var(--burguer-size);
        margin-left: var(--padding-x);
        flex-grow: 0;
        flex-shrink: 0;
    }

    .canvas-btn {
        position: absolute;
        inset: 0;
        cursor: pointer;
        opacity: 0;
    }

    .canvas-burger,
    .canvas-burger::before,
    .canvas-burger::after {
        width: 100%;
        height: var(--burger-spacing);
        border-radius: var(--burger-radius);
        background-color: var(--text-color-light);
        box-shadow: 0 0 .5rem .02rem #0005;
    }

    .canvas-burger {
        position: absolute;
        top: 0;
        transform: rotate(0deg) translate(0, calc(var(--burger-spacing) * 2));
        transition: transform .3s ease, background-color .3s ease;
        transform-origin: top left;
        z-index: -1;
    }

    .canvas-burger::before,
    .canvas-burger::after {
        content: "";
        display: block;
        transition: transform .3s ease;
    }

    .canvas-burger::before {
        transform: rotate(0deg) translate(0, calc(var(--burger-spacing) * -2));
    }


    .canvas-burger::after {
        transform: rotate(0deg) translate(0, var(--burger-spacing));
    }

    .canvas-btn:checked + .canvas-burger {
        background-color: transparent;
        box-shadow: none;
    }

    .canvas-btn:checked + .canvas-burger::before {
        transform: rotate(45deg) translate(calc(var(--burger-spacing) / 1.5));
    }

    .canvas-btn:checked + .canvas-burger::after {
        transform: rotate(-45deg) translate(calc(var(--burger-spacing) / 1.3));
    }

    .canvas-container {
        position: fixed;
        top: var(--header-height);
        left: 0;
        width: 100%;
        display: flex;
        flex-direction: column;
        max-height: calc(100svh - var(--header-height));
        overflow-y: auto;
        /*
            from top to bottom
            transform: translate(0, calc(-1 * (100% + var(--header-height))));
            
            from right to left
            transform: translate(200%, 0);

            from bottom to top
            transform: translate(0, 200%);

            from left to right
            transform: translate(-100%, 0);
        */
        transform: translate(0, calc(-1 * (100% + var(--header-height))));
        transition: transform .3s ease;
        z-index: -2;
    }

    .canvas-container::-webkit-scrollbar {
        display: none;
    }

    .canvas-container-visible {
        transform: translate(0, 0);
    }

    .canvas-filter {
        position: fixed;
        inset: 0;
        opacity: 0;
        pointer-events: none;
        background-color: #0009;
        display: flex;
        z-index: -4;
        transition: opacity .3s ease;

    }

    .canvas-filter-visible {
        opacity: 1;
        pointer-events: auto;
    }

    .span {
        transition: transform .3s ease;
    }

    .span-selected {
        transform: rotate(-180deg);
    }

    .item {
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        flex-shrink: 0;
        height: fit-content;
        max-height: 100svh;
        overflow-y: auto;
        position: relative;
        pointer-events: auto;
    }

    .item::-webkit-scrollbar {
        display: none;
    }

    .subitem {
        min-height: var(--header-height);
        min-width: 8rem;
        padding: 1rem;
        flex-shrink: 0;
        cursor: pointer;
        transition: color .3s ease;
        color: var(--color5);
    }

    .subitem:first-child {
        position: sticky;
        top: 0;
        /*z-index: 2;*/
        background-color: var(--color1);
    }

    .subitem:nth-child(1n+2) {
        background-color: var(--color5);
        /*z-index: 1;*/
        color: var(--color1);
        display: none;
    }

    .subitem-visible,
    .subitem:first-child  {
        display: flex !important;
        justify-content: center;
        align-items: center;
    }

    .subitem:hover,
    .subitem-selected:nth-child(1n) {
        font-weight: bold;
    }

    @media screen and (min-width: 768px) {
        .canvas {
            /*For a much items (menu options) remove width field and flex-grow: 1*/
            position: static;
            width: auto;
            height: 100%;
            margin-left: var(--padding-x);
            flex-grow: 0;
            flex-shrink: 0;
        }

        .canvas-btn {
            display: none;
        }

        .canvas-burger {
            display: none;
        }

        .canvas-burger::before,
        .canvas-burger::after {
            display: none;
        }

        .canvas-container {
            position: static;
            transform: translate(0, 0);
            z-index: 0;
            flex-direction: row;
            max-height: 100svh;
            width: 100%;
            overflow-x: auto;
            pointer-events: none;
        }
    }
</style>

<script>
    import { currentPage } from "@/services/GeneralService";

    export default {
        name: 'BurgerComponent',
        data() {
            return {
                breakpoints: [768],
                isChecked: false,
                currentBreakPoint: this.getRange(window.innerWidth),

                routes: [
                    {
                        name: 'Inicio',
                        path: '/',
                        isActive: false,
                        index: 1,
                        next: 2,
                    },
                    {
                        name: 'Productos',
                        path: '/products',
                        isActive: false,
                        index: 2,
                        next: 3
                    }
                ]
            }
        },
        methods: {
            getRange(currentWidth){
                let breakpointSelected = 0;
                for (const i in this.breakpoints) {
                    if (currentWidth < this.breakpoints[i]) {
                        breakpointSelected = this.breakpoints[i];
                        break;
                    }
                }
                return breakpointSelected;
            },
            changeChecked(value){
                if (value == true) {
                    value = false;
                }
                return value;
            },
            closeFilter(){
                this.isChecked = this.changeChecked(this.isChecked);
                for (const index in this.routes) {
                    this.routes[index].isActive= this.changeChecked(this.routes[index].isActive);
                }
            },
            handleResize(){
                const breakpointSelected = this.getRange(window.innerWidth);
                if (breakpointSelected !== this.currentBreakPoint) {
                    this.closeFilter();
                }
                this.currentBreakPoint = breakpointSelected;
            },
            navigate(path){
                this.closeFilter();
                this.$router.push(path);  
            },
            openSubMenu(status){
                return !status;
            }
        },
        computed: {
            currentPage() {
                return currentPage.value;
            },
            isFilterVisible(){
                const options = [this.isChecked];
                for (const route of this.routes){
                    options.push(route.isActive);
                }
                return options.includes(true);
            }
        },
        mounted() {
            window.addEventListener("resize", this.handleResize);
        },
        beforeUnmount() {
            window.removeEventListener("resize", this.handleResize);
        }
    }
</script>