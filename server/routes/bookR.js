import { Router } from 'express';
const router = Router();


router.get('/all', async (req, res) => {
    const allBooks = await req.context.models.Book.findAll();
    return res.json(allBooks);
});

router.get('/:isbn', async (req, res) => {
    const bookID = req.params.isbn;
    const book = await req.context.models.Book.findByPk(bookID);
    return res.json(book);
});

export default router;