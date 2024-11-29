import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import ProductTable from "./components/ProductTable";
import CheckoutPage from "./components/CheckoutPage";
import 'react-toastify/dist/ReactToastify.css';
import "./App.css";
import { ToastContainer } from "react-toastify";

const App = () => {
  const [isDimmed, setIsDimmed] = useState(true);

  return (
    <Router>
      <div className={`app ${isDimmed ? "" : "dimmed"}`}>
        <Sidebar onDim={setIsDimmed} />
        <Header />
        <Routes>
          <Route path="/" element={<ProductTable />} />
          <Route path="/checkout/:productId" element={<CheckoutPage />} />
        </Routes>
        <ToastContainer />
      </div>
    </Router>
  );
};

export default App;
