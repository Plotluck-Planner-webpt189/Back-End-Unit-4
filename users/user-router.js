const router = require('express').Router();

const bcrypt = require("bcryptjs"); 
const User = require("../users/user-model");

router.post('/register', (req, res) => {  
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 12);
  user.password = hash;

  User
    .add(user)
    .then(id => {
      const token = generateToken(id);
      
      res.status(200).json({
           id: id[0],
           message: `User id created ${id}!`,
           token
          });
    }) 
    .catch(error => {
      console.log(error);
      res.status(500).json({error: `Error registering a user.`});
    });
});

router.post('/login', (req, res) => {
  let { username, password } = req.body;  
  User
    .findBy({ username })
    .first()
    .then(user => {
      console.log(user);
      if (user && bcrypt.compareSync(password, user.password)) {
          const token = generateToken(user);
        res.status(200).json({
             id: user.id,
             message: `Welcome ${user.username}!`,
             token
            });
      } else {
        res.status(401).json({ message: "Invalid Credentials" });
      }
    })
    .catch(error => {
      console.log("login error", error);
      res.status(500).json({error: `Error logging in a user.`});
    });
});

router.get('/', (req, res) => {
  User
    .find()
      .then(users => res.status(200).json(users))
      .catch(err => {
        console.log(err);
        res.status(500).json({error: 'Users information cannot be retrieved.'})
      });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  User
    .findById(id)
       .then(([user]) => {
            console.log(user);
            if (user) {
                 res.status(200).json(user);
            } else {
                 res.status(404).json({error: `This user id:${id} does not exist`})
            }
       });
});

module.exports = router;