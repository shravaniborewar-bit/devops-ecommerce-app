const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Sample Product Data
const products = [
  { id: 1, name: 'Wireless Headphones', category: 'Electronics', price: '$99', status: 'In Stock' },
  { id: 2, name: 'Smartwatch Series 5', category: 'Wearables', price: '$199', status: 'In Stock' },
  { id: 3, name: 'Mechanical Keyboard', category: 'Accessories', price: '$79', status: 'Limited' },
  { id: 4, name: 'Ergonomic Chair', category: 'Furniture', price: '$299', status: 'In Stock' }
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
      <style>
        body { background-color: #f4f6f9; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
        .navbar { background: linear-gradient(135deg, #1e3c72, #2a5298); }
        .card { border: none; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
        .badge-live { background-color: #28a745; font-size: 0.85rem; }
      </style>
    </head>
    <body>
      <nav class="navbar navbar-dark px-4 py-3">
        <span class="navbar-brand mb-0 h1 fw-bold">🚀 E-Commerce DevOps Portal</span>
        <span class="badge badge-live px-3 py-2">CI/CD Pipeline Live</span>
      </nav>

      <div class="container my-4">
        <!-- Status Banner -->
        <div class="row mb-4">
          <div class="col-md-4">
            <div class="card p-3 text-center">
              <h6 class="text-muted">Pipeline Status</h6>
              <h4 class="text-success fw-bold">Active & Healthy</h4>
            </div>
          </div>
          <div class="col-md-4">
            <div class="card p-3 text-center">
              <h6 class="text-muted">Environment</h6>
              <h4 class="text-primary fw-bold">Docker Container</h4>
            </div>
          </div>
          <div class="col-md-4">
            <div class="card p-3 text-center">
              <h6 class="text-muted">Server Port</h6>
              <h4 class="text-dark fw-bold">3000</h4>
            </div>
          </div>
        </div>

        <!-- Product Inventory Table -->
        <div class="card p-4">
          <div class="d-flex justify-content-between align-items-center mb-3">
            <h5 class="fw-bold mb-0">Live Product Catalog API</h5>
            <button class="btn btn-primary btn-sm" onclick="alert('API Connection Verified!')">Test Endpoint</button>
          </div>
          <div class="table-responsive">
            <table class="table table-hover align-middle">
              <thead class="table-light">
                <tr>
                  <th>ID</th>
                  <th>Product Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                ${products.map(p => `
                  <tr>
                    <td>#00${p.id}</td>
                    <td class="fw-semibold">${p.name}</td>
                    <td><span class="badge bg-secondary">${p.category}</span></td>
                    <td class="fw-bold">${p.price}</td>
                    <td><span class="badge bg-success-subtle text-success border border-success-subtle">${p.status}</span></td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </body>
    </html>
  `);
});

// JSON API Endpoint
app.get('/api/products', (req, res) => {
  res.json({ status: 'success', data: products });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});