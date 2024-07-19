import React, { useEffect, useState } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import moment from 'moment';

export default function Bar({ articles=[], comments=[] }) {
  const [chartData, setChartData] = useState({ data: [], pata: [] });

  useEffect(() => {
    const getLast7DaysData = (items) => {
      const startDate = moment().subtract(6, 'days');
      
      const data = [];
      for (let i = 0; i < 7; i++) {
        data.push({ date: startDate.clone().add(i, 'days').format('ddd'), count: 0 });
      }

      items.forEach((item) => {
        const itemDate = moment(item.updatedAt).format('ddd');
        const index = data.findIndex((d) => d.date === itemDate);
        if (index !== -1) {
          for (let i = index; i < 7; i++) {
            data[i].count += 1;
          }
        }
      });

      return data;
    };
    // console.log(comments)
    // console.log(articles)

    const data = getLast7DaysData(articles);
    const pata = getLast7DaysData(comments);

    setChartData({ data, pata });
  }, [articles, comments]);

  const uData = chartData.data.map((d) => d.count);
  const pData = chartData.pata.map((d) => d.count);
  const xLabels = chartData.data.map((d) => d.date);

  return (
    <LineChart
      width={500}
      height={300}
      series={[
        {
          data: uData,
          label: 'Articles',
          id: 'articlesId',
        //   color: 'pink',
        },
        {
          data: pData,
          label: 'Comments',
          id: 'commentsId',
        //   color: 'blue',
        },
      ]}
      xAxis={[
        {
          data: xLabels,
          scaleType: 'band',
          label: 'Last 7 days',
        },
      ]}
      sx={{
        '& .MuiBarChart-bar': {
          fill: 'white',
        },
        '& .MuiBarChart-xAxisLabel, & .MuiBarChart-yAxisLabel': {
          fill: 'white',
        },
        '& .MuiBarChart-label': {
          fill: 'white',
        },
        '& .MuiBarChart-axisPath': {
          stroke: 'white',
        },
      }}
    />
  );
}
