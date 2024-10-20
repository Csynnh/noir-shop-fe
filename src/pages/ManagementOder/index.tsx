import { ComboBoxValueProps } from '@components/ComboBox';
import Pagination from '@components/Pagination';
import { snakeToCapitalCase } from '@lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@ui/tabs';
import { useEffect, useState } from 'react';
import { OderTableData } from './Components/OderTableData';
import { orders } from '@mocks/Oder';

export enum OderType {
  ALL = 'ALL',
  NEED_CONFIRM = 'NEED_CONFIRM',
  PREPAIRING = 'PREPAIRING',
  SHIPPING = 'SHIPPING',
  SUCCESSFULLY = 'SUCCESSFULLY',
}
export interface Product {
  id: number;
  name: string;
  desc: string;
  price: number;
  size: string;
  color: string;
  image: string;
  inventory?: number;
}

export interface ProductResponse {
  data: Product[];
  pageNumber: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

export interface OderStatusResponse {
  id: number;
  status: OderType;
  count: number;
  color: string;
}

const mockDataOderStatus: OderStatusResponse[] = [
  {
    id: 1,
    status: OderType.NEED_CONFIRM,
    count: 10,
    color: '#DEFFA1',
  },
  {
    id: 2,
    status: OderType.PREPAIRING,
    count: 20,
    color: '#F2CFF0',
  },
  {
    id: 3,
    status: OderType.SHIPPING,
    count: 30,
    color: '#1B352A',
  },
  {
    id: 4,
    status: OderType.SUCCESSFULLY,
    count: 40,
    color: '#A2EECD',
  },
  {
    id: 5,
    status: OderType.ALL,
    count: 100,
    color: '#ffffff',
  },
];

const mockDataSize: ComboBoxValueProps[] = [
  {
    label: 'S',
    value: 'S',
  },
  {
    label: 'M',
    value: 'M',
  },
  {
    label: 'L',
    value: 'L',
  },
  {
    label: 'XL',
    value: 'XL',
  },
  {
    label: 'XXL',
    value: 'XXL',
  },
  {
    label: 'XXXL',
    value: 'XXXL',
  },
];
const mockDataProduct: ProductResponse = {
  data: [
    {
      id: 1,
      name: 'Opulence 1',
      desc: 'This is a description for Opulence 1 product in the new collection. This is a description for Opulence 1 product in the new collection.',
      price: 120,
      size: 'M',
      color: '#000000',
      image: 'https://via.placeholder.com/160',
      inventory: 1000,
    },
    {
      id: 2,
      name: 'Opulence 2',
      desc: 'This is a description for Opulence 1 product in the new collection. This is a description for Opulence 1 product in the new collection.',
      price: 150,
      size: 'L',
      color: '#000000',
      image: 'https://via.placeholder.com/160',
      inventory: 1000,
    },
    {
      id: 3,
      name: 'Opulence 3',
      desc: 'This is a description for Opulence 1 product in the new collection. This is a description for Opulence 1 product in the new collection.',
      price: 200,
      size: 'XL',
      color: '#000000',
      image: 'https://via.placeholder.com/160',
      inventory: 1000,
    },
    {
      id: 4,
      name: 'Opulence 4',
      desc: 'This is a description for Opulence 1 product in the new collection. This is a description for Opulence 1 product in the new collection.',
      price: 250,
      size: 'XXL',
      color: '#000000',
      image: 'https://via.placeholder.com/160',
      inventory: 1000,
    },
    {
      id: 5,
      name: 'Opulence 5',
      desc: 'This is a description for Opulence 1 product in the new collection. This is a description for Opulence 1 product in the new collection.',
      price: 300,
      size: 'XXXL',
      color: '#000000',
      image: 'https://via.placeholder.com/160',
      inventory: 1000,
    },
    {
      id: 6,
      name: 'Opulence 6',
      desc: 'This is a description for Opulence 1 product in the new collection. This is a description for Opulence 1 product in the new collection.',
      price: 350,
      size: 'S',
      color: '#000000',
      image: 'https://via.placeholder.com/160',
      inventory: 1000,
    },
  ],
  pageNumber: 17,
  pageSize: 6,
  totalItems: 100,
  totalPages: 20,
};

const ManagementOder = () => {
  const [price, setPrice] = useState([0]);
  const [size, setSize] = useState<ComboBoxValueProps | null>(null);
  const [prodValues, setProdValues] = useState<ProductResponse | null>(null);
  const [oderType, setOderType] = useState<OderType>(OderType.ALL);
  useEffect(() => {
    setProdValues(mockDataProduct);
    setSize(mockDataSize[0]);
  }, []);
  const handleChangePrice = (value: number[]) => {
    console.log('value', value);
    setPrice(value);
  };
  const handleFilter = () => {
    console.log('size', size);
    console.log('price', price);
  };
  const handleChangePage = (pageNumber: number) => {
    console.log('pageNumber', pageNumber);
  };
  const handleChangTab = (value: string) => {
    console.log('value', value);
    setOderType(value as OderType);
  };
  return (
    <div className='w-full p-12'>
      <h1 className='text-[40px] font-[gilroy-semibold] capitalize mb-6'>Management Oder</h1>
      <div className=''>
        <Tabs defaultValue={oderType} className='w-full' onValueChange={handleChangTab}>
          <TabsList className='w-full grid grid-cols-5 h-auto'>
            {mockDataOderStatus
              .sort((a, b) => a.status.localeCompare(b.status))
              .map((oder) => (
                <TabsTrigger
                  key={oder.id}
                  value={oder.status}
                  className='data-[state=active]:bg-inherit border-[0.5px] data-[state=active]:border-[1.5px] border-[#837F83] rounded-[5px] min-h-[162px] data-[state=active]:text-black'
                >
                  <div className='flex flex-col p-4 w-full'>
                    <div className='flex mb-[26px]'>
                      <span
                        className='py-1 px-3 rounded-full bg-slate-200'
                        style={{
                          backgroundColor: oder.color,
                          color: oder.status === OderType.SHIPPING ? '#F2CFF0' : '#000',
                        }}
                      >
                        {snakeToCapitalCase(oder.status)}
                      </span>
                    </div>
                    <div className='flex justify-end items-end'>
                      <span className='text-[30px] leading-[36px] font-[gilroy-regular]'>
                        {oder.count}
                      </span>
                      <span className='text-sm leading-[2]'> Oders</span>
                    </div>
                  </div>
                </TabsTrigger>
              ))}
          </TabsList>
          <div className=' mt-12'>
            <div className=''>
              <TabsContent value={oderType}>
                <OderTableData data={orders} oderType={oderType}></OderTableData>
              </TabsContent>
            </div>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default ManagementOder;
