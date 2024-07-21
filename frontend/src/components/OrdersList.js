import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getOrders, reset } from "../features/orders/ordersSlice";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";
import OrderItem from "./OrderItem";


const OrdersList = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { orders, isLoading, isError, message } = useSelector(state =>
        state.orders
    )

    useEffect(() => {
        if (isError) console.log(message)
        dispatch(getOrders())
        return () => dispatch(reset())
    }, [navigate, isError, message, dispatch])


    return (
        isLoading ? <Spinner /> :
            (
                <>
                    <section className="content">
                        {orders.length > 0 ? (
                            <div className="orders">
                                {orders.map(order => (
                                    <OrderItem key={order._id} order={order} /> // Correct key usage
                                ))}
                            </div>
                        ) : (
                            <section>
                                <h2>You don't have any wills yet.</h2>
                                <h2>Click Create my will to get started.</h2>
                            </section>
                        )}
                    </section>
                </>
            )
    );
}

export default OrdersList