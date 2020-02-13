import React, { useState } from 'react';
import { Button, Confirm } from 'semantic-ui-react';
import './Modals.css';
import '../layout/Layout.css';

const DeleteStoreModal = ({ store, stores, setStores }) => {
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
    const response = await fetch(`api/stores/${store.id}`, {
      method: 'DELETE'
    });

    //process error
    if (response.ok !== true) {
      console.log(`Store Creation Failed. status: ${response.status}`);
      window.alert(`Store Creation Failed. status: ${response.status}`);
    }

    const data = await response.clone().json();
    console.log(data);

    // update store list state
    setStores(stores.filter(c => c.id !== store.id));
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

export default DeleteStoreModal;
