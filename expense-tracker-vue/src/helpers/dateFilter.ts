// src/helpers/dateFilter.ts

export const getCurrentMonth = (): string => {
  const now = new Date();
  return `${now.getFullYear()}-${(now.getMonth() + 1)
    .toString()
    .padStart(2, "0")}`;
};

export const filterListByMonth = (list: any[], month: string): any[] => {
  const [year, monthStr] = month.split("-");
  return list.filter((item) => {
    const itemDate = new Date(item.date);
    return (
      itemDate.getFullYear() === parseInt(year) &&
      itemDate.getMonth() + 1 === parseInt(monthStr)
    );
  });
};

export const getPreviousMonth = (currentMonth: string): string => {
  let [year, month] = currentMonth.split("-").map(Number);
  month--;
  if (month < 1) {
    month = 12;
    year--;
  }
  return `${year}-${month.toString().padStart(2, "0")}`;
};

export const getNextMonth = (currentMonth: string): string => {
  let [year, month] = currentMonth.split("-").map(Number);
  month++;
  if (month > 12) {
    month = 1;
    year++;
  }
  return `${year}-${month.toString().padStart(2, "0")}`;
};
