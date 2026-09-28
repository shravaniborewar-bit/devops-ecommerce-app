const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Sample Product Data in Rupees (₹)
const products = [
  { id: 1, name: 'Wireless Headphones', category: 'Electronics', price: '₹2,499', stock: 45, status: 'In Stock' },
  { id: 2, name: 'Smartwatch Series 5', category: 'Wearables', price: '₹4,999', stock: 18, status: 'In Stock' },
  { id: 3, name: 'Mechanical Keyboard', category: 'Accessories', price: '₹3,299', stock: 5, status: 'Limited' },
  { id: 4, name: 'Ergonomic Gaming Chair', category: 'Furniture', price: '₹12,499', stock: 12, status: 'In Stock' },
  { id: 5, name: 'Ultra-Wide Monitor 27"', category: 'Electronics', price: '₹18,999', stock: 8, status: 'In Stock' },
  { id: 6, name: 'USB-C Docking Station', category: 'Accessories', price: '₹1,899', stock: 0, status: 'Out of Stock' }
];

// Serve Interactive Dashboard
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>E-Commerce DevOps Control Center</title>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css">
      <style>
        body { background-color: #f4f6f9; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
        .navbar { background: linear-gradient(135deg, #0d6efd, #0a58ca); }
        .card { border: none; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
        .badge-live { background-color: #198754; font-size: 0.85rem; }
        .metric-card { transition: transform 0.2s; }
        .metric-card:hover { transform: translateY(-3px); }
      </style>
    </head>
    <body>
      <nav class="navbar navbar-dark px-4 py-3">
        <span class="navbar-brand mb-0 h1 fw-bold">🚀 E-Commerce DevOps Portal</span>
        <div class="d-flex align-items-center gap-2">
          <span class="badge badge-live px-3 py-2"><i class="bi bi-circle-fill me-1" style="font-size:0.6rem"></i> CI/CD Pipeline Live</span>
        </div>
      </nav>

      <div class="container my-4">
        <!-- Analytics Metrics Banner -->
        <div class="row g-3 mb-4">
          <div class="col-md-3">
            <div class="card p-3 text-center metric-card">
              <h6 class="text-muted mb-1"><i class="bi bi-cpu text-primary me-1"></i> Pipeline Status</h6>
              <h5 class="text-success fw-bold mb-0">Active & Healthy</h5>
            </div>
          </div>
          <div class="col-md-3">
            <div class="card p-3 text-center metric-card">
              <h6 class="text-muted mb-1"><i class="bi bi-box-seam text-info me-1"></i> Deployment</h6>
              <h5 class="text-primary fw-bold mb-0">Docker Container</h5>
            </div>
          </div>
          <div class="col-md-3">
            <div class="card p-3 text-center metric-card">
              <h6 class="text-muted mb-1"><i class="bi bi-cart-check text-success me-1"></i> Total Products</h6>
              <h5 class="text-dark fw-bold mb-0">${products.length} Items</h5>
            </div>
          </div>
          <div class="col-md-3">
            <div class="card p-3 text-center metric-card">
              <h6 class="text-muted mb-1"><i class="bi bi-hdd-network text-warning me-1"></i> Server Port</h6>
              <h5 class="text-dark fw-bold mb-0">3000</h5>
            </div>
          </div>
        </div>

        <!-- Product Inventory & Live Operations -->
        <div class="card p-4">
          <div class="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-3">
            <div>
              <h5 class="fw-bold mb-0">Live Product Catalog API</h5>
              <small class="text-muted">Real-time inventory management endpoint</small>
            </div>
            <div class="d-flex gap-2">
              <input type="text" id="searchInput" class="form-control form-control-sm" placeholder="🔍 Search product..." onkeyup="filterProducts()">
              <button class="btn btn-outline-primary btn-sm text-nowrap" onclick="testApi()"><i class="bi bi-arrow-repeat me-1"></i> Test Endpoint</button>
            </div>
          </div>

          <div class="table-responsive">
            <table class="table table-hover align-middle mb-0" id="productTable">
              <thead class="table-light">
                <tr>
                  <th>ID</th>
                  <th>Product Name</th>
                  <th>Category</th>
                  <th>Price (INR)</th>
                  <th>Stock</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                ${products.map(p => `
                  <tr>
                    <td class="text-muted">#00${p.id}</td>
                    <td class="fw-semibold">${p.name}</td>
                    <td><span class="badge bg-secondary-subtle text-dark border">${p.category}</span></td>
                    <td class="fw-bold text-dark">${p.price}</td>
                    <td>${p.stock} units</td>
                    <td>
                      <span class="badge ${p.status === 'In Stock' ? 'bg-success-subtle text-success border border-success-subtle' : p.status === 'Limited' ? 'bg-warning-subtle text-warning border border-warning-subtle' : 'bg-danger-subtle text-danger border border-danger-subtle'}">
                        ${p.status}
                      </span>
                    </td>
                    <td>
                      <button class="btn btn-sm btn-primary py-1 px-2" ${p.stock === 0 ? 'disabled' : ''} onclick="buyProduct('${p.name}', '${p.price}')">
                        <i class="bi bi-cart-plus me-1"></i> Order
                      </button>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Toast Notification -->
      <div class="toast-container position-fixed bottom-0 end-0 p-3">
        <div id="actionToast" class="toast align-items-center text-bg-success border-0" role="alert" aria-live="assertive" aria-atomic="true">
          <div class="d-flex">
            <div class="toast-body" id="toastMessage">Order placed successfully!</div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
          </div>
        </div>
      </div>

      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
      <script>
        function filterProducts() {
          const input = document.getElementById('searchInput').value.toLowerCase();
          const rows = document.querySelectorAll('#productTable tbody tr');
          rows.forEach(row => {
            const text = row.innerText.toLowerCase();
            row.style.display = text.includes(input) ? '' : 'none';
          });
        }

        function testApi() {
          fetch('/api/products')
            .then(res => res.json())
            .then(data => {
              showToast('API Response Verified: ' + data.data.length + ' products fetched.');
            })
            .catch(() => showToast('Error connecting to REST API.'));
        }

        function buyProduct(name, price) {
          showToast('Order confirmed for ' + name + ' (' + price + ')!');
        }

        function showToast(msg) {
          document.getElementById('toastMessage').innerText = msg;
          const toast = new bootstrap.Toast(document.getElementById('actionToast'));
          toast.show();
        }
      </script>
    </body>
    </html>
  `);
});

// JSON REST API Endpoint
app.get('/api/products', (req, res) => {
  res.json({ status: 'success', total: products.length, data: products });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});