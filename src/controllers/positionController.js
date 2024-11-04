const positionService = require("../services/positionService");

const positionController = {
  async deletePosition(req, res) {
    const { id } = req.params;

    try {
      const deletePosition = await positionService.deletePosition(id);
      if (!deletePosition) {
        return res
          .status(404)
          .json({ status: 404, message: "Position not found" });
      }
      return res.status(200).json({
        status: 200,
        message: "Position deleted",
      });
    } catch (error) {
      return res.status(500).json({ status: 500, message: error.message });
    }
  },
};

module.exports = positionController;
