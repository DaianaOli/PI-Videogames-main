require('dotenv').config();
const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const PORT = process.env.POSTGRES_PORT || 3000;


conn.sync({ force: false }).then(() => {
  server.listen(PORT, () => {
    console.log(`Server listening at ${PORT}`);
  });
});