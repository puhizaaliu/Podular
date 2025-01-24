import { Link } from "react-router-dom";
import Sidebar from './Sidebar';
import { useEffect, useState } from "react";
import axios from "axios";
const baseUrl='http://127.0.0.1:8000/api';

function AddressList(){
    var customer_id=localStorage.getItem('customer_id');
    const [AddressList, setAddressList]=useState([]);

    useEffect(() => {
        fetchData(baseUrl+'/customers/'+customer_id+'/address-list');

    },[]);
    function fetchData(baseUrl){
        fetch(baseUrl)
        .then((response) => response.json())
        .then((data) => {
            setAddressList(data.results);
        });
    }

    function DefaultAddressHandler(address_id){
        const formData=new FormData();;
        formData.append('address_id',address_id);
        

        axios.post(baseUrl+'/mark-default-address/'+parseInt(address_id)+'/',formData)
        .then(function(response){
            if(response.data.bool==true){
               window.location.reload();
            }
           
        })
        .catch(function(error){
            console.log(error);
        });
    }


    return(
        <div className="container mt-4">
            <div className="row">
                <div className="col-md-3 col-12 mb-2">
                    <Sidebar />
                </div>
                <div className="col-md-9 col-12 mb-2">
                    <div className="row">
                        <div className="col-12">
                        <Link to="/customer/add-address" className="btn btn-outline-success mb-4 float-end"><i className="fa fa-plus-circle"></i>Add Address</Link>
                        </div>
                    </div>
                    <div className="row">
                        {
                            AddressList.map((address,index)=>{
                                return (
                                <div className="col-4 mb-4" key={address.id}>
                                            <div className="card">
                                                <div className="card-body text-muted">
                                                <h6>
                                                   {
                                                    address.default_address == true && <span><i className="fa fa-check-circle text-success mb-3 mx-1"></i></span>
                                                   }
                                                   {
                                                    !address.default_address && <span onClick={()=>DefaultAddressHandler(address.id)} role="button"><i className="fa-regular fa-check-circle text-secondary mb-3 mx-1"></i></span>
                                                   }
                                                   <strong>{address.address}</strong>
                                                </h6>
                                                <button type="button" className="btn btn-success mx-2"><Link to={`/customer/update-address/${address.id}`} className="text-white"><small>Update</small></Link></button>
                                                <button type="button" className="btn btn-danger mx-2"><Link to={`/customer/delete-address/${address.id}`} className="text-white"><small>Delete</small></Link></button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>

    )
}

export default AddressList;