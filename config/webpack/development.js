process.env.NODE_ENV = process.env.NODE_ENV || 'development'

const environment = require('./environment')

console.log(environment.toWebpackConfig())
module.exports = environment.toWebpackConfig()
