import React, { useState } from 'react';
import { Product } from '@pages/ManagementProduct';
import DeleteProductModal from '../DeleteProductModel';
import CreateProductModel from '../CreateProductModal';

interface ProductListProps {
  data: Product[] | null;
}

const ProductList = ({ data }: ProductListProps) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isOpenCreateProdModel, setIsOpenCreateProdModel] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);

  if (!data || data.length === 0) {
    return <p>No products available.</p>;
  }

  const handleDeleteClick = (product: Product) => {
    setCurrentProduct(product);
    setIsDeleteModalOpen(true);
  };

  const handleUpdateClick = (product: Product) => {
    setCurrentProduct(product);
    setIsOpenCreateProdModel(true);
  };

  const handleConfirmDelete = () => {
    if (currentProduct) {
      alert(`Xóa sản phẩm \"${currentProduct.name}\" thành công!`);
      console.log(`Sản phẩm đã xóa: ${currentProduct.name}`);
      // TODO: Thực hiện logic xóa sản phẩm tại đây
    }
    setIsDeleteModalOpen(false);
  };

  return (
    <>
      <div className="grid grid-cols-3 gap-4">
        {data.map((product) => (
          <div key={product.id} className="border p-4 rounded cursor-pointer">
            <img
              src={product.variants[0].image}
              alt={product.name}
              className="w-full h-48 object-cover mb-4"
            />
            <h2 className="font-semibold text-xl">{product.name}</h2>
            <p className="text-sm text-gray-600">{product.desc}</p>
            <p className="font-semibold text-lg mt-2">${product.price}</p>
            <div className="flex gap-2 mt-2">
              <span className="text-sm text-gray-500">Size: {product.variants[0].size}</span>
              <span className="text-sm text-gray-500">Color: </span>
              <div
                className="w-[17px] h-[17px] rounded-[50%]"
                style={{ backgroundColor: product.variants[0].color }}
              ></div>
            </div>
            {product.inventory !== undefined && (
              <p className="text-sm text-gray-500 mt-2">Inventory: {product.inventory}</p>
            )}
            <div className="flex gap-2 mt-4 justify-between pl-3 pr-3">
              <button
                onClick={() => handleUpdateClick(product)}
                className="flex items-center justify-center px-3 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
              >
                Update
              </button>
              <button
                onClick={() => handleDeleteClick(product)}
                className="flex items-center justify-center px-3 py-2 rounded bg-red-500 text-white hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <DeleteProductModal
        open={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        productName={currentProduct?.name || null}
      />


      <CreateProductModel open={isOpenCreateProdModel} setIsOpen={setIsOpenCreateProdModel}></CreateProductModel>

      {/* <CreateProductModel
        open={isCreateModalOpen}
        // onClose={() => setIsCreateModalOpen(false)}
        product={currentProduct} // Truyền thông tin sản phẩm cần cập nhật
      /> */}
    </>
  );
};

export default ProductList;
