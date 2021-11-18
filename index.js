const Joi = require('joi');
const express = require('express');
const app = express();
app.use(express.json());

const courses = [
    {id : 1, name: "Maths"},
    {id : 2, name: "Science"},
    {id : 3, name: "English"},
];

app.get('/', (req, res)=>{
    res.send('Hello World!!!!!');
});

app.get('/api/courses', (req, res) => {
    res.send(courses);
});

app.post('/api/courses', (req, res) => {

    // const schema = {
    //     name: Joi.string().min(2).required()
    // };
    // const result = Joi.validate(req.body, schema);

    const { error } = validateCourse(req.body);

    if(error){
        res.status(400).send(error.details[0].message);
        return;
    }

    // if(result.error){
    //     res.status(400).send(result.error.details[0].message);
    //     return;
    // }
    // if(!req.body.name || req.body.name.length < 2){
    //     res.status(400).send('Name length should be >= 2');
    //     return; 
    // }


    const course = {
        id: courses.length +1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

app.put('/api/courses/:id', (req, res)=>{
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) res.status(404).send("Course with given ID not found");

    // const result = validateCourse(req.body);
    //OBJECT DESTRUCTURING
    const { error } = validateCourse(req.body);

    if(error){
        res.status(400).send(error.details[0].message);
        return;
    }

    course.name = req.body.name;
    res.send(course);
});

function validateCourse(course) {
    const schema = {
        name: Joi.string().min(2).required()
    };
    return Joi.validate(course, schema);
}

app.delete('/api/courses/:id', (req, res)=> {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) res.status(404).send("Course with given ID not found");

    const index = courses.indexOf(course);
    courses.splice(index, 1);

    res.send(courses);
})



app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) res.status(404).send("Course with given ID not found");
    res.send(course);
})

// app.get('/api/posts/:year/:month', (req, res) => {
//     // res.send(req.params);
//     res.send(req.query);
// })

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`))