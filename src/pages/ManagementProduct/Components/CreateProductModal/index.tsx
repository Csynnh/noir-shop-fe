import Button from '@components/Button';
import { ColorPicker } from '@components/ColorPicker';
import Input from '@components/Input';
import { Selection } from '@components/Selection';
import { UploadImage } from '@components/UploadImage';
import { API_BACKEND_ENDPOINT } from '@constant/Api';
import { useAuth } from '@contexts/AuthContext';
import { ProductType } from '@pages/Home';
import { Checkbox } from '@ui/checkbox';
import { Form, Modal } from 'antd';
import axios from 'axios';
import React, { useEffect, useReducer, useState } from 'react';
import { toast } from 'sonner';

interface CreateProductModelProps {
  open?: boolean;
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  refetch?: (value: boolean) => void;
  data?: ProductType | null;
}
interface FormState {
  name: string;
  imageThubnail: File | null;
  additionalImageFirst: File | null;
  additionalImageSecond: File | null;
  additionalImageThird: File | null;
  additionalImageFourd: File | null;
  collection: string;
  size: string;
  color: string;
  inventory: number | string;
  price: number | string;
  material: string;
  dimensions: string;
  waterproof: boolean;
  productDesc: string;
  sortDescription: string;
  origin: string;
  careInstructions: string;
}

type Action = { type: 'SET_FIELD'; field: string; value: any } | { type: 'RESET' };
const initialState: FormState = {
  name: '',
  size: 'XS',
  color: '#000000',
  inventory: 0,
  price: 0,
  material: '',
  imageThubnail: null,
  additionalImageFirst: null,
  additionalImageSecond: null,
  additionalImageThird: null,
  additionalImageFourd: null,
  collection: 'JACKETS',
  dimensions: '',
  waterproof: false,
  productDesc: '',
  sortDescription: '',
  origin: '',
  careInstructions: '',
};

