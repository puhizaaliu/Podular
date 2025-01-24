import React from 'react';
import { Link } from 'react-router-dom';

function SingleCreator({ creator }) {
  return (
    <div className="col-12 col-md-3 mb-4">
      <div className="card">
        {creator && (
          <Link to={`/creator/${creator.id}`}>
            <img src={creator.profile_img} className="card-img-top" alt="Seller" />
          </Link>
        )}
        <div className="card-body">
          {creator && (
            <h5 className="card-title">
              <Link to={`/creator/${creator.id}`}>{creator.user.username}</Link>
            </h5>
          )}
        </div>
        <div className="card-footer">
        </div>
      </div>
    </div>
  );
}

export default SingleCreator;
