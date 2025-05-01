const form = document.getElementById("transactionForm");
const titleInput = document.getElementById("title");
const amountInput = document.getElementById("amount");
const typeInput = document.getElementById("type");
const list = document.getElementById("transactionList");
const balanceEl = document.getElementById("balance");
const incomeEl = document.getElementById("income");
const expenseEl = document.getElementById("expense");

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

function addTransaction(e) {
  e.preventDefault();

  const transaction = {
    id: Date.now(),
    title: titleInput.value,
    amount: +amountInput.value,
    type: typeInput.value,
  };

  transactions.push(transaction);
  localStorage.setItem("transactions", JSON.stringify(transactions));
  titleInput.value = "";
  amountInput.value = "";
  typeInput.value = "";

  renderTransactions();
}

function deleteTransaction(id) {
  transactions = transactions.filter(tx => tx.id !== id);
  localStorage.setItem("transactions", JSON.stringify(transactions));
  renderTransactions();
}

function renderTransactions() {
  list.innerHTML = "";
  let income = 0, expense = 0;

  transactions.forEach(tx => {
    const li = document.createElement("li");
    li.classList.add(tx.type);
    li.innerHTML = `
      ${tx.title} - ₹${tx.amount}
      <span class="delete-btn" onclick="deleteTransaction(${tx.id})">✖</span>
    `;
    list.appendChild(li);

    if (tx.type === "income") income += tx.amount;
    else expense += tx.amount;
  });

  const balance = income - expense;
  incomeEl.textContent = income;
  expenseEl.textContent = expense;
  balanceEl.textContent = balance;
}

form.addEventListener("submit", addTransaction);
renderTransactions();
