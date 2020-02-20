import { Router } from 'express';
const router = Router();


router.get('/', async (req, res) => {
    const allBooks = await req.context.models.Book.findAll();
    return res.json(allBooks);
});


export default router;