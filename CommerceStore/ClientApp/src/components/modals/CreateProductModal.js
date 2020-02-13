import React, { useState } from 'react';
import { Button, Modal, Input } from 'semantic-ui-react';
import './Modals.css';
import '../layout/Layout.css';

const CreateProductModal = ({ products, setProducts }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);

  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);

  const changeData = async () => {
    let product = { name: name.trim(), price: Number(price) };
    //console.log(JSON.stringify(product));

    const response = await fetch(`api/products`, {
      method: 'POST',
      //body: JSON.stringify(product),
      body: `{ "name": "${product.name}", "price": ${product.price} }`,
      headers: {
        'Content-Type': 'application/json'
      }
    });

    //console.log(response.clone().json());
    //process error
    if (response.ok !== true) {
      console.log(`Product Creation Failed. Status No.: ${response.status}`);
      errorMessage(`Product Creation Failed. Status No.: ${response.status}`);
    }

    const data = await response.clone().json();
    console.log(data);

    // update product list state
    setProducts([data, ...products]);
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
    setName('');
    setPrice(0);

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
        <Button color='blue' onClick={handleOpen}>
          New Product
        </Button>
      }
      open={modalOpen}
      onClose={handleClose}
      style={{
        height: '23rem',
        position: 'relative'
      }}
    >
      <Modal.Header>Create Product</Modal.Header>
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
                Create
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

export default CreateProductModal;
