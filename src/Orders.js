import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

function Orders() {
    const [orders, setOrders] = useState(null);
    const [selectedOrderId, setSelectedOrderId] = useState(null);

    useEffect(() => {
        getOrders();
    }, []);

    function getOrders() {
        axios.get("http://localhost:8080/auth/orders")
            .then(response => {
                setOrders(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }

    const navigate = useNavigate();

    function handleOrderAction(orderId) {
        setSelectedOrderId(orderId);
        navigate(`/auth/orders/${orderId}/auth/products`);
    }

    function isOrderCompleted(orderId) {
        const order = orders.find(order => order.id === orderId);
        return order && order.confirmed;
    }

    function handleAddProductToOrder() {
        axios.post("http://localhost:8080/auth/orders")
            .then(response => {
                const newOrderId = response.data.id;
                navigate(`/auth/orders/${newOrderId}/auth/products`);
            })
            .catch(error => {
                console.log(error);
            });
    }

    return (
        <div className="container" style={{ backgroundImage: `linear-gradient(rgba(255,255,255,0.4), rgba(255,255,255,0.4)), url('https://media.healthyfood.com/wp-content/uploads/2016/11/5-plus-a-day-a-struggle-iStock-831821198-500x413.jpg')`, backgroundSize: 'cover', minHeight: '100vh' }}>
            <h1>Orders</h1>
            <div className="d-flex justify-content-end mb-3">
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleAddProductToOrder}
                >
                    Add Product to Orders
                </button>
            </div>
            <table className='table table-bordered'>
                <thead>
                    <tr>
                        <th className='table-primary text-center'>Order Id</th>
                        <th className='table-primary text-center'>Order Date</th>
                        <th className='table-primary text-center'>Total Price</th>
                        <th className='table-primary text-center'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {orders && orders.map((order) => (
                        <tr key={order.id}>
                            <td>{order.id}</td>
                            <td>{order.orderDateTime}</td>
                            <td>{order.totalPrice.toFixed(2)}</td>
                            <td>
                                <button
                                    type='button'
                                    className={`btn btn-${selectedOrderId === order.id || isOrderCompleted(order.id) ? 'primary' : 'danger'} btn-sm`}
                                    onClick={() => handleOrderAction(order.id)}
                                >
                                    {selectedOrderId === order.id || isOrderCompleted(order.id) ? 'View' : 'Edit'}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Orders;
