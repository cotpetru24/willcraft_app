import { useDispatch } from "react-redux";
import { deleteOrder } from "../features/orders/ordersSlice";
import { getOrderThunk } from "../features/order/orderSlice";
import { useNavigate } from "react-router-dom";

export const OrderProgressBar = ({ currentValue, maxValue }) => (
    <>
        <progress id="progress-bar" className="full-width-progress" value={currentValue} max={maxValue}>{currentValue}%</progress>
    </>
);

const OrderItem = ({ order }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
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
                {/* {order.status === "CreatingOrder" && (
                    <button onClick={() => dispatch(getOrder(order._id))
                    } className="order-item-btns">Continue</button>
                )} */}


                {order.status === "CreatingOrder" && (
                    <button
                        onClick={async () => {
                            console.log(`should have loaded order id :${order._id}`)
                            dispatch(getOrderThunk(order._id));
                            navigate('/creatingOrder');
                        }}
                        className="order-item-btns"
                    >
                        Continue
                    </button>
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