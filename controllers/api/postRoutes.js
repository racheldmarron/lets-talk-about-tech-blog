// const routes = require('express').Router();
// const { Post, User, Comment } = require('../../models');
// const sequelize = require('../../config/connection');


const routes = require('express').Router();
const { User, Post, Comment } = require('../../models');


routes.get('/', async (req, res) => {
    try {
        const getPostData = await Post.findAll({ include: [{ model: User }] });
        res.status(200).json(getPostData);
    } catch (err) {
        res.status(400).json(err);
    }
});


routes.get('/user/:id', async (req, res) => {
    try {
        const getPostsByUser = await User.findByPk(req.params.id, { include: [{ model: Post }] });
        res.status(200).json(getPostsByUser);
    } catch (err) {
        res.status(400).json(err);
        console.log(err);
    }
});


routes.get('/:id', async (req, res) => {
    try {
        const getPostData = await Post.findByPk(req.params.id, {
            include: [{ model: User }, { model: Comment }]
        });
        if (!getPostData) {
            res.status(404).json({ message: 'Sorry! There was no post found with this ID' });
            return;
        }
        res.status(200).json(getPostData);
    } catch (err) {
        res.status(400).json(err);
    }
});


routes.post('/', async (req, res) => {
    try {
        if (!req.session.logged_in) {
            res.status(400).json("Hmmm looks like the user is not logged in");
            return
        }
        req.body.user_id = req.session.user_id;
        const addPost = await Post.create(req.body);
        res.status(200).json(addPost);
    }
    catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});


routes.put('/:id', async (req, res) => {
    try {
        console.log(req.params.id);
        console.log(req.body);
        const editPost = await Post.update(req.body, {
            where: {
                id: req.params.id,
            },
        });
        if (!editPost) {
            res.status(404).json({ message: 'Hmmm looks like there is no post found with this ID!' });
            return;
        }
        res.status(200).json(editPost);
    } catch (err) {
        res.status(400).json(err);
    }
});


routes.delete('/:id', async (req, res) => {
    try {
        const deletePost = await Post.destroy({
            where: { id: req.params.id }
        });
        res.status(200).json(deletePost);
    }
    catch (err) {
        console.log(err);
        res.status(400).json(err)
    }
});

module.exports = routes;