const mongoose = require("mongoose");

const validateMongoDbId = (id) => {
  const isValid = mongoose.Types.ObjectId.isValid(id);
  if (!isValid) {
    throw new Error("Id non valid ou introuvable");
  }
};

module.exports = validateMongoDbId;
