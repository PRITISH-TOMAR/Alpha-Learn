import * as React from 'react';
import Stack from '@mui/material/Stack';
import { PieChart } from '@mui/x-charts/PieChart';



export default function Chart({articles}) {
    const [data, setData] = React.useState([])

    React.useEffect(()=>{
        // console.log(articles)

        const categoryCounts = articles.reduce((acc, article) => {
            acc[article.category] = (acc[article.category] || 0) + 1;
            return acc;
          }, {});
          
          const data = Object.entries(categoryCounts).map(([label, value]) => ({
            label,
            value,
          }));

          setData(data)
    }, [articles])

  
  return (
    <>
    
      <PieChart

        series={[
            {
              data,
              
              innerRadius: 30,
              outerRadius: 100,
              paddingAngle: 5,
              cornerRadius: 5,
              startAngle: 360,
              endAngle: 0,
              cx: 150,
              cy: 150,
              highlightScope: { faded: 'global', highlighted: 'item' },
              faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
            },
            
          ]}
          
          height={ 300}
          width={500}
          />
          </>
    
  );
}
