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

service.findOneById = async (_id) => {
  const serviceResponse = {
    success: true,
    content: {
      message: 'Post found',
    },
  };

  try {
    const post = await PostModel.findById(_id).exec();
    if (!post) {
      serviceResponse.success = false;
      serviceResponse.content = {
        error: 'Post not found',
      };
    } else {
      serviceResponse.content.post = post;
    }
    console.log(serviceResponse);
    return serviceResponse;
  } catch (error) {
    throw new Error('Internal Server Error');
  }
};

service.findAll = async (page, limit) => {
  const serviceResponse = {
    success: true,
    content: {},
  };

  try {
    const posts = await PostModel.find({}, undefined, {
      skip: page * limit,
      limit,
      sort: [
        {
          updatedAt: -1,
        },
      ],
    }).exec();
    serviceResponse.content = {
      posts,
      count: posts.length,
      page,
      limit,
    };
    return serviceResponse;
  } catch (error) {
    throw new Error('Internal Server Error');
  }
};

/*
 * @params post - PostModel
 */
service.addLike = async (post) => {
  let serviceResponse = {
    success: true,
    content: {
      message: 'Post liked',
    },
  };
  try {
    post.likes += 1;
    const postUpdated = await post.save();
    if (!postUpdated) {
      serviceResponse = {
        success: false,
        content: {
          message: 'Post not liked',
        },
      };
    }
    return serviceResponse;
  } catch (error) {
    throw new Error('Internal Server Error');
  }
};

module.exports = service;
