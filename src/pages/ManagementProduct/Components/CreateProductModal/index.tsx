import Button from '@components/Button';
import { ComboBox, ComboBoxValueProps } from '@components/ComboBox';
import Upload from '@components/Icons/Upload';
import Input from '@components/Input';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@ui/accordion';
import styles from './index.module.scss';
import { Modal, Select } from 'antd';
import React, { useReducer } from 'react';

interface CreateProductModelProps {
  open?: boolean;
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}
interface FormState {
  name: string;
  image: File;
  collection: string;
  // type: string;
  // size: string;
  // color: string;
  // inventory: number;
  // price: number;
  // material: string;
}

type Action = { type: 'SET_FIELD'; field: string; value: any } | { type: 'RESET' };
const mockData = [
  {
    label: 'Jacket',
    value: 'Jacket',
  },
  {
    label: 'Bag',
    value: 'Bag',
  },
  {
    label: 'Shirt',
    value: 'Shirt',
  },
  {
    label: 'Pants',
    value: 'Pants',
  },
  {
    label: 'Shoes',
    value: 'Shoes',
  },
  {
    label: 'Hat',
    value: 'Hat',
  },
];
const initialState: FormState = {
  name: '',
  // type: 'Jacket',
  // size: 'XS',
  // color: '',
  // inventory: 0,
  // price: 0,
  // material: '',
  image: new File([''], 'filename'),
  collection: 'Jacket',
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

const CreateProductModel = ({ open, setIsOpen }: CreateProductModelProps) => {
  const [formState, dispatch] = useReducer(formReducer, initialState);
  const [collection, setCollection] = React.useState<ComboBoxValueProps | null>({
    label: 'Jacket',
    value: 'Jacket',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target ?? e;
    const expectValue = name === 'image' ? (e.target as HTMLInputElement).files![0] : value;
    dispatch({ type: 'SET_FIELD', field: name, value: expectValue });
  };

  const handleOk = () => {
    // Handle form submission (e.g., API call)
    dispatch({ type: 'RESET' });
  };
  const handleCancel = () => {
    setIsOpen && setIsOpen(false);
  };
  return (
    <Modal
      open={open}
      onOk={handleOk}
      onCancel={handleCancel}
      width={'90%'}
      footer={
        [
          // <Button key='back' onClick={handleCancel} loading={false}>
          //   Cancle
          // </Button>,
          // <Button key='submit' isPrimary loading={false} onClick={handleOk}>
          //   Save
          // </Button>,
        ]
      }
    >
      <form className='grid grid-cols-1 md:grid-cols-3 gap-14'>
        {/* Cột 1: Hình ảnh, tên sản phẩm, loại sản phẩm */}
        <div>
          {/* Hình ảnh 1 */}
          <div className="mb-12">
            <label className="w-full h-[50px] border-[0.5px] border-dashed border-[#837F83] flex items-center pl-10 gap-6 px-3 cursor-pointer">
              <input
                type='file'
                accept='image/png, image/jpg'
                name='image1'
                onChange={handleChange}
                className='mt-1 w-full px-3 py-2 border border-gray-300 rounded-md hidden'
              />
              <Upload />
              <div>
                <p className="text-[13px]">
                  Drop your image here, or <span className="font-[gilroy-bold]">browse</span>
                </p>
                {formState.image ? (
                  <p className="font-[gilroy-light] text-[12px]">{formState.image.name}</p>
                ) : (
                  <p className="font-[gilroy-light] text-[12px]">Supports JPG, PNG</p>
                )}
              </div>
            </label>
          </div>


          {/* Hình ảnh 2 */}
          <div className="mb-12 mt-[-40px]">
            <label className="w-full h-[50px] border-[0.5px] border-dashed border-[#837F83] flex items-center pl-10 gap-6 px-3 cursor-pointer">
              <input
                type='file'
                accept='image/png, image/jpg'
                name='image2'
                onChange={handleChange}
                className='mt-1 w-full px-3 py-2 border border-gray-300 rounded-md hidden'
              />
              <Upload />
              <div>
                <p className="text-[13px]">
                  Drop your image here, or <span className="font-[gilroy-bold]">browse</span>
                </p>
                {formState.image ? (
                  <p className="font-[gilroy-light] text-[12px]">{formState.image.name}</p>
                ) : (
                  <p className="font-[gilroy-light] text-[12px]">Supports JPG, PNG</p>
                )}
              </div>
            </label>
          </div>


          {/* Hình ảnh 3 */}
          <div className="mb-12 mt-[-40px]">
            <label className="w-full h-[50px] border-[0.5px] border-dashed border-[#837F83] flex items-center pl-10 gap-6 px-3 cursor-pointer">
              <input
                type='file'
                accept='image/png, image/jpg'
                name='image3'
                onChange={handleChange}
                className='mt-1 w-full px-3 py-2 border border-gray-300 rounded-md hidden'
              />
              <Upload />
              <div>
                <p className="text-[13px]">
                  Drop your image here, or <span className="font-[gilroy-bold]">browse</span>
                </p>
                {formState.image ? (
                  <p className="font-[gilroy-light] text-[12px]">{formState.image.name}</p>
                ) : (
                  <p className="font-[gilroy-light] text-[12px]">Supports JPG, PNG</p>
                )}
              </div>
            </label>
          </div>


          {/* Hình ảnh 4 */}
          <div className="mb-12 mt-[-40px]">
            <label className="w-full h-[50px] border-[0.5px] border-dashed border-[#837F83] flex items-center pl-10 gap-6 px-3 cursor-pointer">
              <input
                type='file'
                accept='image/png, image/jpg'
                name='image4'
                onChange={handleChange}
                className='mt-1 w-full px-3 py-2 border border-gray-300 rounded-md hidden'
              />
              <Upload />
              <div>
                <p className="text-[13px]">
                  Drop your image here, or <span className="font-[gilroy-bold]">browse</span>
                </p>
                {formState.image ? (
                  <p className="font-[gilroy-light] text-[12px]">{formState.image.name}</p>
                ) : (
                  <p className="font-[gilroy-light] text-[12px]">Supports JPG, PNG</p>
                )}
              </div>
            </label>
          </div>


          {/* Hình ảnh 5 */}
          <div className="mb-12 mt-[-40px]">
            <label className="w-full h-[50px] border-[0.5px] border-dashed border-[#837F83] flex items-center pl-10 gap-6 px-3 cursor-pointer">
              <input
                type='file'
                accept='image/png, image/jpg'
                name='image5'
                onChange={handleChange}
                className='mt-1 w-full px-3 py-2 border border-gray-300 rounded-md hidden'
              />
              <Upload />
              <div>
                <p className="text-[13px]">
                  Drop your image here, or <span className="font-[gilroy-bold]">browse</span>
                </p>
                {formState.image ? (
                  <p className="font-[gilroy-light] text-[12px]">{formState.image.name}</p>
                ) : (
                  <p className="font-[gilroy-light] text-[12px]">Supports JPG, PNG</p>
                )}
              </div>
            </label>
          </div>



          {/* Tên sản phẩm */}
          <div className='mb-4'>
            <Input
              name='name'
              label='Name of Product'
              onChange={handleChange}
            ></Input>
          </div>


          {/* Loại sản phẩm */}
          <div className='mb-4'>
            <Input
              name='name'
              label='Type of Product'
              // onChange={handleChange}
              onChange={(value) => handleChange({ target: { name: 'collection', value } } as any)}
            // filterOption={(input, option) =>
            //   (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            // }
            // options={mockData}
            ></Input>
          </div>


          {/* Màu sắc */}
          <div className='mb-4'>
            <Input
              type='text'
              name='color'
              label='Color'
              onChange={handleChange}
            ></Input>
          </div>

        </div>

        {/* Cột 2: Size, Màu sắc, Tồn kho, Giá và Chất liệu */}
        <div className='flex flex-col gap-4'>
          {/* Kích cỡ */}
          <div className='mb-4'>
            <label className='block text-sm font-medium text-gray-700'>Size</label>
            <Select
              id='size'
              className='w-full mt-3'
              // defaultValue={formState.size}
              onChange={(value) => handleChange({ target: { name: 'size', value } } as any)}
              options={[
                { value: 'XS', label: 'XS' },
                { value: 'S', label: 'S' },
                { value: 'M', label: 'M' },
                { value: 'L', label: 'L' },
                { value: 'XL', label: 'XL' },
                { value: 'XXL', label: 'XXL' },
                { value: '3XL', label: '3XL' },
              ]}
            />
          </div>


          <div className="mb-4 row flex justify-content-between">
            {/* Tỉ lệ */}
            <Input
              type="text"
              name="dimensions"
              label="Dimensions"
              maxWidth={150}
              onChange={handleChange}
            />


            <div className='row ml-[120px]'>
              {/* Chống nước */}
              <Input
                type="checkbox"
                name="waterproof"
                label="Waterproof"
                onChange={handleChange}
              />
            </div>




          </div>





          {/* Tồn kho */}
          <div className='mb-4 mt-4 flex items-end'>
            <Input
              type='number'
              name='inventory'
              label='Inventory'
              onChange={handleChange}
            ></Input>
            <span className="ml-3">items</span>
          </div>



          {/* Giá */}
          <div className='mb-4 flex items-end' >
            <Input
              type='number'
              name='price'
              label='Price'
              onChange={handleChange}
            ></Input>
            <span className="ml-3">$/item</span>
          </div>



          {/* Chất liệu */}
          <div className='mb-4 rounded'>
            <Input
              type='text'
              name='material'
              label='Material'
              onChange={handleChange}
            ></Input>
          </div>
        </div>


        {/* Cột 3: Specification, Feature, Sort Description, Additional Information */}
        <div className='flex flex-col gap-4'>
          {/* Specification */}
          <div className='mb-4'>
            <Input
              type='text'
              name='productDesc'
              label='Product Description'
              onChange={handleChange}
            ></Input>
          </div>


          {/* Sort Description */}
          <div className='mb-4 mt-4'>
            <Input
              type='text'
              name='sortDescription'
              label='Sort description of product'
              onChange={handleChange}
            ></Input>
          </div>

          {/* Nguồn gốc */}
          <div className='mb-4'>
            <Input
              type='text'
              name='origin'
              label='Origin'
              onChange={handleChange}
            ></Input>
          </div>

          {/* Feature */}
          {/* <div className='mb-4 mt-6'>
            <Input
              type='text'
              name='feature'
              label='Feature'
              onChange={handleChange}
            ></Input>
          </div> */}





          {/* Additional Information */}
          <div className='mb-4 mt-3'>
            <Input
              type='text'
              name='careInstructions'
              label='Care Instructions'
              onChange={handleChange}
            ></Input>
          </div>


          {/* Add to store Button */}
          <div className='mb-4'>
            <Button
              key='add-to-store'
              isPrimary
              onClick={() => {
                console.log("Product added to store", formState);
                // Handle adding to store logic here
              }}
            >
              Add to store
            </Button>
          </div>
        </div>
      </form>

    </Modal>
  );
};

export default CreateProductModel;
