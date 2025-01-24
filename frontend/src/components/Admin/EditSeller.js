import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function EditSeller() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [seller, setSeller] = useState(null);

  useEffect(() => {
    const fetchSeller = async () => {
      const response = await axios.get(`http://127.0.0.1:8000/creator/${id}`);
      setSeller(response.data);
    };
    fetchSeller();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.put(`http://127.0.0.1:8000/creator/${id}`, seller);
      alert('Seller updated successfully!');
      navigate('/AllSellers');  // Redirect after update
    } catch (error) {
      console.error('Failed to update seller:', error);
      alert('Failed to update seller.');
    }
  };

  const handleChange = (event) => {
    setSeller({ ...seller, [event.target.name]: event.target.value });
  };

  if (!seller) return <div>Loading...</div>;

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input type="text" name="username" value={seller.user.username} onChange={handleChange} />
      </label>
      {/* other fields */}
      <button type="submit">Submit</button>
    </form>
  );
}

export default EditSeller;
