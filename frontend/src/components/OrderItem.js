import { useDispatch } from "react-redux";
import { deleteOrder } from "../features/orders/ordersSlice";

export const OrderProgressBar = ({ currentValue, maxValue }) => (
    <>
        <progress id="progress-bar" className="full-width-progress" value={currentValue} max={maxValue}>{currentValue}%</progress>
    </>
);

const OrderItem = ({ order }) => {
    const dispatch = useDispatch()
    return (
        <div className="order-item">
            <div className="order-item-brief">
                <OrderProgressBar currentValue={0.08} maxValue={1} />
                <h2>Will for {order.testator}</h2>
                <p>DOB: {new Date(order.dob).toLocaleDateString('en-GB')}</p>
                <p>Address: {order.fullAddress}</p>
                <div>
                    <p>Last updated: {new Date(order.updatedAt).toLocaleString('en-GB')}</p>
                </div>
            </div>
            <div className="order-item-btns-container">
                {order.status === "CreatingOrder" && (
                    <button className="order-item-btns">Continue</button>
                )}
                {order.status === "Completed" && (
                    <button className="order-item-btns">Edit</button>
                )}
                <button onClick={() => dispatch(deleteOrder(order._id))} className="order-item-btns">Delete</button>
            </div>
        </div>
    )
}

export default OrderItem