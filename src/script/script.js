
// элементы DOM
let startButton = document.getElementById("start"),
    cancelButton = document.getElementById("cancel"),
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
        this.budget = +salaryAmount.value;
        this.getExpenses();
        this.getIncome();
        this.getExpensesMonth();
        this.getAddExpenses();
        this.getAddIncome();
        this.getBudget();
        this.showResult();
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
                this.expenses[elemExpenses] = +cashExpenses;
            }
        })
    },

    getIncome() {
        incomeItems.forEach(elem => {
            let elemIncome = elem.querySelector(".income-title").value,
                cashIncome = elem.querySelector(".income-amount").value;
            if (elemIncome !== "" && cashIncome !== "") {
                this.income[elemIncome] = +cashIncome;
            }
        });
        for (let key in this.income) {
            this.incomeMonth += +this.income[key];
        }
    },

    showResult() {
        budgetMonthInput.value = this.budgetMonth;
        budgetDayInput.value = Math.round(this.budgetDay);
        expensesMonthInput.value = this.expensesMonth;
        additionalExpensesValue.value = this.addExpenses.join(", ");
        additionalIncomeValue.value = this.addIncome.join(", ");
        targetMonthValue.value = this.getTargetMonth();
        incomePeriodValue.value = this.calcPeriod();

        periodSelect.addEventListener("input",() => incomePeriodValue.value = this.calcPeriod());


    },

    getAddExpenses() {
        let addExp = additionalExpensesItem.value.split(",");
        addExp.forEach(elem => {
            elem = elem.trim();
            if(elem !== '') {
                this.addExpenses.push(elem);
            }
        })
    },

    getAddIncome() {
        additionalIncomeItem.forEach(elem => {
            elem = elem.value.trim();
            if(elem !== '') {
                this.addIncome.push(elem);
            }

        })
    },

    // расходы в месяц
    getExpensesMonth() {
        for (let key in this.expenses) {
            this.expensesMonth += this.expenses[key];
        }
    },

    // свободные деньги
    getBudget: function () {
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
        this.budgetDay = Math.floor(this.budgetMonth) / 30;
    },

    //подсчет периода достижения цели
    getTargetMonth() {
        return Math.ceil(targetAmount.value/this.budgetMonth);
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
        if (this.deposit) {
            this.percentDeposit = +questionHelp('numb',
                'какой годовой %?',
                3);
            this.moneyDeposit = +questionHelp('numb',
                'Сумма на депозите?',
                10000);
        }
    },
    calcPeriod() {
        return this.budgetMonth * periodSelect.value;
    }
};

// function ...
function hideStart() {
    let blockInput = document.querySelectorAll("input");
    blockInput.forEach((elem) => {
        if (elem.getAttribute("type") === "text") {
            elem.setAttribute("disabled", "disabled")
        }
    });
    startButton.style.display = "none";
    cancelButton.style.display = "block";
}

//addEventListener ...
startButton.addEventListener("click", appData.start.bind(appData));
expensesPlusButton.addEventListener("click", appData.addExpensesBlock);
incomePlusButton.addEventListener("click", appData.addIncomeBlock);

salaryAmount.addEventListener("input", () => {
    if (salaryAmount.value !== "") {
        startButton.removeAttribute("disabled");
    }
});
periodSelect.addEventListener("input",() => periodAmount.innerHTML = periodSelect.value);

startButton.addEventListener("click", hideStart);

cancelButton.addEventListener("click", () => location.reload());
