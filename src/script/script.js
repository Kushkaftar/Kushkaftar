
// элементы DOM
const startButton = document.getElementById("start"),
    cancelButton = document.getElementById("cancel"),
    salaryAmount = document.querySelector(".salary-amount"),
    incomePlusButton = document.getElementsByTagName("button")[0],
    expensesPlusButton = document.getElementsByTagName("button")[1],
    periodAmount = document.querySelector(".period-amount"),
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
    additionalExpensesItem = document.querySelector(".additional_expenses-item"),
    depositBank = document.querySelector(".deposit-bank"),
    depositAmount = document.querySelector(".deposit-amount"),
    depositPercent = document.querySelector(".deposit-percent"),
    depositCheck = document.querySelector("#deposit-check");

let expensesItems = document.querySelectorAll(".expenses-items"),
    incomeItems = document.querySelectorAll(".income-items");


// button disabled
startButton.setAttribute("disabled", "true");

class AppData {
    constructor() {
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
    }

    start() {


            this.budget = +salaryAmount.value;
            this.getExpenses();
            this.getIncome();
            this.getExpensesMonth();
            this.getAddExpenses();
            this.getAddIncome();
            this.getInfoDeposit();
            this.getBudget();
            this.showResult();


    }

    reset() {
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
    }

    dellBlock(node, btn) {
        for (let i = 1; i < node.length; i++) {
            node[i].remove();
        }
        btn.style.display = "block";
    }

    addExpensesBlock() {
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlusButton);
        expensesItems = document.querySelectorAll(".expenses-items");

        if (expensesItems.length === 3) {
            expensesPlusButton.style.display = "none";
        }
    }

    addIncomeBlock() {
        let cloneIncomeItem = incomeItems[0].cloneNode(true);
        incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlusButton);
        incomeItems = document.querySelectorAll(".income-items");

        if (incomeItems.length === 3) {
            incomePlusButton.style.display = "none";
        }
    }

    getExpenses() {
        expensesItems.forEach(elem => {
            let elemExpenses = elem.querySelector(".expenses-title").value,
                cashExpenses = elem.querySelector(".expenses-amount").value;
            if (elemExpenses !== "" && cashExpenses !== "") {
                this.expenses[elemExpenses] = +cashExpenses;
            }
        })
    }

    getIncome() {
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
    }

    showResult() {
        const _this = this;
        budgetMonthInput.value = this.budgetMonth;
        budgetDayInput.value = Math.round(this.budgetDay);
        expensesMonthInput.value = this.expensesMonth;
        additionalExpensesValue.value = this.addExpenses.join(", ");
        additionalIncomeValue.value = this.addIncome.join(", ");
        targetMonthValue.value = this.getTargetMonth();
        incomePeriodValue.value = this.calcPeriod();

        periodSelect.addEventListener("input", () => incomePeriodValue.value = _this.calcPeriod());


    }

    getAddExpenses() {
        const _this = this;
        let addExp = additionalExpensesItem.value.split(",");
        addExp.forEach(elem => {
            elem = elem.trim();
            if (elem !== '') {
                _this.addExpenses.push(elem);
            }
        })
    }

    getAddIncome() {
        const _this = this;
        additionalIncomeItem.forEach(elem => {
            elem = elem.value.trim();
            if (elem !== '') {
                _this.addIncome.push(elem);
            }

        })
    }

    getExpensesMonth() {
        //const _this = this;
        for (let key in this.expenses) {
            this.expensesMonth += this.expenses[key];
        }
    }

    getBudget() {
        const monthDeposit = this.moneyDeposit * (this.percentDeposit / 100);
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth + monthDeposit;
        this.budgetDay = Math.floor(this.budgetMonth) / 30;
    }

    getTargetMonth() {
        return Math.ceil(targetAmount.value / this.budgetMonth);
    }

    getStatusIncome(budgetDay) {
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
    }

    getInfoDeposit() {
        if (this.deposit) {
            this.percentDeposit = +depositPercent.value;
            this.moneyDeposit = +depositAmount.value;
        }
    }

    calcPeriod() {
        return this.budgetMonth * periodSelect.value;
    }

    hideStart() {
        let blockInput = document.querySelectorAll("input");
        blockInput.forEach((elem) => {
            if (elem.getAttribute("type") === "text") {
                elem.setAttribute("disabled", "disabled")
            }
        });
        startButton.style.display = "none";
        cancelButton.style.display = "block";
    }

    resetObj() {
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
    }


    changePercent() {

        startButton.setAttribute("disabled", "true");
        const selectIndex = this.value;
        if (selectIndex === "other") {

            depositPercent.style.display = "inline-block";
            depositPercent.removeAttribute("disabled");

            depositPercent.addEventListener("input", () => {
                startButton.setAttribute("disabled", "true");
                if (!isNaN(parseFloat(depositPercent.value))
                    && Number(depositPercent.value) >= 0
                    && Number(depositPercent.value) <= 100) {
                    startButton.removeAttribute("disabled");
                } else {
                    alert("depositPercent 1 - 100");
                    depositPercent.value = "";
                }
            })
        } else {
                depositPercent.value = +selectIndex;
                startButton.removeAttribute("disabled");
            }
    }

    depositHandler() {
        if (depositCheck.checked) {
            depositBank.style.display = "inline-block";
            depositAmount.style.display = "inline-block";
            this.deposit = true;
            depositBank.addEventListener("change", this.changePercent);
        } else {
            depositBank.style.display = "none";
            depositAmount.style.display = "none";
            depositBank.value = "";
            depositAmount.value = "";
            this.deposit = false;
            depositBank.removeEventListener("change", this.changePercent);
        }
    }

    watchApp() {
        startButton.addEventListener("click", this.start.bind(this));
        expensesPlusButton.addEventListener("click", this.addExpensesBlock);
        incomePlusButton.addEventListener("click", this.addIncomeBlock);
        depositCheck.addEventListener("change", this.depositHandler.bind(this));
        salaryAmount.addEventListener("input", () => {
            // console.log(salaryAmount.value);
            // console.log(depositCheck.checked);
            if (salaryAmount.value !== "") {
                startButton.removeAttribute("disabled");
            }
        });
        periodSelect.addEventListener("input", () => periodAmount.innerHTML = periodSelect.value);
        startButton.addEventListener("click", this.hideStart);
        cancelButton.addEventListener("click", this.reset.bind(this));

    }
}

// конструктор
const appData = new AppData();
appData.watchApp();


