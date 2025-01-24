import { Link } from 'react-router-dom';
import logo from '../logo.svg'; 
function OrderFailure(){
return (
    <div className='container mt-4'>
        <div className='row'>
            <div className='col-md-8 offset-2'>
                <div className='card'>
                    <div className='card-body text-center'>
                        <p><i className='fa fa-times-circle text-danger fa-3x'></i></p>
                        <h3>Order has Failed!</h3>
                        <p className='mt-3'><Link to='/customer/orders' className='btn btn-success'>Go back to Orders</Link>
                        <Link to='/customer/dashboard' className='btn btn-secondary ms-2'>Go to Dashboard</Link></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  
)

}

export default OrderFailure;