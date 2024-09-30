<template>
  <div class="input-area">
    <div class="input-group">
      <label>Data</label>
      <input type="date" v-model="newItem.date" />
    </div>
    <div class="input-group">
      <label>Categoria</label>
      <select v-model="newItem.category">
        <option value="alimentação">Alimentação</option>
        <option value="transporte">Transporte</option>
        <!-- Adicione mais categorias conforme necessário -->
      </select>
    </div>
    <div class="input-group">
      <label>Título</label>
      <input v-model="newItem.title" placeholder="Título" />
    </div>
    <div class="input-group">
      <label>Valor</label>
      <input v-model.number="newItem.value" type="number" placeholder="Valor" />
    </div>
    <div class="input-group button-group">
      <button @click="addItem">Adicionar</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  emits: ["addItem"],
  setup(_, { emit }) {
    const newItem = ref({
      date: "",
      category: "",
      title: "",
      value: 0,
    });

    const addItem = () => {
      emit("addItem", { ...newItem.value });
      newItem.value = {
        date: "",
        category: "",
        title: "",
        value: 0,
      };
    };

    return { newItem, addItem };
  },
});
</script>

<style scoped>
.input-area {
  background-color: #fff;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 10px;
  padding: 20px;
  margin-top: 20px;
  display: grid;
  grid-template-columns: repeat(4, 1fr) auto;
  grid-gap: 20px; /* Aumenta o espaçamento entre os itens */
  align-items: center; /* Garante que o botão fique alinhado verticalmente */
}

input,
select {
  width: 100%;
  padding: 8px;
  border: 1px solid lightblue;
  border-radius: 5px;
}

button {
  padding: 9px 20px;
  border: none;
  border-radius: 5px;
  background-color: #00aaff;
  margin-top: 20px;
  color: white;
  cursor: pointer;
  align-self: stretch; /* Garante que o botão tenha a mesma altura dos inputs */
}

button:hover {
  background-color: blue;
}
</style>
