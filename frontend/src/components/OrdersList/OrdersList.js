import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getOrders, reset } from "../../features/orders/ordersSlice";
import Spinner from "../Spinner";
import { useNavigate } from "react-router-dom";
import OrderItem from "./OrderItem";
import { resetCurrentOrderSlice } from "../../features/currentOrder/currentOrderSlice";
import { resetTestatorSlice } from "../../features/people/testator/testatorSlice";
import { resetSpouseOrPartnerSlice } from "../../features/people/spouseOrPartner/spouseOrPartnerSlice";
import { resetKidsSlice } from "../../features/people/kids/kidsSlice";








const OrdersList = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { orders, isLoading, isError, message } = useSelector(state =>
        state.orders)

    const order = useSelector(state => state.order)


    const handleCreateWill = async () => {
        await dispatch(resetCurrentOrderSlice())
        await dispatch(resetTestatorSlice())
        await dispatch(resetSpouseOrPartnerSlice())
        await dispatch(resetKidsSlice())
        // await dispatch(resetChildren())
        navigate('/creatingOrder');
    };


    useEffect(() => {
        if (isError) console.log(message)
        dispatch(getOrders())
        return () => dispatch(reset())
    }, [navigate, isError, message, dispatch])


    return (
        isLoading ? <Spinner /> :
            (
                <>
                    <section>
                        <button 
                        id="create-my-will-btn"
                        onClick={handleCreateWill}
                        >Create a new Will
                        </button>
                    </section>
                    <section className="orders-list">
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