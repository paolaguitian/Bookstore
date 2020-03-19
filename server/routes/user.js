import { Router } from 'express';
import createToken from '../config/authenticate';


const router = Router();

router.post('/create', async(req, res) => {

  const userModel = req.context.models.User;
  const {
    firstName,
    lastName,
    email,
    username,
    password,
    homeAddress,
    phoneNumber
  } = req.body;

  const isUsernameTaken = await userModel.findOne({
      where: {
        username: username,
      }
  })

  if (isUsernameTaken === null) {

    const [user, created] = await userModel.findOrCreate({
      where: {email: email},
      defaults: {
        firstName: firstName,
        lastName: lastName,
        email: email,
        username: username,
        password: password,
        homeAddress: homeAddress,
        phoneNumber: phoneNumber
      }
    });

    if (created) {
      const token = createToken(user);
      return res.status(200).json({user, accessToken: token});
    } else
        res.status(403).json("An Account With This Email Already Exists")
  } else
    res.status(400).json("This Username is Already Taken, Try Another One");
  });

export default router;
