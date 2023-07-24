import { useState } from 'react';
import { Card, Select } from '../shared';
import { SelectOption } from '@/types';
import { useGetCryptoHistoryQuery } from '@/services/cryptoApi';
import millify from 'millify';
import Spinner from '@/components/partials/Spinner';
import { twMerge } from 'tailwind-merge';
import { FiArrowUpRight, FiArrowDownLeft } from 'react-icons/fi';
import { ThemeMode, useThemeMode } from '@/contexts/theme-mode-context';
import Chart from 'react-apexcharts';
import { themeColors } from '@tailwind.config';

type ChartPropsType = {
  name: string;
  id: string;
  price: number;
};

type SeriesType = { name: string; data: number[] };
type ChartDataType = { price: string; timestamp: number };

const timePeriodOptions: SelectOption<string>[] = [
  { label: '3 Hours', value: '3h' },
  { label: '24 Hours', value: '24h' },
  { label: '7 Days', value: '7d' },
  { label: '30 Days', value: '30d' },
  { label: '3 Months', value: '3m' },
  { label: '1 Year', value: '1y' },
  { label: '3 Years', value: '3y' },
  { label: '5 Years', value: '5y' },
];

const AreaChart = ({ id, name, price }: ChartPropsType) => {
  const { themeMode } = useThemeMode();
  const [timePeriod, setTimePeriod] = useState<SelectOption<string>>(timePeriodOptions[0]);
  const {
    data: cryptoHistory,
    isError,
    isFetching,
  } = useGetCryptoHistoryQuery({
    coinId: id ? id : '',
    timePeriod: timePeriod.value,
  });

  if (isFetching) return <Spinner />;

  if (isError) throw new Error('server Error please reload');

  const handleTimePeriod = (selected: SelectOption<string> | null) => {
    if (selected) {
      setTimePeriod(selected);
    }
  };

  let maxDataPoints;
  if (timePeriod.value === '3y' || timePeriod.value === '5y') {
    maxDataPoints = 50;
  }

  const chartData: number[] =
    cryptoHistory?.data?.history.map((item: ChartDataType) => parseFloat(millify(parseFloat(item.price)))) || [];

  const chartCategories: string[] =
    cryptoHistory?.data?.history.map((item: ChartDataType) => new Date(item.timestamp).toLocaleDateString()) || [];

  const reduceCategories = maxDataPoints ? chartCategories.slice(-maxDataPoints) : chartCategories;
  const reduceData = maxDataPoints ? chartData.slice(-maxDataPoints) : chartData;
  const series: SeriesType[] = [
    {
      name: 'Coin Price USD',
      data: reduceData,
    },
  ];
  // Series Toggle
  const toggleSeries = (seriesName: string) => {
    ApexCharts.exec(id, 'toggleSeries', seriesName);
  };

  return (
    <Card>
      <Card.Body className="space-y-4">
        <div className="flex items-center justify-start gap-4 md:justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-medium">
              {name} - $ {millify(price)}
            </h2>
            <div
              className={twMerge(
                'flex text-xs font-normal',
                cryptoHistory.data.change > 0 ? 'text-success-500' : 'text-danger-500'
              )}
            >
              {cryptoHistory.data.change > 0 ? <FiArrowUpRight size={14} /> : <FiArrowDownLeft size={14} />}
              <span>{cryptoHistory.data.change}%</span>
            </div>
          </div>
          {series.map((seriesItem, index) => (
            <button
              type="button"
              key={index}
              className="flex items-center gap-1.5"
              onClick={() => {
                toggleSeries(seriesItem.name);
              }}
            >
              <span
                className="h-3 w-3 rounded-full"
                style={{
                  backgroundColor: themeColors.primary[500],
                }}
              />
              <span className="text-sm text-dark-700 dark:text-dark-200">{seriesItem.name}</span>
            </button>
          ))}
          <Select
            placeholder="Select Time Period"
            className="w-56"
            options={timePeriodOptions}
            value={{ label: timePeriod.label, value: timePeriod.value }}
            onChange={handleTimePeriod}
          />
        </div>
        <Chart
          options={{
            chart: {
              id: id,
              toolbar: {
                show: false,
              },
              fontFamily: 'Poppins, sans-serif',
              foreColor: themeColors.dark[400],
              background: 'transparent',
              dropShadow: {
                enabled: false,
              },
            },
            dataLabels: {
              enabled: false,
            },
            tooltip: {
              enabled: true,
              theme: themeMode === ThemeMode.DARK ? 'dark' : 'light',
            },
            stroke: {
              width: 2,
              curve: 'smooth',
            },
            colors: [themeColors.primary[500]],
            xaxis: {
              categories: reduceCategories,
              axisBorder: {
                color: themeMode === ThemeMode.DARK ? themeColors.dark['600'] : themeColors.dark['300'],
              },
              axisTicks: {
                color: themeMode === ThemeMode.DARK ? themeColors.dark['600'] : themeColors.dark['300'],
              },
            },
            yaxis: {
              min: 0,
              max: Math.max(...reduceData) + 10,
              tickAmount: 10,
            },
            grid: {
              borderColor: themeMode === ThemeMode.DARK ? themeColors.dark['600'] : themeColors.dark['300'],
            },
            legend: {
              show: false,
            },
          }}
          series={series}
          type="area"
          height={'400px'}
        />
      </Card.Body>
    </Card>
  );
};

export default AreaChart;
