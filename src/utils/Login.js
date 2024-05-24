import axios from 'axios';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


const LoginPage = () => {

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        const data = {
            userName: userName,
            password: password,
        }

        axios.post("http://localhost:8080/auth/login", data)
            .then((response) => {
                login(response.data);
                toast.success("Login Successful");
                navigate("/")
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <div className="container">

                <form onSubmit={handleLogin}>

                    <div className="form-group">
                        <label>Username</label>
                        <input type="text" className="form-control" onChange={(e) => setUserName(e.target.value)} required />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" onChange={(e) => setPassword(e.target.value)} required />
                    </div>

                    <button type="submit" className="btn btn-primary">Save</button>
                </form>
        </div>
    )
}

export default LoginPage;