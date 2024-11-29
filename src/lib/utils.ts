import { DAYSOFWEEK, ChartType, TableRevenueRow, ChartDataPoint } from '@constant/Date';
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

/**
 * Function to generate chart data from table data
 * Adds fixed points at intervals based on the chart type.
 * @param data - The mock data array
 * @param chartUnit - The chart type (DAILY, WEEKLY, MONTHLY)
 * @returns ChartDataPoint[] - Chart data with time and total
 */
export const generateChartData = (
  data: TableRevenueRow[],
  chartUnit: ChartType,
): ChartDataPoint[] => {
  const INTERVAL_HOURS = 2;

  const initializeIntervalPoints = (): { [key: string]: number } => {
    const intervalPoints: { [key: string]: number } = {};

    if (chartUnit === ChartType.DAILY) {
      for (let hour = 0; hour < 24; hour += INTERVAL_HOURS) {
        intervalPoints[`${hour.toString().padStart(2, '0')}:00`] = 0;
      }
    } else if (chartUnit === ChartType.MONTHLY) {
      const daysInMonth = new Date(
        new Date().getFullYear(),
        new Date().getMonth() + 1,
        0,
      ).getDate();
      for (let day = 1; day <= daysInMonth; day++) {
        intervalPoints[`${day}${getDaySuffix(day)}`] = 0;
      }
    } else if (chartUnit === ChartType.WEEKLY) {
      for (const day of DAYSOFWEEK) {
        intervalPoints[day] = 0;
      }
    }

    return intervalPoints;
  };

  const getDaySuffix = (day: number): string => {
    if (day === 1 || day === 21 || day === 31) return 'st';
    if (day === 2 || day === 22) return 'nd';
    if (day === 3 || day === 23) return 'rd';
    return 'th';
  };

  const populateIntervalPoints = (points: { [key: string]: number }): void => {
    data
      .filter((row) => row.createdAt)
      .forEach((row) => {
        const date = new Date(row.createdAt as string);
        let time = '';

        if (chartUnit === ChartType.DAILY) {
          time = `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
        } else if (chartUnit === ChartType.MONTHLY) {
          const day = date.getDate();
          time = `${day}${getDaySuffix(day)}`;
        } else if (chartUnit === ChartType.WEEKLY) {
          time = DAYSOFWEEK[date.getDay()];
        }

        points[time] = (points[time] || 0) + row.total;
      });
  };

  const smoothIntervalPoints = (points: { [key: string]: number }, keys: string[]): void => {
    keys.forEach((key, index) => {
      if (chartUnit === ChartType.DAILY && isEvenHour(key)) {
        const prevKey = keys[index - 1];
        const nextKey = keys[index + 1];

        if (prevKey && nextKey && points[key] === 0) {
          points[key] = (points[prevKey] + points[nextKey]) / 2;
        }
      }
    });
  };

  const isEvenHour = (time: string): boolean => {
    const [hour, minutes] = time.split(':').map(Number);
    return hour % INTERVAL_HOURS === 0 && minutes === 0;
  };

  const filterIrrelevantPoints = (points: { [key: string]: number }): void => {
    Object.keys(points).forEach((key) => {
      if (chartUnit === ChartType.DAILY && !isEvenHour(key)) {
        delete points[key];
      }
    });
  };

  // Main processing
  const intervalPoints = initializeIntervalPoints();
  populateIntervalPoints(intervalPoints);

  const sortedKeys = Object.keys(intervalPoints).sort((a, b) => {
    if (chartUnit === ChartType.WEEKLY) {
      return DAYSOFWEEK.indexOf(a) - DAYSOFWEEK.indexOf(b);
    }
    return a.localeCompare(b);
  });

  smoothIntervalPoints(intervalPoints, sortedKeys);
  filterIrrelevantPoints(intervalPoints);

  const result = Object.entries(intervalPoints).map(([unit, total]) => ({
    unit,
    total,
  }));
  return result;
};
