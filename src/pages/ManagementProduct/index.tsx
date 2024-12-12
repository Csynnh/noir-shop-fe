import Button from '@components/Button';
import { ComboBox, ComboBoxValueProps } from '@components/ComboBox';
import AddNew from '@components/Icons/AddNew';
import Filter from '@components/Icons/Filter';
import { API_BACKEND_ENDPOINT } from '@constant/Api';
import { snakeToCapitalCase } from '@lib/utils';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@ui/accordion';
import { Slider } from '@ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@ui/tabs';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import CreateProductModel from './Components/CreateProductModal';
import ProductList from './Components/ProductList';
import { Toaster } from '@ui/sonner';
import Pagination, { PaginationProps } from '@components/Pagination';

export enum productType {
  NEW_COLLECTION = 'NEW_COLLECTION',
  BAGS = 'BAGS',
  JACKETS = 'JACKETS',
}

export interface Product {
  id: string;
  name: string;
  description: string;
  details: any;
  price: number;
  type: productType;
  variants: {
    id: string;
    size: string;
    color: string;
    images: {
      imageThumbnail: string;
      additionalImages: string[];
    };
    inventory: number;
  }[];
}

export interface ProductResponse {
  items: Product[];
  currentPage: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

const mockDataSize: ComboBoxValueProps[] = [
  { label: 'S', value: 'S' },
  { label: 'M', value: 'M' },
  { label: 'L', value: 'L' },
  { label: 'XL', value: 'XL' },
  { label: 'XXL', value: 'XXL' },
  { label: 'XXXL', value: 'XXXL' },
];

const ManagementProduct = () => {
  const [price, setPrice] = useState([0]);
  const [size, setSize] = useState<ComboBoxValueProps | null>(null);
  const [isOpenCreateProdModel, setIsOpenCreateProdModel] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [products, setProducts] = useState<ProductResponse | null>(null); // All products
  // const [filteredProducts, setFilteredProducts] = useState<any[]>([]); // Filtered products
  const [refetch, setRefetch] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentTab, setCurrentTab] = useState<productType>(productType.NEW_COLLECTION);
  const ITEMSPERPAGE = 6;
  const [operator, setOperator] = useState('CREATE');

  // Lấy danh sách sản phẩm từ API
  const getListProducts = async (
    type?: string,
    pageNumber?: number,
    pageSize: number = ITEMSPERPAGE,
    size?: string,
    minPrice?: number,
    maxPrice?: number,
  ) => {
    setLoading(true);
    try {
      let ENDPOINT = `${API_BACKEND_ENDPOINT}/api/products/collections/${type || 'NEW_COLLECTION'}?pageNumber=${pageNumber}&pageSize=${pageSize}`;
      if (size) {
        ENDPOINT += '&size=' + size;
      }
      if (minPrice !== undefined && maxPrice) {
        ENDPOINT += '&minPrice=' + minPrice + '&maxPrice=' + maxPrice;
      }
      const response = await axios.get(ENDPOINT);
      if (response.status === 200) {
        const responseData: ProductResponse = response.data.responseData;
        setProducts(responseData);
      }
    } catch (error: any) {
      console.error(error);
      toast.error('Error!', {
        description: error.response?.data?.messageToClient || 'An error occurred.',
      });
    }
    setLoading(false);
  };

  // Gọi API khi component mount
  useEffect(() => {
    getListProducts();
  }, [refetch]);

  const handleChangePrice = (value: number[]) => {
    console.log('value', value);
    setPrice(value);
  };

  const handleFilter = async () => {
    await getListProducts(currentTab, 1, ITEMSPERPAGE, size?.value, 0, price[0]);
  };

  const handlePageChange = async (pageNumber: number) => {
    await getListProducts(currentTab, pageNumber, ITEMSPERPAGE, size?.value, 0, price[0]);
    setCurrentPage(pageNumber);
  };

  const handleChangTab = async (value: string) => {
    setCurrentTab(value as productType);
    await getListProducts(value, 1, ITEMSPERPAGE);
  };

  return (
    <>
      <div className='w-full p-12'>
        <div className='flex flex-col gap-4 mb-6'>
          <h1 className='text-[40px] font-[gilroy-semibold] capitalize'>Management Product</h1>
        </div>

        <div>
          <Tabs
            defaultValue={productType.NEW_COLLECTION}
            className='w-full'
            onValueChange={handleChangTab}
          >
            <TabsList>
              {Object.values(productType).map((type) => (
                <TabsTrigger key={type} value={type}>
                  {snakeToCapitalCase(type)}
                </TabsTrigger>
              ))}
            </TabsList>

            <div className='mt-12 grid grid-cols-[20%_1fr] gap-20'>
              <div className='w-full'>
                <div className='flex items-center gap-3 mb-5'>
                  <Filter />
                  Filter
                </div>
                <div className='flex flex-col gap-3'>
                  <Accordion type='single' collapsible>
                    <AccordionItem value='item-1'>
                      <AccordionTrigger>Size</AccordionTrigger>
                      <AccordionContent className='p-4'>
                        <ComboBox
                          data={mockDataSize}
                          value={size?.value || ''}
                          setValue={setSize}
                        />
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                  <Accordion type='single' collapsible>
                    <AccordionItem value='item-2'>
                      <AccordionTrigger>Price</AccordionTrigger>
                      <AccordionContent className='p-4 mb-2'>
                        <div className='flex items-center justify-between mb-2'>
                          <span>$0.00</span>
                          <span>$10000.00</span>
                        </div>
                        <Slider
                          defaultValue={price}
                          max={10000}
                          step={1}
                          onValueChange={handleChangePrice}
                        />
                        <p className='text-right font-[gilroy-light] mt-2 text-xs'>
                          ${price[0].toFixed(2)}
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                  <Button onClick={handleFilter} isPrimary disabled={loading}>
                    Filter Now
                  </Button>
                </div>
              </div>

              <div className=''>
                <div className='flex w-full justify-between items-center mb-4'>
                  <div className='flex items-center gap-3 cursor-pointer'>
                    <span>
                      <AddNew />
                    </span>
                    <span
                      className='underline text-[15px]'
                      onClick={() => setIsOpenCreateProdModel(true)}
                    >
                      Add New Product
                    </span>
                  </div>
                  <Pagination
                    data={{
                      pageNumber: products?.currentPage,
                      totalPages: products?.totalPages,
                    }}
                    onPageChange={handlePageChange}
                  ></Pagination>
                </div>

                {/* danh sách sản phẩm */}
                <div>
                  {loading ? (
                    <div>Loading...</div>
                  ) : products?.items?.length && products?.items?.length > 0 ? (
                    Object.values(productType).map((type) => {
                      return (
                        <TabsContent key={type} value={type}>
                          <ProductList data={products.items} refetch={setRefetch} />
                        </TabsContent>
                      );
                    })
                  ) : (
                    <div>No products available</div>
                  )}
                </div>
              </div>
            </div>
          </Tabs>
        </div>
      </div>
      <CreateProductModel
        refetch={setRefetch}
        open={isOpenCreateProdModel}
        setIsOpen={setIsOpenCreateProdModel}
        oparator={operator}
        setOparator={setOperator}
      ></CreateProductModel>
      <Toaster position='top-right' richColors />
    </>
  );
};

export default ManagementProduct;
