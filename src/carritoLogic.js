/**
 * @param {Array} prevCart 
 * @param {Object} product 
 * @returns {Array} 
 */
function logicAddToCart(prevCart, product) {
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
}

/**
 * @param {Array} cart 
 * @returns {Object} 
 */
function logicCalculateTotals(cart) {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return { totalItems, cartTotal };
}