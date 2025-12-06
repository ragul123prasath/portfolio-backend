exports.uploadImage = async (req, res) => {
  try {
    res.json({
      message: "Upload successful",
      imageUrl: req.file.path
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
