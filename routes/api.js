const express = require('express');
const mongo = require('mongodb');
const router = express.Router();

const client = new mongo.MongoClient('mongodb://localhost:27017', { useNewUrlParser: true });

/* GET home page. */
router.get('/', (req, res, next) => {
    const filter = req.query.search;
    let sort = req.query.sort || -1;
    if (sort !== 1 || sort !== -1) sort = -1;
    client.connect(err => {
        if (err) {
            console.log(err);
        } else {
            data = [];
            let coll = '';
            const db = client.db('service');
            const articles = db.collection('articles');
            if (filter === undefined || filter === '') {
                coll = articles.find({}).sort({ created: sort });
            } else {
                coll = articles.find({ title: new RegExp(filter, 'i') }).sort({ created: -1 });
            }
            coll.forEach(doc => data.push(doc));
            setTimeout(() => { console.log(data) }, 200);
            setTimeout(() => { res.json(data); }, 200);
        }
    });
});

router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    client.connect(err => {
        if (err) {
            console.log(err);
        } else {
            data = [];
            let coll = '';
            const db = client.db('service');
            const articles = db.collection('articles');
            coll = articles.find({ _id: mongo.ObjectID(id) }); //.select('_id title');
            coll.forEach(doc => data.push(doc));
            setTimeout(() => { console.log(data) }, 200);
            setTimeout(() => { res.json(data); }, 200);
        }
    });
});

module.exports = router;