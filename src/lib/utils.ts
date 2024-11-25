import { ChartType, TableRevenueRow } from '@pages/Analyze';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const snakeToCapitalCase = (str: string) => {
  return str
    .toLowerCase()
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export type ChartDataPoint = {
  unit: string;
  total: number;
};

/**
 * Function to generate chart data from table data
 * Adds fixed points at 4-hour intervals starting from 00:00.
 * @param data TableRow[] - The mock data array
 * @returns ChartDataPoint[] - Chart data with time and total
 */
export const generateChartData = (
  data: TableRevenueRow[],
  chartUnit: ChartType,
): ChartDataPoint[] => {
  let chartData = data;
  if (chartUnit === ChartType.WEEKLY) {
    chartData = data?.map((item) => {
      const date = new Date(item.createdAt);
      return {
        ...item,
        createdAt: date.toLocaleDateString('en-US', { weekday: 'long' }),
      };
    });
  }
  const INTERVALHOURS = 2;
  const intervalPoints: { [key: string]: number } = {};
  if (chartUnit === ChartType.DAILY) {
    for (let hour = 0; hour < 24; hour += INTERVALHOURS) {
      const time = `${String(hour).padStart(2, '0')}:00`;
      intervalPoints[time] = 0;
    }
  } else if (chartUnit === ChartType.WEEKLY) {
    const DAYOFWEEK = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    for (let day = 0; day < 7; day++) {
      const dayKey = DAYOFWEEK[day];
      intervalPoints[dayKey] = 0;
    }
  } else {
    for (let date = 0; date < 24; date++) {
      intervalPoints[date] = 0;
    }
  }

  // Populate intervalPoints with totals from data
  chartData
    .filter((row) => row.createdAt)
    .forEach((row) => {
      if (chartUnit === ChartType.DAILY) {
        const date = new Date(row.createdAt as string);
        const time = `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
        intervalPoints[time] = (intervalPoints[time] || 0) + row.total;
      }
      if (chartUnit === ChartType.WEEKLY) {
        const date = new Date(row.createdAt as string);
        const day = date.getDay();
        const dayKey = [
          'Sunday',
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
        ][day];
        intervalPoints[dayKey] = (intervalPoints[dayKey] || 0) + row.total;
      }
    });

  // Calculate the average for each interval point
  const intervalKeys = Object.keys(intervalPoints);
  intervalKeys
    .sort((a, b) => a.localeCompare(b))
    .forEach((key, index) => {
      const time = key.toString().split(':');
      if (
        (parseInt(time[0]) % 2 === 0 && parseInt(time[1]) === 0) ||
        (parseInt(time[0]) == 23 && parseInt(time[1]) === 0)
      ) {
        const prevKey = intervalKeys[index - 1];
        const nextKey = intervalKeys[index + 1];
        if (prevKey && nextKey && intervalPoints[key] === 0) {
          intervalPoints[key] = (intervalPoints[prevKey] + intervalPoints[nextKey]) / 2;
        }
      }
    });

  // remove the point not in the interval
  Object.keys(intervalPoints).forEach((key) => {
    const time = key.toString().split(':');
    if (
      (parseInt(time[0]) % 2 !== 0 && parseInt(time[1]) !== 0) ||
      (parseInt(time[0]) !== 23 && parseInt(time[1]) !== 0)
    ) {
      delete intervalPoints[key];
    }
  });

  // Convert intervalPoints to sorted array
  return Object.entries(intervalPoints)
    .map(([unit, total]) => ({ unit, total }))
    .sort((a, b) => a.unit.localeCompare(b.unit));
};
