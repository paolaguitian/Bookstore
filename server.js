import express from 'express';
import models, {db} from './models';
import routes from './routes';

const app = express()

const PORT = process.env.PORT || 3001

app.use(express.json())
app.use((req, res, next) => {
  req.context = {models};
  next();
});


// Routes

app.use('/api/books', routes.bookR);

//Authenticates and setup db
db.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

db.sync({ force: false })
  .then(() => {
    console.log(`DB created.`)
    app.listen(PORT, () => {console.log(`Running on http://localhost:${PORT}`)})
  })



    