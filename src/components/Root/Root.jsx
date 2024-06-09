import { Outlet } from "react-router-dom";
import ProductList from "../ProductList/ProductList";
import ProductCurd from "../ProductCurd/ProductCurd";
import OrderList from "../OrderList/OrderList";


const Root = () => {
    return (
        <div>

            <Outlet/>
            <ProductList/>
            <ProductCurd/>
            <OrderList/>
            
            
            
        </div>
    );
};

export default Root;