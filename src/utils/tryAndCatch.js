const tryAndCatch = (controller) => async (req, res, next) => {
  try {
    const data = await controller(req, res);
    if (!data) {
      return res.status(404).json({ message: "Not Found" });
    } else {
      return res.status(200).json(data);
    }
  } catch (err) {
    next(err);
  }
};

module.exports = tryAndCatch;
