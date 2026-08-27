const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const {
  getContents,
  getContentById,
  createContent,
  updateContent,
  deleteContent,
} = require("../controllers/contentController");

/**
 * @swagger
 * tags:
 *   name: Content
 *   description: Content management endpoints (protected by JWT)
 */

/**
 * @swagger
 * /api/contents:
 *   get:
 *     summary: Get list of contents (with search & pagination)
 *     tags: [Content]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *     responses:
 *       200:
 *         description: List of contents
 *   post:
 *     summary: Create new content
 *     tags: [Content]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title, category]
 *             properties:
 *               title:
 *                 type: string
 *               category:
 *                 type: string
 *               description:
 *                 type: string
 *               thumbnail_url:
 *                 type: string
 *     responses:
 *       201:
 *         description: Content created
 */
router.get("/", authMiddleware, getContents);
router.post("/", authMiddleware, createContent);

/**
 * @swagger
 * /api/contents/{id}:
 *   get:
 *     summary: Get content detail by id
 *     tags: [Content]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Content detail
 *       404:
 *         description: Not found
 *   put:
 *     summary: Update content by id
 *     tags: [Content]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               category:
 *                 type: string
 *               description:
 *                 type: string
 *               thumbnail_url:
 *                 type: string
 *     responses:
 *       200:
 *         description: Content updated
 *   delete:
 *     summary: Delete content by id
 *     tags: [Content]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Content deleted
 */
router.get("/:id", authMiddleware, getContentById);
router.put("/:id", authMiddleware, updateContent);
router.delete("/:id", authMiddleware, deleteContent);

module.exports = router;
