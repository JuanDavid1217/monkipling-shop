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
       
        
        <div v-for="section in sections" :key="section.id" class="filter-section">
            <h3 @click="toggleSection(section.id)" :class="{ active: openSections.includes(section.id) }">
                {{ section.section_name }}
                <span class="toggle-icon">{{ openSections.includes(section.id) ? '−' : '+' }}</span>
            </h3>
            
            
            <div v-if="openSections.includes(section.id)" class="items-list">
                <!-- Caso especial para Rango de Preciooo -->
                <div v-if="section.id === 'price'">
                    <div class="price-range-info">
                        <span>Min: ${{ section.items?.[0]?.total }}</span>
                        <span>Max: ${{ section.items?.[1]?.total }}</span>
                    </div>
                </div>

              
                <div v-else>
                    <label v-for="item in section.items" :key="item.item_name" class="checkbox-label">
                        <input 
                            type="checkbox" 
                            :checked="isFilterApplied(section.id, item.item_name)"
                            @change="handleFilterChange(section.id, item.item_name, $event.target.checked)"
                        />
                        
                        {{ typeof item.item_name === 'boolean' ? (item.item_name ? 'Sí' : 'No') : item.item_name }} 
                        <span class="item-count">({{ item.total }})</span>
                    </label>
                </div>
            </div>
        </div>
        
        <!-- Sección de Ordenar por -->

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
    --primary-color: #007bff; 
    --background-color: #ffffff;
    --border-color: #e0e0e0;
}

.sidebar {
    width: 250px;
    padding: 20px; /* Más padding para que respire */
    background-color: var(--background-color);
    border-right: 1px solid var(--border-color);
    height: fit-content;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03); 
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
    font-size: 1.2rem; 
    color: var(--primary-color);
}

.clear-btn {
    background-color: var(--color1);
    color: white;
    border: none;
    padding: 6px 12px;
    cursor: pointer;
    font-size: 0.8rem;
    transition: background-color 0.3s; 
}
.clear-btn:hover {
    background-color: #7a002a;
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
    margin-bottom: 8px;
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
    accent-color: var(--primary-color); 
}

.item-count {
    color: #888;
    margin-left: auto; 
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

</style>
