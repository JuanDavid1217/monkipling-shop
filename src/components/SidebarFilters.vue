<template>
    <aside class="sidebar">
        <div class="header-filters">
             <h2>Filtros</h2>
             <button v-if="hasActiveFilters" 
             @click="clearFilters" class="clear-btn">Limpiar</button>
        </div>
       

        <!-- Iterar sobre las secciones de filtros (Categoría, Color, Género, etc.) -->
        <div v-for="section in sections" :key="section.id" class="filter-section">
            <h3 @click="toggleSection(section.id)">
                {{ section.section_name }}
                <span class="toggle-icon">{{ openSections.includes(section.id) ? '▼' : '►' }}</span>
            </h3>
            
            <!-- Contenido de la sección (visible/oculto) -->
            <div v-if="openSections.includes(section.id)" class="items-list">
                <!-- Caso especial para Rango de Precio (usa input range o slider) -->
                <div v-if="section.id === 'price'">
                    <!-- Esto es un placeholder simple, necesitarías un componente de slider real para una UX completa -->
                    <p>Min: {{ section.items?.[0]?.total }} - Max: {{ section.items?.[1]?.total }}</p>
                    <!-- Lógica para inputs de precio aquí -->
                </div>

                <!-- Caso general para checkboxes (Categoría, Color, Tamaño, etc.) -->
                <div v-else>
                    <label v-for="item in section.items" :key="item.item_name" class="checkbox-label">
                        <input 
                            type="checkbox" 
                            :checked="isFilterApplied(section.id, item.item_name)"
                            @change="handleFilterChange(section.id, item.item_name, $event.target.checked)"
                        />
                        <!-- Muestra "Sí" o "No" para booleanos si quieres una UI más amigable -->
                        {{ typeof item.item_name === 'boolean' ? (item.item_name ? 'Sí' : 'No') : item.item_name }} 
                        ({{ item.total }})
                    </label>
                </div>
            </div>
        </div>
        
        <!-- Sección de Ordenar por -->
        <div class="filter-section">
            <h3>Ordenar por</h3>
            <select :value="currentOrder" @change="handleOrderChange($event.target.value)">
                <option value="min_price">Precio: Menor a Mayor</option>
                <option value="max_price">Precio: Mayor a Menor</option>
            </select>
        </div>
    </aside>
</template>

<script>
export default {
    name: 'SidebarFilters',
    props: {
        metadata: {
            type: Object,
            default: () => ({ sections: [] })
        },
        activeFilters: {
            type: Object,
            default: () => ({})
        },
        currentOrder: {
            type: String,
            default: 'min_price'
        }
    },
    data() {
        return {
            // Controla qué secciones del sidebar están abiertas visualmente
            openSections: ['category', 'gender', 'price', 'order', 'authenticity', 'discount'] 
        };
    },
    computed: {
        sections() {
            return this.metadata?.sections.filter(s => s.items.length > 0) || [];
        },
        hasActiveFilters(){
            const filters = {...this.activeFilters};
            delete filters.order;
            delete filters.page;

            return Object.keys(filters).length > 0;
        }
    },
    methods: {
        toggleSection(id) {
            const index = this.openSections.indexOf(id);
            if (index > -1) {
                this.openSections.splice(index, 1);
            } else {
                this.openSections.push(id);
            }
        },
        
        // MÉTODO CORREGIDO PARA MANEJAR BOOLEANOS
        isFilterApplied(key, value) {
            const activeFilterValue = this.activeFilters[key];

            // Convertimos ambos valores a string antes de comparar en minúsculas
            const filterString = activeFilterValue != null ? String(activeFilterValue).toLowerCase() : null;
            const valueString = value != null ? String(value).toLowerCase() : null;

            return filterString === valueString;
        },

        handleFilterChange(key, value, isChecked) {
            this.$emit('filter-changed', { key, value: isChecked ? value : undefined });
        },
        handleOrderChange(value) {
            this.$emit('order-changed', value);
        },
        clearFilters(){
            this.$emit('clear-filters');
        }
    }
};
</script>

<style scoped>
.sidebar {
    width: 250px;
    padding: 15px;
    border-right: 1px solid #eee;
    height: fit-content;
}

.filter-section h3 {
    cursor: pointer;
    margin-top: 15px;
    margin-bottom: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #f9f9f9;
    padding: 5px;
}

.items-list {
    display: flex;
    flex-direction: column;
    padding-left: 10px;
}

.checkbox-label {
    display: flex;
    align-items: center;
    margin-bottom: 5px;
    cursor: pointer;
    gap: 5px;
}

.header-filters {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.clear-btn {
    background-color: #000000;
    color: rgb(253, 253, 253);
    border: none;
    padding: 5px 10px;
    cursor: pointer;
    border-radius: 4px;
    font-size: 0.8rem;
}

@media screen and (min-width: 576px){
  .title{
    font-size:28px;
  }
  .img-box{
    height:200px;
  }
  .btn{
    width:100%;
    text-align:center;
  }
    h2 {
        font-size: var(--step-2);
    }

    p {
        font-size: var(--step-0);
    }
}

@media screen and (min-width: 992px){
    h2 {
        font-size: var(--step-3);
    }
    
    p {
        font-size: var(--step-1);
    }
}

@media screen and (min-width: 1400px){
   .img-box{
    height:270px;
   }
    h2 {
        font-size: var(--step-4);
    }
    
    p {
        font-size: var(--step-2);
    }
}

</style>
