import SellerSidebar from "./SellerSidebar";

function SellerOrders() {
  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-9 col-12">
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>T Shirt</td>
                  <td>$$$</td>
                  <td>Available</td>
                  <td>
                    <div className="dropdown">
                      <button
                        className="btn btn-secondary dropdown-toggle"
                        type="button"
                        id="dropdownMenuButton"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        Change status
                      </button>
                      <ul
                        className="dropdown-menu"
                        aria-labelledby="dropdownMenuButton"
                      >
                        <li>
                          <button className="dropdown-item">Received</button>
                        </li>
                        <li>
                          <button className="dropdown-item">Processing</button>
                        </li>
                        <li>
                          <button className="dropdown-item">Sent</button>
                        </li>
                      </ul>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="col-md-3 col-12 mb-2">
          <SellerSidebar />
        </div>
      </div>
    </div>
  );
}

export default SellerOrders;
