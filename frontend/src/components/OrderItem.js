import { useDispatch } from "react-redux";
import { deleteOrder } from "../features/orders/ordersSlice";

const OrderItem = ({ order }) => {
    const dispatch = useDispatch()
    return (
        <div className="order-item">
            <div>{new Date(order.createdAt).toLocaleString('en-GB')}</div>
            <h2>{order.testator}</h2>
            <p>{order.dob}</p>
            <p>{order.fullAddress}</p>
            <button className="order-item-btns">Continue</button>
            <button className="order-item-btns">Edit</button>
            <button onClick={() => dispatch(deleteOrder(order._id))} className="order-item-btns">Delete</button>        
        </div>
    )
}

export default OrderItem