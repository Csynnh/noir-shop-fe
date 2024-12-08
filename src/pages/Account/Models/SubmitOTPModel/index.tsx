import Button from '@components/Button';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@ui/input-otp';
import { Form, Modal } from 'antd';
import { REGEXP_ONLY_DIGITS } from 'input-otp';

interface SubmitOTPModelProps {
  isOTPModalOpen: boolean;
  handleCancel: () => void;
  handleSubmitOTP: () => void;
  handleResendOtp: () => void;
  loading: boolean;
  userInfo: any;
  otpValue: string;
  setOtpValue: (value: string) => void;
  type?: string;
}

const SubmitOTPModel = ({
  isOTPModalOpen,
  handleCancel,
  handleSubmitOTP,
  handleResendOtp,
  loading,
  userInfo,
  otpValue,
  setOtpValue,
  type,
}: SubmitOTPModelProps) => {
  return (
    <>
      <Modal
        open={isOTPModalOpen}
        onOk={handleSubmitOTP}
        onCancel={handleCancel}
        footer={[
          <Button key='back' onClick={handleCancel} disabled={loading}>
            Cancle
          </Button>,
          <Button key='submit' isPrimary loading={loading} onClick={handleSubmitOTP}>
            Next
          </Button>,
        ]}
      >
        <Form className=''>
          <div className='text-center mb-10'>
            <h2 className='text-3xl font-[channe] leading-[1.5]'>Confirm OTP</h2>
            <p className='leading-[2]'>
              Enter the code sent to{' '}
              <span className='font-[gilroy-light-italic]'>{userInfo?.email}</span> to confirm
              change {type || 'password'}
            </p>
          </div>
          <Form.Item className='mb-10'>
            <InputOTP
              maxLength={6}
              pattern={REGEXP_ONLY_DIGITS}
              onChange={setOtpValue}
              value={otpValue}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </Form.Item>
          <div className=' font-[gilroy-light-italic] text-center mb-7' onClick={handleResendOtp}>
            <span className='cursor-pointer hover:text-[#ab69a8] border-b-[0.5px] border-b-black hover:border-b-[#ab69a8] transition-all'>
              Resend OTP code
            </span>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default SubmitOTPModel;
