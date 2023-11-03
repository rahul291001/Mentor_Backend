const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Medicine = require('../models/Data');

router.post('/:userId/medicines', async (req, res) => {
    try {
        const userId = req.params.userId;
        const medicineDetails = req.body;
    
        const updatedUser = await User.findByIdAndUpdate(
          userId,
          { $push: { medicines: medicineDetails } },
          { new: true }
        );
    
        res.json({ medicine: updatedUser.medicines });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  
  

router.delete('/:userId/medicines/:medicineId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const medicineId = req.params.medicineId;

    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      { $pull: { medicines: { _id: medicineId } } },
      { new: true }
    );

    res.json({ medicines: updatedUser.medicines });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});


router.get('/:userId/medicines/:medicineId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const medicineId = req.params.medicineId;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const medicine = user.medicines.find((m) => m._id.toString() === medicineId);

    if (!medicine) {
      return res.status(404).json({ error: 'Medicine not found' });
    }

    res.json({ medicine });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/:userId/medicines/:medicineId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const medicineId = req.params.medicineId;
    const { additionalData } = req.body;

    const updatedUser = await User.findOneAndUpdate(
      { _id: userId, 'medicines._id': medicineId },
      { $set: { 'medicines.$.additionalData': additionalData } },
      { new: true }
    );

    res.json({ medicines: updatedUser.medicines });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});


router.get('/:userId/medicines', async (req, res) => {
    try {
      const userId = req.params.userId;
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      res.json({ medicines: user.medicines });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });

module.exports = router;
