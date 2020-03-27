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

//+++ доп задание

//переменные
let num = 266219;
let numStr = String(num);
let arr = numStr.split('');
let sum = 1;

//вывод в консоль
console.log(numStr.split(''));

//цикл
for ( let i = 0; i < numStr.length; i++) {
  sum = sum * +arr[i];
}

//переменная
let res = sum ** 3;

//не совсем понял что значит вывести на экран решил что так наверное
let block = document.getElementById('add');
const  h1 = document.createElement('h1');
h1.textContent = String(res).slice(1,3);
block.append(h1);

//изначально выводил в консоль
//console.log(String(res).slice(1,3));