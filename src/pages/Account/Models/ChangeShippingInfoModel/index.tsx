import Button from '@components/Button';
import Input from '@components/Input';
import { Form, Modal } from 'antd';

interface ChangeShippingInfoModelProps {
  isShipppingInfoModalOpen: boolean;
  handleCancel: () => void;
  handleSaveShippingInfo: () => void;
  handleShippingInfoChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  loading: boolean;
}

const ChangeShippingInfoModel = ({
  isShipppingInfoModalOpen,
  handleCancel,
  handleSaveShippingInfo,
  handleShippingInfoChange,
  loading,
}: ChangeShippingInfoModelProps) => {
  return (
    <>
      <Modal
        title='Shipping Information'
        open={isShipppingInfoModalOpen}
        onOk={handleSaveShippingInfo}
        onCancel={handleCancel}
        footer={[
          <Button key='back_ship' onClick={handleCancel} disabled={loading}>
            Cancle
          </Button>,
          <Button key='submit_ship' isPrimary loading={loading} onClick={handleSaveShippingInfo}>
            Save
          </Button>,
        ]}
      >
        <Form className=''>
          <Form.Item>
            <Input name='address' label='Address' onChange={handleShippingInfoChange}></Input>
          </Form.Item>
          <Form.Item>
            <Input name='name' label='Name' onChange={handleShippingInfoChange}></Input>
          </Form.Item>
          <Form.Item>
            <Input
              name='phone'
              label='Phone Number'
              type='number'
              onChange={handleShippingInfoChange}
            ></Input>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ChangeShippingInfoModel;
