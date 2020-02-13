import React, { useState, useEffect } from 'react';
import EditSaleModal from '../modals/EditSaleModal';
import CreateSaleModal from '../modals/CreateSaleModal';
import DeleteSaleModal from '../modals/DeleteSaleModal';
import './Layout.css';

const Sales = () => {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    populateData();
  }, []);

  const populateData = async () => {
    const response = await fetch('api/sales');
    const data = await response.json();
    setSales(data);
    setLoading(false);
  };

  const date2string = (date, showDate, showTime) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const minutes = date.getMinutes();
    const hours = date.getHours();
    const seconds = date.getSeconds();
    let text = '';
    if (showDate) {
      text += `${day < 10 ? `0${day}` : day}/${
        month < 10 ? `0${month}` : month
      }/${year} `;
    }

    if (showTime) {
      text += `${hours < 10 ? `0${hours}` : hours}:${
        minutes < 10 ? `0${minutes}` : minutes
      }:${seconds < 10 ? `0${seconds}` : seconds}`;
    }

    return text;
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
          <th className='store-th'>Store</th>
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
            <td>{date2string(new Date(sale.dateSold), true, true)}</td>
            <td>
              <EditSaleModal sale={sale} sales={sales} setSales={setSales} />
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
      <CreateSaleModal sales={sales} setSales={setSales} />
      <p />
      {contents}
    </div>
  );
};

export default Sales;
