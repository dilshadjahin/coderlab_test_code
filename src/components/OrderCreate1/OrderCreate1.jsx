

const OrderCreate1 = () => {
    return (
        <div>

            <div className="bg-[#83CBEB] p-6 flex justify-center items-center my-4">
                <button className="w-[50%]  md:w-[40%] xl:w-[20%] p-2 rounded-lg shadow-7xl text-center text-black text-xl font-semibold bg-[#C1E5F5]">Order</button>

            </div>
            <div className="flex justify-center items-center">
                <h2 className="w-[60%]  md:w-[50%] xl:w-[30%] p-2 rounded-lg shadow-7xl text-center text-black text-xl font-semibold ">Order (create)</h2>


            </div>
            <div className="flex justify-center items-center">
                <h2 className="w-[60%]  md:w-[50%] xl:w-[30%] p-2 rounded-lg shadow-7xl text-center text-black text-xl font-semibold ">1 - SelectProducts</h2>


            </div>

            <div className="flex justify-end  p-10">
                
                <input type="text" placeholder="Search" className="input border-[#83CBEB] border-2 input-primary w-full max-w-xs" />
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
                            
                                <tr  className="bg-[#CCDFEF] text-black">
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
                        <button className="text-white text-lg bg-[#83CBEB] border-[#0F9ED5] px-4 md:px-6 btn">Cancel</button>
                        <button className="text-white text-lg bg-[#83CBEB] border-[#0F9ED5] px-4 md:px-6 btn">Next</button>

                    </div>

        </div>
    );
};

export default OrderCreate1;