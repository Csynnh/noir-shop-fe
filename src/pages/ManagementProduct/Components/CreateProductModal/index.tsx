import Button from '@components/Button';
import { ColorPicker } from '@components/ColorPicker';
import Input from '@components/Input';
import { Selection } from '@components/Selection';
import { UploadImage } from '@components/UploadImage';
import { API_BACKEND_ENDPOINT } from '@constant/Api';
import { useAuth } from '@contexts/AuthContext';
import { createFileFromUrl, uploadImageToAzure } from '@lib/utils';
import { ProductType, ProductVariantType } from '@pages/Home';
import { Checkbox } from '@ui/checkbox';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@ui/tooltip';
import { Form, Modal } from 'antd';
import axios from 'axios';
import React, { useEffect, useReducer, useState } from 'react';
import { toast } from 'sonner';

interface CreateProductModelProps {
  open?: boolean;
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  setOparator?: React.Dispatch<React.SetStateAction<string>>;
  refetch?: (value: boolean) => void;
  data?: ProductType | null;
  oparator?: string;
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

const CreateProductModel = ({
  open,
  setIsOpen,
  refetch,
  data,
  oparator,
  setOparator,
}: CreateProductModelProps) => {
  const { user } = useAuth();
  const [formState, dispatch] = useReducer(formReducer, initialState);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [isPending, setIsPending] = useState(false);
  const [currentVariantProd, setCurrentVariantProd] = useState<string | null>();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  useEffect(() => {
    if (data && data.name) {
      const price = data.price.toString();

      dispatch({ type: 'SET_FIELD', field: 'name', value: data.name });
      dispatch({ type: 'SET_FIELD', field: 'size', value: data.variants[0].size });
      dispatch({ type: 'SET_FIELD', field: 'color', value: data.variants[0].color });
      dispatch({ type: 'SET_FIELD', field: 'inventory', value: data.variants[0].inventory });
      dispatch({ type: 'SET_FIELD', field: 'price', value: price });
      dispatch({ type: 'SET_FIELD', field: 'material', value: data.details.material });
      dispatch({ type: 'SET_FIELD', field: 'dimensions', value: data.details.dimensions });
      dispatch({
        type: 'SET_FIELD',
        field: 'waterproof',
        value: data.details.waterproof === 'true',
      });
      dispatch({ type: 'SET_FIELD', field: 'productDesc', value: data.description });
      dispatch({ type: 'SET_FIELD', field: 'sortDescription', value: data.details.shortDesc });
      dispatch({ type: 'SET_FIELD', field: 'origin', value: data.details.origin });
      dispatch({ type: 'SET_FIELD', field: 'collection', value: data.type });
      dispatch({
        type: 'SET_FIELD',
        field: 'imageThubnail',
        value: data.variants[0].images.imageThumbnail,
      });
      dispatch({
        type: 'SET_FIELD',
        field: 'additionalImageFirst',
        value: data.variants[0].images.additionalImages[0],
      });
      dispatch({
        type: 'SET_FIELD',
        field: 'additionalImageSecond',
        value: data.variants[0].images.additionalImages[1],
      });
      dispatch({
        type: 'SET_FIELD',
        field: 'additionalImageThird',
        value: data.variants[0].images.additionalImages[2],
      });
      dispatch({
        type: 'SET_FIELD',
        field: 'additionalImageFourd',
        value: data.variants[0].images.additionalImages[3],
      });
      dispatch({
        type: 'SET_FIELD',
        field: 'careInstructions',
        value: data.details.careInstructions,
      });
      setCurrentVariantProd(data.variants[0].id);
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
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      toast.error('Error!', {
        description: Object.values(errors).join(', '),
      });
      return;
    }
    try {
      setIsPending(true);
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
      const imgThumbnail =
        typeof formState.imageThubnail === 'string'
          ? await createFileFromUrl(formState.imageThubnail, 'Image Thubnail')
          : (formState.imageThubnail as File);
      formData.append('Images.ImageThumbnail', imgThumbnail as File);

      const additionalImageFirst =
        typeof formState.additionalImageFirst === 'string'
          ? await createFileFromUrl(formState.additionalImageFirst, 'Additional Image First')
          : (formState.additionalImageFirst as File);
      formData.append('Images.AdditionalImages', additionalImageFirst as File);

      const additionalImageSecond =
        typeof formState.additionalImageSecond === 'string'
          ? await createFileFromUrl(formState.additionalImageSecond, 'Additional Image Second')
          : (formState.additionalImageSecond as File);
      formData.append('Images.AdditionalImages', additionalImageSecond as File);

      const additionalImageThird =
        typeof formState.additionalImageThird === 'string'
          ? await createFileFromUrl(formState.additionalImageThird, 'Additional Image Third')
          : (formState.additionalImageThird as File);
      formData.append('Images.AdditionalImages', additionalImageThird as File);

      const additionalImageFourd =
        typeof formState.additionalImageFourd === 'string'
          ? await createFileFromUrl(formState.additionalImageFourd, 'Additional Image Fourd')
          : (formState.additionalImageFourd as File);
      formData.append('Images.AdditionalImages', additionalImageFourd as File);

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
    setOparator && setOparator('CREATE');
    setIsPending(false);
  };

  const handleUpdate = async () => {
    if (!user?.token) return;
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      toast.error('Error!', {
        description: Object.values(errors).join(', '),
      });
      return;
    }
    setIsPending(true);
    try {
      const imageThubnail = formState.imageThubnail;
      const additionalImageFirst = formState.additionalImageFirst;
      const additionalImageSecond = formState.additionalImageSecond;
      const additionalImageThird = formState.additionalImageThird;
      const additionalImageFourd = formState.additionalImageFourd;
      let imgThubnailUrl;
      let addImgFirstUrl;
      let addImgSecondUrl;
      let addImgThirdUrl;
      let addImgFourdUrl;
      await Promise.all([
        (async () => {
          if (typeof imageThubnail !== 'string') {
            imgThubnailUrl = await uploadImageToAzure(imageThubnail as File, user);
          }
        })(),
        (async () => {
          if (typeof additionalImageFirst !== 'string') {
            addImgFirstUrl = await uploadImageToAzure(additionalImageFirst as File, user);
          }
        })(),
        (async () => {
          if (typeof additionalImageSecond !== 'string') {
            addImgSecondUrl = await uploadImageToAzure(additionalImageSecond as File, user);
          }
        })(),
        (async () => {
          if (typeof additionalImageThird !== 'string') {
            addImgThirdUrl = await uploadImageToAzure(additionalImageThird as File, user);
          }
        })(),
        (async () => {
          if (typeof additionalImageFourd !== 'string') {
            addImgFourdUrl = await uploadImageToAzure(additionalImageFourd as File, user);
          }
        })(),
      ]);

      let data = {
        ProductName: formState.name,
        ProductDescription: formState.productDesc,
        Price: formState.price.toString(),
        Inventory: formState.inventory.toString(),
        Size: formState.size,
        Type: formState.collection,
        Color: formState.color,
        Details: {
          Material: formState.material,
          Dimensions: formState.dimensions,
          Waterproof: formState.waterproof.toString(),
          Origin: formState.origin,
          CareInstructions: formState.careInstructions,
          ShortDesc: formState.sortDescription,
        },
        Images: {
          ImageThumbnail:
            typeof formState.imageThubnail === 'string' ? formState.imageThubnail : imgThubnailUrl,
          AdditionalImages: [
            typeof formState.additionalImageFirst === 'string'
              ? formState.additionalImageFirst
              : addImgFirstUrl,
            typeof formState.additionalImageSecond === 'string'
              ? formState.additionalImageSecond
              : addImgSecondUrl,
            typeof formState.additionalImageThird === 'string'
              ? formState.additionalImageThird
              : addImgThirdUrl,
            typeof formState.additionalImageFourd === 'string'
              ? formState.additionalImageFourd
              : addImgFourdUrl,
          ],
        },
      };
      const response = await axios.put(
        `${API_BACKEND_ENDPOINT}/api/products${oparator === 'UPDATE' ? '/' + currentVariantProd : ''}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        },
      );
      if (response.status === 200) {
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
      console.info(error);
    }
    setIsOpen && setIsOpen(false);
    setOparator && setOparator('CREATE');
    setIsPending(false);
  };

  const handleCancel = () => {
    setIsOpen && setIsOpen(false);
    setOparator && setOparator('CREATE');
    setIsDeleteModalOpen(false);
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

  const handleDeleteColor = async () => {
    try {
      const response = await axios.delete(
        `${API_BACKEND_ENDPOINT}/api/products/color/${currentVariantProd}`,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        },
      );
      if (response.data.responseData) {
        toast.success(`Delete product color successfully!`);
        refetch && refetch(true);
      } else {
        toast.error(`Delete product color failed!`);
      }
    } catch (error) {
      toast.error(`Delete product color failed!`);
    } finally {
      setIsDeleteModalOpen(false);
      setIsOpen && setIsOpen(false);
    }
  };

  const handleSelectColor = (variant: ProductVariantType) => {
    dispatch({ type: 'SET_FIELD', field: 'color', value: variant.color });
    dispatch({ type: 'SET_FIELD', field: 'imageThubnail', value: variant.images.imageThumbnail });
    dispatch({
      type: 'SET_FIELD',
      field: 'additionalImageFirst',
      value: variant.images.additionalImages[0],
    });
    dispatch({
      type: 'SET_FIELD',
      field: 'additionalImageSecond',
      value: variant.images.additionalImages[1],
    });
    dispatch({
      type: 'SET_FIELD',
      field: 'additionalImageThird',
      value: variant.images.additionalImages[2],
    });
    dispatch({
      type: 'SET_FIELD',
      field: 'additionalImageFourd',
      value: variant.images.additionalImages[3],
    });
    dispatch({ type: 'SET_FIELD', field: 'size', value: variant.size });
    dispatch({ type: 'SET_FIELD', field: 'inventory', value: variant.inventory });
    setCurrentVariantProd(variant.id);
  };

  return (
    <Modal open={open} onCancel={handleCancel} width={'90%'} footer={[]}>
      <Form className='grid grid-cols-1 md:grid-cols-3 gap-14 px-5 py-5 mb-20'>
        {/* Cột 1: Hình ảnh, tên sản phẩm, loại sản phẩm */}
        <div className='flex flex-col justify-between'>
          <div className=''>
            {oparator === 'UPDATE' ? (
              <div className='mb-4 '>
                <label className='block text-sm font-medium text-gray-700 mb-2'>Color</label>
                <div className='flex items-center gap-2'>
                  {data?.variants.map((variant, index) => {
                    const isActived = variant.color === formState.color;
                    return (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div
                              className={`w-7 h-8 rounded-[5px] p-[2px] ${isActived ? 'border-[1px] border-[var(--line-color)]' : ''} cursor-pointer`}
                              key={index}
                              onClick={() => handleSelectColor(variant)}
                            >
                              <div
                                style={{ backgroundColor: variant.color }}
                                className='w-full h-full rounded-[3px]'
                              ></div>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{variant.color}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    );
                  })}
                </div>
              </div>
            ) : null}
            <UploadImage
              name='imageThubnail'
              label='Image Thumbnail'
              onChange={handleChange}
              className={`h-[140px] [&>img]:h-full ${errors.imageThubnail ? 'border-red-400 text-red-400' : ''}`}
              image={{
                url: data ? (formState.imageThubnail as any) : '',
                name: 'Image Thumbnail',
              }}
            ></UploadImage>
            <UploadImage
              name='additionalImageFirst'
              label='Additional Image'
              onChange={handleChange}
              image={
                data
                  ? {
                      url: data ? (formState.additionalImageFirst as any) : '',
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
                      url: data ? (formState.additionalImageSecond as any) : '',
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
                      url: data ? (formState.additionalImageThird as any) : '',
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
                      url: data ? (formState.additionalImageFourd as any) : '',
                      name: 'Image Thumbnail',
                    }
                  : undefined
              }
              className={`${errors.additionalImageFourd ? 'border-red-400 text-red-400' : ''} !mb-0`}
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
          {oparator === 'CREATE' ? (
            <div className='mb-4 '>
              <label className='block text-sm font-medium text-gray-700 mb-2'>Color</label>

              <ColorPicker
                setBackground={handleChange}
                name='color'
                background={formState.color}
                className='max-w-full'
              ></ColorPicker>
            </div>
          ) : null}

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
          {oparator === 'UPDATE' ? (
            <>
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
                    onClick={() => {
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
              <div className='mt-auto'>
                <Button isPrimary onClick={handleUpdate} disabled={isPending}>
                  Update product
                </Button>
              </div>
            </>
          ) : null}
        </div>

        {/* Cột 3: Specification, Feature, Sort Description, Additional Information */}
        <div className='flex flex-col gap-4'>
          <>
            {oparator === 'CREATE' ? (
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
                    onClick={() => {
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
            ) : null}
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
          </>

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

          {oparator === 'UPDATE' ? (
            <div className='mt-auto'>
              <Button onClick={() => setIsDeleteModalOpen(true)} disabled={isPending}>
                Delete this product color
              </Button>
            </div>
          ) : (
            <div className='mb-4 mt-auto'>
              <Button isPrimary onClick={handleOk} loading={isPending}>
                Add to store
              </Button>
            </div>
          )}
        </div>
      </Form>
      <Modal
        open={isDeleteModalOpen}
        onCancel={() => setIsDeleteModalOpen(false)}
        width={'30%'}
        footer={[
          <Button onClick={() => setIsDeleteModalOpen(false)}>Cancel</Button>,
          <Button onClick={handleDeleteColor} isPrimary>
            Confirm
          </Button>,
        ]}
      >
        <div className='mt-4 mb-8'>Please confirm if you want to delete this product color?</div>
      </Modal>
    </Modal>
  );
};

export default CreateProductModel;
