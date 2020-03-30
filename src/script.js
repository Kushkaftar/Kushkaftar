// переменные
let money = 80000,
    income = 'freelance',
    addExpenses = 'cigarettes, wine, girls',
    deposit = true,
    mission = 1000,
    period = 6;

//вывод в консоль
console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);
console.log(addExpenses.length);
console.log(`Период равен ${period} месяцев`);
console.log(`Цель заработать ${mission} рублей/долларов/гривен/юани`);
console.log(addExpenses.toLocaleLowerCase().split(', '));

//переменная
 let budgetDay = money/30;

//вывод в консоль
console.log(budgetDay);

money = +prompt('Ваш месячный доход?');

addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');

deposit = confirm('Есть ли у вас депозит в банке?');

let expenses1 = prompt('Введите обязательную статью расходов?');
let amount1 = +prompt('Во сколько это обойдется?');

let expenses2 = prompt('Введите обязательную статью расходов?');
let amount2 = +prompt('Во сколько это обойдется?');

let budgetMonth = money - (amount1 + amount2);
console.log(budgetMonth);

console.log(Math.ceil(mission/budgetMonth));

budgetDay = Math.floor(budgetMonth/30);
console.log(budgetDay);

if (budgetDay >= 1200) {
    console.log('У вас высокий уровень дохода');
}  else if (budgetDay >= 600) {
    console.log('У вас средний уровень дохода');
} else if (budgetDay >= 0) {
    console.log('К сожалению у вас уровень дохода ниже среднего');
} else if (budgetDay < 0) {
    console.log('Что то пошло не так');
}