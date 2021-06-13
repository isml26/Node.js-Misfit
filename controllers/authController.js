const bcrypt = require("bcrypt");
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
};
exports.loginUser = async (req,res)=>{
    try {
        const {email,password} = req.body;
        await User.findOne({email},(err,user)=>{
            if(user){
                bcrypt.compare(password,user.password,(err,same)=>{
                    if(same){
                        req.session.userID = user._id;
                        res.status(200).redirect('/users/workouts')
                    }
                    else{
                        req.flash("error", `Wrong Id or Pw`);
                        res.status(401).redirect('/login');
                    }
                })
            }
            else{
                req.flash("error", `Wrong Id or Pw`);
                res.status(401).redirect('/login');
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
};
exports.getWorkoutPage = async (req,res)=>{
    const user = await User.findOne({_id:req.session.userID});
    const workouts = user.workouts;
    res.status(200).render('workouts',{
        page_name:'workouts',
        user,
        workouts,
    });
};
