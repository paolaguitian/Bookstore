import db from './sequelize'
import express from 'express'


const app = express()
app.use(express.json())
//app.use('/api/books', require('./routes/bookR'))

//Authenticates and setup db
db.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

/*db.sync({ force: false })
  .then(() => {
    console.log(`DB created.`)
  })
*/

const PORT = process.env.PORT || 3001
    app.listen(PORT, () => {console.log(`Running on http://localhost:${PORT}`)
})