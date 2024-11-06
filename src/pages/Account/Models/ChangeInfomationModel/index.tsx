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
}

const ChangeInformationModel = ({
  isAccountInfoModalOpen,
  handleOk,
  handleCancel,
  handleUserInfoChange,
  userInfoState,
  userInfo,
}: ChangeInformationModelProps) => {
  return (
    <>
      <Modal
        title='My Information'
        open={isAccountInfoModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key='back' onClick={handleCancel} loading={false}>
            Cancle
          </Button>,
          <Button key='submit' isPrimary loading={false} onClick={handleOk}>
            Save
          </Button>,
        ]}
      >
        <Form className=''>
          <Form.Item>
            <Input
              name='username'
              label='Username'
              onChange={handleUserInfoChange}
              defaultValue={userInfoState.username}
            ></Input>
          </Form.Item>
          <Form.Item>
            <Input
              name='email'
              label='Email'
              type='email'
              onChange={handleUserInfoChange}
              defaultValue={userInfo?.email}
            ></Input>
          </Form.Item>
          <Form.Item>
            <Input
              name='password'
              label='Password'
              type='password'
              onChange={handleUserInfoChange}
            ></Input>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ChangeInformationModel;
