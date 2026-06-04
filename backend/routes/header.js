// routes/header.js — Header del CV Arturo: documento header/arturo
const express = require('express');
const { db } = require('../firebase');
const router = express.Router();

const docRef = () => db.collection('header').doc('arturo');

router.get('/', async (_req, res) => {
  try {
    const snap = await docRef().get();
    res.json(snap.exists ? snap.data() : {});
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.put('/', async (req, res) => {
  try {
    await docRef().set(req.body || {}, { merge: true });
    const snap = await docRef().get();
    res.json({ id: snap.id, ...snap.data() });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
