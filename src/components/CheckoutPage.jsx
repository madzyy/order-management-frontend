
import { useLocation, useNavigate } from "react-router-dom";
import "./../styles/CheckoutPage.css";

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state;

  
  if (!product) {
    return (
      <div className="checkout-page">
        <h2>No product selected</h2>
        <button className="back-btn" onClick={() => navigate("/")}>
          Go Back to Products
        </button>
      </div>
    );
  }

  const handleConfirm = () => {
    alert(`Purchase confirmed for ${product.name}!`);
    navigate("/");
  };

  return (
    <div className="checkout-page">
      <h2>Checkout</h2>
      <div className="checkout-details">
        <p>
          <strong>Product Name:</strong> {product.name}
        </p>
        <p>
          <strong>Price:</strong> ${product.price}
        </p>
        <p>
          <strong>Quantity:</strong> {product.quantity}
        </p>
        <p>
          <strong>Total:</strong> ${(product.price * product.quantity)}
        </p>
      </div>
      <div className="checkout-actions">
        <button className="confirm-btn" onClick={handleConfirm}>
          Confirm Purchase
        </button>
        <button className="cancel-btn" onClick={() => navigate("/")}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;
