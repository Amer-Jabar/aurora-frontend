
export const firstToUpper = (str) => {

    const firstLetter = str.charAt(0);
    const firstLetterToUpper = str.charAt(0).toUpperCase();
    const newString = str.replace(firstLetter, firstLetterToUpper);

    return newString;
}

const getHeight = () => {
    const containerHeight = document.querySelector('main').clientHeight;
    const firstSectionMargin = 16;
    const firstSectionHeight = document.querySelector('#analyticsSectionOne').clientHeight;
    const selfMargin = 16;
    const selfPadding = 32;
    const selfInnerPadding = 32;
    const analyticsForecastSelectorHeight = document.querySelector('#analyticsForecastSelector').clientHeight;
    const extra = 14;

    const prefHeight = (
        containerHeight - firstSectionMargin - firstSectionHeight - selfMargin - 
        selfPadding - selfInnerPadding - analyticsForecastSelectorHeight - extra
    )

    return prefHeight;
}


const createdForecastDashboard = async (data, propertyName) => {
    const ApexCharts = (await import('apexcharts')).default;

    const height = (
        innerWidth > 600 
        ? getHeight() 
        : Number(getHeight()) + 14
    );

    const options = {
    series: [{
        name: firstToUpper(propertyName),
        data
    }],
    chart: {
        type: 'area',
        stacked: false,
        height: height,
        width: '100%',
        zoom: {
            type: 'x',
            enabled: true,
            autoScaleYaxis: true
        },
        toolbar: {
            autoSelected: 'zoom'
        }
    },
    dataLabels: {
        enabled: false
    },
    markers: {
        size: 6,
        strokeWidth: 6,
        strokeColors: '#ffffff'
    },
    title: {
        text: firstToUpper(propertyName),
        align: 'center'
    },
    stroke: {
        width: 2
    },
    fill: {
        type: 'gradient',
        gradient: {
            shadeIntensity: 1,
            inverseColors: false,
            opacityFrom: 0.75,
            opacityTo: 0.5,
            stops: [0, 100]
        },
    },
    xaxis: {
        labels: {
            formatter: (val) => `Day ${val}`
        }
    },
    yaxis: {
        labels: {
            formatter: (val) => val,
        },
        title: {
            text: 'Activity/Day'
        },
    },
    tooltip: {
        shared: true,
        y: {
            formatter: (val) => val
        }
    }
    };

    const chart = new ApexCharts(document.querySelector("#analyticsForecastChart"), options);
    return chart;
}

export default createdForecastDashboard;