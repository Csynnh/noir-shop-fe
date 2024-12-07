import Banner from '@components/Banner';
import styles from './styles.module.scss';
import Down from '@components/Icons/Down';
import Collection from '@components/Collection';
import { useEffect, useRef, useState } from 'react';
import { API_BACKEND_ENDPOINT } from '@constant/Api';
import axios from 'axios';
import { toast } from 'sonner';
import { CardItemProps } from '@components/CardItem';

export enum Type {
  BAGS = 'BAGS',
  JACKETS = 'JACKETS',
  'NEW COLLECTION' = 'NEW COLLECTION',
}

export interface CollectionType {
  type: Type;
  products: ProductType[];
}

export interface ProductType {
  id?: string;
  name: string;
  description: string;
  price: number;
  variants: ProductVariantType[];
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

export interface ProductVariantType {
  color: string;
  size: string;
  inventory: number;
  images: {
    imageThumbnail: string;
    additionalImages: string[];
  };
}

const Home = () => {
  const collectionRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [products, setProducts] = useState<any[]>([]);
  const getListProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BACKEND_ENDPOINT}/api/products/collections`);
      if (response.status === 200) {
        const responseData = response.data.responseData;
        const products = responseData.map((item: any) => {
          return {
            type: item.type,
            products: item.products.map((product: ProductType) => {
              return {
                id: product.id,
                name: product.name,
                description: product.description,
                price: product.price,
                variants: product.variants.map((variant: ProductVariantType) => {
                  return {
                    color: variant.color,
                    size: variant.size,
                    inventory: variant.inventory,
                    images: {
                      imageThumbnail: variant.images.imageThumbnail,
                      additionalImages: variant.images.additionalImages,
                    },
                  };
                }),
                details: {
                  shortDesc: product.details.shortDesc,
                  material: product.details.material,
                  waterproof: product.details.waterproof,
                  careInstructions: product.details.careInstructions,
                  dimensions: product.details.dimensions,
                  origin: product.details.origin,
                },
              };
            }),
          };
        });
        setProducts(products);
      }
    } catch (error: any) {
      toast.error('Error!', {
        description: error.response.data.messageToClient,
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    if (products.length === 0) {
      getListProducts();
    }
  }, []);

  return (
    <div className={styles.home}>
      <Banner></Banner>
      <div className='home-banner-container'>
        <div className='home-banner-content'>
          Indulge in opulence with <span className='home-banner-content-logo'>Noir</span>. Our
          meticulously crafted bags are a testament to timeless elegance and exquisite
          craftsmanship. Each piece is a masterpiece, designed to elevate your style and become a
          cherished heirloom. Experience luxury redefined.
        </div>
        <div className='home-banner-button'>
          <h3>Shopping Now</h3>
          <span>
            <Down to={collectionRef}></Down>
          </span>
        </div>
      </div>
      {loading ? (
        <div className='w-full min-h-40 flex items-center justify-center'>
          <div className='w-10 h-10 rounded-full border-4 border-r-white animate-spin'></div>
        </div>
      ) : (
        products
          .filter((collection: CollectionType) => collection.type in Type)
          .map((collection: CollectionType, index: number) => {
            const listProducts: CardItemProps[] = collection.products.map((product) => {
              return {
                id: product.id || '',
                name: product.name,
                price: product.price,
                color: product.variants.map((variant) => variant.color),
                img_url: product.variants[0].images.imageThumbnail,
              };
            });
            return (
              <Collection key={index} type={collection.type} products={listProducts}></Collection>
            );
          })
      )}
    </div>
  );
};

export default Home;
