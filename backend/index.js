const express = require('express');
const app = express();
const cors = require('cors');
const database = require('./config/database');
const userRoutes = require('./routes/UserRoute');
const documentRoutes = require('./routes/documentRoute');
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
database.connect();

app.use('/api/v1', userRoutes);
app.use('/api/v1/document', documentRoutes);

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to the API',
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


// const express = require('express');
// const app = express();
// const user = require("./routes/UserRoute");
// const document = require("./routes/documentRoute")
// const database = require("./config/database");
// const server = require('socket.io');
// const dotenv = require("dotenv");
// require("dotenv").config();


// app.use(express.json());
// const PORT = process.env.PORT || 5000;
// database.connect();

// app.use(cors);
// app.use("/api/v1/auth", user);
// app.use("/api/v1/document",document);

// app.get("/", (req, res) => {
//     res.status(200).json({
//       message: "Welcome to the API",
//     });
//   });
  
//   app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
//   });
  