import React, { useEffect, useState } from 'react';
import SingleCreator from './SingleCreator';

function AllCreators() {
  const [creators, setCreators] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCreators() {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/creator/'); // Adjust this URL to your actual API endpoint

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Fetched data:', data);

        // Remove duplicates
        const uniqueCreators = Array.from(new Set(data.results.map(c => c.id)))
          .map(id => data.results.find(c => c.id === id));

        setCreators(uniqueCreators);
      } catch (error) {
        console.error('Error fetching creators:', error);
        setError(error.message);
      }
    }

    fetchCreators();
  }, []);

  console.log('Creator list:', creators);

  return (
    <div className="row">
      {error && <div className="alert alert-danger">Error: {error}</div>}
      {creators.map((creator) => (
        <SingleCreator key={creator.id} creator={creator} />
      ))}
    </div>
  );
}

export default AllCreators;
