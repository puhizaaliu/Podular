import Sidebar from './Sidebar';
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios';
const baseUrl='http://127.0.0.1:8000/api';


function UpdateAddress(){
    const {address_id} = useParams();
    const customer_id = localStorage.getItem('customer_id');
    const [ErrorMsg,setErrorMsg]=useState('');
    const [SuccessMsg,setSuccessMsg]=useState('');
    const [AddressFormData,setAddressFormData]=useState({
        'address':'',
        'customer':customer_id || ''
    });

    useEffect(() => {
        fetchData(baseUrl+'/address/'+address_id);
    },[]);
    function fetchData(baseUrl){
        fetch(baseUrl)
        .then((response) => response.json())
        .then((data) => {
            setAddressFormData({
                'address':data.address,
                'customer':data.customer_id || customer_id 
            });
        })
        .catch((error) => console.log(error));
    }

    const inputHandler = (event) =>{
        setAddressFormData({
            ...AddressFormData,
            [event.target.name]:event.target.value
        });
    };
    const submitHandler = () =>{
        const formData=new FormData();
        formData.append('address',AddressFormData.address);
        formData.append('customer',AddressFormData.customer);

        axios.put(baseUrl+'/address/'+parseInt(address_id)+'/',formData)
        .then(function(response){
            if(response.status!=200){
                setErrorMsg('Data not saved');
                setSuccessMsg('');
            }else{
                setErrorMsg('');
                setSuccessMsg('Data saved');
            }
           
        })
        .catch(function(error){
            console.log(error);
        });
    };
    const disableBtn=(AddressFormData.address=='');
    
    console.log(AddressFormData);
    return(
        <div className="container mt-4">
            <div className="row">
                <div className="col-md-3 col-12 mb-2">
                    <Sidebar />
                </div>
                <div className="col-md-9 col-12 mb-2">
                    <div className="card">
                        <h4 className="card-header">Update Address</h4>
                        <div className="card-body">
                            {ErrorMsg && <p className="alert alert-danger">{ErrorMsg}</p>}
                            {SuccessMsg && <p className="alert alert-success">{SuccessMsg}</p>}
                            <div className="mb-3">
                                <label htmlFor="address" className="form-label">Address:</label>
                                <textarea className="form-control" name="address" onChange={inputHandler} value={AddressFormData.address} id="address"></textarea>
                            </div>
                            <button type="button" disabled={disableBtn} onClick={submitHandler} className="btn btn-success">Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default UpdateAddress;