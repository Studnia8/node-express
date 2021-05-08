const express = require('express');
const Quiz = require('../module/quiz');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
    const showForm = !req.session.votes;
    let sum = 0;
    Quiz.find({}, (err, data) => {
        data.forEach((el) => {
            sum += el.votes;
        })
        res.render('quiz', { title: 'Quiz', data, showForm, sum });
    });
});

router.post('/', (req, res, next) => {
    const id = req.body.quiz;
    Quiz.findOne({ _id: id }, (err, data) => {
        req.session.votes = 1;
        data.votes += 1;
        data.save((err => {
            res.redirect('/quiz');
        }));
    });
});

module.exports = router;