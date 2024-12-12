import Button from '@components/Button';
import Collection from '@components/Collection';
import Minus from '@components/Icons/Minus';
import Plus from '@components/Icons/Plus';
import Star from '@components/Icons/Star';
import { API_BACKEND_ENDPOINT } from '@constant/Api';
import { useAuth } from '@contexts/AuthContext';
import { CollectionType, ProductType, ProductVariantType } from '@pages/Home';
import { Modal } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import styles from './styles.module.scss';
import { ProductCheckoutType } from '@pages/Checkout';

interface ProductVariantSelectedType {
  id?: string;
  color: string;
  size: string;
  count: number;
  images: {
    imageThumbnail: string;
    additionalImages: string[];
  };
}

interface SizeType {
  size: string;
  inventory: number;
}

interface VariantType {
  id?: string;
  color: string;
  sizes: SizeType[];
  images: {
    imageThumbnail: string;
    additionalImages: string[];
  };
}

export interface ProductDetailsType {
  id?: string;
  name: string;
  description: string;
  price: number;
  variants: VariantType[];
  details: {
    shortDesc: string;
    material: string;
    waterproof: string;
    careInstructions: string;
    dimensions: string;
    origin: string;
  };
  type?: string;
}
const ProductDetails = () => {
  const { name } = useParams();
  const location = useLocation();
  const { id } = location.state || {};
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [product, setProduct] = useState<ProductDetailsType>();
  const [collection, setCollection] = useState<CollectionType>();
  const [isModelSignInOpen, setIsModelSignInOpen] = useState<boolean>(false);
  const [ProductVariantSelected, setProductVariantSelected] = useState<ProductVariantSelectedType>({
    id: '',
    color: '',
    size: '',
    count: 1,
    images: {
      imageThumbnail: 'https://via.placeholder.com/495',
      additionalImages: [
        'https://via.placeholder.com/103',
        'https://via.placeholder.com/103',
        'https://via.placeholder.com/103',
      ],
    },
  });

  function transformData(data: ProductVariantType[]) {
    const result: VariantType[] = [];

    data.forEach((item) => {
      const existingColor = result.find((entry) => entry.color === item.color);

      if (existingColor) {
        if (
          !existingColor.sizes.includes({
            size: item.size,
            inventory: item.inventory,
          })
        ) {
          existingColor.sizes.push({
            size: item.size,
            inventory: item.inventory,
          });
        }
      } else {
        result.push({
          color: item.color,
          images: item.images,
          sizes: [{ size: item.size, inventory: item.inventory }],
        });
      }
    });

    return result;
  }

  const getProductDetails = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BACKEND_ENDPOINT}/api/products/${id}`);
      if (response.status === 200) {
        const responseData = response.data.responseData;
        const productData = {
          name: responseData.name,
          description: responseData.description,
          price: responseData.price,
          variants: transformData(responseData.variants),
          details: responseData.details,
        };
        setProduct(productData);
        setProductVariantSelected({
          id: responseData.variants[0]?.id,
          color: responseData.variants[0].color,
          size: responseData.variants[0].size,
          count: 1,
          images: {
            imageThumbnail: responseData.variants[0].images.imageThumbnail,
            additionalImages: responseData.variants[0].images.additionalImages,
          },
        });
      }
    } catch (error: any) {
      console.error('Error', error);
      toast.error('Error!', {
        description: error.response?.data?.messageToClient,
      });
    }
    setLoading(false);
  };

  const getListProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${API_BACKEND_ENDPOINT}/api/products/collections/new_collection`,
      );
      if (response.status === 200) {
        const responseData = response.data.responseData.items;
        setCollection({
          type: responseData[0].type,
          products: responseData,
        });
      }
    } catch (error: any) {
      console.error('Error', error);
      toast.error('Error!', {
        description: error.response?.data?.messageToClient,
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    getListProducts();
    getProductDetails();
  }, [name]);

  const handleAddToCart = async () => {
    try {
      // pre-check user loged in
      if (!user) {
        setIsModelSignInOpen(true);
        return;
      }
      const response = await axios.post(
        `${API_BACKEND_ENDPOINT}/api/carts`,
        {
          account_id: user?.account_id,
          variant_product_id: ProductVariantSelected.id,
          quantity: ProductVariantSelected.count,
        },
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        },
      );

      if (response.status === 201) {
        toast.success('Success!', {
          description: 'Add to cart successfully',
        });
      }
    } catch (error: any) {
      toast.error('Error!', {
        description: error.response?.data?.messageToClient,
      });
    }
  };

  const handleBuyNow = () => {
    // pre-check user loged in
    if (!user) {
      setIsModelSignInOpen(true);
      return;
    }
    const productCheckout: ProductCheckoutType = {
      id,
      name: product?.name,
      price: product?.price,
      variants: [
        {
          id: ProductVariantSelected?.id || '',
          color: ProductVariantSelected.color,
          image: ProductVariantSelected.images.imageThumbnail,
          count: ProductVariantSelected.count,
        },
      ],
    };
    navigate('/checkout', {
      state: {
        products: [productCheckout],
      },
    });
  };

  const handleRedirectToSignIn = () => {
    navigate('/sign-in', {
      state: {
        from: {
          pathname: location.pathname,
          productId: id,
        },
      },
    });
    setIsModelSignInOpen(false);
  };

  const handleCancel = () => {
    setIsModelSignInOpen(false);
  };

  return (
    <>
      {loading ? (
        <div className='min-h-40 flex items-center justify-center'>
          <div className='w-10 h-10 rounded-full border-4 border-black border-r-white animate-spin'></div>
        </div>
      ) : (
        <div className={styles.Item}>
          <div className='item-wrapper'>
            <div className='item-detail'>
              <div className='item-detail-info'>
                <div className='item-detail-top'>
                  <h5 className='item-name'>{product?.name}</h5>
                  <span className='item-desc'>{product?.description}</span>
                  <div className='item-color-list'>
                    <span className='item-label'>Color: </span>
                    <div className='item-color'>
                      {product?.variants?.map((variant: VariantType, index: number) => (
                        <div
                          key={index}
                          className={`item-color-item hover:opacity-100 ${ProductVariantSelected.color === variant.color ? '' : 'opacity-20'} transition-all cursor-pointer border border-black`}
                          style={{
                            backgroundColor: variant.color,
                          }}
                          onClick={() => {
                            setProductVariantSelected({
                              ...ProductVariantSelected,
                              id: variant?.id,
                              color: variant.color,
                              size: variant.sizes[0].size,
                              images: {
                                imageThumbnail: variant.images.imageThumbnail,
                                additionalImages: variant.images.additionalImages,
                              },
                            });
                          }}
                        ></div>
                      ))}
                    </div>
                  </div>

                  <div className='item-demention'>
                    <span className='item-label'>Size: </span>
                    {product?.variants
                      .find(
                        (variant: VariantType) => variant.color === ProductVariantSelected.color,
                      )
                      ?.sizes?.map((variant: SizeType, index: number) => (
                        <span
                          className={`item-value ml-2 w-6 h-6 rounded-full hover:bg-black hover:text-white ${ProductVariantSelected.size === variant.size ? 'bg-black text-white' : 'text-black bg-white'} inline-flex items-center justify-center cursor-pointer border-black  border-[0.5px] transition-all`}
                          key={index}
                          onClick={() => {
                            setProductVariantSelected({
                              ...ProductVariantSelected,
                              id: product?.variants?.find(
                                (item: VariantType) =>
                                  item.color === ProductVariantSelected.color &&
                                  item.sizes.find((size) => size.size === variant.size),
                              )?.id,
                              size: variant.size,
                            });
                          }}
                        >
                          {variant.size}
                        </span>
                      ))}
                  </div>
                </div>

                <div className='item-detail-bottom'>
                  <p className='item-price-total'>
                    ${product?.price || 0}
                    <span> / item </span>
                  </p>
                  <div className='item-price-tools'>
                    <div className='item-price-btns'>
                      <div
                        className='item-price-btn-minus select-none cursor-pointer'
                        onClick={() => {
                          if (ProductVariantSelected.count > 1) {
                            setProductVariantSelected({
                              ...ProductVariantSelected,
                              count: ProductVariantSelected.count - 1,
                            });
                          }
                        }}
                      >
                        <Minus />
                      </div>
                      <div className='item-price-count'>{ProductVariantSelected.count}</div>
                      <div
                        className='item-price-btn-plus select-none cursor-pointer'
                        onClick={() => {
                          setProductVariantSelected({
                            ...ProductVariantSelected,
                            count: ProductVariantSelected.count + 1,
                          });
                        }}
                      >
                        <Plus />
                      </div>
                    </div>
                    <div className='item-inventory'>
                      <p className='item-inventory-count'>
                        {product?.variants?.map((variant: VariantType) => {
                          if (variant.color === ProductVariantSelected.color) {
                            return variant.sizes.find(
                              (size) => size.size === ProductVariantSelected.size,
                            )?.inventory;
                          }
                        })}{' '}
                        items
                      </p>
                      <p className='item-sold-out'>40 sout out</p>
                    </div>
                  </div>
                  <div className='item-btns'>
                    <Button onClick={handleAddToCart}>Add to Card</Button>
                    <Button onClick={handleBuyNow} isPrimary>
                      Buy Now
                    </Button>
                  </div>
                </div>
              </div>
              <div className='item-detail-images'>
                <div className='item-detai-image border-[0.5px] border-[#c9c5c9]'>
                  <img
                    src={ProductVariantSelected.images.imageThumbnail}
                    alt=''
                    width={495}
                    height={495}
                  />
                </div>
                <div className='item-detail-media'>
                  <div className='item-detail-media-item'>
                    <img
                      src={ProductVariantSelected.images.additionalImages[0]}
                      alt=''
                      width={103}
                      height={103}
                    />
                  </div>
                  <div className='item-detail-media-item'>
                    <img
                      src={ProductVariantSelected.images.additionalImages[1]}
                      alt=''
                      width={103}
                      height={103}
                    />
                  </div>
                  <div className='item-detail-media-item'>
                    <img
                      src={ProductVariantSelected.images.additionalImages[2]}
                      alt=''
                      width={103}
                      height={103}
                    />
                  </div>
                  <div className='item-detail-media-item'>
                    <img
                      src={
                        ProductVariantSelected.images.additionalImages[3] ||
                        ProductVariantSelected.images.additionalImages[0]
                      }
                      alt=''
                      width={103}
                      height={103}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className='item-more-info'>
              <h5 className='item-more-info-title'>More Information</h5>
              <p className='item-more-info-desc'>
                {product?.details?.shortDesc ||
                  'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'}
              </p>
              <div className='item-more-info-prod-name'>
                <span className='item-more-info-lable'>Product Name:</span>
                <span className='item-more-info-value'>{product?.name}</span>
              </div>
              <div className='item-more-info-model-number'>
                <span className='item-more-info-lable'>Care Instructions:</span>
                <span className='item-more-info-value'>{product?.details.careInstructions}</span>
              </div>

              <div className='item-more-info-model-number'>
                <span className='item-more-info-lable'>Dimensions:</span>
                <span className='item-more-info-value'>{product?.details.dimensions}</span>
              </div>
              <div className='item-more-info-model-number'>
                <span className='item-more-info-lable'>Material:</span>
                <span className='item-more-info-value'>{product?.details.material}</span>
              </div>
              <div className='item-more-info-model-number'>
                <span className='item-more-info-lable'>Origin:</span>
                <span className='item-more-info-value'>{product?.details.origin}</span>
              </div>
              <div className='item-more-info-model-number'>
                <span className='item-more-info-lable'>Waterproof:</span>
                <span className='item-more-info-value'>{product?.details.waterproof}</span>
              </div>

              <div className='item-more-info-note'>
                <span className='item-more-info-lable'>Please note:</span>
                <span className='item-more-info-value'>
                  These specifications are examples and may vary depending on the actual product.
                </span>
              </div>
            </div>
            {/* <div className='item-feedback'>
              <h3 className='item-feedback-header'>Feedback</h3>
              <div className='item-feedback-list'>
                <div className='item-feedback-content'>
                  <div className='item-feedback-author'>TruLem</div>
                  <div className='item-feedback-rating'>
                    <ul className='item-feedback-rating-stars --4'>
                      <li className='-item-feedback-rating-star'>
                        <Star></Star>
                      </li>
                      <li className='-item-feedback-rating-star'>
                        <Star></Star>
                      </li>
                      <li className='-item-feedback-rating-star'>
                        <Star></Star>
                      </li>
                      <li className='-item-feedback-rating-star'>
                        <Star></Star>
                      </li>
                      <li className='-item-feedback-rating-star'>
                        <Star></Star>
                      </li>
                    </ul>
                    <div className='item-feedback-date'>Monday, September 9</div>
                  </div>
                  <p className='item-feedback-desc'>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                    Ipsum has been the industry's standard dummy text ever since the 1500s, when an
                    unknown printer took a galley of type and scrambled it to make a type specimen
                    book.
                  </p>
                  <div className='item-feedback-images'>
                    <div className='item-feedback-image'>
                      <img src='https://via.placeholder.com/168' alt='feedback image' />
                    </div>
                    <div className='item-feedback-image'>
                      <img src='https://via.placeholder.com/168' alt='feedback image' />
                    </div>
                    <div className='item-feedback-image'>
                      <img src='https://via.placeholder.com/168' alt='feedback image' />
                    </div>
                  </div>
                </div>
                <div className='item-feedback-content'>
                  <div className='item-feedback-author'>TruLem</div>
                  <div className='item-feedback-rating'>
                    <ul className='item-feedback-rating-stars --4'>
                      <li className='-item-feedback-rating-star'>
                        <Star></Star>
                      </li>
                      <li className='-item-feedback-rating-star'>
                        <Star></Star>
                      </li>
                      <li className='-item-feedback-rating-star'>
                        <Star></Star>
                      </li>
                      <li className='-item-feedback-rating-star'>
                        <Star></Star>
                      </li>
                      <li className='-item-feedback-rating-star'>
                        <Star></Star>
                      </li>
                    </ul>
                    <div className='item-feedback-date'>Monday, September 9</div>
                  </div>
                  <p className='item-feedback-desc'>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                    Ipsum has been the industry's standard dummy text ever since the 1500s, when an
                    unknown printer took a galley of type and scrambled it to make a type specimen
                    book.
                  </p>
                  <div className='item-feedback-images'>
                  </div>
                </div>
                <div className='item-feedback-content'>
                  <div className='item-feedback-author'>TruLem</div>
                  <div className='item-feedback-rating'>
                    <ul className='item-feedback-rating-stars --4'>
                      <li className='-item-feedback-rating-star'>
                        <Star></Star>
                      </li>
                      <li className='-item-feedback-rating-star'>
                        <Star></Star>
                      </li>
                      <li className='-item-feedback-rating-star'>
                        <Star></Star>
                      </li>
                      <li className='-item-feedback-rating-star'>
                        <Star></Star>
                      </li>
                      <li className='-item-feedback-rating-star'>
                        <Star></Star>
                      </li>
                    </ul>
                    <div className='item-feedback-date'>Monday, September 9</div>
                  </div>
                  <p className='item-feedback-desc'>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                    Ipsum has been the industry's standard dummy text ever since the 1500s, when an
                    unknown printer took a galley of type and scrambled it to make a type specimen
                    book.
                  </p>
                  <div className='item-feedback-images'>
                    <div className='item-feedback-image'>
                      <img src='https://via.placeholder.com/168' alt='feedback image' />
                    </div>
                    <div className='item-feedback-image'>
                      <img src='https://via.placeholder.com/168' alt='feedback image' />
                    </div>
                    <div className='item-feedback-image'>
                      <img src='https://via.placeholder.com/168' alt='feedback image' />
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
            {collection?.type ? (
              <Collection
                type={collection?.type || ''}
                products={
                  collection?.products.map((product: ProductType) => {
                    return {
                      id: product.id || '',
                      name: product.name,
                      price: product.price,
                      color: product.variants?.map((variant) => variant.color) || [],
                      img_url: product.variants[0].images.imageThumbnail,
                    };
                  }) || []
                }
              ></Collection>
            ) : null}
          </div>
        </div>
      )}
      <>
        <Modal
          open={isModelSignInOpen}
          onOk={handleRedirectToSignIn}
          onCancel={handleCancel}
          footer={[
            <Button key='back' onClick={handleCancel} disabled={loading}>
              Cancle
            </Button>,
            <Button key='submit' isPrimary loading={loading} onClick={handleRedirectToSignIn}>
              Go to Sign In
            </Button>,
          ]}
        >
          <div className=''>
            <h4 className='text-xl text-left mb-4'>Please sign in to continue</h4>
            <p className='text-sm mb-5'>You need to sign in to continue the process</p>
          </div>
        </Modal>
      </>
    </>
  );
};

export default ProductDetails;
