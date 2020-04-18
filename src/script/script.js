
// элементы DOM
let startButton = document.getElementById("start"),
    salaryAmount = document.querySelector(".salary-amount"),
    incomePlusButton = document.getElementsByTagName("button")[0],
    expensesPlusButton = document.getElementsByTagName("button")[1],
    expensesItems = document.querySelectorAll(".expenses-items"),
    periodAmount = document.querySelector(".period-amount"),
    incomeItems = document.querySelectorAll(".income-items"),
    budgetMonthInput =  document.getElementsByClassName("budget_month-value")[0],
    budgetDayInput =  document.getElementsByClassName("budget_day-value")[0],
    expensesMonthInput =  document.getElementsByClassName("expenses_month-value")[0],
    additionalIncomeValue =  document.getElementsByClassName("additional_income-value")[0],
    additionalExpensesValue = document.querySelector(".additional_expenses-value"),
    additionalIncomeItem = document.querySelectorAll(".additional_income-item"),
    targetAmount = document.querySelector(".target-amount"),
    targetMonthValue =  document.getElementsByClassName("target_month-value")[0],
    periodSelect =  document.querySelector(".period-select"),
    incomePeriodValue =  document.getElementsByClassName("income_period-value")[0],
    additionalExpensesItem =  document.querySelector(".additional_expenses-item");


// button disabled
startButton.setAttribute("disabled", "disabled");


// объект
let appData = {
    income: {},
    incomeMonth: 0,
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    budget: null,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,

    start() {

        appData.budget = +salaryAmount.value;
        appData.getExpenses();
        appData.getIncome();
        appData.getExpensesMonth();
        appData.getAddExpenses();
        appData.getAddIncome();
        appData.getBudget();
        appData.showResult();

    },

    addExpensesBlock() {
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlusButton);
        expensesItems = document.querySelectorAll(".expenses-items");

        if (expensesItems.length === 3) {
            expensesPlusButton.style.display = "none";
        }
    },

    addIncomeBlock() {
        let cloneIncomeItem = incomeItems[0].cloneNode(true);
        incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlusButton);
        incomeItems = document.querySelectorAll(".income-items");

        if (incomeItems.length === 3) {
            incomePlusButton.style.display = "none";
        }
    },

    getExpenses() {
        expensesItems.forEach(elem => {
            let elemExpenses = elem.querySelector(".expenses-title").value,
                cashExpenses = elem.querySelector(".expenses-amount").value;
            if (elemExpenses !== "" && cashExpenses !== "") {
                appData.expenses[elemExpenses] = +cashExpenses;
            }
        })
    },

    getIncome() {
        incomeItems.forEach(elem => {
            let elemIncome = elem.querySelector(".income-title").value,
                cashIncome = elem.querySelector(".income-amount").value;
            if (elemIncome !== "" && cashIncome !== "") {
                appData.income[elemIncome] = +cashIncome;
            }
        });
        for (let key in appData.income) {
            appData.incomeMonth += +appData.income[key];
        }
    },

    showResult() {
        budgetMonthInput.value = appData.budgetMonth;
        budgetDayInput.value = Math.round(appData.budgetDay);
        expensesMonthInput.value = appData.expensesMonth;
        additionalExpensesValue.value = appData.addExpenses.join(", ");
        additionalIncomeValue.value = appData.addIncome.join(", ");
        targetMonthValue.value = appData.getTargetMonth();
        incomePeriodValue.value = appData.calcPeriod();

        periodSelect.addEventListener("input",() => incomePeriodValue.value = appData.calcPeriod());


    },

    getAddExpenses() {
        let addExp = additionalExpensesItem.value.split(",");
        addExp.forEach(elem => {
            elem = elem.trim();
            if(elem !== '') {
                appData.addExpenses.push(elem);
            }
        })
    },

    getAddIncome() {
        additionalIncomeItem.forEach(elem => {
            elem = elem.value.trim();
            if(elem !== '') {
                appData.addIncome.push(elem);
            }

        })
    },

    // расходы в месяц
    getExpensesMonth() {
        for (let key in appData.expenses) {
            appData.expensesMonth += appData.expenses[key];
        }
    },

    // свободные деньги
    getBudget: function () {
        appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
        appData.budgetDay = Math.floor(appData.budgetMonth) / 30;
    },

    //подсчет периода достижения цели
    getTargetMonth() {
        return Math.ceil(targetAmount.value/appData.budgetMonth);
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
    calcPeriod() {
        return appData.budgetMonth * periodSelect.value;
    }
};


//addEventListener
startButton.addEventListener("click", appData.start);
expensesPlusButton.addEventListener("click", appData.addExpensesBlock);
incomePlusButton.addEventListener("click", appData.addIncomeBlock);

salaryAmount.addEventListener("input", () => {
    if (salaryAmount.value !== "") {
        startButton.removeAttribute("disabled");
    }
});
periodSelect.addEventListener("input",() => periodAmount.innerHTML = periodSelect.value);


