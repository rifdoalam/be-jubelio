export const createAdjustmentsTable = `
CREATE TABLE IF NOT EXISTS adjustments (
  id SERIAL PRIMARY KEY,
  sku VARCHAR(100) NOT NULL,
  qty INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_product_sku FOREIGN KEY (sku) REFERENCES products(sku) ON DELETE CASCADE
);

CREATE INDEX idx_adjustments_sku ON adjustments(sku);
`;
