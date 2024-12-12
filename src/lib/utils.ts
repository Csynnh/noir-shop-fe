import { API_BACKEND_ENDPOINT } from '@constant/Api';
import { ChartDataPoint, ChartType, DAYSOFWEEK, TableRevenueRow } from '@constant/Date';
import { UserInfo } from '@contexts/AuthContext';
import axios from 'axios';
import { clsx, type ClassValue } from 'clsx';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import qs from 'qs';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
dayjs.extend(timezone);
dayjs.extend(utc);

export const snakeToCapitalCase = (str: string) => {
  return str
    .toLowerCase()
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

const getDaySuffix = (day: number): string => {
  if (day === 1 || day === 21 || day === 31) return 'st';
  if (day === 2 || day === 22) return 'nd';
  if (day === 3 || day === 23) return 'rd';
  return 'th';
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
  if (data.length === 0) {
    if (chartUnit === ChartType.DAILY) {
      const intervalPoints: { [key: string]: number } = {};
      for (let hour = 0; hour < 24; hour += 2) {
        intervalPoints[`${hour.toString().padStart(2, '0')}:00`] = 0;
      }
      return Object.entries(intervalPoints).map(([unit, total]) => ({
        unit,
        total,
      }));
    } else if (chartUnit === ChartType.MONTHLY) {
      const intervalPoints: { [key: string]: number } = {};
      const daysInMonth = new Date(
        new Date().getFullYear(),
        new Date().getMonth() + 1,
        0,
      ).getDate();
      for (let day = 1; day <= daysInMonth; day++) {
        intervalPoints[`${day}${getDaySuffix(day)}`] = 0;
      }
      return Object.entries(intervalPoints).map(([unit, total]) => ({
        unit,
        total,
      }));
    } else if (chartUnit === ChartType.WEEKLY) {
      const intervalPoints: { [key: string]: number } = {};
      for (const day of DAYSOFWEEK) {
        intervalPoints[day] = 0;
      }
      return Object.entries(intervalPoints).map(([unit, total]) => ({
        unit,
        total,
      }));
    }
  }

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

/**
 * Function to get the time elapsed from a given date
 * @param Date - The date string
 * @returns string - The time elapsed
 */
export const getTimeElapsed = (Date: string): string => {
  const diff = dayjs.utc().diff(dayjs.utc(Date), 'minutes');
  if (diff < 60) {
    return `${diff} minutes ago`;
  }
  if (diff < 1440) {
    return `${Math.floor(diff / 60)} hours ago`;
  }
  if (diff < 10080) {
    return `${Math.floor(diff / 1440)} days ago`;
  }
  if (diff < 40320) {
    return `${Math.floor(diff / 10080)} weeks ago`;
  }
  if (diff < 525600) {
    return `${Math.floor(diff / 40320)} months ago`;
  }
  return `${Math.floor(diff / 525600)} years ago`;
};

/**
 * Creates a File object from a given URL with optimized fetching.
 *
 * @param url - The URL of the file to be fetched.
 * @param fileName - The name to be given to the created File object.
 * @param timeout - Time in milliseconds to abort the request if it takes too long.
 * @returns A promise that resolves to a File object if successful, or null if an error occurs.
 */
export const createFileFromUrl = async (
  url: string,
  fileName: string,
  timeout: number = 300000, // 5 minutes
): Promise<File | null> => {
  if (!url || !fileName) {
    console.error('Invalid parameters: URL and fileName are required.');
    return null;
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const timestampedUrl = `${url}?_=${new Date().getTime()}`;
    const response = await fetch(timestampedUrl, {
      cache: 'no-store',
      mode: 'cors',
      signal: controller.signal,
    });

    if (!response.ok) {
      console.error(`Failed to fetch file: ${response.status} ${response.statusText}`);
      throw new Error('Failed to fetch the file');
    }

    const blob = await response.blob();
    return new File([blob], fileName, { type: blob.type });
  } catch (error) {
    console.error('Error creating file from URL:', { url, fileName, error });
    return null;
  } finally {
    clearTimeout(timeoutId);
  }
};

/**
 * Utility function to process images in parallel.
 *
 * @param images - An array of image details where each contains the image source and its field name.
 * @returns A promise that resolves to an object with processed image files keyed by their field names.
 */
export const processImagesInParallel = async (
  images: { key: string; image: string | File }[],
): Promise<Record<string, File>> => {
  const processedImages = await Promise.all(
    images.map(async ({ key, image }) => ({
      key,
      file: typeof image === 'string' ? await createFileFromUrl(image, key) : (image as File),
    })),
  );

  const validImages = processedImages.filter(({ file }) => file !== null);

  return validImages.reduce(
    (acc, { key, file }) => ({ ...acc, [key]: file as File }),
    {} as Record<string, File>,
  );
};

/**
 * Converts an object into a FormData instance using qs.
 *
 * @param obj - The object to convert.
 * @returns A FormData instance with the flattened object data.
 */
export const objectToFormDataWithQs = (obj: Record<string, any>): FormData => {
  const formData = new FormData();

  // Use `qs.stringify` to flatten the object into key-value pairs
  const flatData = qs.stringify(obj, { encode: false });

  // Convert the flatData query string into individual entries
  const entries = new URLSearchParams(flatData);
  for (const [key, value] of entries) {
    console.log({ key, value });
    formData.append(key, value);
  }

  return formData;
};

export const uploadImageToAzure = async (image: File, user: UserInfo) => {
  try {
    const ENDPOINT = `${API_BACKEND_ENDPOINT}/api/products/upload-image`;
    const formData = new FormData();
    formData.append('Image', image);

    const response = await axios.post(ENDPOINT, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${user?.token}`,
      },
    });

    if (response.status === 200) {
      return response.data.responseData;
    }
    return null;
  } catch (error) {
    return null;
  }
};
