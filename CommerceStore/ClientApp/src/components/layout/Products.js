import React, { useState, useEffect } from 'react';
import EditProductModal from '../modals/EditProductModal';
import CreateProductModal from '../modals/CreateProductModal';
import DeleteProductModal from '../modals/DeleteProductModal';
import './Layout.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    populateData();
  }, []);

  const populateData = async () => {
    const response = await fetch('api/products');
    const data = await response.json();
    setProducts(data);
    setLoading(false);
  };

  let contents = loading ? (
    <p>
      <em>Loading...</em>
    </p>
  ) : (
    <table
      className='table table-striped products'
      aria-labelledby='tabelLabel'
    >
      <thead>
        <tr>
          <th className='name-th'>Name</th>
          <th className='price-th'>Price</th>
          <th className='edit-th'>Edit</th>
          <th className='delete-th'>Delete</th>
        </tr>
      </thead>

      <tbody>
        {products.map(product => (
          <tr key={product.id}>
            <td>{product.name}</td>
            <td>${product.price}</td>
            <td>
              <EditProductModal
                product={product}
                products={products}
                setProducts={setProducts}
              />
            </td>
            <td>
              <DeleteProductModal
                product={product}
                products={products}
                setProducts={setProducts}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div>
      <CreateProductModal products={products} setProducts={setProducts} />
      <p />
      {contents}
    </div>
  );
};

export default Products;
