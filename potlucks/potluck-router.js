const router = require('express').Router();

const db = require('../data/dbConfig.js');

// const Potluck = require('./potluck-model');
// const PotluckOrganizer = require('./organizer-model');

router.get('/', async (req, res) => {
  try {

    const sql = await db('potlucks').toString();
    console.log('sql: ', sql);

    const potlucks = await db('potlucks');
    res.json(potlucks);
  }
  catch(error) {
      console.error(error);
      res.status(500).json({ message: 'Error in database!', error:error });
    };
});

router.get('/:id', (req, res) => {
  const user_id = req.user.id;
  const potluck_id = req.params.id;

  Potluck.eventDetails(potluck_id)
    .then((eventDetails) => {
      PotluckOrganizer.guestsDetail(potluck_id)
        .then((guests) => {
          console.log(guests);
          eventDetails.guests = guests;
          res.status(200).send(eventDetails);
        })
        .catch((err) => {
          console.log(err);
          res.status(500).send({ message: 'DB error. Pls. try again.' });
        });
    })
    .catch((error) => {
      console.log(error);
      res
        .status(500)
        .send({ message: 'Error in getting data from the database.' });
    });
});

router.post('/', validatePotluckData, (req, res) => {
  const potluckData = req.body;
  console.log(req.user);
  const user_id = req.user.id;

  Potluck.add({ ...potluckData, user_id })
    .then((potluck) => {
      console.log(potluck);
      res.status(201).send(potluck);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send({ message: 'Potluck cannot be added.' });
    });
});

router.put('/:id', validateUser, (req, res) => {
  const potluck_id = req.params.id;
  const changes = req.body;

  Potluck.update(changes, potluck_id)
    .then((potluck) => {
      console.log(potluck);
      res.status(200).send(potluck);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send({ message: 'Potluck cannot be updated' });
    });
});

router.delete('/:id', validateUser, (req, res) => {
  const potluck_id = req.params.id;

  Potluck.remove(potluck_id)
    .then((count) => {
      console.log(count);
      res.status(200).send({ message: 'Potluck was deleted.' });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send({ message: 'Potluck cannot be deleted' });
    });
});

router.get('/:id/users', (req, res) => {
  const user_id = req.user.id;
  const potluck_id = req.params.id;

  PotluckOrganizer.findAllAttendees(potluck_id)
    .then((eventDetails) => {
      res.status(200).send(eventDetails);
    })
    .catch((error) => {
      console.log(error);
      res
        .status(500)
        .send({ message: 'Error! cannot retrieve data from the database.' });
    });
});

router.post('/:id/users', (req, res) => {
  const user_id = req.body.user_id;
  const potluck_id = req.params.id;

  PotluckOrganizer.add({ user_id, potluck_id })
    .then((response) => {
      console.log(response);
      res.status(201).send(response);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send({ message: 'Data cannot be created.' });
    });
});

router.put('/:id/users/', (req, res) => {
  const potluck_id = req.params.id;
  const user_id = req.body.user_id;

  PotluckOrganizer.findBy(user_id, potluck_id)
    .then((PotluckUsers) => {
      // console.log(PotluckUsers);
      if (PotluckUsers) {
        PotluckOrganizer.update(user_id, potluck_id)
          .then((count) => {
            res.status(200).send({ message: 'Invite was accepted.' });
          })
          .catch((err) => {
            console.log(err);
            res.status(500).send({ message: 'Request was not accepted.' });
          });
      } else {
        res.status(400).send({ message: 'Request does not exist.' });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send({ message: 'Request cannot be updated.' });
    });
});

router.delete('/:id/users/', (req, res) => {
  const potluck_id = req.params.id;
  const user_id = req.body.user_id;

  PotluckOrganizer.findBy(user_id, potluck_id)
    .then((PotluckUsers) => {
      if (PotluckUsers) {
        PotluckOrganizer.remove(user_id, potluck_id)
          .then((count) => {
            res.status(200).send({ message: 'Request was deleted' });
          })
          .catch((err) => {
            console.log(err);
            res.status(500).send({ message: 'Rquest cannot be deleted.' });
          });
      } else {
        res.status(400).send({ message: 'Requested id does not exist.' });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send({ message: 'Request cannot be deleted.' });
    });
});

function validatePotluckData(req, res, next) {
  const potluckData = req.body;

  if (
    !potluckData.name ||
    !potluckData.location ||
    !potluckData.time ||
    !potluckData.date
  ) {
    res
      .status(400)
      .send({
        message: 'Potluck event name, location, date and time are required.',
      });
  } else {
    next();
  }
}

function validateUser(req, res, next) {
  const user_id = req.user.id;
  const potluck_id = req.params.id;

  Potluck.findById(potluck_id)
    .first()
    .then((potluck) => {
      console.log(potluck);
      if (potluck) {
        if (potluck.user_id === user_id) {
          next();
        } else {
          res
            .status(403)
            .send({ message: 'Not authorized to update/delete the potluck.' });
        }
      } else {
        res.status(400).send({ error: 'Potluck id does not exist.' });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send({ message: 'Error! Please try again later.' });
    });
}

module.exports = router;
