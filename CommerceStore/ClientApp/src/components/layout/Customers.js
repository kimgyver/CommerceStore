import React, { useState, useEffect } from 'react';
import EditCustomerModal from '../modals/EditCustomerModal';
import CreateCustomerModal from '../modals/CreateCustomerModal';
import DeleteCustomerModal from '../modals/DeleteCustomerModal';
import './Layout.css';

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    populateWeatherData();
  }, []);

  const populateWeatherData = async () => {
    const response = await fetch('api/customers');
    const data = await response.json();
    setCustomers(data);
    setLoading(false);
  };

  let contents = loading ? (
    <p>
      <em>Loading...</em>
    </p>
  ) : (
    <table
      className='table table-striped customers'
      aria-labelledby='tabelLabel'
    >
      <thead>
        <tr>
          <th className='name-th'>Name</th>
          <th className='address-th'>Address</th>
          <th className='edit-th'>Edit</th>
          <th className='delete-th'>Delete</th>
        </tr>
      </thead>

      <tbody>
        {customers.map(customer => (
          <tr key={customer.id}>
            <td>{customer.name}</td>
            <td>{customer.address}</td>
            <td>
              <EditCustomerModal
                customer={customer}
                customers={customers}
                setCustomers={setCustomers}
              />
            </td>
            <td>
              <DeleteCustomerModal
                customer={customer}
                customers={customers}
                setCustomers={setCustomers}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div>
      <h3 id='tabelLabel'>Customers</h3>
      <CreateCustomerModal customers={customers} setCustomers={setCustomers} />
      <p />
      {contents}
    </div>
  );
};

export default Customers;
