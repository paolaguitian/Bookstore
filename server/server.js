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

//Dummy books for testing
//const author1 = models.Author.create({firstName: "John", lastName: "Doe", bio: "I am NPC 1"});
//const author2 = models.Author.create({firstName: "Jane", lastName: "Doe", bio: "I am NPC 2"});
//const book1 = models.Book.create({bookID : "123456789", genre : "test", sales : 60, quantity: 211, title: "Test Book 1", releaseDate : "2019-01-26", bookCover : "/bookcovers/123456789.png", publisher : "Unreal Books", authorAuthorID : 1});
//const book2 = models.Book.create({bookID : "123456790",genre : "test", sales : 42, quantity: 103, title: "Test Book 2", releaseDate : "2019-01-27", bookCover : "/bookcovers/123456790.png", publisher : "Unreal Books", authorAuthorID : 2})
//const book2 = models.Book.create({bookID : "123456791", genre : "test", sales : 42, quantity: 103, title: "Test Book 2", releaseDate : "2019-01-27", bookCover : "/bookcovers/123456790.png", publisher : "Unreal Books", authorAuthorID : 2})
//const book3 = models.Book.create({bookID : "123456792", genre : "test", sales : 42, quantity: 103, title: "Test Book 2", releaseDate : "2019-01-27", bookCover : "/bookcovers/123456790.png", publisher : "Unreal Books", authorAuthorID : 2})
//const book4 = models.Book.create({bookID : "123456793", genre : "test", sales : 42, quantity: 103, title: "Test Book 2", releaseDate : "2019-01-27", bookCover : "/bookcovers/123456790.png", publisher : "Unreal Books", authorAuthorID : 2})
//const book5 = models.Book.create({bookID : "123456794", genre : "test", sales : 42, quantity: 103, title: "Test Book 2", releaseDate : "2019-01-27", bookCover : "/bookcovers/123456790.png", publisher : "Unreal Books", authorAuthorID : 2})
//const book6 = models.Book.create({bookID : "123456795", genre : "test", sales : 42, quantity: 103, title: "Test Book 2", releaseDate : "2019-01-27", bookCover : "/bookcovers/123456790.png", publisher : "Unreal Books", authorAuthorID : 2})
//const book7 = models.Book.create({bookID : "123456796", genre : "test", sales : 42, quantity: 103, title: "Test Book 2", releaseDate : "2019-01-27", bookCover : "/bookcovers/123456790.png", publisher : "Unreal Books", authorAuthorID : 2})
//const book8 = models.Book.create({bookID : "123456797", genre : "test", sales : 42, quantity: 103, title: "Test Book 2", releaseDate : "2019-01-27", bookCover : "/bookcovers/123456790.png", publisher : "Unreal Books", authorAuthorID : 2})
//const book9 = models.Book.create({bookID : "123456798", genre : "test", sales : 42, quantity: 103, title: "Test Book 2", releaseDate : "2019-01-27", bookCover : "/bookcovers/123456790.png", publisher : "Unreal Books", authorAuthorID : 2})
//const book10 = models.Book.create({bookID : "123456799", genre : "test", sales : 42, quantity: 103, title: "Test Book 2", releaseDate : "2019-01-27", bookCover : "/bookcovers/123456790.png", publisher : "Unreal Books", authorAuthorID : 2})


// Routes

app.use('/static', express.static(path.join(__dirname, '/public')))
app.use('/api/books/', routes.bookR);
app.use('/api/authors/', routes.authorR);


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


