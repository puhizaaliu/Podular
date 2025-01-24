import Sidebar from "./Sidebar";
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';


function Dashboard(props){
    
    const baseUrl='http://127.0.0.1:8000/api';
    var customer_id=localStorage.getItem('customer_id');
    const [CountList, setCountList]=useState({
        'totalAddress':0,
        // 'totalWishlist':0,
        // 'totalOrders':0
    });
    
    useEffect(() => {
        fetchData(baseUrl+'/customer/dashboard/'+customer_id+'/');
    },[]);
    function fetchData(baseUrl){
        fetch(baseUrl)
        .then((response) => response.json())
        .then((data) => {
            setCountList({
                'totalAddress':data.totalAddress,
                // 'totalWishlist':data.totalWishlist,
                // 'totalOrders':data.totalOrders
            })
        });
    }

    return(
        <div className='container mt-4'>
            <div className='row'>
                <div className='col-md-2 col-12 mb-2'>
                    <Sidebar />
                </div>
                <div className='col-md-9 col-12 mb-2'>
                    <div className='row'>
                        <div className='col-md-4 mb-2'>
                            <div className="card"> 
                                <div className="card-body text-center">
                                    <h4>Profile Settings</h4>
                                    <h6><a href="#" className="text-success">Language</a></h6>
                                    <h6><a href="#" className="text-success">Content Preferences</a></h6>
                                    <h6><a href="/customer/addresses" className="text-success">Address</a></h6>
                                    <h6><a href="#" className="text-success">Change Password</a></h6>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-4 mb-2'>
                            <div className="card"> 
                                <div className="card-body text-center">
                                    <h4>My Addresses</h4>
                                    <h6><Link to="/customer/addresses">{CountList.totalAddress}</Link></h6>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-4 mb-2'>
                            <div className="card"> 
                                <div className="card-body text-center">
                                    <h4>My WishList</h4>
                                    <h6><Link to="/customer/wishlist">0</Link></h6>
                                    {/* {CountList.totalWishlist} */}
                                </div>
                            </div>
                        </div>
                        <div className='col-md-4 mb-2'>
                            <div className="card"> 
                                <div className="card-body text-center">
                                        <h4>My Total Orders</h4>
                                        <h6><Link to="/customer/orders">0</Link></h6>
                                        {/* {CountList.totalOrders} */}
                                </div>
                            </div>
                        </div>    
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Dashboard;