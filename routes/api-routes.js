var customerAction = require('../controllers/customer-api.js')


module.exports = function(app){

    app.post('/update/:userType/:userId', customerAction.update)
}