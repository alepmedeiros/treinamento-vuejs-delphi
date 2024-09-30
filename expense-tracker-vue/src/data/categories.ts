import { Category } from "../types/Category";

export const categories: { [key: string]: Category } = {
  alimentação: { title: "Alimentação", color: "blue", expense: true },
  transporte: { title: "Transporte", color: "orange", expense: true },
  salario: { title: "Salário", color: "green", expense: false },
  aluguel: { title: "Aluguel", color: "red", expense: true },
};
