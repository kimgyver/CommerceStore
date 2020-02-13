import React, { useState, useEffect } from 'react';
import { Button, Modal, Input } from 'semantic-ui-react';
import './Modals.css';
import '../layout/Layout.css';

const CreateSaleModal = ({ sales, setSales }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [dateSold, setDateSold] = useState('');
  const [customerId, setCustomerId] = useState('');
  const [productId, setProductId] = useState('');
  const [storeId, setStoreId] = useState('');
  const [loading, setLoading] = useState(true);

  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [stores, setStores] = useState([]);

  useEffect(() => {
    if (modalOpen) {
      populateData();
      setDateSold(new Date().toLocaleString());
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
    if (c && c.length > 0) {
      setCustomerId(c[0].id);
    }
    if (p && p.length > 0) {
      setProductId(p[0].id);
    }
    if (s && s.length > 0) {
      setStoreId(s[0].id);
    }
    setLoading(false);
  };

  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);

  const date2ISO = date => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const minutes = date.getMinutes();
    const hours = date.getHours();
    const seconds = date.getSeconds();
    let text = '';
    text += `${year}-${month < 10 ? `0${month}` : month}-${
      day < 10 ? `0${day}` : day
    }`;
    text += `T${hours < 10 ? `0${hours}` : hours}:${
      minutes < 10 ? `0${minutes}` : minutes
    }:${seconds < 10 ? `0${seconds}` : seconds}`;

    return text;
  };

  const changeData = async () => {
    //const dateISO = new Date(dateSold.trim()).toISOString();
    const dateISO = date2ISO(new Date(dateSold.trim()));
    let sale = { dateSold: dateISO, customerId, productId, storeId };
    //console.log(JSON.stringify(sale));

    const bodyString = `{ "dateSold": "${dateISO}", "customerId": ${customerId}, "productId": ${productId}, "storeId": ${storeId} }`;
    console.log(bodyString);
    const response = await fetch(`api/sales`, {
      method: 'POST',
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
    setSales([data, ...sales]);
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
        <Button color='blue' onClick={handleOpen}>
          New Sale
        </Button>
      }
      open={modalOpen}
      onClose={handleClose}
      style={{
        height: '30rem',
        position: 'relative'
      }}
    >
      <Modal.Header>Create Sale</Modal.Header>
      <div className='alert-message' />
      <Modal.Content>
        <Modal.Description>
          {/* <Header>Default Profile Image</Header> */}
          <form onSubmit={onSubmit}>
            <div className='dateSold-div'>
              <label htmlFor='dateSold'>Date Sold: </label>
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
                      {c.name} (id = {c.id})
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
                      {p.name} (id = {p.id})
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
                      {s.name} (id = {s.id})
                    </option>
                  ))}
              </select>
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

export default CreateSaleModal;
