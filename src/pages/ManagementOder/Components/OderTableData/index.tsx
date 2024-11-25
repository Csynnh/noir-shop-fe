import { CaretSortIcon, DotsHorizontalIcon } from '@radix-ui/react-icons';
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import * as React from 'react';

import { Button as ButtonCpn } from '@components/ui/button';
import Button from '@components/Button';
import { Checkbox } from '@components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@components/ui/dropdown-menu';
import { Input } from '@components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@components/ui/table';
import { CustomerInfoProps, OderType, Order, StatusColorMap } from '@constant/Oder';
import { snakeToCapitalCase } from '@lib/utils';
import OderItem from '@components/OderItem';

const OderColumns: ColumnDef<Order>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'id',
    header: 'Oder Code',
    cell: ({ row }) => <div className='capitalize'>{row.getValue('id')}</div>,
  },
  {
    accessorKey: 'customer',
    header: ({ column }) => {
      return (
        <ButtonCpn
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Customer
          <CaretSortIcon className='ml-2 h-4 w-4' />
        </ButtonCpn>
      );
    },
    cell: ({ row }) => (
      <div className='font-[gilroy-light]'>
        {(row.getValue('customer') as CustomerInfoProps).name}
      </div>
    ),
  },
  {
    accessorKey: 'date',
    header: ({ column }) => {
      return (
        <ButtonCpn
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Date
          <CaretSortIcon className='ml-2 h-4 w-4' />
        </ButtonCpn>
      );
    },
    cell: ({ row }) => {
      const date = new Date(row.getValue('date'));
      const formattedDate = new Intl.DateTimeFormat('en-US', {
        weekday: 'long',
        month: 'long',
        day: '2-digit',
      }).format(date);
      return <div className='font-[gilroy-light-italic]'>{formattedDate}</div>;
    },
  },
  {
    accessorKey: 'total',
    header: ({ column }) => (
      <ButtonCpn
        variant='ghost'
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Total
        <CaretSortIcon className='ml-2 h-4 w-4' />
      </ButtonCpn>
    ),
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('total'));

      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(amount);

      return <div className='text-left ml-4 font-[gilroy-light]'>{formatted}</div>;
    },
  },
  {
    accessorKey: 'status',
    header: ({ column }) => {
      return (
        <ButtonCpn
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Status
          <CaretSortIcon className='ml-2 h-4 w-4' />
        </ButtonCpn>
      );
    },
    cell: ({ row }) => (
      <div
        className='py-1 text-center rounded-full w-[120px]'
        style={{
          backgroundColor: StatusColorMap[row.getValue('status') as OderType],
          color: row.getValue('status') === OderType.SHIPPING ? '#F2CFF0' : '#000',
        }}
      >
        {snakeToCapitalCase(row.getValue('status'))}
      </div>
    ),
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <ButtonCpn variant='ghost' className='h-8 w-8 p-0'>
              <span className='sr-only'>Open menu</span>
              <DotsHorizontalIcon className='h-4 w-4' />
            </ButtonCpn>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(payment.id)}>
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
export interface OderTableDataProps {
  data?: Order[] | null;
  oderType?: OderType | null;
}
export function OderTableData({ data, oderType }: OderTableDataProps) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [selectedOder, setSelectedOder] = React.useState<Order | null>(null);
  const defaultValue = oderType
    ? oderType === OderType.ALL
      ? data
      : data?.filter((item) => item.status === oderType)
    : null;
  const [oderValues, setOderValues] = React.useState<Order[] | null>(defaultValue as Order[]);

  const handleSubmitOder = () => {
    const selectedOder = rowSelection;
    console.log(Object.keys(selectedOder).length);
  };

  const handleShowOderDetails = (data: Order) => {
    setSelectedOder(data);
  };

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

  return (
    <div className='flex gap-10'>
      <div className='max-w-[70%] w-full'>
        <div className='flex items-center justify-between mb-5'>
          <div className='flex items-center gap-3 justify-between w-full'>
            <h4 className='text-xl font-[gilroy-semibold]'>List Order</h4>
          </div>
        </div>
        <div className='w-full'>
          <div className='flex items-center py-4'>
            <Input
              placeholder='Filter customers...'
              value={(table.getColumn('customer')?.getFilterValue() as string) ?? ''}
              onChange={(event) => table.getColumn('customer')?.setFilterValue(event.target.value)}
              className='max-w-sm'
            />
            <div className='max-w-[220px] w-full ml-auto'>
              <ButtonCpn
                onClick={handleSubmitOder}
                className='py-3'
                disabled={oderType === OderType.ALL || !Object.keys(rowSelection).length}
              >
                Submit selected Oder
              </ButtonCpn>
            </div>
          </div>
          <div className='rounded-md border'>
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(header.column.columnDef.header, header.getContext())}
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
                      onClick={() => handleShowOderDetails(row.original)}
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
                    <TableCell colSpan={OderColumns.length} className='h-24 text-center'>
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <div className='flex items-center justify-end space-x-2 py-4'>
            <div className='flex-1 text-sm text-muted-foreground'>
              {table.getFilteredSelectedRowModel().rows.length} of{' '}
              {table.getFilteredRowModel().rows.length} row(s) selected.
            </div>
            <div className='space-x-2'>
              <ButtonCpn
                variant='outline'
                size='sm'
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                Previous
              </ButtonCpn>
              <ButtonCpn
                variant='outline'
                size='sm'
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                Next
              </ButtonCpn>
            </div>
          </div>
        </div>
      </div>
      {selectedOder && (
        <>
          <div className='flex-1'>
            <div className='mb-4'>
              <h4 className='text-xl font-[gilroy-semibold]'>Oder details</h4>
            </div>
            <div className='border-[0.5px] border-[#837F83] p-5  w-full'>
              <div className='pb-6 border-b-[0.5px] border-b-[#837F83] mb-6'>
                <div className='flex items-center justify-between mb-5'>
                  <span className='font-[gilroy-semibold]'>Customer Information</span>
                  <span
                    className='py-2 px-4 rounded-full'
                    style={{
                      backgroundColor: StatusColorMap[selectedOder?.status as OderType],
                      color: selectedOder?.status === OderType.SHIPPING ? '#F2CFF0' : '#000',
                    }}
                  >
                    {snakeToCapitalCase(selectedOder?.status)}
                  </span>
                </div>
                <div className='mb-6'>
                  <p className='mb-2'>
                    Name:{' '}
                    <span className='font-[gilroy-light-italic]'>{selectedOder.customer.name}</span>
                  </p>
                  <p className='mb-2'>
                    Address:{' '}
                    <span className='font-[gilroy-light-italic]'>
                      {selectedOder.customer.address}
                    </span>
                  </p>
                  <p className='mb-2'>
                    Phone:{' '}
                    <span className='font-[gilroy-light-italic]'>
                      {selectedOder.customer.phone}
                    </span>
                  </p>
                </div>
                <div className='text-right'>
                  <span className='mb-2 inline-block'>Code oder: {selectedOder.id}</span>
                  <p className='mb-2 font-[gilroy-light] inline-block'>
                    Date of order:{' '}
                    <span className='font-[gilroy-light-italic]'>
                      {new Intl.DateTimeFormat('en-US', {
                        weekday: 'long',
                        month: 'long',
                        day: '2-digit',
                      }).format(new Date(selectedOder.date))}
                    </span>
                  </p>
                </div>
              </div>
              <div className='flex items-center justify-between mb-7'>
                <div className=''>Oder Detail</div>
                <p className='font-[gilroy-light-italic]'>
                  Total: <span className='font-[gilroy-bold]'>{selectedOder.details?.length}</span>{' '}
                  items
                </p>
              </div>
              <div className='h-[242px] mb-8'>
                <div className='checkout-oder-list-wrap w-full flex gap-6 flex-col pr-4 overflow-y-auto h-full'>
                  {selectedOder.details?.map((order, index) => <OderItem key={index} variant={order} />)}
                </div>
              </div>
              <div className='pt-3 border-t-[0.5px] border-t-[#837F83] flex items-center justify-between'>
                <span>Total:</span>
                <p>${selectedOder.total.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
