const routes = require('express').Router();
const { User } = require('../../models');


routes.post('/signup', async (req, res) => {
    try {
        console.log(req.body)
        const userData = await User.create(req.body);
        

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
            res.status(200).json(userData);
        });
    } catch (err) {
        res.status(400).json(err);
    }
});


routes.post('/login', async (req, res) => {
    try {
        if (!req.body.name||!req.body.password) {
            res.status(400).json({message: 'Oops!'})
            return;
        }

        const userData = await User.findOne({ where: { name: req.body.name } });

        if (!userData) {
            res
                .status(400)
                .json({ message: 'No user found with this name or password. Try again!' });
            return;
        }

        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
            res
                .status(400)
                .json({ message: 'No user found with this name or password. Try again!' });
            return;
        }

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.json({ user: userData, message: 'Login successful!' });
        });

    } catch (err) {
        res.status(400).json({error: err, message: 'Oops! Something went wrong'});
        console.log(err);
    }
});


routes.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(200).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = routes;