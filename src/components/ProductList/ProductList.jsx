import axios from "axios";
import { useEffect, useState } from "react";
import ProductCurd from "../ProductCurd/ProductCurd";
import { Pagination, message } from "antd";
import ProductView from "../ProductCurd/ProductView";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSelectedModalOpen, setIsSelectedModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [editingProduct, setEditingProduct] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    setIsSelectedModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setIsSelectedModalOpen(false);
  };

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

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };
  const handleSelectedProduct = (product) => {
    setSelectedProduct(product);
    setIsSelectedModalOpen(true);
  };

  const handleDelete = async (productId) => {
    try {
      await axios.delete(
        `https://reactjr.coderslab.online/api/products/${productId}`
      );
      message.success("Product deleted successfully!");
      fetchData();
    } catch (error) {
      console.error("Error deleting product: ", error);
      message.error("Failed to delete product.");
    }
  };
  return (
    <>
      <div className="bg-[#83CBEB] p-6 flex justify-center items-center">
        <button className="w-[50%]  md:w-[40%] xl:w-[20%] p-2 rounded-lg shadow-7xl text-center text-black text-xl font-semibold bg-[#C1E5F5]">
          Product
        </button>
      </div>

      <div className="bg-white p-10">
        <div className="flex justify-between gap-4  py-4">
          <button
            onClick={showModal}
            className="text-white text-lg bg-[#83CBEB] border-[#0F9ED5] px-4 md:px-10 btn"
          >
            Create
          </button>
          <input
            onChange={handleChange}
            type="text"
            placeholder="Search"
            className="input border-[#83CBEB] border-2 input-primary w-full max-w-xs"
          />
        </div>

        <ProductCurd
          isModalOpen={isModalOpen}
          handleOk={handleOk}
          fetchData={fetchData}
          handleCancel={handleCancel}
          editingProduct={editingProduct}
        />

        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr className="bg-[#0F9ED5] text-lg text-white">
                <th>ID</th>
                <th>Name</th>
                <th>Brand</th>
                <th>Type</th>
                <th>Created At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(products) &&
                products.length > 0 &&
                products.map((product) => (
                  <tr key={product.id} className="bg-[#CCDFEF] text-black">
                    <td>{product.id}</td>
                    <td>{product.name}</td>
                    <td>{product.brand}</td>
                    <td>{product.type}</td>
                    <td>{new Date(product.created_at).toLocaleDateString()}</td>
                    <td className="text-red-600 font-bold">
                      <button onClick={() => handleSelectedProduct(product)}> View</button>{" "}
                      |{" "}
                      <button onClick={() => handleEdit(product)}>Edit</button>{" "}
                      |{" "}
                      <button onClick={() => handleDelete(product.id)}>
                        {" "}
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <ProductView
          isModalOpen={isSelectedModalOpen}
          handleOk={handleOk}
          fetchData={fetchData}
          handleCancel={handleCancel}
          selectedProduct={selectedProduct}
        />
        <div className="flex justify-center mt-4">
          <Pagination
            current={currentPage}
            pageSize={10}
            total={totalItems}
            showSizeChanger={false}
            onChange={handlePageChange}
          />
        </div>
      </div>
    </>
  );
};

export default ProductList;
