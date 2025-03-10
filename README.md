<h3>E-Commerce Web App</h3>
<p>
📌 Overview
A simple E-Commerce Web Application built using Fastify for the backend The backend integrates with DummyJSON API to import products and manage them in a PostgreSQL database. Users can also manage product stock through adjustment transactions.</p>

<p>Backend</p>
<li>Fastify (High-performance Node.js API framework)</li>
<li>Pg-Promise (Raw SQL queries for PostgreSQL)</li>
<li>TypeScript (For type safety)</li>

<p>Database</p>
<li>PostgreSQL (Relational Database)</li>
<li>Migration scripts (Using raw SQL queries)</li>

<p>Backend API</p>
<p>✅ Products</p>
<li>Import products from DummyJSON API</li>
<li>Get paginated product list</li>
<li>View product details</li>
<li>Create, update, and delete products</li>
<li>Prevent duplicate SKUs</li>

<p>✅ Adjustment Transactions</p>
<li>Create & manage stock adjustments</li>
<li>Prevent negative stock</li>
<li>Calculate total transaction amount based on product price</li>

<p>🛠️ Setup Instructions (Run Locally)</p>

<p>1️⃣ Clone Repository</p>
<li>git clone git@github.com:rifdoalam/be-jubelio.git</li>
<li>cd be-jubelio</li>

<p>2️⃣ Install Dependencies</p>
<li>npm install</li>

<p>3️⃣ Configure Environment Variables</p>
<li>PORT=</li>
<li>DB_HOST=</li>
<li>DB_PORT=</li>
<li>DB_NAME=</li>
<li>DB_USER=</li>
<li>DB_PASSWORD=</li>

<p>5️⃣ Run Database Migrations</p>
<p>to migrate
npm run db:migrate
to db down
npm run db:rollback</p>
<p>6️⃣ Start the Backend Server
npm run dev</p>

<p>📌 Notes</p>
<li>Stock is not stored in the database, but calculated dynamically from adjustment transactions.</li>
<li>The project uses raw SQL queries instead of an ORM.</li>
<li>API is fully documented with proper request/response structure.</li>
<li>postman in the form of a.json file</li>
