const { Op } = require("sequelize");
const Content = require("../models/Content");
const User = require("../models/User");

// GET /api/contents?search=&page=&limit=
exports.getContents = async (req, res) => {
  try {
    const { search = "", page = 1, limit = 10 } = req.query;
    const offset = (Number(page) - 1) * Number(limit);

    const where = search
      ? {
          [Op.or]: [
            { title: { [Op.like]: `%${search}%` } },
            { category: { [Op.like]: `%${search}%` } },
          ],
        }
      : {};

    const { rows, count } = await Content.findAndCountAll({
      where,
      limit: Number(limit),
      offset,
      order: [["created_at", "DESC"]],
      include: [{ model: User, as: "author", attributes: ["id", "name", "email"] }],
    });

    return res.status(200).json({
      success: true,
      data: rows,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total: count,
        totalPages: Math.ceil(count / Number(limit)),
      },
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/contents/:id
exports.getContentById = async (req, res) => {
  try {
    const content = await Content.findByPk(req.params.id, {
      include: [{ model: User, as: "author", attributes: ["id", "name", "email"] }],
    });

    if (!content) {
      return res.status(404).json({ success: false, message: "Content not found" });
    }

    return res.status(200).json({ success: true, data: content });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// POST /api/contents
exports.createContent = async (req, res) => {
  try {
    const { title, category, description, thumbnail_url } = req.body;

    if (!title || !category) {
      return res.status(400).json({
        success: false,
        message: "title and category are required",
      });
    }

    const content = await Content.create({
      title,
      category,
      description,
      thumbnail_url,
      author_id: req.user.id,
    });

    return res.status(201).json({ success: true, data: content });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// PUT /api/contents/:id
exports.updateContent = async (req, res) => {
  try {
    const content = await Content.findByPk(req.params.id);
    if (!content) {
      return res.status(404).json({ success: false, message: "Content not found" });
    }

    const { title, category, description, thumbnail_url } = req.body;

    await content.update({
      title: title ?? content.title,
      category: category ?? content.category,
      description: description ?? content.description,
      thumbnail_url: thumbnail_url ?? content.thumbnail_url,
    });

    return res.status(200).json({ success: true, data: content });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// DELETE /api/contents/:id
exports.deleteContent = async (req, res) => {
  try {
    const content = await Content.findByPk(req.params.id);
    if (!content) {
      return res.status(404).json({ success: false, message: "Content not found" });
    }

    await content.destroy();

    return res.status(200).json({ success: true, message: "Content deleted successfully" });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
