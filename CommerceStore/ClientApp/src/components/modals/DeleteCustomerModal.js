import React, { useState } from 'react';
import { Button, Confirm } from 'semantic-ui-react';
import './EditCustomerModal.css';
import '../layout/Customers.css';

const DeleteCustomerModal = ({ customer, customers, setCustomers }) => {
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
    const response = await fetch(`api/customers/${customer.id}`, {
      method: 'DELETE'
    });

    //process error
    if (response.ok !== true) {
      console.log(`Customer Creation Failed. status: ${response.status}`);
    }

    const data = await response.clone().json();
    console.log(data);

    // update customer list state
    setCustomers(customers.filter(c => c.id !== customer.id));
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

export default DeleteCustomerModal;
