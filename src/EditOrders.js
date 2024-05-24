import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams, useNavigate } from 'react-router-dom';

function EditOrders() {
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const [products, setProducts] = useState(null);
    const [isOrderCompleted, setIsOrderCompleted] = useState(false);
    const [addButtonsDisabled, setAddButtonsDisabled] = useState(false);
    const [isOrderConfirmed, setIsOrderConfirmed] = useState(false);
    const [orderId, setOrderId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8080/orders/${id}`)
            .then(response => {
                setOrder(response.data);
                setIsOrderConfirmed(response.data.confirmed); // Update confirmation status
                setOrderId(response.data.id); // Update order id
            })
            .catch(error => {
                console.log(error);
            });

        axios.get("http://localhost:8080/products")
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, [id]);

    const handleCompleteOrder = () => {
        axios.put(`http://localhost:8080/orders/${id}/confirm`)
            .then(response => {
                setIsOrderCompleted(true);
                setAddButtonsDisabled(true);
                navigate('/orders');
            })
            .catch(error => {
                console.log(error);
            });
    };

    const handleAddProductToOrder = (productId) => {
        const data = {
            productId: productId,
            quantity: 1
        };
        axios.post(`http://localhost:8080/orders/${id}/addProducts`, data)
            .then(response => {
                setOrder(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    };

    const handleRemoveProductFromOrder = (productId) => {
        axios.delete(`http://localhost:8080/orders/${id}/products/${productId}`)
            .then(response => {
                const updatedOrder = {
                    ...order,
                    orderedProducts: order.orderedProducts.filter(product => product.id !== productId),
                    // Recalculate total price by summing the prices of remaining products
                    totalPrice: order.orderedProducts
                        .filter(product => product.id !== productId)
                        .reduce((total, product) => total + product.price, 0)
                };
                setOrder(updatedOrder);
            })
            .catch(error => {
                console.log(error);
            });
    };
    

    return (
        <div className='container'>
            <h1>{isOrderConfirmed ? `Order ${orderId}` : `Add product to Order ${id}`}</h1>
            {order && (
                <div className='d-flex align-item-center justify-content-between'>
                    <div className='datetime'>
                        Order Date: {order.orderDateTime}
                    </div>
                    <div>
                        <h1>Total Price : Rs. {order.totalPrice.toFixed(2)}</h1>
                    </div>
                </div>
            )}
            <div className='row'>
                <div className='col-lg-9'>
                    <table className='table table-bordered'>
                        <thead>
                            <tr>
                                <th className='table-primary text-center'>Order Id</th>
                                <th className='table-primary text-center'>Product Name</th>
                                <th className='table-primary text-center'>Price</th>
                                <th className='table-primary text-center'>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {order && order.orderedProducts.map(product => (
                                <tr key={product.id}>
                                    <td>{product.id}</td>
                                    <td>{product.productName}</td>
                                    <td>{product.price}</td>
                                    <td>
                                        <button
                                            type='button'
                                            className={`btn btn-${isOrderCompleted || isOrderConfirmed ? 'secondary' : 'danger'} btn-sm`}
                                            onClick={() => handleRemoveProductFromOrder(product.id)}
                                            disabled={isOrderCompleted || isOrderConfirmed}
                                        >
                                            Remove
                                        </button>

                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className='col-lg-3'>
                    <div className='products'>
                        {products && products.map((product) => (
                            <div key={product.id} className='bg-light shadow-sm p-3'>
                                <h4>{product.productName}</h4>
                                <p>Rs. {product.price}</p>
                                <button
                                    type='button'
                                    onClick={() => handleAddProductToOrder(product.id)}
                                    className={`btn btn-${isOrderCompleted || addButtonsDisabled || isOrderConfirmed ? 'secondary' : 'outline-secondary'} btn-sm`}
                                    disabled={isOrderCompleted || addButtonsDisabled || isOrderConfirmed}
                                >
                                    Add
                                </button>

                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <button
                type='button'
                className='btn btn-success position-absolute bottom-0 start-0 m-3'
                onClick={handleCompleteOrder}
                disabled={isOrderCompleted || isOrderConfirmed}
            >
                Complete Order
            </button>
        </div>
    );
}

export default EditOrders;
