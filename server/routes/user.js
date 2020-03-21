import { Router } from 'express';
const router = Router();


router.post('/create', async(req, res) => {
  const user = await req.context.models.User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    homeAddress: req.body.homeAddress,
    phoneNumber: req.body.phoneNumber
  })
  return res.json(user)
});

export default router;