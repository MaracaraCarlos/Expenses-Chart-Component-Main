fetch('../data/data.json')
.then(response => {
  if(response.ok === true) {
    return response.json()
  }
})
.then(json => createChart(json))

function createChart(datos) {

  const ctx = document.getElementById('my_graph');
  const days = datos.map(row => row.day);
  const amount = datos.map(row => row.amount);
  const backgroundColor = [];
  const borderColor = [];
  const hoverBackgroundColor = [];
  const hoverBorderColor = [];

  const maxAmount = Math.max(...amount);
  const maxAmountIndex = amount.findIndex(v => v === maxAmount);

  for (let i = 0; i < amount.length; i++) {

    if (i === maxAmountIndex) {
      backgroundColor.push('#76b5bc');
      borderColor.push('#76b5bc');
      hoverBackgroundColor.push('#76b5bc86');
      hoverBorderColor.push('#76b5bc86');
    } else {
      backgroundColor.push('#ec775f');
      borderColor.push('#ec775f');
      hoverBackgroundColor.push('#ec775f86');
      hoverBorderColor.push('#ec775f86');
    }
  }

  const data = {
    labels: days,
    datasets: [{
      label: '$',
      data: amount,
      borderWidth: 1,
      borderColor: borderColor,
      backgroundColor: backgroundColor,
      borderRadius: 5,
      hoverBackgroundColor: hoverBackgroundColor,
      hoverBorderColor: hoverBorderColor,
      borderSkipped: false,
    }]
  };

  const confg = {
    type: 'bar',
    data,
    options: {
      onHover: (event, chartElement) => {
        event.native.target.style.cursor = chartElement[0] ? 'pointer' : 'default';
      },
      scales: {
        y: {
          display: false,
          grid: {
            display: false
          }
        },
        x: {
          ticks: {
            color: '#93867b'
          },
          grid: {
            display: false
          },
          border: {
            color: 'transparent'
          }
        }
      },
      plugins: {
        legend: {
          display: false
        }
      }
    }
  } 
  
  new Chart(ctx, confg);
}