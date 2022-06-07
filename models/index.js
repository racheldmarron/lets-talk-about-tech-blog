const User = require('./User.js');
const Post = require('./Post.js');
const Comment = require('./Comment.js');



Post.belongsTo(User, {foreignKey: 'user_id'});
Post.hasMany(Comment, {foreignKey: 'post_id'});

Comment.belongsTo(Post, {foreignKey: 'post_id'});
Comment.belongsTo(User, {foreignKey: 'user_id'});

User.hasMany(Post, {foreignKey: 'user_id'}); 
User.hasMany(Comment, {foreignKey: 'user_id'});



module.exports = { User, Post, Comment }; 