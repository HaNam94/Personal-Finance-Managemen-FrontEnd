import Chart from "react-apexcharts";

function SemiChart({percent}) {
    const data = {

        series: [percent],
        options: {
            chart: {
                type: 'radialBar',
                offsetY: -20,
                sparkline: {
                    enabled: true
                }
            },
            plotOptions: {
                radialBar: {
                    startAngle: -90,
                    endAngle: 90,
                    track: {
                        background: "#f6f6f6",
                        strokeWidth: '90%',
                    },
                    dataLabels: {
                        name: {
                            show: false
                        },
                        value: {
                            offsetY: -2,
                            fontSize: '22px'
                        }
                    }
                }
            },
            grid: {
                padding: {
                    top: 0,
                    left: 0, // Reduced padding
                    right: 0, // Reduced padding
                    bottom: 0 // Optional: Adjust if needed
                }
            },
            stroke: {
                lineCap: 'round',
                width: 9,
            },
            fill: {
                colors: ["rgb(255, 167, 85)"]
            }
        },


    };
    return (
        <div>
            <div id="chart">
                <Chart options={data.options} series={data.series} type="radialBar" height={400}/>
            </div>
            <div id="html-dist"></div>
        </div>
    )
}

export default SemiChart;