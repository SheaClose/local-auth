const massive = require('massive');

const massiveInstance = massive.connectSync({
  connectionString: 'postgres://Dallin@localhost/local-auth'
})

module.exports = massiveInstance
