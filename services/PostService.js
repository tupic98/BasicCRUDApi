const PostModel = require('./../models/PostModel');
const service = {};

service.verifyCreateFields = ({ title, description, image, user }) => {
  const serviceResponse = {
    success: true,
    content: {
      message: 'Fields fine!',
    },
  };

  if (!title || !user) {
    serviceResponse.success = false;
    serviceResponse.content = {
      error: 'Empty required fields!',
    };
    return serviceResponse;
  }

  // TODO: Verify types (User ID) etc..
  return serviceResponse;
};

service.create = async ({ title, description, image, user }) => {
  const serviceResponse = {
    success: true,
    content: {
      message: 'Post created!',
    },
  };

  try {
    const post = new PostModel({
      title,
      description,
      image,
      user,
    });

    const postSaved = await post.save();
    if (!postSaved) {
      serviceResponse.success = false;
      serviceResponse.content = {
        message: 'Post not created!',
      };
    }
    return serviceResponse;
  } catch (error) {
    throw new Error('Internal Server Error');
  }
};

module.exports = service;
