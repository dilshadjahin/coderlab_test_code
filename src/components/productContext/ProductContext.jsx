// ProductContext.js
import { createContext, useState } from "react";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [selectedProducts, setSelectedProducts] = useState([]);

  const addProduct = (product) => {
    setSelectedProducts((prevProducts) => [...prevProducts, product]);
  };

  const removeProduct = (productId) => {
    setSelectedProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== productId)
    );
  };

  return (
    <ProductContext.Provider
      value={{ selectedProducts, addProduct, removeProduct }}
    >
      {children}
    </ProductContext.Provider>
  );
};
