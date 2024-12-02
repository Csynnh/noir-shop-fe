import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@components/ui/chart';
import { API_BACKEND_ENDPOINT } from '@constant/Api';
import {
  CHARTCONFIG,
  ChartDataPoint,
  ChartType,
  COLLECTION,
  RevenueReportType,
  TableRevenueRow,
} from '@constant/Date';
import { useAuth, UserInfo } from '@contexts/AuthContext';
import { generateChartData, snakeToCapitalCase } from '@lib/utils';
import { CaretSortIcon } from '@radix-ui/react-icons';
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table';
import { Button as ButtonCpn } from '@ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@ui/tabs';
import axios from 'axios';
import { groupBy } from 'lodash';
import { useEffect, useState } from 'react';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import styles from './styles.module.scss';

const OderColumns: ColumnDef<TableRevenueRow>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => {
      return (
        <ButtonCpn
          className='w-full'
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          ID
          <CaretSortIcon className='ml-2 h-4 w-4' />
        </ButtonCpn>
      );
    },
    cell: ({ row }) => <div className='capitalize text--center pr-5'>{row.getValue('id')}</div>,
  },
  {
    accessorKey: 'itemName',
    header: ({ column }) => {
      return (
        <ButtonCpn
          variant='ghost'
          className='w-full'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Product Name
          <CaretSortIcon className='ml-2 h-4 w-4' />
        </ButtonCpn>
      );
    },
    cell: ({ row }) => (
      <div className='font-[gilroy-light] text-center pr-4'>{row.getValue('itemName')}</div>
    ),
  },
  {
    accessorKey: 'price',
    header: ({ column }) => {
      return (
        <ButtonCpn
          className='w-full'
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Price
          <CaretSortIcon className='ml-2 h-4 w-4' />
        </ButtonCpn>
      );
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('price'));
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(amount);

      return <div className='ml-4 font-[gilroy-light]  text-center pr-5'>{formatted}</div>;
    },
  },
  {
    accessorKey: 'unitsSold',
    header: ({ column }) => (
      <ButtonCpn
        className='w-full'
        variant='ghost'
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Units Sold
        <CaretSortIcon className='ml-2 h-4 w-4' />
      </ButtonCpn>
    ),
    cell: ({ row }) => (
      <div className=' text-center pr-9 ml-4 font-[gilroy-light]'>{row.getValue('unitsSold')}</div>
    ),
  },
  {
    accessorKey: 'amount',
    header: ({ column }) => {
      return (
        <ButtonCpn
          className='w-full'
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Amount
          <CaretSortIcon className='ml-2 h-4 w-4' />
        </ButtonCpn>
      );
    },
    cell: ({ row }) => (
      <div className='text-center pr-9 ml-4 font-[gilroy-light]'>
        {new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        }).format(row.getValue('amount'))}
      </div>
    ),
  },
  {
    accessorKey: 'taxRate',
    header: ({ column }) => {
      return (
        <ButtonCpn
          className='w-full'
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Tax Rate
          <CaretSortIcon className='ml-2 h-4 w-4' />
        </ButtonCpn>
      );
    },
    cell: ({ row }) => (
      <div className='text-center pr-9 ml-4 font-[gilroy-light]'>
        {new Intl.NumberFormat('en-US', {
          style: 'percent',
        }).format(row.getValue('taxRate'))}
      </div>
    ),
  },
  {
    accessorKey: 'tax',
    header: ({ column }) => {
      return (
        <ButtonCpn
          className='w-full'
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Tax
          <CaretSortIcon className='ml-2 h-4 w-4' />
        </ButtonCpn>
      );
    },
    cell: ({ row }) => (
      <div className='text-center pr-9 ml-4 font-[gilroy-light]'>
        {new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        }).format(row.getValue('tax'))}
      </div>
    ),
  },
  {
    accessorKey: 'total',
    header: ({ column }) => {
      return (
        <ButtonCpn
          className='w-full'
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Total
          <CaretSortIcon className='ml-2 h-4 w-4' />
        </ButtonCpn>
      );
    },
    cell: ({ row }) => (
      <div className='text-center pr-9 ml-4 font-[gilroy-light]'>
        {new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        }).format(row.getValue('total'))}
      </div>
    ),
  },
];

