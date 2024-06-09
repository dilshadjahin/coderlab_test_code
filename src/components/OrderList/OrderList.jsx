import axios from "axios";
import { useEffect, useState } from "react";
import { Pagination, message } from "antd";
import OrderCard from "./OrderCard";


const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSelectedModalOpen, setIsSelectedModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
//   const [editingOrder, setEditingOrder] = useState(null);
//   const [selectedOrder, setSelectedOrder] = useState(null);

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
        `https://reactjr.coderslab.online/api/orders?search=${search}&&per_page=10&&page=${currentPage}`
      );
      if (res.data && res.data.data) {
        setOrders(res.data.data.data);
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

  const handleEdit = (order) => {
    setEditingOrder(order);
    setIsModalOpen(true);
  };
  const handleSelectedOrder = (order) => {
    setSelectedOrder(order);
    setIsSelectedModalOpen(true);
  };

  const handleDelete = async (orderId) => {
    try {
      await axios.delete(
        `https://reactjr.coderslab.online/api/orders/${orderId}`
      );
      message.success("Order deleted successfully!");
      fetchData();
    } catch (error) {
      console.error("Error deleting order: ", error);
      message.error("Failed to delete order.");
    }
  };

  return (
    <>
      <div className="bg-[#83CBEB] p-6 flex justify-center items-center">
        <button className="w-[50%]  md:w-[40%] xl:w-[20%] p-2 rounded-lg shadow-7xl text-center text-black text-xl font-semibold bg-[#C1E5F5]">
          Order
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

        <OrderCard
          isModalOpen={isModalOpen}
          handleOk={handleOk}
          fetchData={fetchData}
          handleCancel={handleCancel}
        />

        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr className="bg-[#0F9ED5] text-lg text-white">
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Address</th>
                <th>Total Quantity</th>
                <th>Created At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(orders) &&
                orders.length > 0 &&
                orders.map((order) => (
                  <tr key={order.id} className="bg-[#CCDFEF] text-black">
                    <td>{order.id}</td>
                    <td>{order.name}</td>
                    <td>{order.email}</td>
                    <td>{order.address}</td>
                    <td>{order.total_quantity}</td>
                    <td>{new Date(order.created_at).toLocaleDateString()}</td>
                    <td className="text-red-600 font-bold">
                      <button onClick={() => handleSelectedOrder(order)}> View</button>{" "}
                      |{" "}
                      <button onClick={() => handleEdit(order)}>Edit</button>{" "}
                      |{" "}
                      <button onClick={() => handleDelete(order.id)}>
                        {" "}
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        {/* <OrderView
          isModalOpen={isSelectedModalOpen}
          handleOk={handleOk}
          fetchData={fetchData}
          handleCancel={handleCancel}
          selectedOrder={selectedOrder}
        /> */}
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

export default OrderList;
