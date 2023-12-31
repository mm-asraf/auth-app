const express = require('express');
const router = express.Router();
const User = require('../model/user.model')
const jwt = require('jsonwebtoken');



const generateToken = (user)=> {
    return jwt.sign({user:user},process.env.SECRET_KEY)
}

const verifyToken = (token)=> {
    return new Promise((resolve, reject) => { 
        jwt.verify(token,process.env.SECRET_KEY,(err,decodedUser)=> { 
            if(err) return reject(err)

            return resolve(decodedUser);
        })
    })
}

router.post('/register',async(req,res)=> {

    try {

        //check if user is already registered
        const existUser = await User.findOne({email: req.body.email}).lean().exec();
        if(existUser) {
            return res.status(409).send({message:"user already registered",status:'failed'})
        }

        

        const user = await User.create(req.body);
        const token = generateToken(user);
        return res.status(201).send({token});
        
    } catch (error) {
        return res.status(500).send({msg:"something went wrong",status:"failed"});
    }
})

router.post("/login",async(req,res)=> {

    try {
        //user exists or not
        const existUser = await User.findOne({email: req.body.email}).exec();
        if(!existUser) {return res.status(404).send({msg:"user not found",status:"failed"})}
        
        const isMatchedPassword = existUser.checkPassword(req.body.password);

        if(!isMatchedPassword){return res.status(404).send({msg:"password mismatch",status:"failed"})};

        const token = generateToken(existUser)

        return res.status(200).send({token});


    } catch (error) {
        return res.status(500).send({status:"failed",message:"something went wrong"})
    }
})



router.post("/authenticate",async(req,res)=> {
    try {

        const token = req.headers.authorization;
        const bearerToken = token.split(" ")[1];
        console.log(bearerToken);
        const verifiedUser = await verifyToken(bearerToken);
        console.log(verifiedUser,"verified user")

        return res.status(200).send({verifiedUser});
        
    } catch (error) {
        
    }
})

module.exports = router;