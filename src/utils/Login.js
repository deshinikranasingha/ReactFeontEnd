import axios from 'axios';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import React, { useState } from 'react';


const LoginPage = () => {

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const {login} = useAuth();
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        const data ={
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

    return(
        <div className="container">

            <h1>Login Page</h1>
            <form onSubmit={handleLogin}>
                <div className="form-group">
                    <label for="userName">User Name</label>
                    <input type="text" className="form-control" onChange={(e) => setUserName(e.target.value)}/>
                </div>

                <div className="form-group">
                    <label for="password">Password</label>
                    <input type="text" className="form-control" onChange={(e) => setPassword(e.target.value)}/>
                </div>

                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    )
}

export default LoginPage;