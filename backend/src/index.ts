import { app } from './app.js';
import { sequelize } from './db.js';

const port = Number(process.env.PORT || 4000);

await sequelize.authenticate();
app.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`);
});
