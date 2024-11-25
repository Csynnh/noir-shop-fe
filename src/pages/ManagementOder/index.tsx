import { useState, useEffect } from 'react';
import axios from 'axios';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@ui/tabs';
import { OderTableData } from './Components/OderTableData';
import { snakeToCapitalCase } from '@lib/utils';
import { API_BACKEND_ENDPOINT } from '@constant/Api';
import { useAuth } from '@contexts/AuthContext';

export enum OderType {
  ALL = 'ALL',
  NEED_CONFIRM = 'NEED_CONFIRM',
  PREPAIRING = 'PREPAIRING',
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
  const [oderType, setOderType] = useState<OderType>(OderType.ALL);
  const [oderStatus, setOderStatus] = useState<{ status: OderType; count: number }[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const {user} = useAuth()

  // Fetch order status
  const fetchOrderStatus = async () => {
    try {
      const response = await axios.get(`${API_BACKEND_ENDPOINT}/orders/total-grouped-by-status`,  {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      },);
      
      console.log('Order Status API Response:', response.data); // Log dữ liệu API
      if (response.status === 200) {
        const mappedStatus = response.data.map((item: { status: string; total: number }) => ({
          status: item.status as OderType,
          count: item.total,
        }));
        setOderStatus(mappedStatus);
      }
    } catch (error) {
      console.error('Failed to fetch order status:', error);
    }
  };

  // Fetch orders by status
  const fetchOrdersByStatus = async (status: OderType) => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BACKEND_ENDPOINT}/api/oder/status/${status}`,  {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      },);
      console.log('Orders API Response:', response.data); // Log dữ liệu API
      if (response.status === 200) {
        const mappedOrders = response.data.responseData.map((item: any) => ({
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
    fetchOrderStatus();
    fetchOrdersByStatus(OderType.ALL);
  }, []);

  const handleTabChange = (value: string) => {
    const status = value as OderType;
    setOderType(status);
    fetchOrdersByStatus(status);
  };

  return (
    <div className="w-full p-12">
      <h1 className="text-[40px] font-[gilroy-semibold] capitalize mb-6">Management Oder</h1>
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <div>
          <Tabs defaultValue={oderType} className="w-full" onValueChange={handleTabChange}>
            <TabsList className="w-full grid grid-cols-5 h-auto">
              {oderStatus.map((status) => (
                <TabsTrigger
                  key={status.status}
                  value={status.status}
                  className="data-[state=active]:bg-inherit border-[0.5px] data-[state=active]:border-[1.5px] border-[#837F83] rounded-[5px] min-h-[162px] data-[state=active]:text-black"
                >
                  <div className="flex flex-col p-4 w-full">
                    <div className="flex mb-[26px]">
                      <span
                        className="py-1 px-3 rounded-full bg-slate-200"
                        style={{
                          backgroundColor: StatusColorMap[status.status],
                          color: status.status === OderType.SHIPPING ? '#F2CFF0' : '#000',
                        }}
                      >
                        {snakeToCapitalCase(status.status)}
                      </span>
                    </div>
                    <div className="flex justify-end items-end">
                      <span className="text-[30px] leading-[36px] font-[gilroy-regular]">
                        {status.count}
                      </span>
                      <span className="text-sm leading-[2]"> Orders</span>
                    </div>
                  </div>
                </TabsTrigger>
              ))}
            </TabsList>
            <div className="mt-12">
              <TabsContent value={oderType}>
                <OderTableData data={orders} oderType={oderType}></OderTableData>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      )}
    </div>
  );
};

export default ManagementOder;
