import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "../productContext/ProductContext";
import { Select, Button, Input, Checkbox } from "antd";

const { Option } = Select;

const OrderCreate2 = () => {
  const { selectedProducts, setSelectedProducts } = useContext(ProductContext);
  const navigate = useNavigate();
  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  const [selectedVariants, setSelectedVariants] = useState({});

  const handleBack = () => {
    navigate("/");
  };

  const handleProductSelect = (value) => {
    const index = selectedProducts.findIndex((product) => product.id === value);
    setCurrentProductIndex(index);
  };

  const handleVariantSelect = (productIndex, variantIndex, checked) => {
    setSelectedVariants((prev) => {
      const newSelectedVariants = { ...prev };
      if (!newSelectedVariants[productIndex]) {
        newSelectedVariants[productIndex] = {};
      }
      newSelectedVariants[productIndex][variantIndex] = {
        ...newSelectedVariants[productIndex][variantIndex],
        selected: checked,
      };
      return newSelectedVariants;
    });
  };

  const handleQuantityChange = (productIndex, variantIndex, value) => {
    setSelectedVariants((prev) => {
      const newSelectedVariants = { ...prev };
      if (!newSelectedVariants[productIndex]) {
        newSelectedVariants[productIndex] = {};
      }
      newSelectedVariants[productIndex][variantIndex] = {
        ...newSelectedVariants[productIndex][variantIndex],
        quantity: value,
      };
      return newSelectedVariants;
    });
  };

  const handleNext = () => {
    const updatedSelectedProducts = selectedProducts.map((product, productIndex) => {
      const selectedVariantsForProduct = selectedVariants[productIndex] || {};
      const updatedVariants = product.variants.map((variant, variantIndex) => ({
        ...variant,
        selected: selectedVariantsForProduct[variantIndex]?.selected || false,
        quantity: selectedVariantsForProduct[variantIndex]?.quantity || 0,
      }));
      return { ...product, variants: updatedVariants };
    });

    setSelectedProducts(updatedSelectedProducts);
    navigate("/order-next1");
  };

  if (selectedProducts.length === 0) {
    return <div>No products selected.</div>;
  }

  const currentProduct = selectedProducts[currentProductIndex];

  return (
    <div>
      <div className="bg-[#83CBEB] p-6 flex justify-center items-center my-4">
        <Button className="w-[50%] md:w-[40%] xl:w-[20%] p-2 rounded-lg shadow-7xl text-center text-black text-xl font-semibold bg-[#C1E5F5]">
          Order
        </Button>
      </div>
      <div className="flex justify-center items-center">
        <h2 className="w-[60%] md:w-[50%] xl:w-[30%] p-2 rounded-lg shadow-7xl text-center text-black text-xl font-semibold">
          Order (create)
        </h2>
      </div>
      <div className="flex justify-center items-center">
        <h2 className="w-[60%] md:w-[50%] xl:w-[30%] p-2 rounded-lg shadow-7xl text-center text-black text-xl font-semibold">
          2 - Select Variants
        </h2>
      </div>
      <div className="flex justify-start p-10">
        <Select
          defaultValue={selectedProducts[0].id}
          style={{ width: 200 }}
          onChange={handleProductSelect}
        >
          {selectedProducts.map((product) => (
            <Option key={product.id} value={product.id}>
              {product.name}
            </Option>
          ))}
        </Select>
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr className="bg-[#0F9ED5] text-lg text-white">
              <th>ID</th>
              <th>Color</th>
              <th>Specification</th>
              <th>Size</th>
              <th>Quantity</th>
              <th>Select</th>
            </tr>
          </thead>
          <tbody>
            {currentProduct.variants.map((variant, index) => (
              <tr key={index} className="bg-[#CCDFEF] text-black">
                <td>{index + 1}</td>
                <td>{variant.color}</td>
                <td>{variant.specification}</td>
                <td>{variant.size}</td>
                <td>
                  <Input
                    type="number"
                    min="0"
                    value={selectedVariants[currentProductIndex]?.[index]?.quantity || 0}
                    onChange={(e) => handleQuantityChange(currentProductIndex, index, e.target.value)}
                  />
                </td>
                <td>
                  <Checkbox
                    checked={selectedVariants[currentProductIndex]?.[index]?.selected || false}
                    onChange={(e) => handleVariantSelect(currentProductIndex, index, e.target.checked)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-end gap-6 p-10">
        <Button
          className="text-white text-lg bg-[#83CBEB] border-[#0F9ED5] px-4 md:px-6 btn"
          onClick={handleBack}
        >
          Back
        </Button>
        <Button className="text-white text-lg bg-[#83CBEB] border-[#0F9ED5] px-4 md:px-6 btn" onClick={handleNext}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default OrderCreate2;
