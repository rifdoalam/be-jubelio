const adjustmentQueries = {
  getAdjustment: `
        SELECT
            a.id,
            a.sku,
            a.qty,
            (a.qty * p.price) as amount,
            a.created_at
        FROM 
            adjustments a
        LEFT JOIN
            products p ON a.sku = p.sku
        ORDER BY 
            a.created_at DESC
        LIMIT $1 OFFSET $2
    `,
  createData: `
    INSERT INTO adjustments (sku, qty) VALUES ($1, $2) RETURNING *
    `,
  updateData: `
    UPDATE adjustments SET qty = $2  WHERE id = $1  RETURNING *
  `,
  showData: `
    SELECT 
        a.id,
        a.sku,
        a.qty,
        (a.qty * p.price) as amount
    FROM 
        adjustments a
    JOIN 
        products p ON a.sku = p.sku
    WHERE 
        a.sku = $1
        `,
  getAdjustmentsBySku: ` 
        SELECT 
              a.id, 
              a.sku, 
              a.qty, 
              (a.qty * p.price) as amount,
              a.created_at
            FROM 
              adjustments a
            JOIN 
              products p ON a.sku = p.sku
            WHERE 
              a.sku = $1
            ORDER BY 
              a.created_at DESC
        `,
  getAdjustmentsById: `
        SELECT 
        a.id, 
        a.sku, 
        a.qty, 
        (a.qty * p.price) as amount,
        a.created_at
      FROM 
        adjustments a
      JOIN 
        products p ON a.sku = p.sku
      WHERE 
        a.id = $1
    `,
  deleteData: `
     DELETE FROM adjustments WHERE id = $1 RETURNING *
    `,
  coundData: `
    SELECT COUNT(*) FROM adjustments`,
};
export default adjustmentQueries;
