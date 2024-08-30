const express=require('express');
const router = express.Router();
const Wishlist=require('../module/wishlist')


// 1. Get all wishlist items for a user
router.get('/wishlist/:userId', async (req, res) => {
    try {
      const items = await Wishlist.find({ userId: req.params.userId });
      res.status(200).json(items);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // 2. Add an item to the wishlist
router.post('/wishlist', async (req, res) => {
    try {
      const { userId, projectId } = req.body;
      const newItem = new Wishlist({ userId, projectId });
      await newItem.save();
      res.status(201).json(newItem);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });


// 3. Remove an item from the wishlist
router .delete('/wishlist/:userId/:projectId', async (req, res) => {
    try {
      const { userId, projectId } = req.params;
      await Wishlist.findOneAndDelete({ userId, projectId });
      res.status(200).json({ message: 'Item removed from wishlist' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // 4. Clear the entire wishlist for a user
router.delete('/wishlist/:userId', async (req, res) => {
    try {
      await Wishlist.deleteMany({ userId: req.params.userId });
      res.status(200).json({ message: 'Wishlist cleared' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  module.exports=router;