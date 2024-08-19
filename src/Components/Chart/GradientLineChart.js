import Chart from "react-apexcharts";

function GradientLineChart({data, color}) {
  const series = [
    {
      data
    }
  ];

  const options = {
    chart: {
      type: 'area',
      height: 150,
      zoom: {
        enabled: false
      },
      sparkline: {
        enabled: true
      }
    },
    stroke: {
      curve: 'smooth'  // This creates the spline effect
    },
    yaxis: {
      show: false
    },
    legend: {
      show: false
    },
    tooltip: {
      enabled: false
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        type: 'vertical',
        shadeIntensity: 0.5,
        gradientToColors: ['#fff'],
        inverseColors: true,
        opacityFrom: 0.7,
        opacityTo: 0.3,
        stops: [0, 100]
      }
    },
    colors: ['#fff'],
    dataLabels: {
      enabled: false
    }
  };

  return (
    <div>
      <Chart options={options} series={series} type="area" height={100}/>
    </div>
  );
}
export default GradientLineChart;