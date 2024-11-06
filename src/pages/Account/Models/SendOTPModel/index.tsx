import Button from '@components/Button';
import Input from '@components/Input';
import { Form, Modal } from 'antd';

interface SendOTPModelProps {
  isEmailModalOpen: boolean;
  handleSendOTP: () => void;
  handleCancel: () => void;
  loading: boolean;
  userInfo: any;
}

const SenOTPModel = ({
  isEmailModalOpen,
  handleSendOTP,
  handleCancel,
  loading,
  userInfo,
}: SendOTPModelProps) => {
  return (
    <>
      <Modal
        title='Change Password'
        open={isEmailModalOpen}
        onOk={handleSendOTP}
        onCancel={handleCancel}
        footer={[
          <Button key='back' onClick={handleCancel} disabled={loading}>
            Cancle
          </Button>,
          <Button key='submit' isPrimary loading={loading} onClick={handleSendOTP}>
            Send OTP
          </Button>,
        ]}
      >
        <Form className=''>
          <Form.Item>
            <Input
              name='email'
              label='Email'
              type='email'
              defaultValue={userInfo?.email}
              disabled
            ></Input>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default SenOTPModel;
