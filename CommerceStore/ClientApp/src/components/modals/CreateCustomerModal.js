import React, { useState } from 'react';
import { Button, Modal, Input } from 'semantic-ui-react';
import './EditCustomerModal.css';
import '../layout/Customers.css';

const CreateCustomerModal = ({ customers, setCustomers }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');

  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);

  const changeData = async () => {
    let customer = { name: name.trim(), address: address.trim() };
    console.log(JSON.stringify(customer));

    const response = await fetch(`api/customers`, {
      method: 'POST',
      body: JSON.stringify(customer),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    //process error
    if (response.ok !== true) {
      console.log(`Customer Creation Failed. status: ${response.status}`);
    }

    const data = await response.clone().json();
    console.log(data);

    // update customer list state
    setCustomers([data, ...customers]);
  };

  const onSubmit = e => {
    e.preventDefault();
    if (name.trim() === '' || address.trim() === '') {
      errorMessage('Please enter all fields');
      return false;
    } else {
      changeData();
    }
    handleClose();
  };

  const onClose = () => {
    setName('');
    setAddress('');

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
          New Customer
        </Button>
      }
      open={modalOpen}
      onClose={handleClose}
      style={{
        height: '23rem',
        position: 'relative'
      }}
    >
      <Modal.Header>Create Customer</Modal.Header>
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
            <div className='address-div'>
              <label htmlFor='address'>Address: </label>
              <Input
                name='address'
                value={address}
                onChange={e => setAddress(e.target.value)}
                placeholder='Adderss'
              />
            </div>
            <br />
            <div className='buttons'>
              <Button type='submit' color='blue' className='submit-button'>
                Create
              </Button>
              <Button type='button' color='gray' onClick={onClose}>
                Cancel
              </Button>
            </div>
          </form>
          {/* <p>Is it okay to use this photo?</p> */}
        </Modal.Description>
      </Modal.Content>
    </Modal>
  );
};

export default CreateCustomerModal;
