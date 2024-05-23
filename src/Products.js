import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
// import { useAuth } from './utils/AuthContext';

function ProductsManagement() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [category, setCategory] = useState("");
    const [editProduct, setEditProduct] = useState(null);

    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get("http://localhost:8080/auth/products");
            if (Array.isArray(response.data)) {
                setProducts(response.data);
            } else {
                console.error("Unexpected data format for products", response.data);
                setProducts([]);
            }
        } catch (error) {
            console.error("Error fetching products:", error);
            setProducts([]);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await axios.get("http://localhost:8080/auth/categories");
            if (Array.isArray(response.data)) {
                setCategories(response.data);
            } else {
                console.error("Unexpected data format for categories", response.data);
                setCategories([]);
            }
        } catch (error) {
            console.error("Error fetching categories:", error);
            setCategories([]);
        }
    };

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handlePriceChange = (event) => {
        setPrice(event.target.value);
    };

    const handleQuantityChange = (event) => {
        setQuantity(event.target.value);
    };

    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {
            name,
            price,
            quantity,
            category
        };

        try {
            await axios.post("http://localhost:8080/auth/products", data);
            fetchProducts();
            clearForm();
        } catch (error) {
            console.error("Error adding product:", error);
        }
    };

    const clearForm = () => {
        setName("");
        setPrice("");
        setQuantity("");
        setCategory("");
    };

    const handleEdit = (product) => {
        setEditProduct(product);
        setName(product.name);
        setPrice(product.price);
        setQuantity(product.quantity);
        setCategory(product.category.id);
    };

    const handleUpdate = async (event) => {
        event.preventDefault();

        const data = {
            name,
            price,
            quantity,
            category
        };

        try {
            await axios.put(`http://localhost:8080/auth/products/${editProduct.id}`, data);
            fetchProducts();
            clearForm();
            setEditProduct(null);
        } catch (error) {
            console.error("Error updating product:", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/auth/products/${id}`);
            fetchProducts();
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    return (
        <div className="container-fluid" style={{ backgroundImage: `linear-gradient(rgba(255,255,255,0.4), rgba(255,255,255,0.4)), url('https://5.imimg.com/data5/SELLER/Default/2023/9/340174265/BM/RL/ES/6387032/vegetable-rack-500x500.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '100vh' }}>
            <div className="row">
                <div className="col-md-6">
                    <h1>Products</h1>

                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Category</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(products) && products.length > 0 ? (
                                products.map(product => (
                                    <tr key={product.id}>
                                        <td>{product.name}</td>
                                        <td>{product.price}</td>
                                        <td>{product.quantity}</td>
                                        <td>{product.category.categoryName}</td>
                                        <td>
                                            <button onClick={() => handleEdit(product)} className="btn btn-sm btn-primary">Edit</button>
                                            <button onClick={() => handleDelete(product.id)} className="btn btn-sm btn-danger">Delete</button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5">No products available.</td>
                                </tr>
                            )}
                        </tbody>

                    </table>
                </div>

                <div className="col-md-6">
                    {editProduct ? (
                        <form onSubmit={handleUpdate}>
                            <h2>Edit Product</h2>

                            <div className="form-group">
                                <label>Name</label>
                                <input type="text" className="form-control" value={name} onChange={handleNameChange} required />
                            </div>

                            <div className="form-group">
                                <label>Price</label>
                                <input type="text" className="form-control" value={price} onChange={handlePriceChange} required />
                            </div>

                            <div className="form-group">
                                <label>Quantity</label>
                                <input type="text" className="form-control" value={quantity} onChange={handleQuantityChange} required />
                            </div>

                            <div className="form-group">
                                <label>Category</label>
                                <select className="form-control" value={category} onChange={handleCategoryChange} required>
                                    <option value="">Select Category</option>
                                    {Array.isArray(categories) && categories.map(category => (
                                        <option key={category.id} value={category.id}>{category.categoryName}</option>
                                    ))}
                                </select>
                            </div>

                            <button type="submit" className="btn btn-primary">Update</button>
                            <button type="button" className="btn btn-secondary" onClick={() => { setEditProduct(null); clearForm(); }}>Cancel</button>
                        </form>
                    ) : (
                        <form onSubmit={handleSubmit}>
                            <h2>Add Product</h2>

                            <div className="form-group">
                                <label>Name</label>
                                <input type="text" className="form-control" value={name} onChange={handleNameChange} required />
                            </div>

                            <div className="form-group">
                                <label>Price</label>
                                <input type="text" className="form-control" value={price} onChange={handlePriceChange} required />
                            </div>

                            <div className="form-group">
                                <label>Quantity</label>
                                <input type="text" className="form-control" value={quantity} onChange={handleQuantityChange} required />
                            </div>

                            <div className="form-group">
                                <label>Category</label>
                                <select className="form-control" value={category} onChange={handleCategoryChange} required>
                                    <option value="">Select Category</option>
                                    {Array.isArray(categories) && categories.map(category => (
                                        <option key={category.id} value={category.id}>{category.categoryName}</option>
                                    ))}
                                </select>
                            </div>

                            <button type="submit" className="btn btn-primary">Add</button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ProductsManagement;
