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

  router.post('/create/ship', async(req, res) => {
    const shipModel = req.context.models.ShippingAddress;
    const { shippingAddress1, userID } = req.body;

    const [add, created] = await shipModel.findOrCreate({
      where: {userUserID: userID},
      defaults: {
        street: shippingAddress1,
        city: ' ',
        state: ' ',
        zipcode: ' ',
        country: ' ',
      }
    });

    if (created) {
      return res.status(200).json(add);
    } else
      res.status(400).json("Unable to Save Address")
  });

  router.post('/create/card', async(req, res) => {
    const creditModel = req.context.models.CreditCard;
    const { creditCard, userID } = req.body;

    const [card, created] = await creditModel.findOrCreate({
      where: {userUserID: userID},
      defaults: {
        cardNumber: creditCard,
        cvc: ' ',
        expDate: ' ',
      }
    });

    if (created) {
      return res.status(200).json(card);
    } else
      res.status(400).json("Unable to Save Address")
  });


export default router;
