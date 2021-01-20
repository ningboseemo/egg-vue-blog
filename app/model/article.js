module.exports = app => {
  const mongoose = app.mongoose
  const Schema = mongoose.Schema
  const ArticleSchema = new Schema({
    id: String,
    article_title: String,
    sub_title: String,
    article_content: String,
    author_id: String,
    classification_id: String,
    classification_name: String,
    author_name: String,
    read_count: Number,
    is_delete: Number,
    create_time: {type: Date, default: Date.now()},
    update_time: {type: Date, default: Date.now()}
  })
  
  return mongoose.model('Article', ArticleSchema, 'article')
}