const express = require('express');
const News = require('../module/new');
const router = express.Router();

router.all('*', (req, res, next) => {
    if (!req.session.admin) {
        res.redirect('login');
        return;
    }
    next();
})

/* GET home page. */
router.get('/', (req, res) => {
    News.find({}, (err, data) => {
        res.render('admin/index', { title: 'Admin', data });
    });
});

router.get('/news/add', (req, res) => {
    res.render('admin/news-form', { title: 'Add new article', body: {}, errors: {} });
});

router.post('/news/add', (req, res) => {
    const body = req.body;
    let date = new Date();
    let created = date.toISOString().replace(/T/, ' ').replace(/\..+/, '');
    const newsData = new News({
        title: body.title,
        description: body.description,
        created: created,
    });

    const errors = newsData.validateSync();

    newsData.save((err) => {
        if (err) {
            console.log('err: ', err);
            res.render('admin/news-form', { title: 'Add new article', errors, body });
            return;
        } else {
            console.log('success');
            res.redirect('/admin');
        }

    });
});

router.get('/news/delete/:id', (req, res) => {
    const id = req.params.id;
    News.findByIdAndDelete(id, (err) => {
        res.redirect('/admin');
    })
});

module.exports = router;