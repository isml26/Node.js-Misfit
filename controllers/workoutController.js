const User = require('../models/User');

exports.addWorkout = async(req,res)=>{
    try {
        const user = await User.findOne({_id:req.session.userID});
        user.workouts.push(req.body);
        user.save();
        req.flash("success", `Workout Created Successfully!`);
        res.status(200).redirect('/users/workouts');
    } catch (error) {
        req.flash("error", `Something Happened`);
        req.status(400).redirect('/users/workouts');
    }
};
exports.removeWorkout = async(req,res)=>{
    try{
    const user = await User.findOne({_id:req.session.userID});
    await user.workouts.splice(req.params.id,1);
    user.save();
    req.flash("success", `Workout Removed Successfully!`);
    res.status(200).redirect('/users/workouts');
    }catch(err){
        req.flash("error", `Something Happened`);
        req.status(400).redirect('/users/workouts');
    }
};
exports.getTrainerWorkouts = async(req,res)=>{
    try {
        if(req.session.userID){
        const trainer = await User.findOne({_id:req.params.id});
        //here i assume that user is student
        const currentUser = await User.findOne({_id:req.session.userID});
        const workouts = trainer.workouts;
        const trainerName = trainer.name;
        const trainerId = trainer._id;
        const studentWorkouts = currentUser.workouts;
        //if user is not student
        const isStudentOrTrainer = currentUser.role;

        //we can assume that we have unique ids
        function extractValue(arr, prop) {
            let extractedValue = arr.map(item => item[prop]);
            return extractedValue;
        
        }
        //get exercise name
        const result = extractValue(studentWorkouts, 'exercise');
    
        res.status(200).render('trainerWorkouts',{
            page_name:'trainerWorkouts',
            workouts,
            trainerName,
            trainerId,
            result,
            isStudentOrTrainer,
        });}
        else{
            const trainer = await User.findOne({_id:req.params.id});
            const workouts = trainer.workouts;
            const trainerName = trainer.name;
            res.status(200).render('trainerWorkouts2',{
                page_name:'trainerWorkouts2',
                workouts,
                trainerName,
            });
        }
    } catch (error) {
        console.log(error);
        res.status(404).json({
            status: 'failed',
            error
        })
    }
};
exports.enrollWorkout = async (req, res) => {
    try {
        const user = await User.findById(req.session.userID);
        const trainer = await User.findById(req.body.trainerId);
        //for students create one extra object to define trainer and set into workouts array
        const obj = {'trainerName':trainer.name};
        const workout = {...trainer.workouts[req.body.workoutIndex],...obj};
        await user.workouts.push(workout);
        await user.save();

        res.status(200).redirect('/users/workouts');
    } catch (error) {
        console.log(error);
        res.status(404).json({
            status: 'failed',
            error
        })
    }
};
exports.updateWorkout = async (req,res)=>{
    try {
        const user = await User.findOne({_id:req.session.userID});
        const updatedIndex = req.params.id;
        const workout = req.body;
        user.workouts.pop(req.params.id);
        user.workouts.splice(updatedIndex,0,workout);
        console.log(workout);
        console.log(updatedIndex);
        user.save();
        req.flash("success", `Workout Updated Successfully!`);
        res.status(200).redirect('/users/workouts');
    } catch (error) {
        req.flash("error", `Something Happened`);
        req.status(400).redirect('/users/workouts');
    }
}