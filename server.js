const express = require('express');
const os = require('os');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const startTime = Date.now();
let maintenanceMode = false;

const products = [
  { id: 1, name: 'Wireless Headphones', category: 'Electronics', price: '₹2,499', stock: 45, status: 'In Stock' },
  { id: 2, name: 'Smartwatch Series 5', category: 'Wearables', price: '₹4,999', stock: 18, status: 'In Stock' },
  { id: 3, name: 'Mechanical Keyboard', category: 'Accessories', price: '₹3,299', stock: 5, status: 'Limited' },
  { id: 4, name: 'Ergonomic Gaming Chair', category: 'Furniture', price: '₹12,499', stock: 12, status: 'In Stock' },
  { id: 5, name: 'Ultra-Wide Monitor 27"', category: 'Electronics', price: '₹18,999', stock: 8, status: 'In Stock' },
  { id: 6, name: 'USB-C Docking Station', category: 'Accessories', price: '₹1,899', stock: 0, status: 'Out of Stock' }
];

// Serve Dashboard
app.get('/', (req, res) => {
  const uptimeSeconds = Math.floor((Date.now() - startTime) / 1000);
  const freeMemMB = Math.round(os.freemem() / (1024 * 1024));
  const totalMemMB = Math.round(os.totalmem() / (1024 * 1024));

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
        body { background-color: #f4f6f9; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; transition: background 0.3s; }
        .navbar { background: linear-gradient(135deg, #0d6efd, #0a58ca); }
        .card { border: none; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
        .badge-live { background-color: #198754; font-size: 0.85rem; }
        .dark-theme { background-color: #121212 !important; color: #ffffff !important; }
        .dark-theme .card { background-color: #1e1e1e !important; color: #ffffff !important; }
        .dark-theme .table { color: #ffffff !important; }
        .dark-theme .table-light { background-color: #2c2c2c !important; color: #ffffff !important; }
      </style>
    </head>
    <body id="bodyTag">
      <nav class="navbar navbar-dark px-4 py-3">
        <span class="navbar-brand mb-0 h1 fw-bold">🚀 E-Commerce DevOps Portal</span>
        <div class="d-flex align-items-center gap-2">
          <span class="badge badge-live px-3 py-2"><i class="bi bi-circle-fill me-1" style="font-size:0.6rem"></i> CI/CD Pipeline Live</span>
        </div>
      </nav>

      <div class="container my-4">
        <!-- System Telemetry Cards -->
        <div class="row g-3 mb-4">
          <div class="col-md-3">
            <div class="card p-3 text-center">
              <h6 class="text-muted mb-1"><i class="bi bi-clock-history text-primary me-1"></i> Container Uptime</h6>
              <h5 class="text-primary fw-bold mb-0">${uptimeSeconds}s</h5>
            </div>
          </div>
          <div class="col-md-3">
            <div class="card p-3 text-center">
              <h6 class="text-muted mb-1"><i class="bi bi-memory text-info me-1"></i> Free Memory</h6>
              <h5 class="text-info fw-bold mb-0">${freeMemMB} / ${totalMemMB} MB</h5>
            </div>
          </div>
          <div class="col-md-3">
            <div class="card p-3 text-center">
              <h6 class="text-muted mb-1"><i class="bi bi-cpu text-success me-1"></i> CPU Cores</h6>
              <h5 class="text-success fw-bold mb-0">${os.cpus().length} Cores</h5>
            </div>
          </div>
          <div class="col-md-3">
            <div class="card p-3 text-center">
              <h6 class="text-muted mb-1"><i class="bi bi-hdd-network text-warning me-1"></i> Host Platform</h6>
              <h5 class="text-dark fw-bold mb-0">${os.platform().toUpperCase()}</h5>
            </div>
          </div>
        </div>

        <!-- DevOps Feature Toggles & Actions -->
        <div class="card p-3 mb-4">
          <div class="d-flex justify-content-between align-items-center flex-wrap gap-2">
            <div class="fw-bold"><i class="bi bi-sliders me-2"></i>DevOps Feature Controls</div>
            <div class="d-flex gap-3">
              <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" id="darkToggle" onchange="toggleDarkMode()">
                <label class="form-check-label fw-semibold" for="darkToggle">Dark Mode</label>
              </div>
              <button class="btn btn-sm btn-outline-success" onclick="triggerDeploymentAlert()"><i class="bi bi-cloud-arrow-up me-1"></i> Simulate Rolling Update</button>
            </div>
          </div>
        </div>

        <!-- Inventory Table & Add Form -->
        <div class="row g-4">
          <div class="col-lg-8">
            <div class="card p-4 h-100">
              <div class="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-3">
                <div>
                  <h5 class="fw-bold mb-0">Live Product Catalog API</h5>
                  <small class="text-muted">Real-time inventory management endpoint</small>
                </div>
                <div class="d-flex gap-2">
                  <input type="text" id="searchInput" class="form-control form-control-sm" placeholder="🔍 Search..." onkeyup="filterProducts()">
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
                      <th>Price</th>
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
                          <span class="badge ${p.status === 'In Stock' ? 'bg-success-subtle text-success border' : p.status === 'Limited' ? 'bg-warning-subtle text-warning border' : 'bg-danger-subtle text-danger border'}">
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

          <!-- Add Product Form -->
          <div class="col-lg-4">
            <div class="card p-4 h-100">
              <h5 class="fw-bold mb-3"><i class="bi bi-plus-circle text-primary me-2"></i>Add Catalog Item</h5>
              <form id="addProductForm" onsubmit="addNewProduct(event)">
                <div class="mb-3">
                  <label class="form-label text-muted small fw-bold">Product Name</label>
                  <input type="text" id="prodName" class="form-control" required placeholder="e.g. Wireless Mouse">
                </div>
                <div class="mb-3">
                  <label class="form-label text-muted small fw-bold">Category</label>
                  <select id="prodCategory" class="form-select">
                    <option>Electronics</option>
                    <option>Wearables</option>
                    <option>Accessories</option>
                    <option>Furniture</option>
                  </select>
                </div>
                <div class="mb-3">
                  <label class="form-label text-muted small fw-bold">Price (₹)</label>
                  <input type="text" id="prodPrice" class="form-control" required placeholder="e.g. ₹1,299">
                </div>
                <div class="mb-3">
                  <label class="form-label text-muted small fw-bold">Stock Quantity</label>
                  <input type="number" id="prodStock" class="form-control" required placeholder="e.g. 25">
                </div>
                <button type="submit" class="btn btn-primary w-100"><i class="bi bi-check-circle me-1"></i> Publish to API</button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <!-- Toast Notification -->
      <div class="toast-container position-fixed bottom-0 end-0 p-3">
        <div id="actionToast" class="toast align-items-center text-bg-success border-0" role="alert">
          <div class="d-flex">
            <div class="toast-body" id="toastMessage">Notification</div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
          </div>
        </div>
      </div>

      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
      <script>
        function filterProducts() {
          const input = document.getElementById('searchInput').value.toLowerCase();
          document.querySelectorAll('#productTable tbody tr').forEach(row => {
            row.style.display = row.innerText.toLowerCase().includes(input) ? '' : 'none';
          });
        }

        function toggleDarkMode() {
          document.getElementById('bodyTag').classList.toggle('dark-theme');
        }

        function triggerDeploymentAlert() {
          showToast('🚀 Rolling update simulated! Docker container health checks passed.');
        }

        function testApi() {
          fetch('/api/products')
            .then(res => res.json())
            .then(data => showToast('API Status 200 OK: Fetch response verified.'))
            .catch(() => showToast('API Error'));
        }

        function buyProduct(name, price) {
          showToast('Order confirmed for ' + name + ' (' + price + ')!');
        }

        function addNewProduct(e) {
          e.preventDefault();
          const name = document.getElementById('prodName').value;
          const category = document.getElementById('prodCategory').value;
          const price = document.getElementById('prodPrice').value;
          const stock = document.getElementById('prodStock').value;

          fetch('/api/products', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, category, price, stock: parseInt(stock) })
          }).then(() => {
            showToast('Item ' + name + ' added to API successfully!');
            setTimeout(() => window.location.reload(), 1200);
          });
        }

        function showToast(msg) {
          document.getElementById('toastMessage').innerText = msg;
          new bootstrap.Toast(document.getElementById('actionToast')).show();
        }
      </script>
    </body>
    </html>
  `);
});

// JSON API Endpoints
app.get('/api/products', (req, res) => {
  res.json({ status: 'success', total: products.length, data: products });
});

app.post('/api/products', (req, res) => {
  const { name, category, price, stock } = req.body;
  const newProduct = {
    id: products.length + 1,
    name,
    category,
    price,
    stock: stock || 0,
    status: stock > 10 ? 'In Stock' : stock > 0 ? 'Limited' : 'Out of Stock'
  };
  products.push(newProduct);
  res.status(201).json({ status: 'success', data: newProduct });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});