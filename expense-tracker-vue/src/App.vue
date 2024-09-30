<template>
  <div class="app-background">
    <header class="app-header">
      <h1>Sistema Financeiro</h1>
    </header>
    <main class="container">
      <InfoArea
        :currentMonth="currentMonth"
        @monthChange="handleMonthChange"
        :income="income"
        :expense="expense"
      />
      <InputArea @addItem="handleAddItem" />
      <TableArea :list="filteredList" />
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import InfoArea from "./components/InfoArea.vue";
import InputArea from "./components/InputArea.vue";
import TableArea from "./components/TableArea.vue";
import { categories } from "./data/categories";
import { items } from "./data/items";
import { getCurrentMonth, filterListByMonth } from "./helpers/dateFilter";
import { Item } from "./types/Item";

export default defineComponent({
  components: {
    InfoArea,
    InputArea,
    TableArea,
  },
  setup() {
    const list = ref(items);
    const filteredList = ref<Item[]>([]);
    const currentMonth = ref(getCurrentMonth());
    const income = ref(0);
    const expense = ref(0);

    const filterList = () => {
      filteredList.value = filterListByMonth(list.value, currentMonth.value);
      let incomeCount = 0;
      let expenseCount = 0;
      for (let i in filteredList.value) {
        if (categories[filteredList.value[i].category].expense) {
          expenseCount += filteredList.value[i].value;
        } else {
          incomeCount += filteredList.value[i].value;
        }
      }
      income.value = incomeCount;
      expense.value = expenseCount;
    };

    watch([list, currentMonth], filterList, { immediate: true });

    const handleMonthChange = (newMonth: string) => {
      currentMonth.value = newMonth;
    };

    const handleAddItem = (item: Item) => {
      list.value.push(item);
    };

    return {
      currentMonth,
      filteredList,
      income,
      expense,
      handleMonthChange,
      handleAddItem,
    };
  },
});
</script>

<style>
/* Adicione essas regras globais para garantir que não haja margens ou preenchimento no topo */
html,
body {
  font-family: "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell",
    "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif; /* Escolha a fonte desejada */
  margin: 0;
  padding: 0;
}

/* Estilo atualizado para o fundo */
.app-background {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background-color: white;
}

.app-header {
  background-color: darkblue;
  width: 100vw; /* Ocupa 100% da largura da viewport */
  text-align: center;
  height: 150px; /* Define a altura do fundo azul */
  margin: 0; /* Remove quaisquer margens */
  font-family: "Poppins", sans-serif; /* Fonte especial para o título */
  letter-spacing: 2px; /* Espaçamento entre letras */
  padding-top: 20px;
}

.app-header h1 {
  margin: 0;
  padding: 0;
  font-size: calc(20px + 2vmin); /* Aumentar o tamanho da fonte */
  color: #fff;
  padding-top: 30px;
}

.container {
  width: 100%;
  max-width: 1000px;
  padding: 20px;
  border-radius: 10px;
  margin-top: -50px; /* Move o container para cima */
  z-index: 1; /* Garante que o container branco fique sobre o fundo azul */
  position: relative;
}
</style>
