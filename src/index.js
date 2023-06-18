const http = require("http");
const app = require("./app");
var admin = require("firebase-admin");
const server = http.createServer(app);

const { API_PORT } = process.env;
const port = process.env.PORT || API_PORT;


var serviceAccount = require("../alertme-project-service.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// server listening 
app.listen(port, () => {
  console.log(`[index.js] Server running on port ${port}`);
});