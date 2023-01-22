import React from 'react';
import ReactApexChart from 'react-apexcharts';
// @mui
import { styled } from '@mui/material/styles';
import { Card, CardHeader } from '@mui/material';
// components
import useChart from '../../../components/chart/useChart';

// ----------------------------------------------------------------------

const CHART_HEIGHT = 392;

const LEGEND_HEIGHT = 72;

const StyledChartWrapper = styled('div')(({ theme }) => ({
  height: CHART_HEIGHT,
  marginTop: theme.spacing(2),
  '& .apexcharts-canvas svg': {
    height: CHART_HEIGHT,
  },
  '& .apexcharts-canvas svg,.apexcharts-canvas foreignObject': {
    overflow: 'visible',
  },
  '& .apexcharts-legend': {
    height: LEGEND_HEIGHT,
    alignContent: 'center',
    position: 'relative !important',
    borderTop: `solid 1px ${theme.palette.divider}`,
    top: `calc(${CHART_HEIGHT - LEGEND_HEIGHT}px) !important`,
  },
}));

// ----------------------------------------------------------------------

function AppCurrentSubject({
  title, subheader, chartData, chartColors, chartLabels,
}) {
  const chartOptions = useChart({
    stroke: { width: 2 },
    fill: { opacity: 0.48 },
    legend: { floating: true, horizontalAlign: 'center' },
    xaxis: {
      categories: chartLabels,
      labels: {
        style: {
          colors: chartColors,
        },
      },
    },
  });

  return (
    <Card>
      <CardHeader title={title} subheader={subheader} />

      <StyledChartWrapper dir="ltr">
        <ReactApexChart type="radar" series={chartData} options={chartOptions} height={340} />
      </StyledChartWrapper>
    </Card>
  );
}

export default AppCurrentSubject;
