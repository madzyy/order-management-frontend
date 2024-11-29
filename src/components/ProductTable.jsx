import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'; // Import the toast
import './../styles/ProductTable.css';

const ProductTable = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch products from the backend
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleCheckout = async (product) => {
    try {
      // Reduce quantity on the backend
      const response = await fetch(`http://localhost:5000/api/products/${product.id}/quantity`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quantityToReduce: 1 }), // Decrease by 1
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(errorData.message);
        return;
      }

      const { newQuantity } = await response.json();

      // Update product quantity in the local state
      setProducts((prevProducts) =>
        prevProducts.map((p) =>
          p.id === product.id ? { ...p, quantity: newQuantity } : p
        )
      );

      // Trigger a toaster notification if product goes out of stock
      if (newQuantity === 0) {
        toast.info(`${product.name} is now out of stock!`, {
          position: 'bottom-right',
          autoClose: 3000,
          hideProgressBar: true,  
          closeOnClick: true,      
          pauseOnHover: true,      
          draggable: true,
        });
      }

      // Navigate to the checkout page
      navigate(`/checkout/${product.id}`, { state: product });
    } catch (error) {
      console.error('Error during checkout:', error);
    }
  };

  return (
    <div className="product-table">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>${product.price}</td>
              <td>{product.quantity}</td>
              <td>
                <button
                  className="checkout-btn"
                  onClick={() => handleCheckout(product)}
                  disabled={product.quantity <= 0}
                >
                  {product.quantity > 0 ? 'Checkout' : 'Out of Stock'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
