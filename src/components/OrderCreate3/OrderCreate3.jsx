import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "../productContext/ProductContext";
import { Button, Input } from "antd";

const OrderCreate3 = () => {
  const { selectedProducts } = useContext(ProductContext);
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/order-next1");
  };

  const handleSubmit = () => {
    // Handle form submission logic here
  };

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
          3 - Information
        </h2>
      </div>

      <div className="grid md:grid-cols-2 grid-cols-1 gap-4 px-36 my-16 placeholder">
        <Input placeholder="Name" className="input input-bordered input-sm w-full max-w-xs" />
        <Input placeholder="Email" className="input input-bordered input-sm w-full max-w-xs" />
        <Input placeholder="Address" className="input input-bordered input-sm w-full max-w-xs" />
        <Input placeholder="Total Quantity" className="input input-bordered input-sm w-full max-w-xs" />
      </div>

      <div className="flex justify-end gap-6 px-36">
        <Button className="text-white text-lg bg-[#83CBEB] border-[#0F9ED5] px-4 md:px-6 btn" onClick={handleBack}>
          Back
        </Button>
        <Button className="text-white text-lg bg-[#83CBEB] border-[#0F9ED5] px-4 md:px-6 btn" onClick={handleSubmit}>
          Submit
        </Button>
      </div>
    </div>
  );
};

export default OrderCreate3;
