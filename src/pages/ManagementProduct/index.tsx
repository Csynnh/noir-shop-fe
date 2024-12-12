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

export enum productType {
  NEW_COLLECTION = 'NEW_COLLECTION',
  BAG = 'BAGS',
  JACKET = 'JACKETS',
}

export interface Product {
  id: number;
  name: string;
  description: string;
  details: {};
  price: number;
  variants: {
    size: string;
    color: string;
    images: {
      imageThumbnail: string;
      additionalImages: string[];
    };
    inventory?: number;
  }[];
}

export interface ProductResponse {
  data: Product[];
  pageNumber: number;
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
  const [products, setProducts] = useState<any[]>([]); // All products
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]); // Filtered products
  const [refetch, setRefetch] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 6;
  const totalPages = Math.ceil(
    filteredProducts.reduce((sum, group) => sum + group.products.length, 0) / itemsPerPage,
  );
  const [operator, setOperator] = useState('CREATE');

  // Lấy danh sách sản phẩm từ API
  const getListProducts = async (type?: string) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${API_BACKEND_ENDPOINT}/api/products/collections/${type || 'NEW_COLLECTION'}`,
      );
      if (response.status === 200) {
        const responseData = response.data.responseData;
        console.info(responseData);
        const mappedProducts = responseData.items.map((item: any) => ({
          type: item.type,
          products: {
            id: item.id,
            name: item.name,
            description: item.description,
            price: item.price,
            variants: item.variants,
            details: item.details,
            type: item.type,
          },
        }));
        console.info(mappedProducts);
        setProducts(mappedProducts);
        setFilteredProducts(mappedProducts); // Initialize filtered products
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
    setPrice(value);
  };

  const handleFilter = () => {
    const filtered = products.map((group) => {
      const filteredProducts = group.products.filter((product: Product) => {
        // Kiểm tra từng variant của sản phẩm
        return product.variants.some((variant) => {
          const isSizeMatch = size ? variant.size === size.value : true; // Lọc theo size nếu người dùng chọn
          const isPriceMatch = price[0] ? product.price <= price[0] : true; // Lọc theo giá nếu người dùng nhập giá
          return isSizeMatch && isPriceMatch; // Phải thỏa mãn cả hai điều kiện
        });
      });

      return { ...group, products: filteredProducts };
    });

    // Lọc ra các nhóm không có sản phẩm sau khi lọc
    const validFiltered = filtered.filter((group) => group.products.length > 0);

    setFilteredProducts(validFiltered); // Cập nhật danh sách sản phẩm sau khi lọc
    setCurrentPage(1); // Reset về trang đầu tiên sau khi lọc
  };

  const handlePageChange = (direction: 'prev' | 'next') => {
    if (direction === 'prev' && currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    } else if (direction === 'next' && currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handleChangTab = async (value: string) => {
    await getListProducts(value);
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
                  <div className='flex items-center gap-3'>
                    <button
                      className='btn btn-secondary mr-2'
                      onClick={() => handlePageChange('prev')}
                      disabled={currentPage === 1}
                    >
                      Prev
                    </button>
                    <span>{`${currentPage} / ${totalPages}`}</span>
                    <button
                      className='btn btn-secondary ml-2'
                      onClick={() => handlePageChange('next')}
                      disabled={currentPage === totalPages}
                    >
                      Next
                    </button>
                  </div>
                </div>

                {/* danh sách sản phẩm */}
                <div>
                  {loading ? (
                    <div>Loading...</div>
                  ) : filteredProducts.length > 0 ? (
                    Object.values(productType).map((type) => (
                      <TabsContent key={type} value={type}>
                        <ProductList
                          data={{
                            products: filteredProducts.filter((item) => item.type === type) || [],
                            type: type,
                          }}
                          refetch={setRefetch}
                        />
                      </TabsContent>
                    ))
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
