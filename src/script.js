// переменные
let money = 80000,
    income = 'freelance',
    addExpenses,
    deposit,
    mission = 1000000,
    period = 6,
    expenses1,
    expenses2,
    expressionAmount,
    budgetDay;

start();
addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');

deposit = confirm('Есть ли у вас депозит в банке?');
expressionAmount = getExpensesMonth();
let accumulatedMonth = getAccumulatedMonth();


// вывод в консоль
console.log(showTypeOf(money));
console.log(showTypeOf(income));
console.log(showTypeOf(deposit));
console.log(expressionAmount);
console.log(addExpenses.split(', '));
console.log(getTargetMonth());
console.log(getBudgetDay());
console.log(getStatusIncome(getBudgetDay()));


// функции

// isNumber ...
function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

// start ...
function start() {

    do {
        money = prompt('Ваш месячный доход?');
    } while (!isNumber(money));
}
// возвращает тип
function showTypeOf(data) {
    return typeof (data);
}

// расходы в месяц
function getExpensesMonth() {
   // debugger;
    let preSum;
    let sum = 0;
    for (let i = 0; i < 2; i++) {
        if (i === 0) {
            expenses1 = prompt('Введите обязательную статью расходов?');
        } else if (i === 1) {
            expenses2 = prompt('Введите обязательную статью расходов?');
        }
        do {
            preSum = +prompt('Во сколько это обойдется?');
        } while (!isNumber(preSum));
        sum += preSum
    }
    return sum;
}

// свободные деньги
function getAccumulatedMonth() {
    return money - expressionAmount;
}

//подсчет периода достижения цели
function getTargetMonth() {
    return Math.ceil(mission/accumulatedMonth);
}

// getBudgetDay ...
function getBudgetDay() {
   budgetDay = accumulatedMonth/30;
   return budgetDay;
}

// getStatusIncome ...
function getStatusIncome(budgetDay) {
    let textResult;
    if (budgetDay >= 1200) {
        textResult = 'У вас высокий уровень дохода';
    }  else if (budgetDay >= 600) {
        textResult = 'У вас средний уровень дохода';
    } else if (budgetDay >= 0) {
        textResult = 'К сожалению у вас уровень дохода ниже среднего';
    } else if (budgetDay < 0) {
        textResult = 'Цель не будет достигнута';
    }
    return textResult;
}

