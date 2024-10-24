const Class = require("../models/class");

const classService = {
  async createClass(data) {
    const newClass = new Class(data);
    return await newClass.save();
  },

  async getClasses() {
    return await Class.find();
  },

  async getClassById(id) {
    return await Class.findById(id);
  },

  async updateClass(id, updateData) {
    const updatedClass = await Class.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    );
    return updatedClass;
  },

  async deleteClass(id) {
    return await Class.findByIdAndDelete(id);
  },
};

module.exports = classService;
