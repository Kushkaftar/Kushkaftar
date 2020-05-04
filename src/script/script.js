
// элементы DOM
let startButton = document.getElementById("start"),
    cancelButton = document.getElementById("cancel"),
    salaryAmount = document.querySelector(".salary-amount"),
    incomePlusButton = document.getElementsByTagName("button")[0],
    expensesPlusButton = document.getElementsByTagName("button")[1],
    expensesItems = document.querySelectorAll(".expenses-items"),
    periodAmount = document.querySelector(".period-amount"),
    incomeItems = document.querySelectorAll(".income-items"),
    budgetMonthInput = document.getElementsByClassName("budget_month-value")[0],
    budgetDayInput = document.getElementsByClassName("budget_day-value")[0],
    expensesMonthInput = document.getElementsByClassName("expenses_month-value")[0],
    additionalIncomeValue = document.getElementsByClassName("additional_income-value")[0],
    additionalExpensesValue = document.querySelector(".additional_expenses-value"),
    additionalIncomeItem = document.querySelectorAll(".additional_income-item"),
    targetAmount = document.querySelector(".target-amount"),
    targetMonthValue = document.getElementsByClassName("target_month-value")[0],
    periodSelect = document.querySelector(".period-select"),
    incomePeriodValue = document.getElementsByClassName("income_period-value")[0],
    additionalExpensesItem = document.querySelector(".additional_expenses-item");


// button disabled
startButton.setAttribute("disabled", "true");

const AppData = function () {
    this.income = {};
    this.incomeMonth = 0;
    this.addIncome = [];
    this.expenses = {};
    this.addExpenses = [];
    this.deposit = false;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
    this.budget = null;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.expensesMonth = 0;
};

// methods

AppData.prototype.start = function() {
    this.budget = +salaryAmount.value;
    this.getExpenses();
    this.getIncome();
    this.getExpensesMonth();
    this.getAddExpenses();
    this.getAddIncome();
    this.getBudget();
    this.showResult();
};

AppData.prototype.reset = function() {
    const _this = this;
    for (let key in _this) {
        switch (typeof (_this[key])) {
            case "number":
                _this[key] = 0;
                break;
            case "string":
                _this[key] = '';
                break;
            case "object":
                Array.isArray(_this[key]) ? _this[key] = [] : _this[key] = {};
                break;

        }
    }


    this.dellBlock(expensesItems, expensesPlusButton);
    this.dellBlock(incomeItems, incomePlusButton);
    this.resetObj();
};

AppData.prototype.dellBlock = function(node, btn) {
    for (let i = 1; i < node.length; i++) {
        node[i].remove();
    }
    btn.style.display = "block";
};

AppData.prototype.addExpensesBlock = function() {
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlusButton);
    expensesItems = document.querySelectorAll(".expenses-items");

    if (expensesItems.length === 3) {
        expensesPlusButton.style.display = "none";
    }
};

AppData.prototype.addIncomeBlock = function() {
    let cloneIncomeItem = incomeItems[0].cloneNode(true);
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlusButton);
    incomeItems = document.querySelectorAll(".income-items");

    if (incomeItems.length === 3) {
        incomePlusButton.style.display = "none";
    }
};

AppData.prototype.getExpenses = function() {
    expensesItems.forEach(elem => {
        let elemExpenses = elem.querySelector(".expenses-title").value,
            cashExpenses = elem.querySelector(".expenses-amount").value;
        if (elemExpenses !== "" && cashExpenses !== "") {
            this.expenses[elemExpenses] = +cashExpenses;
        }
    })
};

AppData.prototype.getIncome = function() {
    const _this = this;
    incomeItems.forEach(elem => {
        let elemIncome = elem.querySelector(".income-title").value,
            cashIncome = elem.querySelector(".income-amount").value;
        if (elemIncome !== "" && cashIncome !== "") {
            _this.income[elemIncome] = +cashIncome;
        }
    });
    for (let key in this.income) {
        this.incomeMonth += +this.income[key];
    }
};

