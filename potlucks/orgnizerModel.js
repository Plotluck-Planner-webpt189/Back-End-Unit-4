const db = require('../data/dbConfig');

const find = () => {
  return db('potluck_organizer');
};

const findBy = (organizer_id, potluck_id) => {
  return db('potluck_organizer').where({organizer_id, potluck_id}).first();
};

const add = (data) => {
  return db('potluck_organizer').insert(data)
    .then(ids => {
      console.log(ids);
      return findBy(data.organizer_id, data.potluck_id);
    })
};

const update = (organizer_id, potluck_id) => {
  return db('potluck_organizer').where({organizer_id, potluck_id}).update({accepted: 1});
};

const remove = (organizer_id, potluck_id) => {
  return db('potluck_organizer').where({organizer_id, potluck_id}).del();
};

const findAllAttendees = (id) => {
  return db.from('users')
    .innerJoin('potluck_organizer', 'potluck_organizer.organizer_id', 'users.id')
    .innerJoin('potlucks', 'potluck_organizer.potluck_id', 'potlucks.id')
    .select('users.firstName', 'users.lastName', 'potlucks.name')
    .where({ accepted: 1, potluck_id: id })

};


const potluckGuests = (id) => {

  return db.from('users')
    .innerJoin('potluck_organizer', 'potluck_organizer.organizer_id', 'users.id')
    .select('users.id', 'users.firstName', 'users.lastName', 'potluck_organizer.accepted')
    .where({potluck_id: id})
    .then(guests => {
      
      return guests.map(guest => ({...guest, accepted : guest.accepted ? true : false}));
    
    })
}

const potlucksAttendee = (id, attending) => {

  return db.from('potluck_organizer')
    .innerJoin('potlucks', 'potluck_id', 'potlucks.id')
    .innerJoin('users', 'users.id', 'potlucks.organizer_id')
    .select('name', 'location', 'date', 'time', 'potluck_id', 'firstName', 'lastName')
    .where({'potluck_organizer.organizer_id': id, accepted: attending})

};

module.exports = {
  find, 
  findBy,
  add,
  update,
  remove,
  findAllAttendees, 
  potluckGuests, 
  potlucksAttendee
};