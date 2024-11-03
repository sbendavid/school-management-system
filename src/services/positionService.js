const Position = require("../models/position");

const PositionService = {
  async createPosition(data) {
    const position = new Position(data);
    return await position.save();
  },

  async getPositions() {
    return await Position.find();
  },

  async getPositionById(id) {
    return await Position.findById(id);
  },

  async updatePosition(id, updateData) {
    const updatedPosition = await Position.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    );
    return updatedPosition;
  },

  async deletePosition(id) {
    return await Position.findByIdAndDelete(id);
  },
};

module.exports = PositionService;
