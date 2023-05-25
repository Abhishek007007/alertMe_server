import express from 'express';

const app = express();

app.use(express.json());

// Route
app.get('/', (req, res) => {
  res.send('<h1>Hello World</h1>');
});

const port = process.env.PORT || 5000;
const start = async () => {
  try {
    // await connectDB();
    app.listen(port, () => {
      console.log(`Server listening at http://127.0.0.1:${port}`);
    });
    console.log(process.env.NODE_ENV);
  } catch (error) {
    console.log('Something went wrong');
  }
};

start();