import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import './NavMenu.css';

const selectButton = menuName => {
  document.querySelector('.nav-button.customers').classList.remove('selected');
  document.querySelector('.nav-button.products').classList.remove('selected');
  document.querySelector('.nav-button.stores').classList.remove('selected');
  document.querySelector('.nav-button.sales').classList.remove('selected');
  document.querySelector('.nav-button.home').classList.remove('selected');

  if (menuName === 'customers') {
    document.querySelector('.nav-button.customers').classList.add('selected');
  } else if (menuName === 'products') {
    document.querySelector('.nav-button.products').classList.add('selected');
  } else if (menuName === 'stores') {
    document.querySelector('.nav-button.stores').classList.add('selected');
  } else if (menuName === 'sales') {
    document.querySelector('.nav-button.sales').classList.add('selected');
  } else if (menuName === 'home') {
    document.querySelector('.nav-button.home').classList.add('selected');
  }
};

const NaviMenu = ({ history }) => {
  useEffect(() => {
    selectButton('home');
  }, []);

  return (
    <div className='nav-top-div'>
      <div
        className='title nav-button home'
        onClick={() => {
          history.push('/');
          selectButton('home');
        }}
      >
        Welcome To StoreHub
      </div>
      <div className='menu'>
        <div
          className='nav-button customers'
          onClick={() => {
            history.push('/customers');
            selectButton('customers');
          }}
        >
          Customers
        </div>

        <div
          className='nav-button products'
          onClick={() => {
            history.push('/products');
            selectButton('products');
          }}
        >
          Products
        </div>

        <div
          className='nav-button stores'
          onClick={() => {
            history.push('/stores');
            selectButton('stores');
          }}
        >
          Stores
        </div>

        <div
          className='nav-button sales'
          onClick={() => {
            history.push('/sales');
            selectButton('sales');
          }}
        >
          Sales
        </div>
      </div>
    </div>
  );
};

export default withRouter(NaviMenu);
