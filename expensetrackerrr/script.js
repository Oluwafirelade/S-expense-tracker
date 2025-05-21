document.addEventListener("DOMContentLoaded", function() {
    const transactionForm = document.getElementById("transaction-form");
    const textInput = document.getElementById("text");
    const amountInput = document.getElementById("amount");
    const transactionList = document.getElementById("transaction-list");
    const balanceDisplay = document.getElementById("balance");
    const incomeDisplay = document.getElementById("income");
    const expenseDisplay = document.getElementById("expense");

    let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

    function updateUI() {
        transactionList.innerHTML = "";
        let totalBalance = 0;
        let totalIncome = 0;
        let totalExpense = 0;

        transactions.forEach((transaction, index) => {
            const li = document.createElement("li");
            li.classList.add(transaction.amount < 0 ? "minus" : "plus");
            li.innerHTML = `
                ${transaction.text} <span>${transaction.amount < 0 ? "-" : "+"}₦${Math.abs(transaction.amount).toLocaleString()}</span>
                <button class="delete-btn" onclick="deleteTransaction(${index})">X</button>
            `;
            transactionList.appendChild(li);

            if (transaction.amount < 0) {
                totalExpense += Math.abs(transaction.amount);
            } else {
                totalIncome += transaction.amount;
            }
            totalBalance += transaction.amount;
        });

        balanceDisplay.textContent = totalBalance.toLocaleString(undefined, { minimumFractionDigits: 2 });
        incomeDisplay.textContent = totalIncome.toLocaleString(undefined, { minimumFractionDigits: 2 });
        expenseDisplay.textContent = totalExpense.toLocaleString(undefined, { minimumFractionDigits: 2 });

        localStorage.setItem("transactions", JSON.stringify(transactions));
    }

    function addTransaction(event) {
        event.preventDefault();
        const text = textInput.value.trim();
        const amount = parseFloat(amountInput.value);

        if (text === "" || isNaN(amount) || amount === 0) {
            alert("Please enter valid details");
            return;
        }

        transactions.push({ text, amount });
        updateUI();

        textInput.value = "";
        amountInput.value = "";
    }

    window.deleteTransaction = function(index) {
        transactions.splice(index, 1);
        updateUI();
    };

    transactionForm.addEventListener("submit", addTransaction);
    updateUI();
});
