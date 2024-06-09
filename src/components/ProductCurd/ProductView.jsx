import { Modal, Select } from "antd";
import { useEffect, useState } from "react";
import { func } from "prop-types";

const ProductView = ({ isModalOpen, handleOk, handleCancel, selectedProduct }) => {
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    type: "",
    origin: "",
    variants: [{ color: "", specification: "", size: "" }],
  });

  useEffect(() => {
    if (selectedProduct) {
      setFormData({
        name: selectedProduct.name || "",
        brand: selectedProduct.brand || "",
        type: selectedProduct.type || "",
        origin: selectedProduct.origin || "",
        variants: selectedProduct.variants || [{ color: "", specification: "", size: "" }],
      });
    }
  }, [selectedProduct]);

  return (
    <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
      <div className="h-auto">
        <div className="bg-[#83CBEB] p-6 flex justify-center items-center">
          <button className="w-full md:w-[50%] xl:w-[70%] p-2 rounded-lg shadow-7xl text-center text-black text-xl font-semibold bg-[#C1E5F5]">
            Product
          </button>
        </div>
        <div className="rounded-lg border-black p-10 max-w-7xl">
          <div className="p-6 flex justify-center items-center">
            <h2 className="w-[60%] md:w-[50%] xl:w-[30%] p-2 rounded-lg shadow-7xl text-center text-black text-xl font-semibold">
              Product Details
            </h2>
          </div>

          <div className="grid md:grid-cols-2 grid-cols-1 gap-4 px-40">
            <input
              type="text"
              name="name"
              value={formData.name}
              placeholder="Name"
              className="input input-bordered input-sm w-full max-w-xs"
              disabled
            />
            <input
              type="text"
              name="brand"
              placeholder="Brand"
              className="input input-bordered input-sm w-full max-w-xs"
              value={formData.brand}
              disabled
            />
            <Select
              placeholder="Type"
              className="w-full max-w-xs"
              value={formData.type}
              disabled
            >
              <Select.Option value="">Select Type</Select.Option>
              <Select.Option value="Glass">Glass</Select.Option>
              <Select.Option value="Mug">Mug</Select.Option>
            </Select>
            <input
              type="text"
              name="origin"
              placeholder="Origin"
              className="input input-bordered input-sm w-full max-w-xs"
              value={formData.origin}
              disabled
            />
          </div>

          <div className="p-6 flex justify-center items-center">
            <h2 className="w-[60%] md:w-[50%] xl:w-[30%] p-2 rounded-lg shadow-7xl text-center text-black text-xl font-semibold">
              Variants
            </h2>
          </div>

          {formData.variants.map((variant, index) => (
            <div className="flex gap-4 px-12 my-4" key={index}>
              <input
                type="text"
                name="color"
                placeholder="Color"
                className="input input-bordered input-sm w-full max-w-xs h-12 text-base font-semibold"
                value={variant.color}
                disabled
              />
              <input
                type="text"
                name="specification"
                placeholder="Specification"
                className="input input-bordered input-sm w-full max-w-lg h-12 text-base font-semibold"
                value={variant.specification}
                disabled
              />
              <input
                type="text"
                name="size"
                placeholder="Size"
                className="input input-bordered input-sm w-full max-w-[160px] h-12 text-base font-semibold"
                value={variant.size}
                disabled
              />
            </div>
          ))}

          <div className="flex justify-end gap-6 p-10">
            <button
              className="text-white text-lg bg-[#83CBEB] border-[#0F9ED5] px-4 md:px-6 btn"
              onClick={handleCancel}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

ProductView.propTypes = {
  isModalOpen: func.isRequired,
  handleOk: func.isRequired,
  handleCancel: func.isRequired,
  selectedProduct: func.isRequired,
};

export default ProductView;
