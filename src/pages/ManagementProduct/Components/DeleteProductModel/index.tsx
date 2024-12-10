import React from 'react';
import { Modal } from 'antd';
import Button from '@components/Button';

interface DeleteProductModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  productName: string | null; // Tên sản phẩm
}

const DeleteProductModal: React.FC<DeleteProductModalProps> = ({
  open,
  onClose,
  onConfirm,
  productName,
}) => {
  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      closable={true}
      closeIcon={<span style={{ fontSize: '18px', fontWeight: 'bold' }}>×</span>}
      title='Confirm delete product'
    >
      <div className='text-center'>
        <p className='mb-10'>
          Are you sure you want to delete <span className='font-bold'>{productName}</span> product?
        </p>
        <div className='flex justify-center gap-4'>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={onConfirm} isPrimary>
            Ok
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteProductModal;
