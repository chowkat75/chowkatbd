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

const initialProducts = {
  Panjabi: [
    {
      id: 1,
      name: 'Marigold Aura (গাঁদা ফুল) Hand Painted Panjabi',
      price: 1999,
      image:
        'https://i.ibb.co.com/6jkWWLb/SON07087-jpg.jpg',
      sizes: ['M/40', 'L/42', 'Xl/44'],
    },
    {
      id: 2,
      name: 'Hyacinth Bloom (কচুরিপানা ফুল) Hand Painted Panjabi',
      price: 1999,
      image:
        'https://i.ibb.co.com/qY3Y6t7y/SON07224-jpg.jpg',
      sizes: ['M/40', 'L/42', 'Xl/44'],
    },
    {
      id: 3,
      name: 'Bougainvillea Elegance (বাগান বিলাস) Hand Painted Panjabi',
      price: 750,
      image:
        'https://i.ibb.co.com/CTymhqC/SON07112-jpg.jpg',
      sizes: ['M/40', 'L/42', 'Xl/44'],
    },
    {
      id: 4,
      name: 'Royal Poinciana Flame (কৃষ্ণচূড়া) Hand Painted Panjabi',
      price: 750,
      image:
        'https://i.ibb.co.com/20VXmV2j/SON07121-jpg.jpg',
      sizes: ['M/40', 'L/42', 'Xl/44'],
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
    if (product.sizes.length > 0) {
      const selectedSize = selectedSizes[product.id];
      if (!selectedSize) {
        alert('Please select a size for this Panjabi');
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

  // Handle mouse move for floating image effect
  const handleMouseMove = e => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  // Handle image hover
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
                  {/* Image container - only this triggers the hover effect */}
                  <div
                    className="h-40 sm:h-48 overflow-hidden flex-shrink-0 relative cursor-zoom-in"
                    onMouseEnter={e => handleImageHover(product, e)}
                    onMouseLeave={() => setHoveredProduct(null)}
                  >
                    <motion.img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-contain"
                      whileHover={{
                        scale: 1.15,
                        transition: { duration: 0.4, ease: 'easeOut' },
                      }}
                    />
                  </div>

                  {/* Product details - interactive area */}
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

                    {product.sizes.length > 0 && (
                      <div className="mb-3 sm:mb-4">
                        <div className="grid grid-cols-3 gap-1 mb-1">
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
                        <div className="h-5">
                          {!selectedSizes[product.id] && (
                            <motion.p
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="text-xs text-red-500"
                            >
                              Select size
                            </motion.p>
                          )}
                        </div>
                      </div>
                    )}

                    <div className="flex-1"></div>

                    <motion.button
                      onClick={() => addToCart(product)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-gradient-to-r from-[#5a189a] to-[#9d4edd] text-white font-semibold py-2 sm:py-3 rounded-md hover:from-[#6a299a] hover:to-[#ad5eed] transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm md:text-base disabled:opacity-50 disabled:cursor-not-allowed mt-auto"
                      disabled={
                        product.sizes.length > 0 && !selectedSizes[product.id]
                      }
                    >
                      <ShoppingCart size={14} /> Add to Cart
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}

        {/* Enhanced Floating Image with Beautiful Animation - Only shows when hovering over image */}
        <AnimatePresence>
          {hoveredProduct && (
            <>
              {/* Glow effect behind image */}
              <motion.div
                className="fixed z-40 pointer-events-none"
                style={{
                  left: mousePosition.x - 100,
                  top: mousePosition.y - 120,
                }}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{
                  opacity: 0.4,
                  scale: 1.5,
                }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-48 h-48 rounded-full bg-gradient-to-r from-purple-600/30 to-pink-600/30 blur-2xl" />
              </motion.div>

              {/* Main floating image with 3D rotation effect */}
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
                  transition: {
                    type: 'spring',
                    stiffness: 300,
                    damping: 25,
                    mass: 0.8,
                  },
                }}
                exit={{ opacity: 0, scale: 0.3, y: 20, rotate: 15 }}
              >
                {/* Image container with glass morphism effect */}
                <div className="relative">
                  {/* Inner glow rings */}
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-purple-400/30"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />

                  {/* Main image with shadow */}
                  <motion.img
                    src={hoveredProduct.image}
                    alt={hoveredProduct.name}
                    className="w-48 h-48 object-contain relative z-10"
                    animate={{
                      filter: [
                        'drop-shadow(0 20px 25px -5px rgba(0,0,0,0.5))',
                        'drop-shadow(0 25px 30px -5px rgba(147,51,234,0.5))',
                        'drop-shadow(0 20px 25px -5px rgba(0,0,0,0.5))',
                      ],
                      y: [0, -5, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />

                  {/* Decorative sparkles */}
                  <motion.div
                    className="absolute -top-4 -right-4 text-yellow-400 text-2xl"
                    animate={{
                      rotate: [0, 360],
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                  >
                    ✦
                  </motion.div>

                  <motion.div
                    className="absolute -bottom-2 -left-2 text-pink-400 text-xl"
                    animate={{
                      rotate: [360, 0],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                  >
                    ✧
                  </motion.div>

                  {/* Price tag */}
                  <motion.div
                    className="absolute -bottom-2 right-0 bg-gradient-to-r from-[#5a189a] to-[#9d4edd] text-white px-3 py-1.5 rounded-full z-20 font-bold text-sm shadow-lg"
                    animate={{
                      y: [0, -4, 0],
                      scale: [1, 1.05, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
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
          <div className="bg-gradient-to-r from-[#5a189a] to-[#9d4edd] p-4 sm:p-6 text-white">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold flex items-center gap-2 sm:gap-3">
              <ShoppingCart size={20} /> Checkout
            </h2>
            <p className="text-white/80 text-sm sm:text-base mt-1 sm:mt-2">
              Complete your purchase
            </p>
          </div>

          <div className="p-4 sm:p-6 md:p-8">
            {cart.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-8 sm:py-12"
              >
                <ShoppingCart
                  className="mx-auto text-gray-300 mb-3 sm:mb-4"
                  size={48}
                />
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-400 mb-1 sm:mb-2">
                  Your cart is empty
                </h3>
                <p className="text-gray-500 text-sm sm:text-base">
                  Add some products to get started!
                </p>
              </motion.div>
            ) : (
              <>
                {/* Cart Items */}
                <div className="space-y-4 mb-6">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">
                    Your Order ({cart.length}{' '}
                    {cart.length === 1 ? 'item' : 'items'})
                  </h3>
                  {cart.map(item => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4 p-3 sm:p-4 md:p-5 bg-gray-50 rounded-lg border border-gray-100"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start sm:items-center gap-3">
                          <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-lg overflow-hidden flex-shrink-0 bg-gradient-to-br from-[#c8b6ff]/20 to-[#f8edeb]/20">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-gray-800 text-sm sm:text-base line-clamp-1">
                              {item.name}
                            </h4>
                            {item.size && (
                              <p className="text-xs sm:text-sm text-gray-600 mt-0.5">
                                Size:{' '}
                                <span className="font-medium">{item.size}</span>
                              </p>
                            )}
                            <p className="text-[#5a189a] font-bold text-sm sm:text-base mt-1">
                              ৳ {item.price} × {item.quantity} = ৳{' '}
                              {item.price * item.quantity}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between sm:justify-end gap-2 sm:gap-4">
                        <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-2 py-1 sm:px-3 sm:py-2">
                          <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="text-gray-600 hover:text-[#9d4edd] transition-colors p-1"
                          >
                            <Minus size={14} />
                          </motion.button>
                          <span className="font-bold text-gray-800 text-sm sm:text-base min-w-[1.5rem] text-center">
                            {item.quantity}
                          </span>
                          <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="text-gray-600 hover:text-[#9d4edd] transition-colors p-1"
                          >
                            <Plus size={14} />
                          </motion.button>
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => removeFromCart(item.id)}
                          className="p-2 sm:p-3 rounded-lg bg-gradient-to-r from-red-500 to-pink-500 text-white hover:shadow-md transition-shadow flex-shrink-0"
                        >
                          <Trash2 size={14} />
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Customer Info */}
                <div className="mb-6 sm:mb-8 md:mb-10">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">
                    Customer Information
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-gray-700 font-medium text-sm sm:text-base">
                        <User size={16} /> Your Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        placeholder="Enter your name"
                        className="w-full border border-gray-300 rounded-lg p-3 sm:p-4 focus:outline-none focus:border-[#9d4edd] focus:ring-2 focus:ring-[#9d4edd]/20 transition-all text-sm text-black"
                        value={customerInfo.name}
                        onChange={handleCustomerChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-gray-700 font-medium text-sm sm:text-base">
                        <Phone size={16} /> Phone Number
                      </label>
                      <input
                        type="tel"
                        name="number"
                        placeholder="01XXXXXXXXX"
                        className="w-full border border-gray-300 rounded-lg p-3 sm:p-4 focus:outline-none focus:border-[#9d4edd] focus:ring-2 focus:ring-[#9d4edd]/20 transition-all text-sm text-black"
                        value={customerInfo.number}
                        onChange={handleCustomerChange}
                      />
                    </div>
                    <div className="space-y-2 sm:col-span-2 lg:col-span-1">
                      <label className="flex items-center gap-2 text-gray-700 font-medium text-sm sm:text-base">
                        <MapPin size={16} /> Delivery Address
                      </label>
                      <input
                        type="text"
                        name="address"
                        placeholder="Full address with area"
                        className="w-full border border-gray-300 rounded-lg p-3 sm:p-4 focus:outline-none focus:border-[#9d4edd] focus:ring-2 focus:ring-[#9d4edd]/20 transition-all text-sm text-black"
                        value={customerInfo.address}
                        onChange={handleCustomerChange}
                      />
                    </div>
                  </div>
                </div>

                {/* Total + Checkout */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 sm:gap-6">
                  <motion.div
                    className="text-gray-800 font-bold text-lg sm:text-xl md:text-2xl"
                    animate={{ scale: [1, 1.02, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    Total: ৳ {totalPrice}
                  </motion.div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleOrderSubmit}
                    className="bg-gradient-to-r from-[#5a189a] to-[#9d4edd] text-white font-bold px-6 py-3 rounded-lg hover:from-[#6a299a] hover:to-[#ad5eed] transition-all shadow-lg flex items-center justify-center gap-2"
                  >
                    Place Order
                  </motion.button>
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
                transition={{ type: 'spring', duration: 0.5 }}
                className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl max-w-md w-full overflow-hidden"
              >
                <div className="h-2 bg-gradient-to-r from-green-400 via-green-500 to-emerald-500" />
                <div className="p-8 sm:p-10 flex flex-col items-center text-center">
                  <div className="mb-6 relative">
                    <div className="absolute inset-0 bg-green-100 rounded-full animate-ping opacity-25" />
                    <div className="relative bg-gradient-to-br from-green-400 to-emerald-500 rounded-full p-4 shadow-lg">
                      <CheckCircle
                        size={56}
                        className="text-white"
                        strokeWidth={2.5}
                      />
                    </div>
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-bold mb-3 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                    Thank You!
                  </h2>
                  <p className="text-gray-500 text-lg mb-2">for your order</p>
                  <div className="w-16 h-0.5 bg-gradient-to-r from-green-200 via-green-400 to-green-200 rounded-full my-4" />
                  <p className="text-sm text-gray-400 mb-4">
                    Order #
                    {Math.random().toString(36).substr(2, 8).toUpperCase()}
                  </p>
                  <div className="flex items-center gap-2 bg-green-50 px-4 py-3 rounded-xl">
                    <MessageCircle size={20} className="text-green-500" />
                    <div className="flex gap-1 ml-2">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-bounce" />
                    </div>
                  </div>
                  <div className="w-full bg-gray-100 h-1.5 rounded-full mt-6 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 3, ease: 'linear' }}
                      className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full"
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default ProductPage;
