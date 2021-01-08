// Update with your config settings.

module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './data/potluckPlanner.db3',
    },
    useNullAsDefault: true,
    
    migrations: {
      directory: './data/migrations',
    },
    seeds: {
      migrations: {
        directory: './data/seeds',
      },
    },
  },
};
