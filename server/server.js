import express from 'express';
import models, { db } from './models';
import routes from './routes';
import path from 'path';

const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.json());

app.use((req, res, next) => {
  req.context = {models};
  next();
});


// Routes

app.use('/static', express.static(path.join(__dirname, '/public')))
app.use('/api/books/', routes.bookR);
app.use('/api/authors/', routes.authorR);
app.use('/api/user/', routes.user);


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
  });


