const express = require("express");
const Router = express.Router();

// Item Model
const Item = require("../../models/item.model");

// @route GET api/items
// @desc Get All Items
// @access Public
Router.get("/", (req, res) => {
  Item.find()
    .sort({ date: -1 })
    .then((items) => res.json(items));
});

// @route POST api/items
// @desc Add A Post
// @access Public
Router.post("/", (req, res) => {
  const newItem = new Item({
    name: req.body.name,
  });

  newItem.save().then((item) => res.json(item));
});

// @route DELETE api/items
// @desc Delete A Item
// @access Public
Router.delete("/:id", (req, res) => {
  Item.findByIdAndDelete(req.params.id)
    .then(() => res.json({ success: true }))
    .catch((err) => res.status(400).json({ success: false }));
});

module.exports = Router;
