exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('potlucks')
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex('potlucks').insert([
        {
          potluck_id: 1,
          eventName: 'Thanksgiving',
          date: '11-24-2021',
          time: '6:00 PM',
          location: 'Disneyworld',
        },
        {
          potluck_id: 2,
          eventName: 'Christmas',
          date: '12-24-2021',
          time: '7:00 PM',
          location: 'Las Vegas',
        },
        {
          potluck_id: 3,
          eventName: '60th Birthday',
          date: '10-18-2021',
          time: '8:00 PM',
          location: 'Las Vegas',
        },
      ]);
    });
};
