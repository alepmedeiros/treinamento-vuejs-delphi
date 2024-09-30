<template>
  <div class="info-area">
    <div class="month-navigation">
      <button @click="goToPreviousMonth">⬅️</button>
      <span>{{ formattedMonth }} de {{ currentYear }}</span>
      <button @click="goToNextMonth">➡️</button>
    </div>
    <div class="info-values">
      <div>
        <span>Receitas</span>
        <p>R$ {{ income.toFixed(2) }}</p>
      </div>
      <div>
        <span>Despesas</span>
        <p>R$ {{ expense.toFixed(2) }}</p>
      </div>
      <div>
        <span>Balanço</span>
        <p :class="{ negative: balance < 0 }">R$ {{ balance.toFixed(2) }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { getNextMonth, getPreviousMonth } from "../helpers/dateFilter";

export default defineComponent({
  props: {
    currentMonth: {
      type: String,
      default: "2024-01", // Valor padrão caso o currentMonth não seja passado
    },
    income: {
      type: Number,
      default: 0,
    },
    expense: {
      type: Number,
      default: 0,
    },
  },
  emits: ["monthChange"],
  setup(props, { emit }) {
    const balance = computed(() => (props.income ?? 0) - (props.expense ?? 0));

    const goToPreviousMonth = () => {
      const [year, month] = props.currentMonth.split("-");
      let newYear = parseInt(year);
      let newMonth = parseInt(month) - 1;

      if (newMonth < 1) {
        newMonth = 12;
        newYear -= 1;
      }

      emit("monthChange", `${newYear}-${newMonth.toString().padStart(2, "0")}`);
    };

    const goToNextMonth = () => {
      const [year, month] = props.currentMonth.split("-");
      let newYear = parseInt(year);
      let newMonth = parseInt(month) + 1;

      if (newMonth > 12) {
        newMonth = 1;
        newYear += 1;
      }

      emit("monthChange", `${newYear}-${newMonth.toString().padStart(2, "0")}`);
    };

    const formattedMonth = computed(() => {
      const [year, month] = props.currentMonth.split("-");
      const monthNames = [
        "Janeiro",
        "Fevereiro",
        "Março",
        "Abril",
        "Maio",
        "Junho",
        "Julho",
        "Agosto",
        "Setembro",
        "Outubro",
        "Novembro",
        "Dezembro",
      ];
      return monthNames[parseInt(month) - 1];
    });

    const currentYear = computed(() => {
      return props.currentMonth?.split("-")[0];
    });

    return {
      balance,
      goToPreviousMonth,
      goToNextMonth,
      formattedMonth,
      currentYear,
    };
  },
});
</script>

<style scoped>
.info-area {
  background-color: #fff;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 10px;
  padding: 20px;
  margin-top: -40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
}

.month-navigation {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
}

.month-navigation span {
  font-size: 1rem;
  font-weight: bold;
  white-space: nowrap; /* Impede que o texto quebre para uma nova linha */
}

.month-navigation button {
  background-color: #00aaff;
  border: none;
  color: white;
  padding: 3px 8px;
  margin: 0 5px;
  border-radius: 5px;
}

.month-navigation span {
  font-size: 1rem;
  font-weight: bold;
}

.info-values {
  display: flex;
  justify-content: space-between;
  width: 100%;
  text-align: center;
}

.info-values div {
  flex: 1;
}

.info-values span {
  font-size: 1rem;
  font-weight: bold;
  color: #888;
}

.info-values p {
  margin: 5px 0;
  font-size: 1rem;
  font-weight: bold;
  color: #000;
}

.negative {
  color: red;
}
</style>
