<h3>E-Commerce Web App</h3>
<p>
📌 Overview
A simple E-Commerce Web Application built using Fastify for the backend The backend integrates with DummyJSON API to import products and manage them in a PostgreSQL database. Users can also manage product stock through adjustment transactions.</p>

<p>Backend</p>
<li>Fastify (High-performance Node.js API framework)</li>
Pg-Promise (Raw SQL queries for PostgreSQL)
TypeScript (For type safety)

Database
PostgreSQL (Relational Database)
Migration scripts (Using raw SQL queries)

Backend API

✅ Products
Import products from DummyJSON API
Get paginated product list
View product details
Create, update, and delete products
Prevent duplicate SKUs

✅ Adjustment Transactions
Create & manage stock adjustments
Prevent negative stock
Calculate total transaction amount based on product price

🛠️ Setup Instructions (Run Locally)
1️⃣ Clone Repository
git clone git@github.com:rifdoalam/be-jubelio.git
cd be-jubelio

2️⃣ Install Dependencies
npm install

3️⃣ Configure Environment Variables
PORT=
DB_HOST=
DB_PORT=
DB_NAME=
DB_USER=
DB_PASSWORD=

5️⃣ Run Database Migrations
to migrate
npm run db:migrate
to db down
npm run db:rollback

Start the Backend Server
npm run dev

📌 Notes
Stock is not stored in the database, but calculated dynamically from adjustment transactions.
The project uses raw SQL queries instead of an ORM.
API is fully documented with proper request/response structure.
postman in the form of a.json file
