import { Router } from 'express';
const router = Router();


router.get('/all', async (req, res) => {
    const allAuthors = await req.context.models.Author.findAll();
    return res.json(allAuthors);
});

router.get('/:authorID', async (req, res) => {
    const authorID = req.params.authorID;
    const author = await req.context.models.Author.findByPk(authorID);
    return res.json(author);
});

export default router;