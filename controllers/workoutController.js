const User = require('../models/User');

exports.addWorkout = async(req,res)=>{
    const user = await User.findOne({_id:req.session.userID});
    user.workouts.push(req.body);
    user.save();
    res.status(200).redirect('/users/workouts');
};
exports.removeWorkout = async(req,res)=>{
    const user = await User.findOne({_id:req.session.userID});
    user.workouts.pop(req.params.id);
    user.save();
    res.status(200).redirect('/users/workouts');
};
exports.getTrainerWorkouts = async(req,res)=>{
    try {
        if(req.session.userID){
        const trainer = await User.findOne({_id:req.params.id});
        const student = await User.findOne({_id:req.session.userID});
        const workouts = trainer.workouts;
        const trainerName = trainer.name;
        const trainerId = trainer._id;
        const studentWorkouts = student.workouts;
    
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