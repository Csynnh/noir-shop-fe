import Delete from '@components/Icons/Delete';
import Option from '@components/Icons/Option';
import { Product } from '@pages/ManagementProduct';

interface ProductItemProps {
  product: Product;
}

const ProductItem = ({ product }: ProductItemProps) => {
  console.log(product);
  return (
    <div className='border-[0.5px] border-[#837F83] py-3 px-4'>
      <div className='flex justify-between mt-[10px]'>
        <span className='w-4 h-4 cursor-pointer flex items-center justify-center'>
          <Delete></Delete>
        </span>
        <div className='w-[160px] h-[160px]'>
          <img src={product.variants[0].image} alt='product image' className='object-cover w-full h-full' />
        </div>
        <span className='w-4 h-4 cursor-pointer flex items-center justify-center'>
          <Option></Option>
        </span>
      </div>
      <div className='w-full flex items-center justify-center flex-col mt-5 mb-11'>
        <span className='text-[15px] font-[gilroy-bold] mb-2'>{product.name}</span>
        <span className='text-[15px]'>
          Inventory: <span className=' font-[gilroy-light]'>{product.inventory} Items</span>
        </span>
      </div>
      <div className=''>
        <div className='text-[15px] mb-2'>
          Price: <span className='font-[gilroy-light] ml-2'>${product.price.toFixed(2)}</span>
        </div>
        <div className='text-[15px] mb-2'>
          Size: <span className='font-[gilroy-light] ml-2'>{product.variants[0].size}</span>
        </div>
        <div className='text-[15px] mb-2 flex items-center gap-3'>
          Color:
          <span
            className={`w-3 h-3 inline-block rounded-full`}
            style={{
              backgroundColor: product.variants[0].color,
            }}
          ></span>
        </div>
        <div className='text-[15px] mb-2'>
          Desc: <span className='font-[gilroy-light] ml-2 leading-[1.4]'>{product.desc}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
