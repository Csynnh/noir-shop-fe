import React, { useEffect, useState } from 'react';
import Button from '@components/Button';
import { ComboBox, ComboBoxValueProps } from '@components/ComboBox';
import AddNew from '@components/Icons/AddNew';
import Filter from '@components/Icons/Filter';
import Pagination from '@components/Pagination';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@ui/accordion';
import { Slider } from '@ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@ui/tabs';
import ProductList from './Components/ProductList';
import { snakeToCapitalCase } from '@lib/utils';
import { Modal } from 'antd';
import CreateProductModel from './Components/CreateProductModal';
import axios from 'axios';
import { API_BACKEND_ENDPOINT } from '@constant/Api';
import { ProductType, ProductVariantType } from '@pages/Home';
import { toast } from 'sonner';

enum productType {
  NEW_COLLECTION = 'NEW_COLLECTION',
  BAG = 'BAGS',
  JACKET = 'JACKETS',
}

export interface Product {
  id: number;
  name: string;
  desc: string;
  detail: string;
  price: number;
  inventory?: number;
  variants: {
    size: string;
    color: string;
    image: string;
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

  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 6;
  const totalPages = Math.ceil(
    filteredProducts.reduce((sum, group) => sum + group.products.length, 0) / itemsPerPage,
  );

  // Lấy danh sách sản phẩm từ API
  const getListProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BACKEND_ENDPOINT}/api/products/collections`);
      if (response.status === 200) {
        const responseData = response.data.responseData;

        const mappedProducts = responseData.map((item: any) => ({
          type: item.type,
          products: item.products.map((product: ProductType) => ({
            id: product.id,
            name: product.name,
            description: product.description,
            price: product.price,
            variants: product.variants.map((variant: ProductVariantType) => ({
              color: variant.color,
              size: variant.size,
              inventory: variant.inventory,
              image: variant.images.imageThumbnail,
            })),
            details: product.details,
          })),
        }));

        setProducts(mappedProducts);
        setFilteredProducts(mappedProducts); // Initialize filtered products
      }
    } catch (error: any) {
      toast.error('Error!', {
        description: error.response?.data?.messageToClient || 'An error occurred.',
      });
    }
    setLoading(false);
  };

  // Gọi API khi component mount
  useEffect(() => {
    getListProducts();
  }, []);

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

  const handleChangTab = (value: string) => {
    console.log('value', value);
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
                  <Button onClick={handleFilter} isPrimary>
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
                  {filteredProducts.length > 0 ? (
                    Object.values(productType).map((type) => (
                      <TabsContent key={type} value={type}>
                        <ProductList
                          data={
                            filteredProducts
                              .find((item) => item.type === type)
                              ?.products.slice(
                                (currentPage - 1) * itemsPerPage,
                                currentPage * itemsPerPage,
                              ) || []
                          }
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
        open={isOpenCreateProdModel}
        setIsOpen={setIsOpenCreateProdModel}
      ></CreateProductModel>
    </>
  );
};

export default ManagementProduct;
