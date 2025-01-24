import { Link } from 'react-router-dom';

function SellerDetails({ seller }) {  // Ensure that `seller` is received as a prop here
  if (!seller) return <div>No Seller Data</div>; // Optional: Check for seller data



  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{seller.username}</h5>
        <p className="card-text">More info about {seller.username}</p>
        <Link to={`/admin/SellerDetails`} className="btn btn-primary">View Details</Link>
      </div>
    </div>
  );
}

export default SellerDetails;