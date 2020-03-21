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
//const author1 = models.Author.create({firstName: "Kenneth S.", lastName: "Rubin", bio: "I provide Scrum and agile training and coaching to help companies develop products in an effective and economically sensible way. I am a Certified Scrum Trainer and have trained over 20,000 people on agile and Scrum, Smalltalk development, managing object-oriented projects, and transition management. I have coached over 200 companies, ranging from start-ups to Fortune 10."});
//const author2 = models.Author.create({firstName: "Jane", lastName: "Doe", bio: "I write books."});
//const author3 = models.Author.create({firstName: "John", lastName: "Doe", bio: "I write books."});
//const author4 = models.Author.create({firstName: "Jamie", lastName: "Doe", bio: "I write books."});
//const book1 = models.Book.create({bookID : "978-0137043293", description: "Some book info", pages: 200, price: 29.99, genre : "Education", sales : 60, quantity: 211, title: "Essential Scrum: A Practical Guide", releaseDate : "2012-10-01", bookCover : "/bookcovers/978-0137043293.jpg", publisher : "Pearson-Education", authorAuthorID : 3});
//const book2 = models.Book.create({bookID : "978-0123456790", description: "Some book info", pages: 200,price: 19.99, genre : "Action", sales : 42, quantity: 103, title: "Cars Blow Up Easily", releaseDate : "2019-01-27", bookCover : "/bookcovers/978-0123456790.jpg", publisher : "Unreal Books", authorAuthorID : 2})
//const book3 = models.Book.create({bookID : "978-0123456791", description: "Some book info", pages: 200,price: 21.99,genre : "Romantic-Comedy", sales : 42, quantity: 103, title: "Opposites Always Attract", releaseDate : "2016-02-27", bookCover : "/bookcovers/978-0123456790.jpg", publisher : "Unreal Books", authorAuthorID : 1})
//const book4 = models.Book.create({bookID : "978-0123456792", description: "Some book info", pages: 200,price: 12.99,genre : "Gothic-Fantasy", sales : 42, quantity: 103, title: "The Unhappy Monster Slayer", releaseDate : "2001-01-27", bookCover : "/bookcovers/978-0123456790.jpg", publisher : "Unreal Books", authorAuthorID : 4})
//const book5 = models.Book.create({bookID : "978-0123456793", description: "Some book info", pages: 200,price: 10.99, genre : "Young-Adult", sales : 42, quantity: 103, title: "Minimal Parental Supervision Required", releaseDate : "2030-07-25", bookCover : "/bookcovers/978-0123456790.jpg", publisher : "Unreal Books", authorAuthorID : 1})
//const book6 = models.Book.create({bookID : "978-0123456794", description: "Some book info", pages: 200,price: 9.99, genre : "Action", sales : 42, quantity: 103, title: "Re: Cars Blow Up Even Easier", releaseDate : "2000-01-22", bookCover : "/bookcovers/978-0123456790.jpg", publisher : "Unreal Books", authorAuthorID : 2})
//const book7 = models.Book.create({bookID : "978-0123456795", description: "Some book info", pages: 200, price: 9.99, genre : "Adventure", sales : 42, quantity: 103, title: "Travel Time Means Nothing", releaseDate : "2015-09-09", bookCover : "/bookcovers/978-0123456790.jpg", publisher : "Unreal Books", authorAuthorID : 4})
//const book8 = models.Book.create({bookID : "978-0123456796", description: "Some book info", pages: 200, price: 9.99, genre : "Horror-Fiction", sales : 42, quantity: 103, title: "Some Creepy Place Again", releaseDate : "2017-10-05", bookCover : "/bookcovers/978-0123456790.jpg", publisher : "Unreal Books", authorAuthorID : 1})
//const book9 = models.Book.create({bookID : "978-0123456797", description: "Some book info", pages: 200, price: 15.99, genre : "Education", sales : 42, quantity: 103, title: "How I turned $1 into $1,000,000", releaseDate : "2019-01-27", bookCover : "/bookcovers/978-0123456790.jpg", publisher : "Unreal Books", authorAuthorID : 2})
//const book10 = models.Book.create({bookID : "978-0123456798", description: "Some book info", pages: 200, price: 19.99,genre : "Education", sales : 42, quantity: 103, title: "Breaking down the Basics", releaseDate : "1981-06-03", bookCover : "/bookcovers/978-0123456790.jpg", publisher : "Unreal Books", authorAuthorID : 4})
//const book11 = models.Book.create({bookID : "978-0123456799", description: "Some book info", pages: 200, price: 12.99,genre : "Romance", sales : 42, quantity: 103, title: "The Re-skin of a Re-skin", releaseDate : "2019-01-27", bookCover : "/bookcovers/978-0123456790.jpg", publisher : "Unreal Books", authorAuthorID : 1})
//const book12 = models.Book.create({bookID : "978-0123456800", description: "Some book info", pages: 190, price: 12.99,genre : "Young-Adult", sales : 42, quantity: 5, title: "School Time", releaseDate : "2015-06-27", bookCover : "/bookcovers/978-0123456790.jpg", publisher : "Unreal Books", authorAuthorID : 12})


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


