const EE = require('node:events');

const emitter  = new EE();

emitter.on( 'test2', (...data) => {
    console.log(data)
})

emitter.once( 'create_user', (user) => {
    console.log(user)
})

module.exports = {emitter};
