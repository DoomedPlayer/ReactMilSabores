import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/NavBar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Catalogo from './pages/Catalogo';
import Login from './pages/Login';
import Perfil from './pages/Perfil';
import Pagos from './pages/Pagos';
import Carrito from './pages/Carrito';
import Procesamiento from './pages/Procesamiento';
import Blog from './pages/Blog';
import "./main.css"

const App = () => {

  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem('cart');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error("Error al cargar el carrito desde localStorage", error);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = useCallback((product) => {
    setCart(prevCart => {
      const existingItemIndex = prevCart.findIndex(item => item.code === product.code);
      if (existingItemIndex > -1) {
        return prevCart.map((item, index) =>
          index === existingItemIndex
            ? {
              ...item,
              quantity: item.quantity + 1,
              message: product.message !== undefined ? product.message : item.message,
              size: product.size !== undefined ? product.size : item.size,
            }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1, size: product.size, message: product.message }];
      }
    });
  }, []);

  const { totalItems, cartTotal } = useMemo(() => {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    return { totalItems, cartTotal };
  }, [cart]);

  const formattedCartTotal = cartTotal.toLocaleString('es-CL');

  return (
    <Router>
      <Navbar totalItems={totalItems} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalogo" element={<Catalogo 
                cart={cart}
                addToCart={addToCart}
                cartTotal={formattedCartTotal}
                totalItems={totalItems}
              />} 
            />
          <Route path="/login" element={<Login />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/carrito" element={<Carrito cartItems={cart} total={cartTotal} />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/pagos" element={<Pagos />} />
          <Route path="/procesamiento" element={<Procesamiento />} />
        </Routes>
      
      <Footer />
    </Router>
  );
};

export default App;