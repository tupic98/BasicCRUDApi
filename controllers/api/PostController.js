const PostService = require('./../../services/PostService');
const controller = {};

controller.create = async (req, res) => {
  const fieldsValidation = PostService.verifyCreateFields(req.body);
  if (!fieldsValidation.success) {
    res.status(400).json(fieldsValidation.content);
  }

  const createPost = await PostService.create(req.body);
  if (!createPost.success) {
    return status(500).json(createPost.content);
  }
  res.status(201).json(createPost.content);
};

module.exports = controller;
