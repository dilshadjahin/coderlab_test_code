import { Modal, Pagination, message } from "antd";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { func } from "prop-types";

import { useNavigate } from "react-router-dom";
import { ProductContext } from "../productContext/ProductContext";
const OrderCard = ({ isModalOpen, handleOk, handleCancel, editingProduct }) => {
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    type: "",
    origin: "",
    variants: [{ color: "", specification: "", size: "" }],
  });
  const [search, setSearch] = useState([]);
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const { addProduct, removeProduct, selectedProducts } =
    useContext(ProductContext);
  const navigate = useNavigate();

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

  async function fetchData() {
    try {
      const res = await axios.get(
        `https://reactjr.coderslab.online/api/products?search=${search}&&per_page=10&&page=${currentPage}`
      );
      if (res.data && res.data.data) {
        setProducts(res.data.data.data);
        setTotalItems(res.data.data.total);
      } else {
        console.error("Unexpected data structure:", res.data);
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, [search, currentPage]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSubmit = async () => {
    if (formData.variants.length < 1) {
      alert("Please add at least one variant.");
      return;
    }

    // try {
    //   if (editingProduct) {
    //     await axios.put(`https://reactjr.coderslab.online/api/products/${editingProduct.id}`, formData);
    //     message.success("Product updated successfully!");
    //   } else {
    //     await axios.post("https://reactjr.coderslab.online/api/products", formData);
    //     message.success("Product added successfully!");
    //   }
    //   fetchData();
    //   handleOk();
    // } catch (error) {
    //   console.error("Error submitting form:", error);
    //   message.error("Edit failed. Please try again.");
    // }
  };

  const handleSelectProduct = (product) => {
    const isSelected = selectedProducts.some((p) => p.id === product.id);
    if (isSelected) {
      removeProduct(product.id);
    } else {
      addProduct(product);
    }
  };
  const handleNext = () => {
    if (selectedProducts.length > 0) {
      navigate("/order-next1");
    } else {
      message.warning("Please select at least one product.");
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
            1 - Select Products
          </h2>
        </div>

        <div className="flex justify-end p-10">
          <input
            type="text"
            placeholder="Search"
            className="input border-[#83CBEB] border-2 input-primary w-full max-w-xs"
            onChange={(e) => setSearch(e.target.value)}
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
              {products.map((product) => (
                <tr
                  key={product.id}
                  className={`bg-[#CCDFEF] text-black ${
                    selectedProducts.some((p) => p.id === product.id)
                      ? "bg-blue-200"
                      : ""
                  }`}
                >
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>{product.brand}</td>
                  <td>{product.type}</td>
                  <td>
                    <button
                      className="text-white text-lg bg-[#83CBEB] border-[#0F9ED5] px-2 py-1 btn"
                      onClick={() => handleSelectProduct(product)}
                    >
                      {selectedProducts.some((p) => p.id === product.id)
                        ? "Deselect"
                        : "Select"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-center mt-4">
          <Pagination
            current={currentPage}
            pageSize={10}
            total={totalItems}
            showSizeChanger={false}
            onChange={handlePageChange}
          />
        </div>
        <div className="flex justify-end gap-6 p-10">
          <button
            className="text-white text-lg bg-[#83CBEB] border-[#0F9ED5] px-4 md:px-6 btn"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            className="text-white text-lg bg-[#83CBEB] border-[#0F9ED5] px-4 md:px-6 btn"
            onClick={handleNext}
          >
            Next
          </button>
        </div>
      </div>
    </Modal>
  );
};

OrderCard.propTypes = {
  isModalOpen: func,
  handleOk: func,
  handleCancel: func,
  editingProduct: func, // Add this line to the prop types
};

export default OrderCard;
