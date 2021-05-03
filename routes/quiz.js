const express = require('express');
const mongo = require('mongodb');
const router = express.Router();
const Quiz = require('../module/quiz');

const client = new mongo.MongoClient('mongodb://localhost:27017', { useNewUrlParser: true });

/* GET home page. */
router.get('/', (req, res, next) => {
    const showForm = !req.session.votes;
    client.connect(err => {
        if (err) {
            console.log('connection error');
        } else {
            data = [];
            let coll = '';
            let sum = 0;
            const db = client.db('service');
            const quiz = db.collection('quiz');
            coll = quiz.find({});
            coll.forEach(doc => data.push(doc));
            setTimeout(() => {
                data.forEach((item) => {
                    sum += item.votes;
                })
            }, 200);
            setTimeout(() => { res.render('quiz', { title: 'Quiz', data, showForm, sum }); }, 200);
        }
    });
});

router.post('/', (req, res, next) => {
    const id = req.body.quiz;
    client.connect(err => {
        if (err) {
            console.log('connection error');
        } else {
            data = [];
            let vote = Number;
            req.session.votes = 1;
            let coll = '';
            const db = client.db('service');
            const quiz = db.collection('quiz');
            coll = quiz.findOne({ _id: mongo.ObjectID(id) }, (err, data) => {
                vote = data.votes + 1;
            });
            setTimeout(() => { quiz.updateOne({ _id: mongo.ObjectID(id) }, { $set: { votes: vote } }) }, 200);
            setTimeout(() => { res.redirect('/quiz') }, 200);
        };
    });
});

module.exports = router;