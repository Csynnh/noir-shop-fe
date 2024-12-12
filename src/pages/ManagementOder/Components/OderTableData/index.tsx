import { CaretSortIcon, DotsHorizontalIcon } from '@radix-ui/react-icons';
import axios from 'axios';
import { API_BACKEND_ENDPOINT } from '@constant/Api';
import { Modal } from 'antd';
import { useAuth, UserInfo } from '@contexts/AuthContext';
import ExcelJS from 'exceljs';

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
import { useLocation } from 'react-router-dom';

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
    cell: ({ row }) => (
      <div className='capitalize'>#{(row.getValue('id') as string)?.slice(0, 8)}</div>
    ),
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
];
export interface OderTableDataProps {
  data?: Order[] | null;
  oderType?: OderType | null;
  refetch?: () => void;
}
export function OderTableData({ data, oderType, refetch }: OderTableDataProps) {
  const { user } = useAuth();
  const location = useLocation();
  const oderId = location.state?.id;
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [selectedOder, setSelectedOder] = React.useState<Order | null>(null);
  const [isModelOpen, setIsModelOpen] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [oderValues, setOderValues] = React.useState<Order[] | null>(data as Order[]);

  React.useEffect(() => {
    if (data?.length) {
      let values = data;
      if (oderType !== OderType.ALL) {
        values = data?.filter((item) => item.status === oderType);
      }
      setOderValues(values);
      setSelectedOder(values[0]);
      setRowSelection({ 0: true });
    }
  }, [data, oderType]);

  React.useEffect(() => {
    if (user && oderId) {
      fetchOrderById(user, oderId);
    }
  }, [oderId]);

  const handleSubmitOder = async () => {
    // Get selected row data
    const selectedOrderIds = Object.keys(rowSelection).map(
      (index) => oderValues && oderValues[parseInt(index)].id,
    );

    setIsModelOpen(true);
  };

  const handlePrintOrder = async () => {
    // Get selected row data
    const selectedOrders = Object.keys(rowSelection)
      .map((index) => oderValues && oderValues[parseInt(index)])
      .filter(Boolean);

    if (!selectedOrders.length) {
      Modal.info({
        title: 'No orders selected',
        content: 'Please select at least one order to print.',
      });
      return;
    }

    try {
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Orders');

      // Add header
      worksheet.columns = [
        { header: 'Order Code', key: 'id', width: 20 },
        { header: 'Customer Name', key: 'customerName', width: 30 },
        { header: 'Address', key: 'address', width: 30 },
        { header: 'Phone', key: 'phone', width: 30 },
        { header: 'Date', key: 'date', width: 20 },
        { header: 'Total', key: 'total', width: 15 },
        { header: 'Order Detail', key: 'orderDetail', width: 20 },
      ];

      // Add rows
      selectedOrders.forEach((order) => {
        worksheet.addRow({
          id: order?.id,
          customerName: order?.customer?.name,
          address: order?.customer?.address,
          phone: order?.customer?.phone,
          date: new Intl.DateTimeFormat('en-US').format(new Date(order?.date || '1970-01-01')),
          total: order?.total,
          orderDetail: order?.details,
        });
      });

      // Export to Excel file
      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Orders.xlsx';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error exporting to Excel:', error);
      Modal.error({
        title: 'Error',
        content: 'An error occurred while exporting the orders.',
      });
    }
  };

  const handleCancel = () => {
    setIsModelOpen(false);
  };

  const handleOK = async () => {
    // Get selected row data
    const selectedOrderIds = Object.keys(rowSelection).map(
      (index) => oderValues && oderValues[parseInt(index)].id,
    );
    if (!selectedOrderIds.length) {
      Modal.info({
        title: 'No orders selected',
        content: 'Please select at least one order to update.',
      });
      setIsModelOpen(false);
      return;
    }

    try {
      selectedOrderIds.map(async (id) => {
        await axios.put(`${API_BACKEND_ENDPOINT}/api/orders/next-status/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
        });
      });
    } catch (error) {
      console.error('Error updating orders:', error);
      Modal.error({
        title: 'Error',
        content: 'An error occurred while updating orders.',
      });
    } finally {
      refetch && refetch();
      setIsModelOpen(false);
    }
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

  const fetchOrderById = async (user: UserInfo, id: string) => {
    try {
      const response = await axios.get(`${API_BACKEND_ENDPOINT}/api/orders/${id}`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });
      if (response.status === 200) {
        const data = response.data.responseData;
        const order: Order = {
          id: data.id,
          customer: {
            name: data.user_info.name,
            address: data.user_info.address,
            phone: data.user_info.phone,
          },
          date: data.created_at,
          total: data.total,
          status: data.status,
          details: data.list_products.map((product: any) => ({
            id: product.id,
            name: product.name,
            color: product.variants[0].Color,
            quantity: product.variants[0].Quantity,
            price: product.price,
            image: product.variants[0].Images.ImageThumbnail,
          })),
        };
        setSelectedOder(order);
        const oderIndex = oderValues?.findIndex((item) => item.id === order.id).toString();
        const rowSelection = { [oderIndex as string]: true };
        setRowSelection(rowSelection);
      }
    } catch (error) {
      console.error('Failed to fetch order by id:', error);
    }
  };

  return (
    <div className='flex gap-10'>
      <div className='max-w-[70%] w-full'>
        <div className='flex items-center justify-between mb-5'>
          <div className='flex items-center gap-3 justify-between w-full'>
            <h4 className='text-xl font-[gilroy-semibold]'>List Order</h4>
          </div>
        </div>
        <div className='w-full'>
          <div className='flex items-center pb-5'>
            <Input
              placeholder='Filter customers...'
              value={(table.getColumn('customer')?.getFilterValue() as string) ?? ''}
              onChange={(event) => table.getColumn('customer')?.setFilterValue(event.target.value)}
              className='max-w-sm'
            />
            <div className='max-w-[220px] w-full ml-auto flex gap-2'>
              <ButtonCpn
                onClick={handleSubmitOder}
                className='py-3'
                disabled={
                  oderType === OderType.ALL ||
                  !Object.keys(rowSelection).length ||
                  oderType === OderType.SUCCESSFULLY
                }
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
                  <span className='mb-2 inline-block'>
                    Code oder: #{selectedOder.id.slice(0, 8)}
                  </span>
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
                  {selectedOder.details?.map((order, index) => (
                    <OderItem key={index} variant={order} />
                  ))}
                </div>
              </div>
              <div className='pt-3 border-t-[0.5px] border-t-[#837F83] flex items-center justify-between'>
                <span>Total:</span>
                <p>${selectedOder.total.toFixed(2)}</p>
              </div>
            </div>
            <div className='mt-2'>
              {oderType === OderType.NEED_CONFIRM && (
                <ButtonCpn
                  onClick={handlePrintOrder}
                  className='py-3'
                  disabled={!Object.keys(rowSelection).length}
                >
                  Print List Order Now
                </ButtonCpn>
              )}
            </div>
          </div>

          <Modal
            open={isModelOpen}
            onOk={handleOK}
            onCancel={handleCancel}
            footer={[
              <Button key='back' onClick={handleCancel} disabled={loading}>
                Cancle
              </Button>,
              <Button key='submit' isPrimary loading={loading} onClick={handleOK}>
                OK
              </Button>,
            ]}
          >
            <div className=''>
              <h4 className='text-xl text-left mb-4'>Update status for orders?</h4>
              <p className='text-sm mb-5'>Are you sure you want to proceed?</p>
            </div>
          </Modal>
        </>
      )}
    </div>
  );
}
