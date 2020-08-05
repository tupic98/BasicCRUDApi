const mongoose = require('mongoose');

const tools = {};

tools.verifyID = (_id) => {
  return !(!_id || !mongoose.Types.ObjectId.isValid(_id));
};

module.exports = tools;
