import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


function Home() {

    const logout = () => {
        console.log('Logged out');
    };

    return (
        <div className="container-fluid p-0 d-flex justify-content-center align-items-end vh-100">
            <div className="row w-100">
                <div className="col d-flex justify-content-center align-items-start">
                    <img 
                        src="https://marketplace.canva.com/EAFSRrBn5pg/1/0/800w/canva-red-and-brown-holiday-gift-shop-promotion-facebook-cover-o5Cvhp_X8ik.jpg" 
                        alt="Cover"
                        className="img-fluid w-100" // Set width to 100% for responsiveness
                        style={{maxHeight: '100vh'}} // Apply max-height inline style
                    />
                </div>
            </div>

            <button className="btn btn-primary" onClick={logout}>Logout</button>
        </div>
    );
}

export default Home;