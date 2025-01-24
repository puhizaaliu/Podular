import SellerSidebar from "./SellerSidebar";
import { useState, useEffect } from "react";
const baseUrl='http//127.0.0.1/api/';

function Customers(){
  const vendor_id=localStorage.getItem('creator_id');
  const [CustomerList,setCustomerList]=useState([]);

  useEffect(() => {
    fetchData(baseUrl+'creators/'+vendor_id+'/customers/');

  },[]);

  function fetchData(baseUrl){
    fetch(baseUrl)
    .then((response) => response.json())
    .then((data) => {
      setCustomerList(data.results);
    });
  };

  console.log(CustomerList);
  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-9 col-12">
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Mobile</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {
                  CustomerList.map((item,index)=><tr>
                  <td>{index+1}</td>
                  <td>{item.customer.username}</td>
                  <td>{item.customer.email}</td>
                  <td>{item.customer.mobile}</td>
                  <td>
                    <button className="btn btn-primary btn-sm">Orders</button>
                    <button className="btn btn-danger btn-sm ms-1">Remove from List</button>
                    
                  </td>
                </tr>)
                }
              </tbody>
            </table>
          </div>
        </div>
        <div className="col-md-3 col-12 mb-2">
          <SellerSidebar />
        </div>
      </div>
    </div>
  );
}

export default Customers;