const formReducer = (state: FormState, action: Action): FormState => {
  switch (action.type) {
    case 'SET_FIELD':
      return {
        ...state,
        [action.field]: action.value,
      };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
};

const CreateProductModel = ({ open, setIsOpen, refetch, data }: CreateProductModelProps) => {
  const { user } = useAuth();
  const [formState, dispatch] = useReducer(formReducer, initialState);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    if (data) {
      const price = data.price.toString();
      const inventory = data.variants.reduce((acc, cur) => acc + cur.inventory, 0).toString();
      console.log(price, inventory);
      dispatch({ type: 'SET_FIELD', field: 'name', value: data.name });
      dispatch({ type: 'SET_FIELD', field: 'size', value: data.variants[0].size });
      dispatch({ type: 'SET_FIELD', field: 'color', value: data.variants[0].color });
      dispatch({ type: 'SET_FIELD', field: 'inventory', value: inventory });
      dispatch({ type: 'SET_FIELD', field: 'price', value: price });
      dispatch({ type: 'SET_FIELD', field: 'material', value: data.details.material });
      dispatch({ type: 'SET_FIELD', field: 'dimensions', value: data.details.dimensions });
      dispatch({ type: 'SET_FIELD', field: 'waterproof', value: data.details.waterproof });
      dispatch({ type: 'SET_FIELD', field: 'productDesc', value: data.description });
      dispatch({ type: 'SET_FIELD', field: 'sortDescription', value: data.details.shortDesc });
      dispatch({ type: 'SET_FIELD', field: 'origin', value: data.details.origin });
      dispatch({
        type: 'SET_FIELD',
        field: 'careInstructions',
        value: data.details.careInstructions,
      });
    }
  }, [data]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target ?? e;
    const expectValue = [
      'imageThubnail',
      'additionalImageFirst',
      'additionalImageSecond',
      'additionalImageThird',
      'additionalImageFourd',
    ].includes(name)
      ? (e.target as HTMLInputElement).files![0]
      : value;
    dispatch({ type: 'SET_FIELD', field: name, value: expectValue });
    if (errors[name as keyof FormState]) {
      setErrors((prev) => {
        delete prev[name as keyof FormState];
        return prev;
      });
    }
  };

  const handleOk = async () => {
    if (!user?.token) return;
    setIsPending(true);
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      toast.error('Error!', {
        description: Object.values(errors).join(', '),
      });
      return;
    }
    try {
      // Call API to add product to store
      const formData = new FormData();
      formData.append('ProductName', formState.name);
      formData.append('ProductDescription', formState.productDesc);
      formData.append('Price', formState.price.toString());
      formData.append('Inventory', formState.inventory.toString());
      formData.append('Size', formState.size);
      formData.append('Type', formState.collection);
      formData.append('Color', formState.color);
      formData.append('Details.Material', formState.material);
      formData.append('Details.Dimensions', formState.dimensions);
      formData.append('Details.Waterproof', formState.waterproof.toString());
      formData.append('Details.Origin', formState.origin);
      formData.append('Details.CareInstructions', formState.careInstructions);
      formData.append('Details.ShortDesc', formState.sortDescription);
      formData.append('Images.ImageThumbnail', formState.imageThubnail as File);
      formData.append('Images.AdditionalImages', formState.additionalImageFirst as File);
      formData.append('Images.AdditionalImages', formState.additionalImageSecond as File);
      formData.append('Images.AdditionalImages', formState.additionalImageThird as File);
      formData.append('Images.AdditionalImages', formState.additionalImageFourd as File);
      console.log('formState', formState);
      const response = await axios.post(`${API_BACKEND_ENDPOINT}/api/products`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${user?.token}`,
        },
      });
      if (response.status === 201) {
        toast.success('Success!', {
          description: 'Add product to store successfully',
        });
        dispatch({ type: 'RESET' });
        refetch && refetch(true);
      } else {
        throw new Error('Error when add product to store');
      }
    } catch (error) {
      toast.error('Error!', {
        description: 'Error when add product to store',
      });
    }
    setIsOpen && setIsOpen(false);
    setIsPending(false);
  };

  const handleCancel = () => {
    setIsOpen && setIsOpen(false);
  };

  const validateForm = () => {
    const errors: Partial<FormState> = {};

    if (!formState.name) {
      errors.name = 'Name is required';
    }
    if (!formState.material) {
      errors.material = 'Material is required';
    }
    if (!formState.productDesc) {
      errors.productDesc = 'Product description is required';
    }
    if (!formState.sortDescription) {
      errors.sortDescription = 'Sort description is required';
    }
    if (!formState.origin) {
      errors.origin = 'Origin is required';
    }
    if (!formState.careInstructions) {
      errors.careInstructions = 'Care instructions is required';
    }
    if ((formState.inventory as number) <= 0) {
      errors.inventory = 'Inventory must be greater than 0';
    }
    if ((formState.price as number) <= 0) {
      errors.price = 'Price must be greater than 0';
    }

    if (!formState.dimensions) {
      errors.dimensions = 'Dimensions is required';
    }

    setErrors(errors);
    return errors;
  };

  return (
    <Modal open={open} onCancel={handleCancel} width={'90%'} footer={[]}>
      <Form className='grid grid-cols-1 md:grid-cols-3 gap-14 px-5 py-5'>
        {/* Cột 1: Hình ảnh, tên sản phẩm, loại sản phẩm */}
        <div className='flex flex-col justify-between'>
          <div className='mb-10'>
            <UploadImage
              name='imageThubnail'
              label='Image Thumbnail'
              onChange={handleChange}
              className={`h-[140px] [&>img]:h-full ${errors.imageThubnail ? 'border-red-400 text-red-400' : ''}`}
              image={
                data
                  ? {
                      url: data.variants[0].images.imageThumbnail,
                      name: 'Image Thumbnail',
                    }
                  : undefined
              }
            ></UploadImage>
            <UploadImage
              name='additionalImageFirst'
              label='Additional Image'
              onChange={handleChange}
              image={
                data
                  ? {
                      url: data.variants[0].images.additionalImages[0],
                      name: 'Image Thumbnail',
                    }
                  : undefined
              }
              className={`${errors.additionalImageFirst ? 'border-red-400 text-red-400' : ''}`}
            ></UploadImage>
            <UploadImage
              name='additionalImageSecond'
              label='Additional Image'
              onChange={handleChange}
              image={
                data
                  ? {
                      url: data.variants[0].images.additionalImages[1],
                      name: 'Image Thumbnail',
                    }
                  : undefined
              }
              className={`${errors.additionalImageSecond ? 'border-red-400 text-red-400' : ''}`}
            ></UploadImage>
            <UploadImage
              name='additionalImageThird'
              label='Additional Image'
              onChange={handleChange}
              image={
                data
                  ? {
                      url: data.variants[0].images.additionalImages[2],
                      name: 'Image Thumbnail',
                    }
                  : undefined
              }
              className={`${errors.additionalImageThird ? 'border-red-400 text-red-400' : ''}`}
            ></UploadImage>
            <UploadImage
              name='additionalImageFourd'
              label='Additional Image'
              onChange={handleChange}
              image={
                data
                  ? {
                      url: data.variants[0].images.additionalImages[3],
                      name: 'Image Thumbnail',
                    }
                  : undefined
              }
              className={`${errors.additionalImageFourd ? 'border-red-400 text-red-400' : ''}`}
            ></UploadImage>
          </div>
          <div className=''></div>
        </div>

        {/* Cột 2: Size, Màu sắc, Tồn kho, Giá và Chất liệu */}
        <div className='flex flex-col gap-4'>
          {/* Kích cỡ */}

          {/* Tên sản phẩm */}
          <div className='mb-4'>
            <Input
              name='name'
              label='Name of Product'
              onChange={handleChange}
              defaultValue={formState.name}
              className={`${errors.name ? '[&>input]:border-red-400 text-red-400' : ''}`}
            ></Input>
          </div>

          {/* Loại sản phẩm */}
          <div className='mb-4'>
            <label className='block text-sm font-medium text-gray-700 mb-2'>Collection</label>

            <Selection
              name='collection'
              data={[
                { value: 'JACKETS', label: 'Jackets' },
                { value: 'BAGS', label: 'Bags' },
                { value: 'NEW_COLLECTION', label: 'New Collection' },
              ]}
              onChange={handleChange}
              value={formState.collection}
              classname='max-w-full'
            ></Selection>
          </div>
          <div className='mb-4'>
            <label className='block text-sm font-medium text-gray-700'>Size</label>
            <Selection
              name='size'
              data={[
                { value: 'XS', label: 'XS' },
                { value: 'S', label: 'S' },
                { value: 'M', label: 'M' },
                { value: 'L', label: 'L' },
                { value: 'XL', label: 'XL' },
                { value: 'XXL', label: 'XXL' },
                { value: '3XL', label: '3XL' },
              ]}
              onChange={handleChange}
              classname='max-w-full'
              value={formState.size}
            ></Selection>
          </div>
          {/* Màu sắc */}
          <div className='mb-4 '>
            <label className='block text-sm font-medium text-gray-700 mb-2'>Color</label>

            <ColorPicker
              setBackground={handleChange}
              name='color'
              background={formState.color}
              className='max-w-full'
            ></ColorPicker>
          </div>

          {/* Tồn kho */}
          <div className='mb-4 mt-4 flex items-end'>
            <Input
              type='number'
              name='inventory'
              label='Inventory'
              onChange={handleChange}
              defaultValue={formState.inventory.toString()}
              className={`${errors.inventory ? '[&>input]:border-red-400 text-red-400' : ''}`}
            ></Input>
            <span className='ml-3'>items</span>
          </div>

          {/* Giá */}
          <div className='mb-4 flex items-end'>
            <Input
              type='number'
              name='price'
              label='Price'
              onChange={handleChange}
              defaultValue={formState.price.toString()}
              className={`${errors.price ? '[&>input]:border-red-400 text-red-400' : ''}`}
            ></Input>
            <span className='ml-3'>$/item</span>
          </div>
        </div>

        {/* Cột 3: Specification, Feature, Sort Description, Additional Information */}
        <div className='flex flex-col gap-4'>
          <div className='mb-4 row flex justify-content-between'>
            {/* Tỉ lệ */}
            <Input
              type='text'
              name='dimensions'
              label='Dimensions'
              onChange={handleChange}
              defaultValue={formState.dimensions}
              className={`${errors.dimensions ? '[&>input]:border-red-400 text-red-400' : ''}`}
            />

            <div className='flex flex-col justify-between items-center ml-[20px] max-w-[20%] w-full'>
              <label
                htmlFor='waterproof'
                className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
              >
                Waterproof
              </label>
              <Checkbox
                className='p-0'
                id='waterproof'
                name='waterproof'
                onChange={() => {
                  dispatch({
                    type: 'SET_FIELD',
                    field: 'waterproof',
                    value: !formState.waterproof,
                  });
                }}
                checked={formState.waterproof}
              />
            </div>
          </div>
          {/* Chất liệu */}
          <div className='mb-4 rounded'>
            <Input
              type='text'
              name='material'
              label='Material'
              onChange={handleChange}
              defaultValue={formState.material}
              className={`${errors.material ? '[&>input]:border-red-400 text-red-400' : ''}`}
            ></Input>
          </div>
          {/* Specification */}
          <div className='mb-4'>
            <Input
              type='text'
              name='productDesc'
              label='Product Description'
              onChange={handleChange}
              defaultValue={formState.productDesc}
              className={`${errors.productDesc ? '[&>input]:border-red-400 text-red-400' : ''}`}
            ></Input>
          </div>

          {/* Sort Description */}
          <div className='mb-4 mt-4'>
            <Input
              type='text'
              name='sortDescription'
              label='Sort description of product'
              onChange={handleChange}
              defaultValue={formState.sortDescription}
              className={`${errors.sortDescription ? '[&>input]:border-b-red-400 text-red-400' : ''}`}
            ></Input>
          </div>

          {/* Nguồn gốc */}
          <div className='mb-4'>
            <Input
              type='text'
              name='origin'
              label='Origin'
              onChange={handleChange}
              defaultValue={formState.origin}
              className={`${errors.origin ? '[&>input]:border-b-red-400 text-red-400' : ''}`}
            ></Input>
          </div>

          {/* Additional Information */}
          <div className='mb-4 mt-3'>
            <Input
              type='text'
              name='careInstructions'
              label='Care Instructions'
              onChange={handleChange}
              defaultValue={formState.careInstructions}
              className={`${errors.careInstructions ? '[&>input]:border-b-red-400 text-red-400' : ''}`}
            ></Input>
          </div>

          {/* Add to store Button */}
          <div className='mb-4'>
            <Button isPrimary onClick={handleOk} loading={isPending}>
              Add to store
            </Button>
          </div>
        </div>
      </Form>
    </Modal>
  );
};

export default CreateProductModel;
