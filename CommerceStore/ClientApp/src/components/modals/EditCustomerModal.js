import React, { useState } from 'react';
import { Button, Header, Modal, Input } from 'semantic-ui-react';
import './EditCustomerModal.css';
import '../layout/Customers.css';

const EditCustomerModal = ({ customer, customers, setCustomers }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState(customer.name);
  const [address, setAddress] = useState(customer.address);

  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);

  const changeData = async () => {
    customer.name = name.trim();
    customer.address = address.trim();
    console.log(JSON.stringify(customer));

    const response = await fetch(`api/customers/${customer.id}`, {
      method: 'PUT',
      body: JSON.stringify(customer),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // process error
    if (response.ok !== true) {
      if (response.status === 400) {
        console.log('Customer Not Found');
      }
    }

    // update customer list state
    setCustomers(customers.map(c => (c.id === customer.id ? customer : c)));
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
    setName(customer.name);
    setAddress(customer.address);

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
      onClose={() => handleClose()}
      style={{
        height: '23rem',
        position: 'relative'
      }}
    >
      <Modal.Header>Modify Customer</Modal.Header>
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
                Modify
              </Button>
              <Button type='button' color='gray' onClick={() => onClose()}>
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

export default EditCustomerModal;
