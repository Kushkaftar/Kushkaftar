// переменные
let money;

// элементы DOM
const startButton = document.getElementById('start'),
    incomePlusButton = document.getElementsByTagName("button")[0],
    incomeInput0 = document.querySelectorAll(".additional_income-item")[0],
    incomeInput1 = document.querySelectorAll(".additional_income-item")[1],
    expensesPlusButton = document.getElementsByTagName("button")[1],
    checkboxDeposit = document.querySelector("#deposit-check"),
    inputBudgetMonth =  document.querySelector(".budget_month-value"),
    inputBudgetDay =  document.querySelector(".budget_day-value"),
    inputExpensesMonth =  document.querySelector(".expenses_month-value"),
    inputIncome =  document.querySelector(".additional_income-value"),
    inputExpenses =  document.querySelector(".additional_expenses-value"),
    inputIncomePeriod =  document.querySelector(".income_period-value"),
    inputTargetMonth =  document.querySelector(".target_month-value"),
    inputRangePeriod =  document.querySelector(".period-select"),
    inputIncomeTitle =  document.querySelector(".income-title"),
    inputIncomeAmount =  document.querySelector(".income-amount"),
    inputExpensesTitle =  document.querySelector(".expenses-title"),
    inputExpensesAmount =  document.querySelector(".expenses-amount"),
    inputAdditionalExpensesItem =  document.querySelector(".additional_expenses-item"),
    inputTargetAmount = document.querySelector(".target-amount");

// объект
let appData = {
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    mission: 1000000,
    period: 6,
    budget: null,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    asking: function () {

        if (confirm('есть ли доп заработок')){
            let itemIncome = questionHelp('str',
                'Какой у вас дополнительный заработок',
                'taxi');
            appData.income[itemIncome] = +questionHelp('numb',
                'сколько выходит в месяц',
                10000);
        }

        let addExpenses = questionHelp('str',
            'Перечислите возможные расходы за рассчитываемый период через запятую',
            'кино, вино, домино');
        appData.addExpenses = addExpenses.split(', ');
        appData.deposit = confirm('Есть ли у вас депозит в банке?');
        appData.getInfoDeposit();
        for (let i = 0; i < 2; i++) {

            let expenses = questionHelp('str',
                'Введите обязательную статью расходов?',
            `article${i}`);

            appData.expenses[expenses] =  +questionHelp('numb',
                    'Во сколько это обойдется?',
                    5000);
        }
    },

    // расходы в месяц
    getExpensesMonth: function () {
        for (let key in appData.expenses) {
            appData.expensesMonth += appData.expenses[key];
        }
    },

    // свободные деньги
    getBudget: function () {
        appData.budgetMonth = appData.budget - appData.expensesMonth;
        appData.budgetDay = Math.floor(appData.budgetMonth) / 30;
    },

    //подсчет периода достижения цели
    getTargetMonth: function () {
        return Math.ceil(appData.mission/appData.budgetMonth);
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
},
    getInfoDeposit() {
        if (appData.deposit) {
            appData.percentDeposit = +questionHelp('numb',
                'какой годовой %?',
                3);
            appData.moneyDeposit = +questionHelp('numb',
                'Сумма на депозите?',
                10000);
        }
    },
    calcSaveMoney() {
        return appData.budgetMonth * appData.period;
    }
};

// methods
appData.budget = +start();
appData.asking();
appData.getExpensesMonth();
appData.getBudget();
//appData.getInfoDeposit();

// вывод в консоль
console.log('getBudgetDay', appData.budgetDay);
console.log(appData.getTargetMonth());
console.log(appData.getStatusIncome(appData.budgetDay));
console.log(appData);

// функции

// func question
function questionHelp(query, string, defaultItem) {
    let answer;
    switch (query) {
        case 'str':
            do {
                answer = prompt(string, defaultItem);
            } while ( !isNaN(answer));
            break;
        case 'numb':
            do {
                answer = prompt(string, defaultItem);
            } while (!isNumber(answer));
            break;
    }
    return answer;
}
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

//
let addExpenses, addExpenses2 = [];
appData.addExpenses.forEach(element => addExpenses2.push(element[0].toUpperCase() + element.slice( 1, element.length + 1)));
addExpenses = addExpenses2.join(', ');
console.log(addExpenses);