import React, { useState, useEffect } from 'react';
import SingleSeller from './SingleSeller';

function AllSellers() {
    const [sellers, setSellers] = useState([]);
    const [nextPage, setNextPage] = useState(null);
    const [prevPage, setPrevPage] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchSellers = (url = 'http://127.0.0.1:8000/api/creator/') => {
        setLoading(true);
        fetch(url)
            .then(response => response.json())
            .then(data => {
                setSellers(data.results);
                setNextPage(data.next);
                setPrevPage(data.previous);
                setLoading(false);
            })
            .catch(error => {
                console.error('Failed to fetch sellers', error);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchSellers();
    }, []);

    const handlePageChange = (url) => {
        if (url) {
            fetchSellers(url);
        }
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div className="all-sellers">
            <h1>All Sellers</h1>
            <div className="card-deck">
                {sellers.map(seller => (
                    <SingleSeller key={seller.user.id} seller={seller} />
                ))}
            </div>
            <div className="pagination-buttons">
                {prevPage && <button onClick={() => handlePageChange(prevPage)} className="page-button">Previous</button>}
                {nextPage && <button onClick={() => handlePageChange(nextPage)} className="page-button">Next</button>}
            </div>
        </div>
    );
}

export default AllSellers;
