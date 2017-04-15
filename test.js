var Sequelize = require('sequelize')
var sequelize = new Sequelize('casper', 'drlee', 'leecasjamhtkale', {
  host: '192.168.0.7',
  dialect: 'mssql',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },

  // SQLite only
  //storage: 'path/to/database.sqlite'
});

// Or you can simply use a connection uri
//var sequelize = new Sequelize('postgres://user:pass@example.com:5432/dbname');

sequelize
  .authenticate()
  .then(function(err) {
    console.log('Connection has been established successfully.');
  })
  .catch(function (err) {
    console.log('Unable to connect to the database:', err);
  });

var User = sequelize.define('testuser', {
  firstName: {
    type: Sequelize.STRING
  },
  lastName: {
    type: Sequelize.STRING
  }
});

// force: true will drop the table if it already exists
User.sync({ force: false }).then(function () {
  // Table created
  return User.create({
    firstName: 'John',
    lastName: 'Hancock'
  });
});

User.findAll().then(function(users) {
  console.log(users)
})