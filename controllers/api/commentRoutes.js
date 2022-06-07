const routes = require('express').Router();
const { User, Post, Comment } = require('../../models');


routes.get('/post/:id', async (req, res) => {
    try {
        const postComments = await Post.findByPk(req.params.id, { include: [{ model: Comment }] });
        res.status(200).json(postComments);
    } catch (err) {
        res.status(400).json(err);
        console.log(err);
    }
});


routes.post('/', async (req, res) => {
    try {
        if (!req.session.logged_in) {
            res.status(400).json("Hmmm. Looks like you aren't logged in");
            return
        }
        req.body.user_id = req.session.user_id;
        const newComment = await Comment.create(req.body);
        res.status(200).json(newComment);
    }
    catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});

routes.put('/:id', async (req, res) => {
    console.log(req.session.logged_in, req.session.user_id)
    try {
        if (!req.session.logged_in) {
            res.status(400).json("Hmmm. Looks like you aren't logged in");
            return
        }
        req.body.user_id = req.session.user_id;
        const updateComment = await Comment.update(req.body, {
            where: { id: req.params.id }
        });
        console.log(updateComment)
        res.status(200).json(updateComment);
    }
    catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
    
});


routes.delete('/:id', async (req, res) => {
    try {
        const deletedPost = await Post.destroy({
            where: { id: req.params.id }
        });
        res.json(deletedPost);
        window.location.assign('/dashboard');
    }
    catch (err) {
        res.status(404).json(err)
    }
    }
    );


module.exports = routes;