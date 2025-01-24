import { Link } from 'react-router-dom';
import logo from './logo.svg'

function Checkout(props){
    return (
        <div className='container mt-4'>
            <h3 className='mb-4'>Items Purchasing(3)</h3>
            <div className='row justify-content-center'> {/* Added justify-content-center class */}
                <div className='col-md-8 col-12 '>
                        <div className='table-responsive'>
                                <table className='table table-bordered'>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Product</th>
                                            <th>Price</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>1</td>
                                            <td> 
                                                <Link><img src={logo} className='img-thumbnail mx-2' width='80' alt='...' />Merch 1</Link>
                                            </td>
                                            <td>$$$</td>
                                        </tr>
                                        <tr>
                                            <td>1</td>
                                            <td> 
                                                <Link><img src={logo} className='img-thumbnail mx-2' width='80' alt='...' />Merch 2</Link>
                                            </td>
                                            <td>$$$</td>
                                        </tr>
                                        <tr>
                                            <td>1</td>
                                            <td> 
                                                <Link><img src={logo} className='img-thumbnail mx-2' width='80' alt='...' />Merch 3</Link>
                                            </td>
                                            <td>$$$</td>
                                        </tr>
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <th></th>
                                            <th>Total</th>
                                            <th>$$$</th>
                                        </tr>
                                        <tr>
                                            <td colSpan='3' align='center'>
                                                <Link  to="/categories" className='btn btn-secondary'>Continue Shopping</Link>
                                                <Link className='btn btn-success ms-5'>Proceed to Pay</Link>
                                            </td>
                                        </tr>
                                    </tfoot>
                                </table>
                        </div>
                </div>
            </div>
        </div>
            
    )
}

export default Checkout;
