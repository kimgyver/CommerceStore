import React, { useState } from 'react';
import { Button, Modal, Input } from 'semantic-ui-react';
import './Modals.css';
import '../layout/Layout.css';

const EditStoreModal = ({ store, stores, setStores }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState(store.name);
  const [address, setAddress] = useState(store.address);

  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);

  const changeData = async () => {
    store.name = name.trim();
    store.address = address.trim();
    console.log(JSON.stringify(store));

    const response = await fetch(`api/stores/${store.id}`, {
      method: 'PUT',
      body: JSON.stringify(store),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // process error
    if (response.ok !== true) {
      if (response.status === 400) {
        console.log('Store Not Found');
        errorMessage('Store Not Found');
      } else {
        errorMessage(
          `Store Modification Failed. Status No.: ${response.status}`
        );
      }
    }

    // update store list state
    setStores(stores.map(s => (s.id === store.id ? store : s)));
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
    setName(store.name);
    setAddress(store.address);

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
      <Modal.Header>Modify Store</Modal.Header>
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

export default EditStoreModal;
