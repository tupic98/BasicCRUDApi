const PostService = require('./../../services/PostService');
const { verifyID } = require('./../../utils/MongoUtils');
const { verifyTypeNumber } = require('./../../utils/MiscUtils');
const controller = {};

controller.create = async (req, res) => {
  const fieldsValidation = PostService.verifyCreateFields(req.body);
  if (!fieldsValidation.success) {
    res.status(400).json(fieldsValidation.content);
  }

  try {
    const createPost = await PostService.create(req.body);
    if (!createPost.success) {
      return status(409).json(createPost.content);
    }
    res.status(201).json(createPost.content);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

controller.findOneById = async (req, res) => {
  const { _id } = req.params;
  if (!verifyID(_id)) {
    return res.status(400).json({
      error: '_id malformed or missing',
    });
  }
  try {
    const postExists = await PostService.findOneById(_id);
    if (!postExists.success) {
      return res.status(404).json(postExists.content);
    }
    return res.status(200).json(postExists.content);
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

controller.findAll = async (req, res) => {
  const { page = 0, limit = 10 } = req.query;
  if (!verifyTypeNumber(page, limit)) {
    return res.status(400).json({
      error: 'Page or limit query malformed',
    });
  }

  try {
    const postResponse = await PostService.findAll(
      parseInt(page),
      parseInt(limit)
    );
    res.status(200).json(postResponse.content);
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

controller.addLike = async (req, res) => {
  const { _id } = req.body;
  if (!verifyID(_id)) {
    return res.status(400).json({
      error: '_id malformed or missing',
    });
  }
  try {
    const post = await PostService.findOneById(_id);
    if (!post.success) {
      return res.status(404).json(post.content);
    }
    const postLiked = await PostService.addLike(post.content.post);
    if (!postLiked.success) {
      return res.status(409).json(postLiked.content);
    }
    return res.status(200).json(postLiked.content);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports = controller;
