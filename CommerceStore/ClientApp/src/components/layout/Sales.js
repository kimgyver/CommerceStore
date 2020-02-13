import React, { useState, useEffect } from 'react';
//import EditSaleModal from '../modals/EditSaleModal';
//import CreateSaleModal from '../modals/CreateSaleModal';
import DeleteSaleModal from '../modals/DeleteSaleModal';
import './Layout.css';

const Sales = () => {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    populateWeatherData();
  }, []);

  const populateWeatherData = async () => {
    const response = await fetch('api/sales');
    const data = await response.json();
    setSales(data);
    setLoading(false);
  };

  let contents = loading ? (
    <p>
      <em>Loading...</em>
    </p>
  ) : (
    <table className='table table-striped sales' aria-labelledby='tabelLabel'>
      <thead>
        <tr>
          <th className='customer-th'>Customer</th>
          <th className='product-th'>Product</th>
          <th className='store-th'>Stoer</th>
          <th className='datesold-th'>Date Sold</th>
          <th className='edit-th'>Edit</th>
          <th className='delete-th'>Delete</th>
        </tr>
      </thead>

      <tbody>
        {sales.map(sale => (
          <tr key={sale.id}>
            <td>{sale.customerName}</td>
            <td>{sale.productName}</td>
            <td>{sale.storeName}</td>
            <td>{sale.dateSold}</td>
            <td>
              {/* <EditSaleModal sale={sale} sales={sales} setSales={setSales} /> */}
            </td>
            <td>
              <DeleteSaleModal sale={sale} sales={sales} setSales={setSales} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div>
      <h3 id='tabelLabel'>Sales</h3>
      {/* <CreateSaleModal sales={sales} setSales={setSales} /> */}
      <p />
      {contents}
    </div>
  );
};

export default Sales;
