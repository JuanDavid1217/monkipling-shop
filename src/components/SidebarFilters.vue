<template>
    <aside class="sidebar">
        <div class="header-filters">
             <h2>Filtros</h2>
             <button v-if="hasActiveFilters" 
             @click="clearFilters" class="clear-btn">Limpiar Todo</button>
        </div>

        <SearchComponent
            :search="search"
            @update-search="$emit('update-search', $event)"
            @submit-search="$emit('submit-search', $event)"
        />
       
        <!-- Iterar sobre las secciones de filtros (Categoría, Color, Género, etc.) -->
        <div v-for="section in sections" :key="section.id" class="filter-section">
            <h3 @click="toggleSection(section.id)" :class="{ active: openSections.includes(section.id) }">
                {{ section.section_name }}
                <span class="toggle-icon">{{ openSections.includes(section.id) ? '−' : '+' }}</span>
            </h3>
            
            <!-- Contenido de la sección (visible/oculto) -->
            <div v-if="openSections.includes(section.id)" class="items-list">
                <!-- Caso especial para Rango de Precio -->
                <div v-if="section.id === 'price'">
                    <div class="price-range-info">
                        <span>Min: ${{ section.items?.[0]?.total }}</span>
                        <span>Max: ${{ section.items?.[1]?.total }}</span>
                    </div>
                </div>

                <!-- Caso general para checkboxes -->
                <div v-else>
                    <label v-for="item in section.items" :key="item.item_name" class="checkbox-label">
                        <input 
                            type="checkbox" 
                            :checked="isFilterApplied(section.id, item.item_name)"
                            @change="handleFilterChange(section.id, item.item_name, $event.target.checked)"
                        />
                        <!-- Muestra "Sí" o "No" para booleanos si quieres una UI más amigable -->
                        {{ typeof item.item_name === 'boolean' ? (item.item_name ? 'Sí' : 'No') : item.item_name }} 
                        <span class="item-count">({{ item.total }})</span>
                    </label>
                </div>
            </div>
        </div>
        
        <!-- Sección de Ordenar por -->
        <div class="filter-section order-section">
            <h3>Ordenar por</h3>
            <select :value="currentOrder" @change="handleOrderChange($event.target.value)" class="order-select">
                <option value="min_price">Precio: Menor a Mayor</option>
                <option value="max_price">Precio: Mayor a Menor</option>
            </select>
        </div>
    </aside>
</template>

<script>
import SearchComponent from "@/components/SearchComponent.vue";

export default {
    name: 'SidebarFilters',
    props: {
        metadata: { type: Object, default: () => ({ sections: [] }) },
        activeFilters: { type: Object, default: () => ({}) },
        currentOrder: { type: String, default: 'min_price' },
        search: { type: String, default: '', }
    },
    data() {
        return {
            openSections: ['category', 'gender', 'price', 'order', 'authenticity', 'discount'] 
        };
    },
    components: {
        SearchComponent
    },
    computed: {
        sections() { return this.metadata?.sections.filter(s => s.items.length > 0) || []; },
        hasActiveFilters(){
            const filters = {...this.activeFilters};
            delete filters.order; delete filters.page;
            return Object.keys(filters).length > 0;
        }
    },
    methods: {
        toggleSection(id) {
            const index = this.openSections.indexOf(id);
            if (index > -1) { this.openSections.splice(index, 1); } else { this.openSections.push(id); }
        },
        isFilterApplied(key, value) {
            const activeFilterValue = this.activeFilters[key];
            const filterString = activeFilterValue != null ? String(activeFilterValue).toLowerCase() : null;
            const valueString = value != null ? String(value).toLowerCase() : null;
            return filterString === valueString;
        },
        handleFilterChange(key, value, isChecked) { this.$emit('filter-changed', { key, value: isChecked ? value : undefined }); },
        handleOrderChange(value) { this.$emit('order-changed', value); },
        clearFilters(){ this.$emit('clear-filters'); }
    }
};
</script>

<style scoped>
/* Definición de una variable de color principal para acentos */
:root {
    --primary-color: #007bff; /* Azul moderno para botones/acentos */
    --text-color: #333;
    --background-color: #ffffff;
    --border-color: #e0e0e0;
}

.sidebar {
    width: 250px;
    padding: 20px; /* Más padding para que respire */
    background-color: var(--background-color);
    border-right: 1px solid var(--border-color);
    height: fit-content;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03); /* Sombra suave para darle profundidad */
}

/* Header y botón de Limpiar */
.header-filters {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
    padding-bottom: 10px;
    border-bottom: 1px solid var(--border-color);
}

h2 {
    font-size: 1.2rem; /* Tamaño de fuente más limpio para los títulos */
    color: var(--primary-color);
}

.clear-btn {
    background-color: #dc3545; /* Rojo para acción peligrosa/limpiar */
    color: white;
    border: none;
    padding: 6px 12px;
    cursor: pointer;
    border-radius: 4px;
    font-size: 0.8rem;
    transition: background-color 0.3s; /* Transición suave al pasar el mouse */
}
.clear-btn:hover {
    background-color: #c82333;
}

/* Secciones de Filtros */
.filter-section {
    border-bottom: 1px solid var(--border-color);
    padding: 15px 0;
}

.filter-section h3 {
    cursor: pointer;
    margin: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px 0;
    font-size: 1rem;
    font-weight: 600;
    transition: color 0.3s;
}
.filter-section h3:hover {
    color: var(--primary-color);
}
.filter-section h3.active {
    color: var(--primary-color);
}

.toggle-icon {
    font-size: 1.2rem;
    line-height: 1;
}

.items-list {
    display: flex;
    flex-direction: column;
    padding-top: 10px;
}

.checkbox-label {
    display: flex;
    align-items: center;
    margin-bottom: 8px; /* Espaciado mejorado */
    cursor: pointer;
    gap: 8px;
    font-size: 0.9rem;
    color: var(--text-color);
}
.checkbox-label:hover {
    color: var(--primary-color);
}
.checkbox-label input[type="checkbox"] {
    cursor: pointer;
    accent-color: var(--primary-color); /* Estilo nativo con color de acento */
}

.item-count {
    color: #888;
    margin-left: auto; /* Empuja el contador a la derecha */
    font-size: 0.8rem;
}

/* Sección de Ordenar por */
.order-section {
    padding-bottom: 0;
}

.order-select {
    width: 100%;
    padding: 8px;
    border-radius: 4px;
    border: 1px solid var(--border-color);
    margin-top: 5px;
    font-size: 0.9rem;
    cursor: pointer;
    background-color: var(--background-color);
}

.price-range-info {
    display: flex;
    justify-content: space-between;
    font-size: 0.9rem;
    padding: 5px 0;
    color: var(--text-color);
}

/* --- Tus Media Queries Existentes (Asegúrate de tener las variables CSS globales) --- */
@media screen and (min-width: 576px){
  /* h2 { font-size: var(--step-2); } */
  /* p { font-size: var(--step-0); } */
}
@media screen and (min-width: 992px){
    /* h2 { font-size: var(--step-3); } */
    /* p { font-size: var(--step-1); } */
}
@media screen and (min-width: 1400px){
   /* h2 { font-size: var(--step-4); } */
   /* p { font-size: var(--step-2); } */
}
</style>
