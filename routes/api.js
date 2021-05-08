const express = require('express');
const News = require('../module/new');
const mongo = require('mongodb');
const router = express.Router();

const client = new mongo.MongoClient('mongodb://localhost:27017', { useNewUrlParser: true });

/* GET home page. */
router.get('/', (req, res, next) => {

    const filter = req.query.search;
    let sort = req.query.sort || -1;

    const showNews = News.find({ title: new RegExp(filter, 'i') })
        .sort({ created: sort });

    showNews.exec((err, data) => {
        res.json(data);
    });
});

router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    const findNew = News.findById(id);
    findNew.exec((err, data) => {
        res.json(data);
    });
});

module.exports = router;