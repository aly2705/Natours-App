const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config({ path: './config.env' }); //using 3rd party module to include our env variables
//console.log(process.env); // view node env variables

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

// CONNECTION TO HOSTED DATABASE USING MONGOOSE DRIVER
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    // this connect method promise response gets access to a connectionObj
    console.log('Connected to database successfully');
  });

const app = require('./app');

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
