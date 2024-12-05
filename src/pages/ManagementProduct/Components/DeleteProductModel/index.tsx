import React from 'react';
import { Modal, Button } from 'antd';

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
      closeIcon={<span style={{ fontSize: '18px', fontWeight: 'bold' }}>×</span>} // Icon X ở góc phải
    >
      <div className="text-center">
        <p style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '16px' }}>
          Delete {productName ? `"${productName}"` : "này"}?
        </p>
        <div className="flex justify-center gap-4">
          <Button onClick={onClose} style={{ backgroundColor: '#f0f0f0' }}>
            Cancel
          </Button>
          <Button onClick={onConfirm} type="primary" danger>
            Ok
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteProductModal;
