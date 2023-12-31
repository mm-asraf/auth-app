const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    firstName:{type:String, required:true},
    lastName:{type:String, required:true},
    email:{type:String, required:true},
    password:{type:String, required:true},  
},{
    timestamps:true,
    versionKey:false
})

userSchema.pre('save', function(next){
    if(!this.isModified("password")) return next();

    const hash = bcrypt.hashSync(this.password,8);
    this.password = hash;
    next();
    
})

userSchema.methods.checkPassword = function(password){
    const hashPassword = this.password;
   return bcrypt.compareSync(password, hashPassword)


}

module.exports = mongoose.model('user',userSchema);