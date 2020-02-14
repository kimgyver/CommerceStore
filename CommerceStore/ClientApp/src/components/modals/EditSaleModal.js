import React, { useState, useEffect } from 'react';
import { Button, Modal, Input } from 'semantic-ui-react';
import './Modals.css';
import '../layout/Layout.css';
import {
  date2string,
  string2date,
  ISO2date,
  date2ISO
} from '../../utility/date';

const EditSaleModal = ({ sale, sales, setSales }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [dateSold, setDateSold] = useState('');
  const [customerId, setCustomerId] = useState(sale.customerId);
  const [productId, setProductId] = useState(sale.productId);
  const [storeId, setStoreId] = useState(sale.storeId);
  const [loading, setLoading] = useState(true);

  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [stores, setStores] = useState([]);

  useEffect(() => {
    if (modalOpen) {
      populateData();
      setDateSold(date2string(ISO2date(sale.dateSold)));
    }
  }, [modalOpen]);

  const populateData = async () => {
    // data load for selectbox
    const responseCustomers = await fetch('api/customers');
    const c = await responseCustomers.json();
    setCustomers(c);
    const responseProducts = await fetch('api/products');
    const p = await responseProducts.json();
    setProducts(p);
    const responseStores = await fetch('api/stores');
    const s = await responseStores.json();
    setStores(s);

    // initial value for customer/product/store
    setCustomerId(sale.customerId);
    setProductId(sale.productId);
    setStoreId(sale.storeId);

    setLoading(false);
  };

  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);

  const changeData = async () => {
    const date = string2date(dateSold.trim());
    const dateISO = date2ISO(date);

    const bodyString = `{ "id": ${sale.id}, "dateSold": "${dateISO}", "customerId": ${customerId}, "productId": ${productId}, "storeId": ${storeId} }`;
    console.log(bodyString);
    const response = await fetch(`api/sales/${sale.id}`, {
      method: 'PUT',
      //body: JSON.stringify(sale),
      body: bodyString,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    //process error
    if (response.ok !== true) {
      console.log(`Sale Creation Failed. Status No.: ${response.status}`);
      errorMessage(`Sale Creation Failed. Status No.: ${response.status}`);
    }
    const data = await response.clone().json();
    console.log(data);
    // update sale list state
    setSales(sales.map(s => (s.id === sale.id ? data : s)));
  };

  const onSubmit = e => {
    e.preventDefault();
    if (
      customerId === '' ||
      productId === '' ||
      storeId === '' ||
      dateSold === ''
    ) {
      errorMessage('Please enter all fields');
      return false;
    }

    changeData();
    handleClose();
  };

  const onClose = () => {
    setCustomerId('');
    setProductId('');
    setStoreId('');
    setDateSold('');

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

  if (modalOpen && loading) {
    return (
      <p>
        <em>Loading...</em>
      </p>
    );
  }

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
        height: '30rem',
        position: 'relative'
      }}
    >
      <Modal.Header>Modify Sale</Modal.Header>
      <div className='alert-message' />
      <Modal.Content>
        <Modal.Description>
          {/* <Header>Default Profile Image</Header> */}
          <form onSubmit={onSubmit}>
            <div className='dateSold-div'>
              <label htmlFor='dateSold'>
                Date Sold: (DD/MM/YYYY HH:mm:ss){' '}
              </label>
              <Input
                name='dateSold'
                value={dateSold}
                onChange={e => setDateSold(e.target.value)}
                placeholder='Date Sold'
              />
            </div>
            <div className='customer-div'>
              <label htmlFor='customer'>Customer: </label>
              <select
                className='ui dropdown'
                value={customerId}
                onChange={e => setCustomerId(e.target.value)}
              >
                {customers &&
                  customers.length > 0 &&
                  customers.map(c => (
                    <option value={c.id} key={c.id}>
                      {c.name} (id={c.id})
                    </option>
                  ))}
              </select>
            </div>
            <div className='product-div'>
              <label htmlFor='product'>Product: </label>
              <select
                className='ui dropdown'
                value={productId}
                onChange={e => setProductId(e.target.value)}
              >
                {products &&
                  products.length > 0 &&
                  products.map(p => (
                    <option value={p.id} key={p.id}>
                      {p.name} (id={p.id})
                    </option>
                  ))}
              </select>
            </div>
            <div className='store-div'>
              <label htmlFor='store'>Store: </label>
              <select
                className='ui dropdown'
                value={storeId}
                onChange={e => setStoreId(e.target.value)}
              >
                {stores &&
                  stores.length > 0 &&
                  stores.map(s => (
                    <option value={s.id} key={s.id}>
                      {s.name} (id={s.id})
                    </option>
                  ))}
              </select>
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

export default EditSaleModal;
