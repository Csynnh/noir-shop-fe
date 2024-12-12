import { useState, useEffect } from 'react';
import axios from 'axios';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@ui/tabs';
import { OderTableData } from './Components/OderTableData';
import { snakeToCapitalCase } from '@lib/utils';
import { API_BACKEND_ENDPOINT } from '@constant/Api';
import { useAuth, UserInfo } from '@contexts/AuthContext';
import { useLocation } from 'react-router-dom';
import { Skeleton } from '@ui/skeleton';

export enum OderType {
  ALL = 'ALL',
  NEED_CONFIRM = 'CONFIRMING',
  PREPAIRING = 'PREPARING',
  SHIPPING = 'SHIPPING',
  SUCCESSFULLY = 'SUCCESSFULLY',
}

export const StatusColorMap: Record<OderType, string> = {
  [OderType.NEED_CONFIRM]: '#DEFFA1',
  [OderType.PREPAIRING]: '#F2CFF0',
  [OderType.SHIPPING]: '#1B352A',
  [OderType.SUCCESSFULLY]: '#A2EECD',
  [OderType.ALL]: '#ffffff',
};

interface OrderItemProps {
  id: string;
  name: string;
  color: string;
  quantity: number;
  price: number;
  image: string;
}

export interface CustomerInfoProps {
  name: string;
  address: string;
  phone: string;
}

export type Order = {
  id: string;
  customer: CustomerInfoProps;
  date: string;
  total: number;
  status: Exclude<OderType, OderType.ALL>;
  details?: OrderItemProps[];
};

const ManagementOder = () => {
  const { user } = useAuth();
  const [oderType, setOderType] = useState<OderType>(OderType.ALL);
  const [oderStatus, setOderStatus] = useState<{ status: OderType; count: number }[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch order status
  const fetchOrderStatus = async (user: UserInfo) => {
    try {
      const response = await axios.get(
        `${API_BACKEND_ENDPOINT}/api/orders/total-grouped-by-status`,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        },
      );

      if (response.status === 200) {
        // Mặc định tất cả status với count = 0
        const defaultStatus: Record<OderType, number> = Object.values(OderType).reduce(
          (acc, type) => {
            acc[type] = 0;
            return acc;
          },
          {} as Record<OderType, number>, // Cung cấp kiểu rõ ràng
        );

        // Ghi đè giá trị count từ API lên defaultStatus
        response.data.forEach((item: { status: string; total: number }) => {
          defaultStatus[item.status as OderType] = item.total;
        });

        // Chuyển đổi defaultStatus thành mảng để sử dụng trong component
        const mappedStatus = Object.entries(defaultStatus).map(([status, count]) => ({
          status: status as OderType,
          count,
        }));

        setOderStatus(mappedStatus);
      }
    } catch (error) {
      console.error('Failed to fetch order status:', error);
    }
  };

  // Fetch orders by status
  const fetchOrdersByStatus = async (user: UserInfo, status: OderType) => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BACKEND_ENDPOINT}/api/orders/status/${status}`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });
      if (response.status === 200) {
        const mappedOrders: Order[] = response.data.responseData.map((item: any) => ({
          id: item.id,
          customer: {
            name: item.user_info.name,
            address: item.user_info.address,
            phone: item.user_info.phone,
          },
          date: item.created_at,
          total: item.total,
          status: item.status,
          details: item.list_products.map((product: any) => ({
            id: product.id,
            name: product.name,
            color: product.variants[0].Color,
            quantity: product.variants[0].Quantity,
            price: product.price,
            image: product.variants[0].Images,
          })),
        }));
        setOrders(mappedOrders);
      }
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchOrderStatus(user);
      fetchOrdersByStatus(user, OderType.ALL);
    }
  }, [user]);

  const handleTabChange = (value: string) => {
    if (user) {
      setOderType(value as OderType);
      fetchOrdersByStatus(user, value as OderType);
    }
  };

  const handleRetch = async () => {
    if (user) {
      await fetchOrderStatus(user);
      await fetchOrdersByStatus(user, oderType);
    }
  }

  return (
    <div className='w-full pl-[64px] pr-[64px]'>
      <h1 className='text-[40px] font-[gilroy-semibold] capitalize mb-6'>Management Oder</h1>
      {loading && !oderStatus.length ? (
        <div className='grid grid-cols-5 '>
          <Skeleton className='h-[162px] w-[360px] rounded-xl' />
          <Skeleton className='h-[162px] w-[360px] rounded-xl' />
          <Skeleton className='h-[162px] w-[360px] rounded-xl' />
          <Skeleton className='h-[162px] w-[360px] rounded-xl' />
          <Skeleton className='h-[162px] w-[360px] rounded-xl' />
        </div>
      ) : (
        <div>
          <Tabs defaultValue={oderType} className='w-full' onValueChange={handleTabChange}>
            <TabsList className='w-full grid grid-cols-5 h-auto'>
              {oderStatus.map((status) => (
                <TabsTrigger
                  key={status.status}
                  value={status.status}
                  className='data-[state=active]:bg-inherit border-[0.5px] data-[state=active]:border-[1.5px] border-[#837F83] rounded-[5px] min-h-[162px] data-[state=active]:text-black'
                >
                  <div className='flex flex-col p-4 w-full'>
                    <div className='flex mb-[26px]'>
                      <span
                        className='py-1 px-3 rounded-full bg-slate-200'
                        style={{
                          backgroundColor: StatusColorMap[status.status],
                          color: status.status === OderType.SHIPPING ? '#F2CFF0' : '#000',
                        }}
                      >
                        {snakeToCapitalCase(status.status)}
                      </span>
                    </div>
                    <div className='flex justify-end items-end gap-[4px]'>
                      <span className='text-[30px] leading-[36px] font-[gilroy-regular]'>
                        {status.count}
                      </span>
                      <span className='text-sm leading-[2]'> Orders</span>
                    </div>
                  </div>
                </TabsTrigger>
              ))}
            </TabsList>
            <div className='mt-12'></div>
            <TabsContent value={oderType} className='min-h-[600px] h-full'>
              <OderTableData data={orders} oderType={oderType} refetch={handleRetch}></OderTableData>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  );
};

export default ManagementOder;
