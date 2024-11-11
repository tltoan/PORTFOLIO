// CPI Chart from 2000-2024

fetch("cpi-quarterly.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((data) => {
    console.log(data);

    const cpi = data.data.map((entry) => entry.cpi);
    const year = data.data.map((entry) => entry.year);
    const cpiChart = document.getElementById("cpiChart").getContext("2d");

    new Chart(cpiChart, {
      type: "line",
      data: {
        labels: year,
        datasets: [
          {
            label: "CPI",
            data: cpi,
            borderColor: "blue",
            backgroundColor: "rgba(0, 0, 255, 0.1)",
            borderWidth: 2,
            fill: true,
          },
        ],
      },
    });
  })
  .catch((error) => {
    console.error("There was a problem with the fetch operation:", error);
  });
// Federal minimum wage chart

fetch("federal-mw.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network was not okay bruhhhh");
    }
    return response.json();
  })
  .then((data) => {
    console.log(data);

    const dates = data.data.map((entry) => entry.date);
    const wage = data.data.map((entry) => entry.price);
    const mwChart = document.getElementById("mwChart").getContext("2d");

    new Chart(mwChart, {
      type: "line",
      data: {
        labels: dates,
        datasets: [
          {
            label: "Federal Minimum Wage",
            data: wage,
            borderColor: "green",
            backgroundColor: "rgba(0, 0, 255, 0.1)",
            borderWidth: 2,
            fill: false,
          },
        ],
      },
    });
  })
  .catch((error) => {
    console.error("There was a problem with the fetch operation:", error);
  });

// Egg prices chart

fetch("average-eggs.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("HOE ITS GONNA BLOW UP");
    }
    return response.json();
  })
  .then((data) => {
    console.log(data);

    const year = data.data.map((entry) => entry.year);
    const avgprice = data.data.map((entry) => entry.eggaverage);
    const eggChart = document.getElementById("eggChart").getContext("2d");

    new Chart(eggChart, {
      type: "line",
      data: {
        labels: year, // labels to the array of years
        datasets: [
          {
            label: "Average Egg Price",
            data: avgprice, // array of average prices
            borderColor: "yellow",
            backgroundColor: "rgba(0, 0, 255, 0.1)",
            borderWidth: 2,
            fill: false,
          },
        ],
      },
      options: {
        scales: {
          x: {
            title: {
              display: true,
              text: "Year",
            },
          },
          y: {
            title: {
              display: true,
              text: "Average Price",
            },
          },
        },
      },
    });
    console.log(year);
    console.log(avgprice);
  });

// State wages chart

fetch("states-wages.json")
  .then((response) => response.json())
  .then((minWageData) => {
    fetch("usa-states.json")
      .then((response) => response.json())
      .then((usMapData) => {
        const stateWages = document
          .getElementById("stateWages")
          .getContext("2d");

        const wages = {};
        minWageData.data.forEach((item) => {
          wages[item.state] = item.minimum_wage;
        });

        new Chart(stateWages, {
          type: "choropleth",
          data: {
            labels: usMapData.features.map(
              (feature) => feature.properties.NAME
            ),
            datasets: [
              {
                label: "Minimum Wage by State",
                data: usMapData.features.map((feature) => ({
                  feature: feature,
                  value: wages[feature.properties.NAME] || 7.25,
                })),
                borderColor: "black",
                borderWidth: 1,
              },
            ],
          },
          options: {
            scales: {
              xy: {
                projection: "albersUsa",
              },
            },
            plugins: {
              legend: {
                display: true,
                position: "bottom",
              },
              tooltip: {
                callbacks: {
                  label: (context) => {
                    const stateName = context.raw.feature.properties.NAME;
                    const wage = context.raw.value;
                    return `${stateName}: $${wage}`;
                  },
                },
              },
            },
          },
        });
      });
  });

// Buying power chart
fetch("buyingpower.json")
  .then((response) => response.json())
  .then((data) => {
    const years = data.data.map((entry) => entry.year);
    const minimumWages = data.data.map((entry) => entry.minimum_wage);
    const eggPrices = data.data.map((entry) => entry.egg_price);

    const eggsPerHour = minimumWages.map((wage, index) => {
      return wage / eggPrices[index];
    });

    const buyingPower = document.getElementById("buyingPower").getContext("2d");

    new Chart(buyingPower, {
      type: "line",
      data: {
        labels: years,
        datasets: [
          {
            label: "Dozens of Eggs per Hour Worked at Minimum Wage",
            data: eggsPerHour,
            borderColor: "blue",
            backgroundColor: "rgba(0, 0, 255, 0.2)",
            borderWidth: 2,
            fill: true,
          },
        ],
      },
      options: {
        scales: {
          x: {
            title: {
              display: true,
              text: "Year",
            },
          },
          y: {
            title: {
              display: true,
              text: "Dozens of Eggs",
            },
            beginAtZero: true,
          },
        },
        plugins: {
          legend: {
            display: true,
            position: "top",
          },
        },
      },
    });
  })
  .catch((error) => console.error("Error loading JSON data:", error));
