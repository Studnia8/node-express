const express = require('express');
const mongo = require('mongodb');
const router = express.Router();

const client = new mongo.MongoClient('mongodb://localhost:27017', { useNewUrlParser: true });

router.all('*', (req, res, next) => {
    if (!req.session.admin) {
        res.redirect('login');
        return;
    }
    next();
})

/* GET home page. */
router.get('/', (req, res) => {
    client.connect(err => {
        if (err) {
            console.log(err);
        } else {
            data = [];
            const db = client.db('service');
            const articles = db.collection('articles');

            const coll = articles.find({});
            coll.forEach(doc => data.push(doc));
            setTimeout(() => { console.log(data) }, 200);
            setTimeout(() => { res.render('admin/index', { title: 'Admin', data }) }, 200);
        }
    });
});

router.get('/news/add', (req, res) => {
    res.render('admin/news-form', { title: 'Add new article' });
});

router.post('/news/add', (req, res) => {
    const body = req.body;
    if (body.title === '' || body.description === '') {
        saved = false;
    } else {
        saved = true;
        res.redirect('/admin')
        client.connect(err => {
            if (err) {
                console.log('connection error');
            } else {
                console.log('connection successful');
                const db = client.db('service');
                const articles = db.collection('articles');
                // declare current time and format it
                let date = new Date();
                let created = date.toISOString().replace(/T/, ' ').replace(/\..+/, '');
                // adding to mongodb
                if (body.title === '' || body.description === '') {
                    return;
                } else {
                    articles.insertOne({
                        title: body.title,
                        description: body.description,
                        created: created,
                    });
                }
            }
        })
    }
    res.render('admin/news-form', { title: 'Add new article' });
});

router.get('/news/delete/:id', (req, res) => {
    res.redirect('/admin');
    client.connect(err => {
        if (err) {
            console.log('test error: ', err);
        } else {
            const db = client.db('service');
            const articles = db.collection('articles');
            articles.deleteOne({ _id: mongo.ObjectID(req.params.id) });
        }
    });
});

module.exports = router;