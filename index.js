const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

const courses = [
    { id: 1, name: 'test1' },
    { id: 2, name: 'test2' },
    { id: 3, name: 'test3' },
]

const apikey = '88ce606c'
const endpoint = 'http://www.omdbapi.com/?'

/*
app.get()
app.post()
app.put()
app.delete()
*/

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/api/courses/test', (req, res) => {
    res.send([1, 2, 3]);
});

// app.get('/movie/api/:id', (req, res) => {
//     res.send(fetch(endpoint + apikey + '&i=' + id));
// });

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) {
        res.status(404).send('there is no id');
    }
    res.send(course);
})

app.post('/api/courses/', function(req, res) {
    const schema = {
        name: Joi.string().min(3).required()
    };
    const result = Joi.validate(req.body, schema);
    console.log(result);

    // if (!req.body.name || req.body.name.length < 3) {
    //     // 400 bad request
    //     res.status(400).send('Name is required and should be minimum 3 character');
    //     return;
    // }

    if (result.error) {
        // 400 bad request
        res.status(400).send(result.error.details[0].message);
        return;
    }

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

app.put('/api/courses/:id', function(req, res) {
    //look up the course
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) {
        res.status(404).send('there is no id');
    }
    // const schema = {
    //     name: Joi.string().min(3).required()
    // };
    // const result = Joi.validate(req.body, schema);

    //const result = validateCourse(req.body);

    const { error } = validateCourse(req.body);
    if (error) {
        // 400 bad request
        res.status(400).send(result.error.details[0].message);
        return;
    }

    //updatee
    course.name = req.body.name;
    res.send(course);
})

app.delete('/api/courses/:id', function(req, res) {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) {
        res.status(404).send('there is no id');
    }
    const index = courses.indexOf(course);
    courses.splice(index, 1);

    res.send(course);
})

app.get('/api/courses', function(req, res) {
    const course = courses;
    res.send(courses);
})

//validate function
function validateCourse(course) {
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(course, schema);
}

// app.get('/api/courses/:id', (req, res) => {
//     res.send(req.params.id);
// })


// app.get('/api/posts/:year/:id', (req, res) => {
//     res.send(req.params);
// })

// app.get('/api/posts/:year/:id', (req, res) => {
//     res.send(req.query);
// })

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));