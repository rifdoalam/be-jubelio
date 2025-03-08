import db from '../../config/db';
import { createProductsTable } from './001_create_products_table';
import { createAdjustmentsTable } from './002_create_adjustments_table';
export const runMigration = async (): Promise<void> => {
  const action = process.argv[2];
  try {
    if (action === 'up') {
      await db.none(createProductsTable);
      await db.none(createAdjustmentsTable);
      console.log('✅ Tables created successfully!');
    } else if (action === 'down') {
      await db.none(`
              DROP TABLE IF EXISTS adjustments;
              DROP TABLE IF EXISTS products;
            `);
      console.log('✅ Tables dropped successfully!');
    } else {
      console.log("❌ Invalid command. Use 'up' or 'down'.");
    }
  } catch (error) {
    console.error('❌ Migration error:', error);
  } finally {
    process.exit();
  }
};

runMigration();
