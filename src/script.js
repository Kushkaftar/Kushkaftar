// переменные
let money = 80000,
    income = 'freelance',
    addExpenses = 'cigarettes, wine, girls',
    deposit = true,
    mission = 1000000,
    period = 6;

// бюджет на день
let budgetDay = money/30;

// блок ввода
money = +prompt('Ваш месячный доход?');

addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');

deposit = confirm('Есть ли у вас депозит в банке?');

let expenses1 = prompt('Введите обязательную статью расходов?');
let amount1 = +prompt('Во сколько это обойдется?');

let expenses2 = prompt('Введите обязательную статью расходов?');
let amount2 = +prompt('Во сколько это обойдется?');

// функции

// возвращает тип
function showTypeOf(data) {
    return typeof (data);
}
// расходы в месяц
function getExpensesMonth() {
    return amount1 + amount2;
}
// свободные деньги
function getAccumulatedMonth() {
    return money - getExpensesMonth();
}

let accumulatedMonth = getAccumulatedMonth();

//подсчет периода достижения цели
function getTargetMonth() {
    return Math.ceil(mission/accumulatedMonth);
}

// getStatusIncome ...
function getStatusIncome() {
    let textResult;
    if (budgetDay >= 1200) {
        textResult = 'У вас высокий уровень дохода';
    }  else if (budgetDay >= 600) {
        textResult = 'У вас средний уровень дохода';
    } else if (budgetDay >= 0) {
        textResult = 'К сожалению у вас уровень дохода ниже среднего';
    } else if (budgetDay < 0) {
        textResult = 'Что то пошло не так';
    }
    return textResult;
}

// вывод в консоль
console.log(showTypeOf(money));
console.log(showTypeOf(income));
console.log(showTypeOf(deposit));
console.log(getExpensesMonth());
console.log(addExpenses.split(', '));
console.log(getTargetMonth());
console.log(budgetDay);
console.log(getStatusIncome());