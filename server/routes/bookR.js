import { Router } from 'express';
import paginate from 'jw-paginate';
const router = Router();


router.get('/all', async (req, res) => {
    const allBooks = await req.context.models.Book.findAll();
    const page = parseInt(req.query.page) || 1;
    const pager = paginate(allBooks.length, page, 9);
    const pageOfBooks = allBooks.slice(pager.startIndex, pager.endIndex + 1)
    return res.json({pager, pageOfBooks});
});

router.get('/:isbn', async (req, res) => {
    const bookID = req.params.isbn;
    const book = await req.context.models.Book.findByPk(bookID);
    return res.json(book);
});

router.get('/authorbooks/:authorID', async (req, res) => {
    const authorID = req.params.authorID;
    const books = await req.context.models.Book.findAll({
        attributes: ['bookID', 'title', 'bookCover', 'authorAuthorID', 'price', 'genre', 'publisher'],
        where: {
          authorAuthorID: authorID
        }
    });
    const page = parseInt(req.query.page) || 1;
    const pager = paginate(books.length, page, 9);
    const pageOfBooks = books.slice(pager.startIndex, pager.endIndex + 1)
    return res.json({pager, pageOfBooks});
})

export default router;