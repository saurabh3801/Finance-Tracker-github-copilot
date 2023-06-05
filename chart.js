// chart.js

function generateExpenseChart() {
    const ctx = document.getElementById('expenseChart').getContext('2d');
  
    // Extract month and year from each expense date
    const expenseMonths = expenses.map(expense => {
      const date = new Date(expense.date);
      return `${date.getMonth() + 1}/${date.getFullYear()}`;
    });
  
    // Group expenses by month and calculate total amount
    const monthlyExpenses = {};
    expenses.forEach(expense => {
      const month = `${new Date(expense.date).getMonth() + 1}/${new Date(expense.date).getFullYear()}`;
      if (!monthlyExpenses[month]) {
        monthlyExpenses[month] = 0;
      }
      monthlyExpenses[month] += expense.amount;
    });
  
    // Prepare data for the chart
    const labels = Object.keys(monthlyExpenses);
    const data = Object.values(monthlyExpenses);
  
    // Create the chart
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Monthly Expenses',
          data: data,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 2,
          pointBackgroundColor: 'rgba(75, 192, 192, 1)',
          pointRadius: 4,
          pointHoverRadius: 6,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: value => '$' + value
            }
          }
        }
      }
    });
  }
  