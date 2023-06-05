// Expense data array
let expenses = [];

// Get form and table elements
const addExpenseForm = document.getElementById('addExpenseForm');
const expenseTable = document.getElementById('expenseTable');
const expenseTbody = expenseTable.getElementsByTagName('tbody')[0];
const totalSalaryInput = document.getElementById('totalSalary');
const totalExpensesElement = document.getElementById('totalExpenses');
const totalSavingsElement = document.getElementById('totalSavings');
const monthlyExpensesElement = document.getElementById('monthlyExpenses');
const monthlySavingsElement = document.getElementById('monthlySavings');
const clearButton = document.getElementById('clearButton');
const addExpenseButton = document.getElementById('addExpenseButton');
const addSalaryButton = document.getElementById('addSalaryButton');
const warningMessage = document.getElementById('warningMessage');

// Function to add expense
function addExpense(event) {
  event.preventDefault();

  // Get input values
  const expenseNameInput = document.getElementById('expenseName');
  const expenseAmountInput = document.getElementById('expenseAmount');
  const expenseDateInput = document.getElementById('expenseDate');
  const expenseName = expenseNameInput.value;
  const expenseAmount = parseFloat(expenseAmountInput.value);
  const expenseDate = expenseDateInput.value;

  // Validate input
  if (expenseName.trim() === '' || isNaN(expenseAmount) || expenseDate === '') {
    alert('Please enter a valid expense name, amount, and date.');
    return;
  }

  // Create expense object
  const expense = {
    name: expenseName,
    amount: expenseAmount,
    date: expenseDate
  };

  // Add expense to array
  expenses.push(expense);

  // Clear input fields
  expenseNameInput.value = '';
  expenseAmountInput.value = '';
  expenseDateInput.value = '';

  // Update expense table
  updateExpenseTable();

  // Calculate and display summary
  calculateSummary();
}



// Function to add salary
function addSalary() {
  const totalSalary = parseFloat(totalSalaryInput.value);

  if (isNaN(totalSalary)) {
    alert('Please enter a valid total salary.');
    return;
  }

  calculateSummary();
}

// Function to update expense table
// Function to update expense table
function updateExpenseTable() {
  // Clear expense table body
  expenseTbody.innerHTML = '';

  // Add expenses to the table
  for (let i = 0; i < expenses.length; i++) {
    const expense = expenses[i];

    // Create table row
    const row = document.createElement('tr');

    // Create table cells
    const nameCell = document.createElement('td');
    const amountCell = document.createElement('td');
    const dateCell = document.createElement('td');

    // Set cell values
    nameCell.textContent = expense.name;
    amountCell.textContent = expense.amount.toFixed(2);
    dateCell.textContent = expense.date;

    // Append cells to row
    row.appendChild(nameCell);
    row.appendChild(amountCell);
    row.appendChild(dateCell);

    // Append row to table body
    expenseTbody.appendChild(row);
  }
}




// Function to calculate and display summary
// Function to calculate and display summary
function calculateSummary() {
  const totalSalary = parseFloat(totalSalaryInput.value);
  let totalExpenses = 0;

  // Validate input
  if (isNaN(totalSalary)) {
    alert('Please enter a valid total salary.');
    return;
  }

  // Calculate total expenses
  for (let i = 0; i < expenses.length; i++) {
    totalExpenses += expenses[i].amount;
  }

  // Calculate total savings
  const totalSavings = totalSalary - totalExpenses;

  // Calculate monthly expenses and savings
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  let monthlyExpenses = 0;
  let monthlySavings = 0;

  for (let i = 0; i < expenses.length; i++) {
    const expenseDate = new Date(expenses[i].date);
    const expenseMonth = expenseDate.getMonth() + 1;

    if (expenseMonth === currentMonth) {
      monthlyExpenses += expenses[i].amount;
    }
  }

  monthlySavings = totalSalary - monthlyExpenses;

  // Update summary elements
  totalExpensesElement.textContent = totalExpenses.toFixed(2);
  totalSavingsElement.textContent = totalSavings.toFixed(2);
  monthlyExpensesElement.textContent = monthlyExpenses.toFixed(2);
  monthlySavingsElement.textContent = monthlySavings.toFixed(2);

  // Check if expenses exceed salary and display warning message
  if (totalExpenses > totalSalary) {
    warningMessage.textContent = 'Warning: Your expenses exceed your salary!';
    warningMessage.style.display = 'block';
  } else {
    warningMessage.style.display = 'none';
  }
}

// function calculateSummary() {


// Function to clear expense history
function clearHistory() {
  expenses = [];
  updateExpenseTable();
  calculateSummary();
}

// Function to check if salary is filled and enable/disable the Add Expense button
function checkSalary() {
  const totalSalary = parseFloat(totalSalaryInput.value);

  if (isNaN(totalSalary)) {
    addExpenseButton.disabled = true;
  } else {
    addExpenseButton.disabled = false;
  }
}

// Event listeners
addExpenseForm.addEventListener('submit', addExpense);
clearButton.addEventListener('click', clearHistory);
totalSalaryInput.addEventListener('input', checkSalary);
addSalaryButton.addEventListener('click', addSalary);

// Initial check for salary on page load
checkSalary();

