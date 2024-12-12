import { ProductType } from '@pages/Home';
import { DotsVerticalIcon } from '@radix-ui/react-icons';
import { Button } from '@ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@ui/dropdown-menu';
import { Delete, Edit } from 'lucide-react';
import { useState } from 'react';
import CreateProductModel from '../CreateProductModal';
import DeleteProductModal from '../DeleteProductModel';
import { Product } from '@pages/ManagementProduct';
import { API_BACKEND_ENDPOINT } from '@constant/Api';
import { useAuth } from '@contexts/AuthContext';
import { toast } from 'sonner';
import axios from 'axios';
import Soldout from '@components/Icons/Soldout';
import styles from './ProdItem.module.scss';

const ProductList = ({ data, refetch }: { data: Product[]; refetch: any }) => {
  const { user } = useAuth();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isOpenCreateProdModel, setIsOpenCreateProdModel] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<ProductType | null>(null);
  const [oparator, setOparator] = useState('CREATE');

  if (!data || data.length === 0) {
    return <p>No products available.</p>;
  }

  const handleDeleteClick = (product: ProductType) => {
    setCurrentProduct(product);
    setIsDeleteModalOpen(true);
  };

  const handleUpdateClick = (product: ProductType) => {
    setCurrentProduct(product);
    setIsOpenCreateProdModel(true);
    setOparator('UPDATE');
  };

  const handleConfirmDelete = async () => {
    if (currentProduct && user) {
      console.log(`Sản phẩm đã xóa: ${currentProduct.id}`);
      const response = await axios.delete(
        `${API_BACKEND_ENDPOINT}/api/products/${currentProduct.id}`,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        },
      );
      if (response.data.responseData) {
        toast.success(`Delete product ${currentProduct.name} successfully!`);
        setCurrentProduct(null);
        refetch(true);
      } else {
        toast.error(`Delete product ${currentProduct.name} failed!`);
      }
    }
    setIsDeleteModalOpen(false);
  };
  return (
    <>
      <div className={styles.ProdItem}>
        <div className='ProdItem-container'>
          {data.map((product) => {
            return (
              <div
                key={product.id}
                className='border p-5 rounded cursor-pointer max-w-[360px] w-full ProdItem-card'
              >
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant='ghost'
                      className='h-8 w-8 p-0 float-end flex justify-end  translate-x-2'
                    >
                      <DotsVerticalIcon className='h-4 w-4' />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align='end' className='w-[200px]'>
                    <DropdownMenuItem
                      className='p-2 cursor-pointer flex items-center justify-between'
                      onClick={() => handleUpdateClick(product)}
                    >
                      <span>Edit product</span>
                      <span>
                        <Edit className='h-4 w-4'></Edit>
                      </span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className='p-2 cursor-pointer flex items-center justify-between'
                      onClick={() => handleDeleteClick(product)}
                    >
                      <span>Delete product</span>
                      <span>
                        <Delete className='h-4 w-4'></Delete>
                      </span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <img
                  src={product.variants[0].images.imageThumbnail}
                  alt={product.name}
                  className='w-full h-[300px] object-cover mb-4 rounded-[4px]'
                />
                <h2 className='font-semibold text-xl'>{product.name}</h2>
                <p className='text-sm text-gray-600 text-ellipsis overflow-hidden whitespace-nowrap'>
                  {product.description}
                </p>
                <p className='font-semibold text-lg mt-2'>${product.price}</p>
                <div className='flex gap-2 mt-2 flex-col'>
                  <div className='text-sm text-gray-500 flex gap-2'>
                    Size:
                    {Array.from(
                      new Set(
                        product.variants
                          ?.sort((a, b) => a.size.localeCompare(b.size))
                          .map((variant) => variant.size),
                      ),
                    ).map((size, idx) => (
                      <span key={idx}>{size}</span>
                    ))}
                  </div>
                  <div className='text-sm text-gray-500  flex gap-2'>
                    Color:
                    {product.variants
                      ?.sort((a, b) => a.color.localeCompare(b.color))
                      .map((variant, idx) => (
                        <div
                          className='w-[17px] h-[17px] rounded-[50%]'
                          key={idx}
                          style={{ backgroundColor: variant.color }}
                        ></div>
                      ))}
                  </div>
                </div>
                <p className='text-sm text-gray-500 mt-2'>
                  Inventory:{' '}
                  {product.variants.reduce((acc, variant) => acc + variant.inventory!, 0)}
                </p>
                {product.variants.every((variant) => variant.inventory === 0) && (
                  <div className=''>
                    <div className='ProdItem-overlay'></div>
                    <div className='ProdItem-oldout'>
                      <Soldout></Soldout>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <DeleteProductModal
        open={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        productName={currentProduct?.name || null}
      />

      <CreateProductModel
        open={isOpenCreateProdModel}
        setIsOpen={setIsOpenCreateProdModel}
        setOparator={setOparator}
        refetch={refetch}
        data={currentProduct || null}
        oparator={oparator}
      ></CreateProductModel>
    </>
  );
};

export default ProductList;
