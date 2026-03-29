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
} from 'lucide-react';

// ৪টি পাঞ্জাবির বদলে ১টি শাড়ি রাখা হয়েছে এবং sizes খালি রাখা হয়েছে
const initialProducts = {
  Saree: [
    {
      id: 1,
      name: 'Premium Hand Painted Cotton Saree',
      price: 2500, // আপনার পছন্দমতো দাম বসিয়ে নিন
      image: 'https://i.ibb.co.com/Rk8hQkBD/SHA09252-jpg.jpg', // এখানে শাড়ির ইমেজের লিংক দিন
      sizes: [], // শাড়ির জন্য সাইজ খালি রাখা হয়েছে
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

  // Cart functions
  const addToCart = product => {
    // সাইজ চেক করার কন্ডিশন শাড়ির জন্য বাদ দেওয়া হয়েছে (যেহেতু sizes.length ০)
    if (product.sizes.length > 0) {
      const selectedSize = selectedSizes[product.id];
      if (!selectedSize) {
        alert('Please select a size');
        return;
      }
    }

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
        size: product.sizes.length > 0 ? selectedSizes[product.id] : null,
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

  const handleSizeSelect = (productId, size) => {
    setSelectedSizes(prev => ({ ...prev, [productId]: size }));
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
          size: item.size || 'N/A',
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
        {/* Header */}
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

        {/* Products */}
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

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
                  <div
                    className="h-64 sm:h-72 overflow-hidden flex-shrink-0 relative cursor-zoom-in"
                    onMouseEnter={e => handleImageHover(product, e)}
                    onMouseLeave={() => setHoveredProduct(null)}
                  >
                    <motion.img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                      whileHover={{
                        scale: 1.1,
                        transition: { duration: 0.4, ease: 'easeOut' },
                      }}
                    />
                  </div>

                  <div className="p-4 flex flex-col flex-1">
                    <motion.h3
                      className="font-semibold text-gray-800 text-base sm:text-lg mb-2 line-clamp-2"
                      whileHover={{ color: '#5a189a' }}
                    >
                      {product.name}
                    </motion.h3>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <Tag className="text-[#9d4edd]" size={14} />
                        <span className="text-xl sm:text-2xl font-bold text-[#5a189a]">
                          ৳ {product.price}
                        </span>
                      </div>
                      <span className="text-sm text-gray-500">/piece</span>
                    </div>

                    {/* শাড়ির জন্য সাইজ সেকশন এখন অটোমেটিক হাইড হয়ে থাকবে */}
                    {product.sizes.length > 0 && (
                      <div className="mb-4">
                        <div className="grid grid-cols-4 gap-1 mb-1">
                          {product.sizes.map(size => (
                            <motion.button
                              key={size}
                              onClick={() => handleSizeSelect(product.id, size)}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className={`py-1.5 rounded text-xs font-medium transition-all ${
                                selectedSizes[product.id] === size
                                  ? 'bg-gradient-to-r from-[#5a189a] to-[#9d4edd] text-white shadow-sm'
                                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                              }`}
                            >
                              {size}
                            </motion.button>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex-1"></div>

                    <motion.button
                      onClick={() => addToCart(product)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-gradient-to-r from-[#5a189a] to-[#9d4edd] text-white font-semibold py-3 rounded-md hover:from-[#6a299a] hover:to-[#ad5eed] transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                    >
                      <ShoppingCart size={18} /> Add to Cart
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}

        {/* Floating Image Animation */}
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
        <div
          ref={checkoutRef}
          className="mt-12 bg-white rounded-lg shadow-lg overflow-hidden"
        >
          <div className="bg-gradient-to-r from-[#5a189a] to-[#9d4edd] p-6 text-white">
            <h2 className="text-2xl sm:text-3xl font-bold flex items-center gap-3">
              <ShoppingCart size={24} /> Checkout
            </h2>
            <p className="text-white/80 mt-1">Complete your purchase</p>
          </div>

          <div className="p-6 md:p-8">
            {cart.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingCart className="mx-auto text-gray-300 mb-4" size={48} />
                <h3 className="text-xl font-bold text-gray-400">Your cart is empty</h3>
              </div>
            ) : (
              <>
                <div className="space-y-4 mb-6">
                  {cart.map(item => (
                    <motion.div
                      key={item.id}
                      className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-gray-50 rounded-lg border border-gray-100"
                    >
                      <div className="flex items-center gap-4">
                        <img src={item.image} className="w-16 h-16 rounded-lg object-cover" />
                        <div>
                          <h4 className="font-medium text-gray-800">{item.name}</h4>
                          <p className="text-[#5a189a] font-bold">৳ {item.price} × {item.quantity}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 bg-gray-200 rounded-lg px-2 py-1">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)}><Minus size={14} /></button>
                          <span className="font-bold">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)}><Plus size={14} /></button>
                        </div>
                        <button onClick={() => removeFromCart(item.id)} className="text-red-500"><Trash2 size={20} /></button>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    className="border p-3 rounded-lg text-black"
                    value={customerInfo.name}
                    onChange={handleCustomerChange}
                  />
                  <input
                    type="tel"
                    name="number"
                    placeholder="Phone Number"
                    className="border p-3 rounded-lg text-black"
                    value={customerInfo.number}
                    onChange={handleCustomerChange}
                  />
                  <input
                    type="text"
                    name="address"
                    placeholder="Full Address"
                    className="border p-3 rounded-lg md:col-span-2 text-black"
                    value={customerInfo.address}
                    onChange={handleCustomerChange}
                  />
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-2xl font-bold text-gray-800">Total: {totalPrice} TK</div>
                  <p className="text-sm text-gray-600">Delivery charge 120 taka (Cash on delivery)</p>
                  <button
                    onClick={handleOrderSubmit}
                    className="bg-[#5a189a] text-white font-bold px-8 py-3 rounded-lg shadow-lg"
                  >
                    Place Order
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Thank You Modal */}
        <AnimatePresence>
          {showThankYou && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white p-10 rounded-3xl text-center max-w-md w-full"
              >
                <CheckCircle size={60} className="text-green-500 mx-auto mb-4" />
                <h2 className="text-3xl font-bold mb-2 text-black">Order Placed!</h2>
                <p className="text-gray-500">Thank you for your purchase.</p>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default ProductPage;
