const User = require('./User.js')
const Post = require('./Post.js')
const Comment = require('./Comment.js')


User.hasMany(Post, {foreignKey: 'uid'})
Post.belongsTo(User, {foreignKey: 'uid'})

Post.hasMany(Comment, {foreignKey: 'pid'})
Comment.belongsTo(Post, {foreignKey: 'pid'})



module.exports = { User, Post, Comment }