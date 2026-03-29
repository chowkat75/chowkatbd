'use client';
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  User,
  Phone,
  MapPin,
  CheckCircle,
  Tag,
  Package,
  MessageCircle,
} from 'lucide-edge';

const initialProducts = {
  Panjabi: [
    {
      id: 1,
      name: 'Marigold Aura (গাঁদা ফুল) Hand Painted Panjabi',
      price: 2999,
      image: 'https://i.ibb.co.com/SD4wQ3zS/SHA09252-jpg.jpg',
      sizes: [],
    },
  ],
};

function ProductPage() {
  const [cart, setCart] = useState([]);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    number: '',
    address: '',
  });
  const [selectedSizes, setSelectedSizes] = useState({});
  const [showThankYou, setShowThankYou] = useState(false);
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const checkoutRef = useRef(null);

  const addToCart = product => {
    const exists = cart.find(item => item.id === product.id);
    if (exists) {
      setCart(
        cart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      );
    } else {
      const newItem = {
        ...product,
        quantity: 1,
        size: null,
      };
      setCart([...cart, newItem]);
    }
    checkoutRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const removeFromCart = id => {
    setCart(cart.filter(item => item.id !== id));
  };

  const updateQuantity = (id, qty) => {
    if (qty < 1) return;
    setCart(
      cart.map(item => (item.id === id ? { ...item, quantity: qty } : item)),
    );
  };

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  const handleCustomerChange = e => {
    setCustomerInfo({ ...customerInfo, [e.target.name]: e.target.value });
  };

  const handleOrderSubmit = async () => {
    if (!customerInfo.name || !customerInfo.number || !customerInfo.address) {
      alert('Please fill your Name, Phone, and Address');
      return;
    }
    if (cart.length === 0) {
      alert('Cart is empty!');
      return;
    }
    setShowThankYou(true);
    for (const item of cart) {
      await fetch(`${import.meta.env.VITE_GOOGLE_APPS_SCRIPT}`, {
        method: 'POST',
        body: JSON.stringify({
          name: customerInfo.name,
          phone: customerInfo.number,
          address: customerInfo.address,
          product: item.name,
          size: 'N/A',
          quantity: item.quantity,
          total: item.price * item.quantity,
        }),
      });
    }
    setTimeout(() => {
      setShowThankYou(false);
      setCart([]);
      setCustomerInfo({ name: '', number: '', address: '' });
      setSelectedSizes({});
    }, 100);
  };

  const handleMouseMove = e => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  const handleImageHover = (product, e) => {
    setHoveredProduct(product);
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  return (
    <div
      className="min-h-screen pb-8 mt-5 md:mt-10 relative"
      onMouseMove={handleMouseMove}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {cart.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg mt-4"
            >
              <ShoppingCart className="text-[#5a189a]" size={20} />
              <span className="font-semibold text-[#5a189a]">
                {cart.length} items
              </span>
              <span className="text-gray-400">•</span>
              <span className="font-bold text-[#9d4edd]">৳ {totalPrice}</span>
            </motion.div>
          )}
        </div>

        {Object.keys(initialProducts).map(category => (
          <div key={category} className="mb-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3 mb-8"
            >
              <div className="p-2 rounded-md bg-gradient-to-r from-[#5a189a] to-[#9d4edd]">
                <Package className="text-white" size={24} />
              </div>
              <h2 className="text-3xl font-bold text-gray-800">
                {category} Collection
              </h2>
            </motion.div>

            <div className="grid grid-cols-2 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 sm:gap-4">
              {initialProducts[category].map(product => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-md overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group flex flex-col relative"
                  whileHover={{
                    y: -8,
                    transition: { type: 'spring', stiffness: 400, damping: 17 },
                  }}
                >
                  {/* Image Container Adjusted for Full View */}
                  <div
                    className="aspect-[2/3] w-full overflow-hidden flex-shrink-0 relative cursor-zoom-in bg-gray-50"
                    onMouseEnter={e => handleImageHover(product, e)}
                    onMouseLeave={() => setHoveredProduct(null)}
                  >
                    <motion.img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover object-top"
                      whileHover={{
                        scale: 1.05,
                        transition: { duration: 0.4, ease: 'easeOut' },
                      }}
                    />
                  </div>

                  <div className="p-3 sm:p-4 flex flex-col flex-1">
                    <motion.h3
                      className="font-semibold text-gray-800 text-sm sm:text-base mb-1 sm:mb-2 line-clamp-2"
                      whileHover={{ color: '#5a189a' }}
                    >
                      {product.name}
                    </motion.h3>

                    <div className="flex items-center justify-between mb-2 sm:mb-3">
                      <div className="flex items-center gap-1 sm:gap-2">
                        <Tag className="text-[#9d4edd]" size={12} />
                        <span className="text-lg sm:text-xl md:text-2xl font-bold text-[#5a189a]">
                          ৳ {product.price}
                        </span>
                      </div>
                      <span className="text-xs sm:text-sm text-gray-500">
                        /piece
                      </span>
                    </div>
                    <div className="flex-1"></div>
                    <motion.button
                      onClick={() => addToCart(product)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-gradient-to-r from-[#5a189a] to-[#9d4edd] text-white font-semibold py-2 sm:py-3 rounded-md hover:from-[#6a299a] hover:to-[#ad5eed] transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm md:text-base mt-auto"
                    >
                      <ShoppingCart size={14} /> Add to Cart
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}

        {/* Floating Hover Effects */}
        <AnimatePresence>
          {hoveredProduct && (
            <>
              <motion.div
                className="fixed z-40 pointer-events-none"
                style={{
                  left: mousePosition.x - 100,
                  top: mousePosition.y - 120,
                }}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 0.4, scale: 1.5 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-48 h-48 rounded-full bg-gradient-to-r from-purple-600/30 to-pink-600/30 blur-2xl" />
              </motion.div>
              <motion.div
                className="fixed z-50 pointer-events-none"
                style={{
                  left: mousePosition.x - 100,
                  top: mousePosition.y - 130,
                }}
                initial={{ opacity: 0, scale: 0.3, y: 20, rotate: -15 }}
                animate={{
                  opacity: 1,
                  scale: 2,
                  y: -30,
                  rotate: 0,
                  transition: { type: 'spring', stiffness: 300, damping: 25, mass: 0.8 },
                }}
                exit={{ opacity: 0, scale: 0.3, y: 20, rotate: 15 }}
              >
                <div className="relative">
                  <motion.img
                    src={hoveredProduct.image}
                    alt={hoveredProduct.name}
                    className="w-48 h-48 object-contain relative z-10"
                  />
                  <motion.div
                    className="absolute -bottom-2 right-0 bg-gradient-to-r from-[#5a189a] to-[#9d4edd] text-white px-3 py-1.5 rounded-full z-20 font-bold text-sm shadow-lg"
                  >
                    ৳ {hoveredProduct.price}
                  </motion.div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Checkout Section */}
        <div ref={checkoutRef} className="mt-12 bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-[#5a189a] to-[#9d4edd] p-4 sm:p-6 text-white">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold flex items-center gap-2 sm:gap-3">
              <ShoppingCart size={20} /> Checkout
            </h2>
          </div>
          <div className="p-4 sm:p-6 md:p-8">
            {cart.length === 0 ? (
              <div className="text-center py-8 sm:py-12">
                <ShoppingCart className="mx-auto text-gray-300 mb-4" size={48} />
                <h3 className="text-lg sm:text-xl font-bold text-gray-400">Your cart is empty</h3>
              </div>
            ) : (
              <>
                <div className="space-y-4 mb-6">
                  {cart.map(item => (
                    <div key={item.id} className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-gray-50 rounded-lg border border-gray-100">
                      <div className="flex items-center gap-3 flex-1">
                        <img src={item.image} className="w-16 h-16 rounded-lg object-cover" />
                        <div>
                          <h4 className="font-medium text-gray-800">{item.name}</h4>
                          <p className="text-[#5a189a] font-bold">৳ {item.price} × {item.quantity}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-1">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)}><Minus size={14} /></button>
                          <span className="font-bold">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)}><Plus size={14} /></button>
                        </div>
                        <button onClick={() => removeFromCart(item.id)} className="p-2 bg-red-500 text-white rounded-lg"><Trash2 size={14} /></button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                  <div className="space-y-2">
                    <label className="text-gray-700 font-medium flex items-center gap-2"><User size={16} /> Name</label>
                    <input type="text" name="name" className="w-full border rounded-lg p-3 text-black" value={customerInfo.name} onChange={handleCustomerChange} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-gray-700 font-medium flex items-center gap-2"><Phone size={16} /> Phone</label>
                    <input type="tel" name="number" className="w-full border rounded-lg p-3 text-black" value={customerInfo.number} onChange={handleCustomerChange} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-gray-700 font-medium flex items-center gap-2"><MapPin size={16} /> Address</label>
                    <input type="text" name="address" className="w-full border rounded-lg p-3 text-black" value={customerInfo.address} onChange={handleCustomerChange} />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-2xl font-bold text-gray-800">Total: {totalPrice} TK</div>
                  <button onClick={handleOrderSubmit} className="bg-gradient-to-r from-[#5a189a] to-[#9d4edd] text-white font-bold px-8 py-3 rounded-lg shadow-lg">Place Order</button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Thank You Modal */}
        <AnimatePresence>
          {showThankYou && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
              <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="bg-white rounded-2xl p-8 text-center max-w-md w-full">
                <div className="bg-green-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle size={40} className="text-white" />
                </div>
                <h2 className="text-3xl font-bold mb-2">Thank You!</h2>
                <p className="text-gray-500">Your order has been placed successfully.</p>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default ProductPage;
