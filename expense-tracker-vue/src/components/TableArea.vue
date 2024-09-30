<template>
  <table class="table-area">
    <thead>
      <tr>
        <th>Data</th>
        <th>Categoria</th>
        <th>Título</th>
        <th>Valor</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(item, index) in list"
        :key="item.id"
        :class="{ 'new-item': index === list.length - 1 }"
      >
        <td>{{ new Date(item.date).toLocaleDateString("pt-BR") }}</td>
        <td>
          <span
            :style="{ backgroundColor: categories[item.category]?.color }"
            class="category-label"
          >
            {{ categories[item.category]?.title }}
          </span>
        </td>
        <td>{{ item.title }}</td>
        <td>R$ {{ item.value.toFixed(2) }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { categories } from "../data/categories";

export default defineComponent({
  props: {
    list: Array,
  },
  setup() {
    return {
      categories,
    };
  },
});
</script>

<style scoped>
.table-area {
  width: 100%;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 10px;
  margin-top: 20px;
}

th,
td {
  padding: 10px 0;
  text-align: left;
}

tbody tr:nth-child(even) {
  background-color: #f9f9f9;
}

.positive {
  color: green;
}

.negative {
  color: red;
}

.category-label {
  padding: 5px 10px;
  border-radius: 5px;
  color: white;
  font-weight: bold;
}

.new-item {
  animation: fadeIn 0.5s ease-out;
}

@keyframes fadeIn {
  from {
    background-color: #ffffe0;
  }
  to {
    background-color: white;
  }
}
</style>
