import Button from '@components/Button';
import { ComboBox, ComboBoxValueProps } from '@components/ComboBox';
import AddNew from '@components/Icons/AddNew';
import Filter from '@components/Icons/Filter';
import Pagination from '@components/Pagination';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@ui/accordion';
import { Slider } from '@ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@ui/tabs';
import { useEffect, useState } from 'react';
import ProductList from './Components/ProductList';
import { snakeToCapitalCase } from '@lib/utils';
import { Modal } from 'antd';
import CreateProductModel from './Components/CreateProductModal';

enum ProductType {
  NEW_COLLECTION = 'NEW_COLLECTION',
  BAG = 'BAG',
  JACKET = 'JACKET',
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

const ManagementProduct = () => {
  const [price, setPrice] = useState([0]);
  const [size, setSize] = useState<ComboBoxValueProps | null>(null);
  const [prodValues, setProdValues] = useState<ProductResponse | null>(null);
  const [isOpenCreateProdModel, setIsOpenCreateProdModel] = useState(false);
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
  };
  return (
    <>
      <div className='w-full p-12'>
        <h1 className='text-[40px] font-[gilroy-semibold] capitalize mb-6'>Management Product</h1>
        <div className=''>
          <Tabs
            defaultValue={ProductType.NEW_COLLECTION}
            className='w-full'
            onValueChange={handleChangTab}
          >
            <TabsList>
              {Object.values(ProductType).map((type) => (
                <TabsTrigger key={type} value={type}>
                  {snakeToCapitalCase(type)}
                </TabsTrigger>
              ))}
            </TabsList>
            <div className=' mt-12 grid grid-cols-[20%_1fr] gap-20'>
              <div className='w-full'>
                <div className='flex items-center gap-3 mb-5'>
                  <Filter></Filter>
                  Filter
                </div>
                <div className='flex flex-col gap-3'>
                  <Accordion type='single' collapsible>
                    <AccordionItem value='item-1'>
                      <AccordionTrigger>Size</AccordionTrigger>
                      <AccordionContent className='p-4'>
                        <ComboBox
                          data={mockDataSize}
                          value={size?.value || mockDataSize[0].value}
                          setValue={setSize}
                        ></ComboBox>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                  <Accordion type='single' collapsible>
                    <AccordionItem value='item-2'>
                      <AccordionTrigger>Price</AccordionTrigger>
                      <AccordionContent className='p-4 mb-2'>
                        <div className='flex items-center justify-between mb-2'>
                          <span>$0.00</span>
                          <span>$1000.00</span>
                        </div>
                        <Slider
                          defaultValue={price}
                          max={1000}
                          step={1}
                          onValueChange={handleChangePrice}
                        />
                        <p className='text-right font-[gilroy-light] mt-2 text-xs'>
                          ${price[0].toFixed(2)}
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                  <Button onClick={handleFilter} isPrimary>
                    Filter Now
                  </Button>
                </div>
              </div>
              <div className=''>
                <div className='flex items-center justify-between  mb-5'>
                  <div
                    className='flex items-center gap-3 cursor-pointer'
                    onClick={() => setIsOpenCreateProdModel(true)}
                  >
                    <span>
                      <AddNew></AddNew>
                    </span>
                    <span className='underline text-[15px]'>Add New Product</span>
                  </div>
                  <Pagination data={prodValues} onPageChange={handleChangePage}></Pagination>
                </div>

                <TabsContent value={ProductType.NEW_COLLECTION}>
                  <ProductList data={prodValues?.data}></ProductList>
                </TabsContent>
                <TabsContent value={ProductType.BAG}>
                  <ProductList data={prodValues?.data}></ProductList>
                </TabsContent>
                <TabsContent value={ProductType.JACKET}>
                  <ProductList data={prodValues?.data}></ProductList>
                </TabsContent>
              </div>
            </div>
          </Tabs>
        </div>
      </div>
      <CreateProductModel
        open={isOpenCreateProdModel}
        setIsOpen={setIsOpenCreateProdModel}
      ></CreateProductModel>
    </>
  );
};

export default ManagementProduct;
