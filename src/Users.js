import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function Users() {
    const [users, setUsers] = useState(null);
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [edit, setEdit] = useState(null);

    useEffect(() => {
        getUsers();
    }, []);

    function getUsers() {
        axios.get("http://localhost:8080/auth/users")
            .then(function (response) {
                setUsers(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    function handleUsername(event) {
        setUserName(event.target.value);
    }

    function handlePassword(event) {
        setPassword(event.target.value);
    }

    function handleEmail(event) {
        setEmail(event.target.value);
    }

    function createUser(event) {
        event.preventDefault();

        const data = {
            userName: userName,
            password: password,
            email: email
        }

        axios.post("http://localhost:8080/auth/users", data)
            .then(function (response) {
                console.log(response);
                getUsers();
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    function updateUser(event) {
        event.preventDefault();

        const data = {
            userName: userName,
            password: password,
            email: email
        }

        axios.put("http://localhost:8080/auth/users/" + edit.id, data)
            .then(function (response) {
                console.log(response);
                getUsers();
                setEdit(null);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    function deleteUser(id) {
        axios.delete("http://localhost:8080/auth/users/" + id)
            .then(function () {
                getUsers();
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <div className="container-fluid" style={{ backgroundImage: `linear-gradient(rgba(255,255,255,0.4), rgba(255,255,255,0.4)), url('https://th.bing.com/th/id/OIP.NOavp9E_nS_LDQtRbbqPrQHaE8?rs=1&pid=ImgDetMain')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className="row">
                <div className="col-md-6">
                    <h1>Users</h1>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th className="table-primary" scope="col">Username</th>
                                <th className="table-primary" scope="col">Email</th>
                                <th className="table-primary" scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users && users.map((user) => (
                                <tr key={user.id}>
                                    <td>{user.userName}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        <button className="btn btn-primary" onClick={() => {
                                            setEdit(user);
                                            setUserName(user.userName);
                                            setEmail(user.email);
                                            setPassword(user.password);
                                        }}>Edit</button>
                                        <button className="btn btn-danger" onClick={() => deleteUser(user.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <button className="btn btn-primary" onClick={getUsers}>Load Users</button>
                </div>

                <div className="col-md-6">
                    {!edit &&
                        <form onSubmit={createUser}>
                            <h1>Create User</h1>

                            <div className="form-group">
                                <label>Username</label>
                                <input type="text" className="form-control" onChange={handleUsername} required />
                            </div>

                            <div className="form-group">
                                <label>Password</label>
                                <input type="password" className="form-control" onChange={handlePassword} required />
                            </div>

                            <div className="form-group">
                                <label>Email</label>
                                <input type="email" className="form-control" onChange={handleEmail} required />
                            </div>

                            <button type="submit" className="btn btn-primary">Save</button>
                        </form>
                    }

                    {edit &&
                        <form onSubmit={updateUser}>
                            <h1>Edit User</h1>

                            <div className="form-group">
                                <label>Username</label>
                                <input type="text" className="form-control" onChange={handleUsername} value={userName} required />
                            </div>

                            <div className="form-group">
                                <label>Password</label>
                                <input type="password" className="form-control" onChange={handlePassword} value={password} required />
                            </div>

                            <div className="form-group">
                                <label>Email</label>
                                <input type="email" className="form-control" onChange={handleEmail} value={email} required />
                            </div>

                            <button type="submit" className="btn btn-primary">Save</button>
                            <button type="button" className="btn btn-secondary" onClick={() => { setEdit(null); }}>Cancel</button>
                        </form>
                    }
                </div>
            </div>
        </div>
    );
}

export default Users;
