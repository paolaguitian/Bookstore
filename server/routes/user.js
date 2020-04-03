import { Router } from 'express';
import createToken from '../config/authenticate';
import bcrypt from 'bcrypt';

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
        password: await bcrypt.hash(password,10),
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

  router.post('/read', async(req, res) => {
    const userModel = req.context.models.User;
    const { username, password } = req.body;
     await userModel.findOne({
      where: {
        username: username,
      }
    }).then(user => {
        if (bcrypt.compare(password, user.password)) {
          const token = createToken(user);
          res.status(200).json({user, accessToken: token})
        } else
           res.status(400).json("Incorrect Password");
    }).catch(() => {
       res.status(400).json("Username Not Associated With Any Account");
    })

  });


export default router;
