import React, { useState } from 'react';
import { Button, Confirm } from 'semantic-ui-react';
import './Modals.css';
import '../layout/Layout.css';

const DeleteProductModal = ({ product, products, setProducts }) => {
  const [open, setOpen] = useState(false);

  const show = () => setOpen(true);
  const handleConfirm = () => {
    deleteData();
    setOpen(false);
  };
  const handleCancel = () => {
    setOpen(false);
  };

  const deleteData = async () => {
    const response = await fetch(`api/products/${product.id}`, {
      method: 'DELETE'
    });

    //process error
    if (response.ok !== true) {
      console.log(`Product Remove Failed. status: ${response.status}`);
      window.alert(`Product Remove Failed. status: ${response.status}`);
    }

    const data = await response.clone().json();
    console.log(data);

    // update product list state
    setProducts(products.filter(c => c.id !== product.id));
  };

  return (
    <div>
      <Button onClick={show} color='red' className='button-in-table'>
        Delete
      </Button>
      <Confirm
        open={open}
        onCancel={handleCancel}
        onConfirm={handleConfirm}
        style={{
          height: '10rem',
          position: 'relative'
        }}
      />
    </div>
  );
};

export default DeleteProductModal;
