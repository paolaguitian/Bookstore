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

export default router;