const mongoose = require ('mongoose');

module.exports = () => {
    mongoose.connect('mongodb://localhost:27017/A2', {
    useNewUrlParser: true, 
    useUnifiedTopology: true
    });

const db = mongoose.connection;
db.on('error', (e)=>console.log(e))
db.once('open',()=>console.log('mongoose connection success!'))

}

