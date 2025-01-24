import Sidebar from "./Sidebar";
import { useState } from "react";
import { useParams} from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const baseUrl = 'http://127.0.0.1:8000/api';

function DeleteAddress(){
    
    const { address_id } = useParams();

   
    const [ErrorMsg, setErrorMsg] = useState('');
    const [SuccessMsg, setSuccessMsg] = useState('');

    
    const navigate = useNavigate();

    const deleteAddress = () => {
        
        axios.delete(baseUrl+'/address/'+parseInt(address_id)+'/')
        .then((response) => {
            
            if(response.status === 204){
                setSuccessMsg('Address deleted successfully');
                setErrorMsg('');
                navigate('/customer/addresses');
            } else {
                setSuccessMsg('');
                setErrorMsg('Failed to delete address');
            }
        })
        .catch((error) => {
            console.log(error);
            setErrorMsg('Failed to delete address');
        });
    };

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-md-3 col-12 mb-2">
                    <Sidebar />
                </div>
                <div className="col-md-9 col-12 mb-2">
                    <div className="card">
                        <h4 className="card-header">Delete Address</h4>
                        <div className="card-body">
                            {ErrorMsg && <p className="alert alert-danger">{ErrorMsg}</p>}
                            {SuccessMsg && <p className="alert alert-success">{SuccessMsg}</p>}
                            <p>Are you sure you want to delete this address?</p>
                            <button type="button" onClick={deleteAddress} className="btn btn-danger">Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DeleteAddress;
