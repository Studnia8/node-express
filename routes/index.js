const express = require('express');
const router = express.Router();
const login = 'admin';
const password = 'admin';

/* GET home page. */
router.get('/', (req, res, next) => {
    res.render('index', { title: 'Express' });
});

router.get('/login', (req, res, next) => {
    res.render('login', { title: 'Login' });
});

router.post('/login', (req, res, next) => {
    const body = req.body;
    if (body.login === login && body.password === password) {
        req.session.admin = 1;
        res.redirect('/admin')
    } else {
        res.redirect('/login')
    }
});

module.exports = router;