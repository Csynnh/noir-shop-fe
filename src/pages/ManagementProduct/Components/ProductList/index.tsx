import { Product } from '@pages/ManagementProduct';
import ProductItem from '../ProductItem';
interface ProductListProps {
  data?: Product[] | null;
}
const ProductList = ({ data }: ProductListProps) => {
  return (
    <div className='grid grid-cols-3 gap-6'>
      {data?.map((product) => <ProductItem key={product.id} product={product} />)}
    </div>
  );
};

export default ProductList;
