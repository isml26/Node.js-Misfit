const bcrypt = require("bcrypt");
const { validationResult } = require('express-validator');
const session = require('express-session');
const User = require('../models/User');

exports.createUser = async (req,res)=>{
    try {
        console.log(req.body);
        const user = await User.create(req.body);
        res.status(201).redirect('/login');
    } catch (error) {
        //const errors = validationResult(req);
        res.status(400).json({
            status:'fail',
            error,
        })
    }
  
}

exports.loginUser = async (req,res)=>{
    try {
        const {email,password} = req.body;
        await User.findOne({email},(err,user)=>{
            if(user){
                bcrypt.compare(password,user.password,(err,same)=>{
                    if(same){
                        req.session.userID = user._id;
                        res.status(200).redirect('/')
                    }
                    else{
                        res.status(401).redirect('/login');
                    }
                })
            }
            else{
                console.log("does not exist");
            }
        })
    } catch (error) {
        res.status(400).json({
            status:'fail',
            error,
        })
    }
};
exports.logoutUser = (req,res)=>{
    req.session.destroy(()=>{
        res.redirect('/');
    });
}
exports.getWorkoutPage = async (req,res)=>{
    const user = await User.findOne({_id:req.session.userID});
    const workouts = user.workouts;
    res.status(200).render('workout',{
        page_name:'workout',
        user,
        workouts,
    });
};
