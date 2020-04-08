// переменные
let money;

// объект
let appData = {
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    mission: 1000000,
    period: 6,
    budget: null,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    asking: function () {
        let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
        appData.addExpenses = addExpenses.split(', ');
        appData.deposit = confirm('Есть ли у вас депозит в банке?');
        for (let i = 0; i < 2; i++) {
            let preSum;
            let expenses1 = prompt('Введите обязательную статью расходов?');
            do {
                preSum = prompt('Во сколько это обойдется?');
            } while (!isNumber(preSum));
           appData.expenses[expenses1] = +preSum;
        }
    },

    // расходы в месяц
    getExpensesMonth: function () {
        let sum = 0;
        for (let key in appData.expenses) {
            sum += appData.expenses[key];
        }
        return sum;
    },

    // свободные деньги
    getBudget: function () {
        return appData.budget - appData.getExpensesMonth();
    },

    //подсчет периода достижения цели
    getTargetMonth: function () {
        return Math.ceil(appData.mission/appData.getBudget());
    },

    // getBudgetDay ...
    getBudgetDay: function() {
        appData.budgetDay = appData.getBudget()/30;
        return appData.budgetDay;
    },

    // getStatusIncome ...
    getStatusIncome: function(budgetDay) {
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
};

// methods
appData.budget = start();
appData.asking();

// вывод в консоль
console.log('getBudgetDay', appData.getBudgetDay());
console.log(appData.getTargetMonth());
console.log(appData.getStatusIncome(appData.getBudgetDay()));
//console.log(appData);

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
    return money;
}