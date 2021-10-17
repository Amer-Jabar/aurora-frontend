const createPieChart = async (values, labels) => {

    const ApexCharts = (await import('apexcharts')).default;

    let height = null;
    if ( innerWidth < 600 )
        height = 250;
    else
        height = 200;

    const options = {
        chart: {
            height: height,
            type: "radialBar",
        },
        series: values,
        plotOptions: {
            radialBar: {
                dataLabels: {
                    name: {
                        show: true,
                    },
                    total: {
                        show: true,
                        label: 'Properties',
                        color: '#ac4fce',
                        fontSize: innerWidth > 600 ? 12 : 14,
                        offsetY: 10,
                        formatter: () => {}
                    },
                    value: {
                        show: true,
                        offsetY: 5,
                        fontSize: innerWidth > 600 ? '12px' : '14px',
                        color: 'darkcyan',
                        formatter: value => `${value}$`
                    }
                },
                hollow: {
                    margin: 10,
                    size: '45%'
                }
            },
            fill: {
                type: "gradient",
                gradient: {
                    shade: "dark",
                    type: "vertical",
                    gradientToColors: ["#87D4F9"],
                    stops: [0, 100]
                }
            },
        },
        stroke: {
            lineCap: 'round'
        },
        labels: labels
      };
      
      const chart = new ApexCharts(document.querySelector("#analyticsPieChart"), options);
      return chart;
}

export default createPieChart;