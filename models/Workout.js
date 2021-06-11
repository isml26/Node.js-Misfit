const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
    exercise: {
        type: String,
    },
    set: {
        type: String,
    },
    rep: {
        type: String,
    },
    part: {
        type: String,
    },
});


const Workout = mongoose.model('Workout', WorkoutSchema);
module.exports = Workout;