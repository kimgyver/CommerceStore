import React, { useState, useEffect } from 'react';
import EditStoreModal from '../modals/EditStoreModal';
import CreateStoreModal from '../modals/CreateStoreModal';
import DeleteStoreModal from '../modals/DeleteStoreModal';
import './Layout.css';

const Stores = () => {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    populateData();
  }, []);

  const populateData = async () => {
    const response = await fetch('api/stores');
    const data = await response.json();
    setStores(data);
    setLoading(false);
  };

  let contents = loading ? (
    <p>
      <em>Loading...</em>
    </p>
  ) : (
    <table className='table table-striped stores' aria-labelledby='tabelLabel'>
      <thead>
        <tr>
          <th className='name-th'>Name</th>
          <th className='address-th'>Address</th>
          <th className='edit-th'>Edit</th>
          <th className='delete-th'>Delete</th>
        </tr>
      </thead>

      <tbody>
        {stores.map(store => (
          <tr key={store.id}>
            <td>{store.name}</td>
            <td>{store.address}</td>
            <td>
              <EditStoreModal
                store={store}
                stores={stores}
                setStores={setStores}
              />
            </td>
            <td>
              <DeleteStoreModal
                store={store}
                stores={stores}
                setStores={setStores}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div>
      {/* <h3 id='tabelLabel'>Stores</h3> */}
      <CreateStoreModal stores={stores} setStores={setStores} />
      <p />
      {contents}
    </div>
  );
};

export default Stores;
