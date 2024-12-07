import { Form, Modal } from 'antd';
import Button from '@components/Button';
import Input from '@components/Input';
import { UserInfoState } from '@pages/Account/reducer';
import { UserInfo } from '@contexts/AuthContext';

interface ChangeInformationModelProps {
  isAccountInfoModalOpen: boolean;
  handleOk: () => void;
  handleCancel: () => void;
  handleUserInfoChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  userInfoState: UserInfoState;
  userInfo: UserInfo | null;
  loading: boolean;
}

const ChangeInformationModel = ({
  isAccountInfoModalOpen,
  handleOk,
  handleCancel,
  handleUserInfoChange,
  userInfoState,
  loading,
}: ChangeInformationModelProps) => {
  return (
    <>
      <Modal
        title='My Information'
        open={isAccountInfoModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key='back' onClick={handleCancel} disabled={loading}>
            Cancle
          </Button>,
          <Button key='submit' isPrimary loading={loading} onClick={handleOk}>
            Save
          </Button>,
        ]}
      >
        <Form className=''>
          <Form.Item>
            <Input
              name='name'
              label='Name'
              onChange={handleUserInfoChange}
              defaultValue={userInfoState.name}
              disabled={loading}
            ></Input>
          </Form.Item>
          <Form.Item>
            <Input
              name='email'
              label='Email'
              type='email'
              onChange={handleUserInfoChange}
              defaultValue={userInfoState?.email}
              disabled={loading}
            ></Input>
          </Form.Item>
          <Form.Item>
            <Input
              name='phone'
              label='Phone number'
              type='phone'
              defaultValue={userInfoState?.phone}
              onChange={handleUserInfoChange}
              disabled={loading}
            ></Input>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ChangeInformationModel;
