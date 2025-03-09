const productQueries = {
  getProducts: `
     SELECT 
      p.id,
      p.sku,
      p.title,
      p.description,
      p.price,
      p.image,
      COALESCE(SUM(a.qty), 0) as stock,
      p.created_at,
      p.updated_at
    FROM 
        products p
    LEFT JOIN 
        adjustments a ON p.sku = a.sku
    GROUP BY 
        p.id, p.title, p.sku, p.image, p.price
    ORDER BY 
        p.id ASC
    LIMIT $1 OFFSET $2 
    `,
  getProductsCount: `
    SELECT COUNT(*) FROM products
  `,
  showProduct: `
    SELECT 
        p.id, 
        p.title, 
        p.sku, 
        p.image, 
        p.price, 
        p.description,
        COALESCE(SUM(a.qty), 0) as stock
      FROM 
        products p
      LEFT JOIN 
        adjustments a ON p.sku = a.sku
      WHERE 
        p.sku = $1
      GROUP BY 
        p.id, p.title, p.sku, p.image, p.price, p.description
   `,
  createProduct: `
    INSERT INTO products (title, sku,  price, description,image) VALUES ($1,$2,$3,$4,$5) RETURNING *
   `,
  updateProduct: `
    UPDATE products SET title = $1, price = $2, description = $3, image = $4 WHERE sku = $5  RETURNING *
  `,
  countProduct: `
     SELECT COUNT(*) FROM products
  `,
  getStockBySku: `
      SELECT 
        COALESCE(SUM(qty), 0) as stock
      FROM 
        adjustments
      WHERE 
      sku = $1
      GROUP BY sku
  `,
  deleteProduct: `
  DELETE FROM products WHERE sku = $1
  `,
};

export default productQueries;
