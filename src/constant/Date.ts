import { ChartConfig } from '@ui/chart';

export const DAYSINWEEK = 7;

export const DAYSOFWEEK = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

export enum ChartType {
  DAILY = 'DAILY',
  WEEKLY = 'WEEKLY',
  MONTHLY = 'MONTHLY',
}

export const CHARTCONFIG = {
  unit: {
    label: 'Total',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig;

export type TableRevenueRow = {
  id: string;
  itemCode: string;
  itemName: string;
  price: number;
  unitsSold: number;
  amount: number;
  taxRate: number;
  tax: number;
  total: number;
  createdAt: string;
  type?: string;
};

export const COLLECTION = ['BAGS', 'JACKETS', 'NEW_COLLECTION'] as const;

export type ChartDataPoint = {
  unit: string;
  total: number;
};

export type RevenueReportType = {
  bestseller: {
    name: string;
    type: string;
    unitsSold: number;
  }[];
  salesAmount: string;
  salesTax: string;
  salesTotal?: string;
};
