import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function StockManagement() {
    const [stocks, setStocks] = useState([]);

    useEffect(() => {
        fetchStocks();
    }, []);

    const fetchStocks = async () => {
        try {
            const response = await axios.get("http://localhost:8080/auth/stocks");
            setStocks(response.data);
        } catch (error) {
            console.error("Error fetching stocks:", error);
        }
    };

    return (
        <div className="container">
            <h1>Stock Management</h1>
            {Array.isArray(stocks) && stocks.length > 0 ? (
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Unit Price</th>
                            <th>Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stocks.map(stock => (
                            <tr key={stock.id}>
                                <td>{stock.product.productName}</td>
                                <td>{stock.product.price}</td>
                                <td>{stock.quantity}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No stocks available.</p>
            )}
        </div>
    );
}

export default StockManagement;