AppData.prototype.showResult = function() {
    const _this = this;
    budgetMonthInput.value = this.budgetMonth;
    budgetDayInput.value = Math.round(this.budgetDay);
    expensesMonthInput.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(", ");
    additionalIncomeValue.value = this.addIncome.join(", ");
    targetMonthValue.value = this.getTargetMonth();
    incomePeriodValue.value = this.calcPeriod();

    periodSelect.addEventListener("input", () => incomePeriodValue.value = _this.calcPeriod());


};

AppData.prototype.getAddExpenses = function() {
    const _this = this;
    let addExp = additionalExpensesItem.value.split(",");
    addExp.forEach(elem => {
        elem = elem.trim();
        if (elem !== '') {
            _this.addExpenses.push(elem);
        }
    })
};

AppData.prototype.getAddIncome = function() {
    const _this = this;
    additionalIncomeItem.forEach(elem => {
        elem = elem.value.trim();
        if (elem !== '') {
            _this.addIncome.push(elem);
        }

    })
};

AppData.prototype.getExpensesMonth = function() {
    const _this = this;
    for (let key in _this.expenses) {
        _this.expensesMonth += _this.expenses[key];
    }
};

AppData.prototype.getBudget = function() {
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    this.budgetDay = Math.floor(this.budgetMonth) / 30;
};

AppData.prototype.getTargetMonth = function() {
    return Math.ceil(targetAmount.value / this.budgetMonth);
};

AppData.prototype.getStatusIncome = function(budgetDay) {
    let textResult;
    if (budgetDay >= 1200) {
        textResult = 'У вас высокий уровень дохода';
    } else if (budgetDay >= 600) {
        textResult = 'У вас средний уровень дохода';
    } else if (budgetDay >= 0) {
        textResult = 'К сожалению у вас уровень дохода ниже среднего';
    } else if (budgetDay < 0) {
        textResult = 'Цель не будет достигнута';
    }
    return textResult;
};

AppData.prototype.getInfoDeposit = function() {
    if (this.deposit) {
        this.percentDeposit = +questionHelp('numb',
            'какой годовой %?',
            3);
        this.moneyDeposit = +questionHelp('numb',
            'Сумма на депозите?',
            10000);
    }
};

AppData.prototype.calcPeriod = function() {
    return this.budgetMonth * periodSelect.value;
};

AppData.prototype.hideStart = function() {
    let blockInput = document.querySelectorAll("input");
    blockInput.forEach((elem) => {
        if (elem.getAttribute("type") === "text") {
            elem.setAttribute("disabled", "disabled")
        }
    });
    startButton.style.display = "none";
    cancelButton.style.display = "block";
};

AppData.prototype.resetObj = function() {
    let blockInput = document.querySelectorAll("input");
    blockInput.forEach((elem) => {
        elem.value = '';
        if (elem.getAttribute("type") === "text") {
            elem.removeAttribute("disabled")
        }
        if (elem.getAttribute("type") === "range") {
            elem.value = "1";
            periodAmount.innerHTML = "1";
        }
    });

    startButton.setAttribute("disabled", "disabled");
    startButton.style.display = "block";
    cancelButton.style.display = "none";
};
AppData.prototype.watchApp = function() {
    startButton.addEventListener("click", this.start.bind(this));
    expensesPlusButton.addEventListener("click", this.addExpensesBlock);
    incomePlusButton.addEventListener("click", this.addIncomeBlock);
    salaryAmount.addEventListener("input", () => {
        if (salaryAmount.value !== "") {
            startButton.removeAttribute("disabled");
        }
    });
    periodSelect.addEventListener("input", () => periodAmount.innerHTML = periodSelect.value);
    startButton.addEventListener("click", this.hideStart);
    cancelButton.addEventListener("click", this.reset.bind(this));
};




// конструктор
const appData = new AppData();
appData.watchApp();


