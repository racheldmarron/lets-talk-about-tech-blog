const {User, Post, Comment} = require("../models");

const routes = require("express").Router();

routes.get("/", async (req, res) => {

    try{
        const homepageBlog = await Post.findAll(
            {
                attributes: ["id", "title", "createdAt"],
                include: {
                    model: User,
                    attributes: ["username"]
                }
            }
        ).catch((err) => {
            res.json(err);
        })
        
        const posts = homepageBlog.map(post => post.get({plain: true}));
        

        res.render("homepage", {
            posts, 
            logged_in: req.session.logged_in
        })

    }catch(err){
        res.status(501).json(err);
    }
})

routes.get("/single/:id", async (req,res) => {
    try {
        if(!req.session.logged_in){
            res.redirect("/login");
            return;
        }
        const postInfo = await Post.findByPk(req.params.id,{
            attributes: ["id", "title","content", "createdAt"],
            include: {
                model: User,
                attributes: ["username"]
            },
        })
        const commentInfo = await Comment.findAll({
            where: {
                post_id: req.params.id
            },
            attributes: ["id", "content", "createdAt"],
            include: {
                model: User,
                attributes: ["username"]
            }
        })

        const postData = await postInfo.get({plain : true})
        const commentData = await commentInfo.map(comment => comment.get({plain: true}))
        postData.comments = commentData

        res.render("post", {
            postData,
            logged_in: req.session.logged_in
        })
        
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = routes;