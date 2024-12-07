import Button from '@components/Button';
import { ComboBox, ComboBoxValueProps } from '@components/ComboBox';
import Upload from '@components/Icons/Upload';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@ui/accordion';
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
      <div className=''>
        <h2 className='text-2xl font-[gilroy-bold] mb-7'>Add new product</h2>
        <form className='grid grid-cols-[1fr_1fr_1.67fr] h-full gap-14'>
          <div className=''>
            <div className='mb-12'>
              <label className='w-full h-full border-[0.5px] border-dashed border-[#837F83] aspect-[0.9] flex items-center justify-center flex-col gap-3 cursor-pointer'>
                <input
                  type='file'
                  accept='image/png, image/jpg'
                  name='image'
                  // value={formState.image}
                  onChange={handleChange}
                  className='mt-1 w-full px-3 py-2 border border-gray-300 rounded-md hidden'
                />
                <div className=''>
                  <Upload></Upload>
                </div>
                <p className='text-[15px]'>
                  Drop your image here , or <span className='font-[gilroy-bold]'>browse</span>
                </p>
                {formState.image ? (
                  <p className='font-[gilroy-light]'>{formState.image.name}</p>
                ) : (
                  <p className='font-[gilroy-light]'>Supports JPG, PNG</p>
                )}
              </label>
            </div>
            <div className='mb-4'>
              <label className='block text-sm font-medium text-gray-700'>Name of Product</label>
              <input
                type='text'
                name='name'
                value={formState.name}
                onChange={handleChange}
                className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md'
              />
            </div>
            <div className='mb-4'>
              <label className='block text-sm font-medium text-gray-700'>Type of Product</label>
              <Select
                id='collection'
                className='w-full'
                showSearch
                onChange={(value) => handleChange({ target: { name: 'collection', value } } as any)}
                filterOption={(input, option) =>
                  (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                }
                options={[
                  { value: 'Collection', label: 'Collection' },
                  { value: 'Bag', label: 'Bag' },
                  { value: 'Jacket', label: 'Jacket' },
                ]}
              />
            </div>
          </div>
          <div className=''></div>
          <div className=''></div>
        </form>
      </div>
    </Modal>
  );
};

export default CreateProductModel;
