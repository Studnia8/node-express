const express = require('express');
const News = require('../module/new');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
    const filter = req.query.search;

    const showNews = News.find({ title: new RegExp(filter, 'i') })
        .sort({ created: -1 });

    showNews.exec((err, data) => {
        res.render('news', { title: 'News', data, filter });
    });
});

module.exports = router;