const AnalyzeRevenue = () => {
  const { user } = useAuth();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [oderValues, setOderValues] = useState<TableRevenueRow[] | null>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [revenueReport, setRevenueReport] = useState<RevenueReportType | null>(null);
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  const [chartType, setChartType] = useState(ChartType.DAILY);
  useEffect(() => {
    if (user) {
      fetchRevenueData(user);
    }
  }, [user]);

  useEffect(() => {
    if (oderValues?.length) {
      const bestBags = findBestSeller(oderValues, COLLECTION[0]);
      const bestJackets = findBestSeller(oderValues, COLLECTION[1]);
      const bestNewCollection = findBestSeller(oderValues, COLLECTION[2]);

      const salesAmountValue = oderValues.reduce((sum, item) => sum + item.amount!, 0);
      const salesAmount = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(salesAmountValue);

      const salesTaxValue = oderValues.reduce((sum, item) => sum + item.tax!, 0);
      const salesTax = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(salesTaxValue);

      const salesTotal = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(salesAmountValue - salesTaxValue);

      const report: RevenueReportType = {
        bestseller: [
          {
            name: bestBags.itemName!,
            type: 'Bags',
            unitsSold: bestBags.unitsSold!,
          },
          {
            name: bestJackets.itemName!,
            type: 'Jackets',
            unitsSold: bestJackets.unitsSold!,
          },
          {
            name: bestNewCollection.itemName!,
            type: 'New Collection',
            unitsSold: bestNewCollection.unitsSold!,
          },
        ],
        salesAmount,
        salesTax,
        salesTotal,
      };
      setRevenueReport(report);

      const chartDatas = generateChartData(oderValues, chartType);
      console.log('chartDatas', chartDatas);
      setChartData(chartDatas);
    }
  }, [oderValues, chartType]);

  const table = useReactTable({
    data: oderValues || [],
    columns: OderColumns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const fetchRevenueData = async (user: UserInfo, type?: ChartType) => {
    try {
      const response = await axios.post(
        `${API_BACKEND_ENDPOINT}/api/orders/retrieve-chart-data`,
        {
          chartType: type || ChartType.DAILY,
        },
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        },
      );
      if (response.status === 200) {
        const data = response.data.responseData;
        const oderValues: TableRevenueRow[] = data.map((item: any) => {
          const createdAt = new Date(item.created_at);
          createdAt.setHours(createdAt.getHours() + 7);
          return {
            id: item.id?.slice(0, 8),
            itemName: item.item_name,
            price: item.price,
            unitsSold: item.units_sold,
            amount: item.price * item.units_sold,
            taxRate: item.tax_rate / 100,
            tax: (item.tax_rate * item.price * item.units_sold) / 100,
            total:
              item.price * item.units_sold - (item.tax_rate * item.price * item.units_sold) / 100,
            createdAt: createdAt.toISOString(),
            type: item.type,
          };
        });
        console.log('oderValues', oderValues);
        setOderValues(oderValues);
      }
    } catch (error) {
      console.error('Error fetching revenue data:', error);
    }
  };

  const handleChangTab = async (value: string) => {
    if (!user) return;
    await fetchRevenueData(user, value as ChartType);
    setChartType(value as ChartType);
  };

  const findBestSeller = (oderValues: TableRevenueRow[], type: string) => {
    const groupedByType = groupBy(oderValues, 'type');

    const TypeItems = groupedByType[type] || [];
    const NameItems = groupBy(TypeItems, 'itemName');
    const bestName = Object.keys(NameItems).reduce(
      (acc, key) => {
        const items = NameItems[key];
        const totalUnits = items.reduce((sum, item) => sum + item.unitsSold, 0);
        if (totalUnits > acc.unitsSold) {
          acc.unitsSold = totalUnits;
          acc.itemName = key;
        }
        return acc;
      },
      { unitsSold: 0, itemName: '--' },
    );
    return bestName;
  };

  return (
    <div className={styles.Analyze}>
      <div className='Analyze-heading'>
        <h1 className='text-[40px] font-[gilroy-semibold] capitalize mb-6'>Management Product</h1>
      </div>
      <Tabs defaultValue={ChartType.DAILY} className='w-full' onValueChange={handleChangTab}>
        <TabsList>
          {Object.values(ChartType).map((type) => (
            <TabsTrigger key={type} value={type}>
              {snakeToCapitalCase(type)}
            </TabsTrigger>
          ))}
        </TabsList>
        {Object.values(ChartType).map((type) => {
          return (
            <TabsContent value={type}>
              <div className='Analyze-chart'>
                <>
                  <CardHeader className='my-5'>
                    <CardTitle className='text-3xl font-[gilroy-bold] font-[400] leading-[2] tracking-normal'>
                      Revenue Chart
                    </CardTitle>
                  </CardHeader>
                  <CardContent className='mb-10'>
                    <ChartContainer config={CHARTCONFIG} className='max-h-[500px] w-full'>
                      <AreaChart
                        accessibilityLayer
                        data={chartData}
                        margin={{
                          left: 12,
                          right: 12,
                          top: 12,
                          bottom: 12,
                        }}
                      >
                        <CartesianGrid vertical={false} />
                        <XAxis dataKey={'unit'} tickLine={false} axisLine={false} tickMargin={8} />
                        <YAxis />
                        <ChartTooltip
                          cursor={false}
                          content={<ChartTooltipContent indicator='line' />}
                        />
                        <Area
                          dataKey='total'
                          type='natural'
                          fill='#f2cff0'
                          fillOpacity={0.4}
                          stroke='hsl(303, 34%, 50%)'
                        />
                      </AreaChart>
                    </ChartContainer>
                  </CardContent>
                  <CardFooter>
                    <div className='flex-1 '>
                      <div className='w-full mb-10'>
                        <CardTitle className='text-xl font-[gilroy-bold] mb-4'>
                          Daily Sale Revenue Report
                        </CardTitle>
                        <div className='w-full flex justify-between'>
                          <CardDescription>Date: Sunday, October 12th</CardDescription>
                          <div className='w-[50%] flex items-center gap-5'>
                            <div className='flex flex-col gap-5 px-[18px] py-[22px] border-[0.5px] border-[var(--line-color)] rounded-xl flex-[0_0_60%] h-full justify-between'>
                              <div className='flex justify-between items-center'>
                                <span className='font-[gilroy-bold] text-[var(--main-color)] w-[150px]'>
                                  Bestseller Bag
                                </span>
                                <span>{revenueReport?.bestseller[0].name}</span>
                                <span>{revenueReport?.bestseller[0].unitsSold}</span>
                              </div>
                              <div className='flex justify-between items-center'>
                                <span className='font-[gilroy-bold] text-[var(--main-color)] w-[150px]'>
                                  Bestseller Jacket
                                </span>
                                <span>{revenueReport?.bestseller[1].name}</span>
                                <span>{revenueReport?.bestseller[1].unitsSold}</span>
                              </div>
                              <div className='flex justify-between items-center'>
                                <span className='font-[gilroy-bold] text-[var(--main-color)] w-[150px]'>
                                  Best New Collection
                                </span>
                                <span>{revenueReport?.bestseller[2].name}</span>
                                <span>{revenueReport?.bestseller[2].unitsSold}</span>
                              </div>
                            </div>
                            <div className='flex flex-col gap-4 px-[18px] py-[22px] border-[0.5px] border-[var(--line-color)] flex-[0_0_calc(40%-20px)] rounded-xl h-full  justify-between'>
                              <div className='flex justify-between items-center'>
                                <span className='font-[gilroy-bold] text-[var(--main-color)]'>
                                  Sales amount:
                                </span>
                                <span>{revenueReport?.salesAmount}</span>
                              </div>
                              <div className='flex justify-between items-center'>
                                <span className='font-[gilroy-bold] text-[var(--main-color)]'>
                                  Sales Tax:
                                </span>
                                <span>{revenueReport?.salesTax}</span>
                              </div>
                              <div className='w-[95%] h-[0.5px] bg-[var(--line-color)] mx-auto'></div>
                              <div className='flex justify-between items-center'>
                                <span className='font-[gilroy-bold] text-[var(--main-color)]'>
                                  Sales total:
                                </span>
                                <span>{revenueReport?.salesTotal}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className=''>
                        <Table>
                          <TableHeader>
                            {table.getHeaderGroups().map((headerGroup) => (
                              <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                  return (
                                    <TableHead key={header.id}>
                                      {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                            header.column.columnDef.header,
                                            header.getContext(),
                                          )}
                                    </TableHead>
                                  );
                                })}
                              </TableRow>
                            ))}
                          </TableHeader>
                          <TableBody>
                            {table.getRowModel().rows?.length ? (
                              table.getRowModel().rows.map((row) => (
                                <TableRow
                                  className='cursor-pointer'
                                  key={row.id}
                                  data-state={row.getIsSelected() && 'selected'}
                                >
                                  {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id}>
                                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                  ))}
                                </TableRow>
                              ))
                            ) : (
                              <TableRow>
                                <TableCell
                                  colSpan={OderColumns.length}
                                  className='h-24 text-center'
                                >
                                  No results.
                                </TableCell>
                              </TableRow>
                            )}
                          </TableBody>
                        </Table>
                      </div>
                      <div className='flex items-center justify-end space-x-2 py-4'>
                        <div className='flex-1 text-sm text-muted-foreground'>
                          Page {currentPage} of {table.getPageCount()}
                        </div>
                        <div className='space-x-2'>
                          <ButtonCpn
                            variant='outline'
                            size='sm'
                            onClick={() => {
                              if (currentPage > 1) {
                                setCurrentPage(currentPage - 1);
                                table.previousPage();
                              }
                            }}
                            disabled={!table.getCanPreviousPage()}
                          >
                            Previous
                          </ButtonCpn>
                          <ButtonCpn
                            variant='outline'
                            size='sm'
                            onClick={() => {
                              table.nextPage();
                              setCurrentPage(currentPage + 1);
                            }}
                            disabled={!table.getCanNextPage()}
                          >
                            Next
                          </ButtonCpn>
                        </div>
                      </div>
                    </div>
                  </CardFooter>
                </>
              </div>
            </TabsContent>
          );
        })}
      </Tabs>
      <div className='Analyze-report'>
        <div className='Analyze-report-top'></div>
        <div className='Analyze-report-middle'></div>
        <div className='Analyze-report-table'></div>
      </div>
    </div>
  );
};

export default AnalyzeRevenue;
