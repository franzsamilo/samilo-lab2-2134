import { Pool } from 'pg';

const loansPool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'webdev-labs-samilo',
  password: 'franz0615',
  port: 5432,
});

export default loansPool;
