const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    townhall:{type:String, default:'townhall'},
    medals:{type:Number, default:0},
    email:{type:String, required:true},
    password:{type:String, required:true},
    resources:{
        golds:{type:Number, default:100},
        foods:{type:Number, default:100},
        soldiers:{type:Number, default:0}
    },
});


userSchema.pre('save', function(next) {
    User.findOne({email:this.email})
        .then((user) => {
            if(user) next({ message:'ALREADY_EXIST'});
            else {
                const salt=bcrypt.genSaltSync(10);
                this.password=bcrypt.hashSync(this.password, salt);
                next();
            }
        })
        .catch((e)=>next({ message:'MONGOOSE_ERROR' }));
});

const User = mongoose.model('User', userSchema);
module.exports = User