import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ProductList from './pages/ProductList';
import ProductDetails from './pages/ProductDetails';
import CompareProducts from './pages/CompareProducts';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import AdminDashboard from './pages/AdminDashboard';
import ChatBot from './components/ChatBot';
import About from './pages/About';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import Careers from './pages/Careers';
import Sell from './pages/Sell';
import ShippingInfo from './pages/ShippingInfo';
import MyOrders from './pages/MyOrders';
import ListedItems from './pages/ListedItems';
import WishlistPage from './pages/WishlistPage';
import Settings from './pages/Settings';
import PaymentMethods from './pages/PaymentMethods';
import Notifications from './pages/Notifications';

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/compare" element={<CompareProducts />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/about" element={<About />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/sell" element={<Sell />} />
            <Route path="/shipping" element={<ShippingInfo />} />
            <Route path="/my-orders" element={<MyOrders />} />
            <Route path="/listed-items" element={<ListedItems />} />
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/payment-methods" element={<PaymentMethods />} />
            <Route path="/notifications" element={<Notifications />} />
          </Routes>
        </main>
        <ChatBot />
        <Footer />
        <Toaster position="top-right" />
      </div>
    </BrowserRouter>
  );
}

export default App;