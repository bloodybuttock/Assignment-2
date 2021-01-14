const mongoose = require ('mongoose');
require('dotenv').config()

const cloud=`mongodb+srv://RetroHUB:${process.env.pass}@retrohub-cluster.yedkk.mongodb.net/clash_of_clans?retryWrites=true&w=majority`
const local=`mongodb://localhost:27017/A2`

module.exports = () => {
    mongoose.connect(cloud, {
    useNewUrlParser: true, 
    useUnifiedTopology: true
    });

const db = mongoose.connection;
db.on('error', (e)=>console.log(e))
db.once('open',()=>console.log('mongoose connection success!'))

}

