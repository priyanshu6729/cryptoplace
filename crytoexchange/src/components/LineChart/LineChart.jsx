import { useEffect, useState } from 'react';
import Chart from 'react-google-charts';

const LineChart = ({historicalData}) => {

  const [data, setData] = useState([['date', 'price']]);

  useEffect(() => {
    const dataCopy = [['date', 'price']];
    if(historicalData){
     historicalData.prices.map((item) => {
        dataCopy.push([`${new Date(item[0]).toLocaleDateString().slice(0,-5)}`, item[1]]);
      });
      setData(dataCopy);
    }
  },[historicalData])

  return (
    <Chart
      chartType="LineChart"
      data={data}
      height='100%'
      legendToggle
    />
  )
}

export default LineChart
