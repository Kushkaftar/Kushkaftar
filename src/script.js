// переменные
let money = 80000,
    income = 'freelance',
    addExpenses = 'cigarettes, wine, girls',
    deposit = true,
    mission = 1000,
    period = 6;

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);
console.log(addExpenses.length);
console.log(`Период равен ${period} месяцев`);
console.log(`Цель заработать ${mission} рублей/долларов/гривен/юани`);
console.log(addExpenses.toLocaleLowerCase().split(', '));
budgetDay = money/30;
console.log(budgetDay);