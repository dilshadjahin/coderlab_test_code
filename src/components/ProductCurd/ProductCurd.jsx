import { Modal, Select, message } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { func } from "prop-types";

const ProductCurd = ({
  isModalOpen,
  handleOk,
  handleCancel,
  fetchData,
  editingProduct,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    type: "",
    origin: "",
    variants: [{ color: "", specification: "", size: "" }],
  });

  useEffect(() => {
    if (editingProduct) {
      setFormData({
        name: editingProduct.name || "",
        brand: editingProduct.brand || "",
        type: editingProduct.type || "",
        origin: editingProduct.origin || "",
        variants: editingProduct.variants || [
          { color: "", specification: "", size: "" },
        ],
      });
    }
  }, [editingProduct]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleTypeChange = (value) => {
    setFormData({ ...formData, type: value });
  };

  const handleVariantChange = (index, e) => {
    const { name, value } = e.target;
    const newVariants = formData.variants.map((variant, i) => {
      if (i === index) {
        return { ...variant, [name]: value };
      }
      return variant;
    });
    setFormData({ ...formData, variants: newVariants });
  };

  const addVariant = () => {
    setFormData({
      ...formData,
      variants: [
        ...formData.variants,
        { color: "", specification: "", size: "" },
      ],
    });
  };

  const removeVariant = (index) => {
    const newVariants = formData.variants.filter((_, i) => i !== index);
    setFormData({ ...formData, variants: newVariants });
  };

  const handleSubmit = async () => {
    if (formData.variants.length < 1) {
      alert("Please add at least one variant.");
      return;
    }

    try {
      if (editingProduct) {
        await axios.put(
          `https://reactjr.coderslab.online/api/products/${editingProduct.id}`,
          formData
        );
        message.success("Product updated successfully!");
      } else {
        await axios.post(
          "https://reactjr.coderslab.online/api/products",
          formData
        );
        message.success("Product added successfully!");
      }
      fetchData();
      handleOk();
    } catch (error) {
      console.error("Error submitting form:", error);
      message.error("Edit failed. Please try again.");
    }
  };

  return (
    <Modal
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={null}
    >
      <div>
        <div className="bg-[#83CBEB] p-6 flex justify-center items-center my-4">
          <button className="w-[50%]  md:w-[40%] xl:w-[20%] p-2 rounded-lg shadow-7xl text-center text-black text-xl font-semibold bg-[#C1E5F5]">
            Order
          </button>
        </div>
        <div className="flex justify-center items-center">
          <h2 className="w-[60%]  md:w-[50%] xl:w-[30%] p-2 rounded-lg shadow-7xl text-center text-black text-xl font-semibold ">
            Order (create)
          </h2>
        </div>
        <div className="flex justify-center items-center">
          <h2 className="w-[60%]  md:w-[50%] xl:w-[30%] p-2 rounded-lg shadow-7xl text-center text-black text-xl font-semibold ">
            1 - SelectProducts
          </h2>
        </div>

        <div className="flex justify-end  p-10">
          <input
            type="text"
            placeholder="Search"
            className="input border-[#83CBEB] border-2 input-primary w-full max-w-xs"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr className="bg-[#0F9ED5] text-lg text-white">
                <th>ID</th>
                <th>Name</th>
                <th>Brand</th>
                <th>Type</th>
                <th>Select</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-[#CCDFEF] text-black">
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="flex justify-end gap-6 p-10">
          <button className="text-white text-lg bg-[#83CBEB] border-[#0F9ED5] px-4 md:px-6 btn">
            Cancel
          </button>
          <button className="text-white text-lg bg-[#83CBEB] border-[#0F9ED5] px-4 md:px-6 btn">
            Next
          </button>
        </div>
      </div>
    </Modal>
  );
};

ProductCurd.propTypes = {
  isModalOpen: func,
  handleOk: func,
  handleCancel: func,
  fetchData: func,
  editingProduct: func, // Add this line to the prop types
};

export default ProductCurd;
