import './App.css';
import Users from './Users';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './Home';
import Products from './Products';
import Order from './Orders';
import EditOrder from './EditOrders';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import LoginPage from './utils/Login';
import ProtectedRoute from './utils/ProtectedRoute';
import 'react-toastify/dist/ReactToastify.css';
import Stock from './Stock';

function App() {
  return (
    
      <BrowserRouter>
        <div>
          {/* Navigation Bar */}
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
              <Link className="navbar-brand" to="/">Home</Link>
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <Link className="nav-link" to="/users">Users</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/products">Products</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/orders">Orders</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/stocks">Stock</Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>

          {/* Routes */}
          <Routes element={<ProtectedRoute />}>
            <Route path="/users" element={<Users />} />
            <Route path="/products" element={<Products />} />
            <Route path="/orders" element={<Order />} />
            <Route path="/orders/:id/products" element={<EditOrder />} />
            <Route path="/" element={<Home />} />
            <Route path="/stocks" element={<Stock />} />
          </Routes>

          <Routes>
            <Route path="/login" element={<LoginPage />} />
          </Routes>

        </div>
      </BrowserRouter>
  );
}

export default App;
