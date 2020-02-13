import React, { useState } from 'react';
import { Button, Modal, Input } from 'semantic-ui-react';
import './Modals.css';
import '../layout/Layout.css';

const EditProductModal = ({ product, products, setProducts }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.price);

  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);

  const changeData = async () => {
    product.name = name.trim();
    product.price = Number(price);

    const response = await fetch(`api/products/${product.id}`, {
      method: 'PUT',
      //body: JSON.stringify(product),
      body: `{ "id": ${product.id}, "name": "${product.name}", "price": ${product.price} }`,
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // process error
    //console.log(response.clone().json());
    if (response.ok !== true) {
      if (response.status === 400) {
        console.log('Product Not Found');
        errorMessage('Product Not Found');
      } else {
        errorMessage(
          `Product Modification Failed. Status No.: ${response.status}`
        );
      }
    }

    // update product list state
    //console.log(products);
    setProducts(products.map(p => (p.id === product.id ? product : p)));
  };

  const onSubmit = e => {
    e.preventDefault();
    if (name.trim() === '' || price.trim() === '') {
      errorMessage('Please enter all fields');
      return false;
    }
    if (isNaN(price)) {
      errorMessage('Price should be numeric');
      return false;
    }

    changeData();
    handleClose();
  };

  const onClose = () => {
    setName(product.name);
    setPrice(product.price);

    handleClose();
  };

  const errorMessage = msg => {
    const message = document.querySelector('.alert-message');
    message.textContent = msg;
    message.style.backgroundColor = 'red';
    message.style.padding = '1rem 5rem 1rem 5rem';

    setTimeout(() => {
      message.textContent = '';
      message.style.padding = '0';
    }, 3000);
  };

  return (
    <Modal
      trigger={
        <Button color='yellow' onClick={handleOpen} className='button-in-table'>
          Edit
        </Button>
      }
      open={modalOpen}
      onClose={handleClose}
      style={{
        height: '23rem',
        position: 'relative'
      }}
    >
      <Modal.Header>Modify Product</Modal.Header>
      <div className='alert-message' />
      <Modal.Content>
        <Modal.Description>
          {/* <Header>Default Profile Image</Header> */}
          <form onSubmit={onSubmit}>
            <div className='name-div'>
              <label htmlFor='name'>Name: </label>
              <Input
                name='name'
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder='Name'
              />
            </div>
            <div className='price-div'>
              <label htmlFor='price'>Price: </label>
              <Input
                name='price'
                value={price}
                onChange={e => setPrice(e.target.value)}
                placeholder='Price'
              />
            </div>
            <br />
            <div className='buttons'>
              <Button type='submit' color='blue' className='submit-button'>
                Modify
              </Button>
              <Button type='button' color='grey' onClick={onClose}>
                Cancel
              </Button>
            </div>
          </form>
        </Modal.Description>
      </Modal.Content>
    </Modal>
  );
};

export default EditProductModal;
