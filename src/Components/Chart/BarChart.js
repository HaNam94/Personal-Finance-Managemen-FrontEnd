import Chart from "react-apexcharts";

function BarChart({data, xaxis}) {

    const dataChart = {

        series: data,
        options: {
            chart: {
                type: 'bar',
                height: 350
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: '55%',
                    endingShape: 'rounded'
                },
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                show: true,
                width: 2,
                colors: ['transparent']
            },
            xaxis: {
                categories: xaxis,
            },
            yaxis: {
                title: {
                    text: ''
                }
            },
            fill: {
                opacity: 1
            },
            tooltip: {
                y: {
                    formatter: function (val) {
                        return val
                    }
                }
            }
        },


    };

    console.log(dataChart)

    return (
        <div>
            <Chart options={dataChart.options} series={dataChart.series} type="bar" height={400}/>
        </div>
    );
}
export default BarChart;