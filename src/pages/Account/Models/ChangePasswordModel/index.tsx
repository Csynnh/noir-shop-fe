import Input from '@components/Input';
import Button from '@components/Button';
import { Form, Modal } from 'antd';

interface ChangePasswordModelProps {
  isChangePasswordModalOpen: boolean;
  handleCancel: () => void;
  handleChangePassword: () => void;
  handlePasswordStateChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  loading: boolean;
}

const ChangePasswordModel = ({
  isChangePasswordModalOpen,
  handleCancel,
  handleChangePassword,
  handlePasswordStateChange,
  loading,
}: ChangePasswordModelProps) => {
  return (
    <>
      <Modal
        open={isChangePasswordModalOpen}
        onOk={handleChangePassword}
        onCancel={handleCancel}
        footer={[
          <Button key='back' onClick={handleCancel} disabled={loading}>
            Cancle
          </Button>,
          <Button key='submit' isPrimary loading={loading} onClick={handleChangePassword}>
            Save
          </Button>,
        ]}
      >
        <Form className=''>
          <Form.Item>
            <Input
              name='newPassword'
              label='New Password'
              type='password'
              onChange={handlePasswordStateChange}
            ></Input>
          </Form.Item>
          <Form.Item>
            <Input
              name='confirmNewPassword'
              label='Confirm Password'
              type='password'
              onChange={handlePasswordStateChange}
            ></Input>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ChangePasswordModel;
