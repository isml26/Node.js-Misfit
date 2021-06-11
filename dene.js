const workout = {"exercise":"bech","set":"5","rep":"5*5","part":"chest"};
const workout2 = {"exercise2":"bech","set":"5","rep":"5*5","part":"chest"};
const workout3 = {"exercise3":"bech","set":"5","rep":"5*5","part":"chest"};
const workouts1 = [];
const workouts2 = [];

workouts1.push(workout);

const myObject = {
    'key': "content1",
    'key2': "content2",
    'key3': "content3"
  };
  
  const myObject2 = {
    'key4': 'content4'
  }
  
  const newObj= {...workouts1[0], ...myObject2};
  console.log(newObj);