import { Link } from 'react-router-dom';
import axios from 'axios';

function SingleSeller({ seller }) {  // Ensure that `seller` is received as a prop here
  if (!seller) return <div>No Seller Data</div>; // Optional: Check for seller data

  const deleteSeller = async () => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/creator/${seller.id}`);
      alert('Seller deleted successfully!');
      // Optionally redirect or fetch the new list of sellers
    } catch (error) {
      console.error('Failed to delete seller:', error);
      alert('Failed to delete seller.');
    }
  };

  
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{seller.user.username}</h5>
        <p className="card-text">More info about {seller.user.username}</p>
        <Link to={`/sellers/${seller.id}`} className="btn btn-primary">View Details</Link>
        {/* Add links/buttons for editing and deleting */}
        <Link to={`/sellers/edit/${seller.id}`} className="btn btn-warning">Edit</Link>
        <button onClick={deleteSeller} className="btn btn-danger">Delete</button>
      </div>
    </div>
  );
}

export default SingleSeller;