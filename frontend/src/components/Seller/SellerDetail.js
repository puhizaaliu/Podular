import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import logo from '../logo.svg';

function SellerDetail() {
  const baseUrl = 'http://127.0.0.1:8000/api';
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { creator } = useParams(); // Consider renaming this variable to 'creatorId' for consistency

  useEffect(() => {
    fetchData(`${baseUrl}/podcasts/`);
  }, [creator]);

  async function fetchData(url) {
    try {
      console.log('Fetching data from:', url); // Log URL being fetched
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log('Fetched data:', data);

      // Check if podcasts have creator IDs or embedded creator data
      if (data.results && data.results.length > 0 && data.results[0].creator) {
        const creatorIds = data.results.map(podcast => podcast.creator);
        const creatorsPromises = creatorIds.map(creatorId => fetch(`${baseUrl}/creator/${creatorId}`));
        const creatorsResponses = await Promise.all(creatorsPromises);
        const creatorsData = await Promise.all(creatorsResponses.map(response => response.json()));

        // Combine creator data with podcast data
        const podcastsWithCreators = data.results.map((podcast, index) => ({
          ...podcast,
          creatorData: creatorsData[index]
        }));

        setPodcasts(podcastsWithCreators);
      } else {
        // Set podcasts directly if creator data is embedded
        setPodcasts(data.results);
      }
      setLoading(false);
    } catch (error) {
      console.error('Fetching error:', error);
      setError(error.message);
      setLoading(false);
    }
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!podcasts || podcasts.length === 0) {
    return <div>No podcasts found</div>;
  }

  return (
    <section className="container mt-4">
      <div className="row">
        {podcasts.map(podcast => (
            <div className="col-4" key={podcast.id}>
                
            <h3> {podcast.creatorData.username}'s latest podcast</h3>
            <div className="card mb-4">
              <img src={logo} className="card-img-top" alt="Podcast Logo" />
              <div className="card-body">
                <h5 className="card-title">{podcast.title}</h5>
                <p className="card-text">{podcast.detail}</p>
                {podcast.creatorData && (
                  <p>Creator: {podcast.creatorData.username}</p> // Ensure 'username' is the correct property name
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default SellerDetail;