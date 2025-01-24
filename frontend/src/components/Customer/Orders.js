import Sidebar from "./Sidebar";
import logo from '../../logo.svg'; 
import { Link } from 'react-router-dom';


function Orders(props){

    return(
        <div className='container mt-4'>
            <div className='row'>
                <div className='col-md-2 col-12 mb-2'>
                    <Sidebar />
                </div>
                <div className='col-md-9 col-12 mb-2'>
                    <div className='table-responsive'>
                        <table className='table table-bordered'>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Product</th>
                                    <th>Price</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td> 
                                        <Link><img src={logo} className='img-thumbnail mx-2' width='80' alt='...' />Merch 1</Link>
                                    </td>
                                    <td>$$$</td>
                                    <td><span className='text-success'><i className='fa fa-check-circle'></i>Completed</span></td>
                                    <td><button className="btn btn-primary btn-sm">Download</button></td>
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td> 
                                        <Link><img src={logo} className='img-thumbnail mx-2' width='80' alt='...' />Merch 2</Link>
                                    </td>
                                    <td>$$$</td>
                                    <td><span className='text-secondary'><i className='fa fa-spin fa-spinner'></i>Processing</span></td>
                                    <td><button className="btn btn-primary btn-sm">Download</button></td>
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td> 
                                        <Link><img src={logo} className='img-thumbnail mx-2' width='80' alt='...' />Merch 3</Link>
                                    </td>
                                    <td>$$$</td>
                                    <td><span className='text-danger'><i className='fa fa-times-circle'></i>Cancelled</span></td>
                                    <td><button className="btn btn-primary btn-sm">Download</button></td>
                                </tr>
                            </tbody>
                            
                        </table>
                    </div>

                </div>
            </div>
        </div>
    )
}
export default Orders;