const router = require('express').Router();

const User = require('../users/userModel');
const Potluck = require('./potluckModel');
const PotluckOrganizer = require('../potlucks/potluckOrganizer');

router.get('/all', (req, res) => {

  User.findAllExpectId(req.user.id)
    .then(users => {
      res.status(200).send(users);
    })
    .catch(error => {
      console.log(error);
      res.status(500).send({message: 'There was error.'});
    })
});

router.get('/organized', (req, res) => {
  const user_id = req.user.id;

  Potluck.findAllPotlucksByUser(user_id)
    .then(potlucks => {
      res.status(200).send(potlucks);
    })
    .catch(error => {
      console.log(error);
      res.status(500).send({message: 'Cannot request data from DB.'});
    })
});

router.get('/attending', (req, res) => {
  const user_id = req.user.id;
  const attendee = req.query.attendee === 'true' ? 1 : 0;

  PotluckOrganizer.potlucksToAttend(user_id, attendee)
    .then(potlucks => {
      console.log(potlucks);
      res.status(200).send(potlucks);
    })
    .catch(error => {
      console.log(error);
      res.status(500).send({message: 'Database error'});
    })

});


module.exports = router;