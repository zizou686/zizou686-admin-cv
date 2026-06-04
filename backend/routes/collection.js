// routes/collection.js — CRUD directo para colecciones de Firestore
const express = require('express');
const { db } = require('../firebase');

function safeId(value) {
  return String(value || '')
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '') || `item_${Date.now()}`;
}

function createCollectionRouter(collectionName) {
  const router = express.Router();
  const colRef = () => db.collection(collectionName);

  router.get('/', async (_req, res) => {
    try {
      const snap = await colRef().get();
      const data = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      res.json(data);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });

  router.post('/', async (req, res) => {
    try {
      const body = req.body || {};
      const id = safeId(body.id || body.name || body.title || body.university || body.career);
      await colRef().doc(id).set(body, { merge: true });
      res.status(201).json({ id, ...body });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });

  router.put('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      await colRef().doc(id).set(req.body || {}, { merge: true });
      const snap = await colRef().doc(id).get();
      res.json({ id: snap.id, ...snap.data() });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });

  router.delete('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      await colRef().doc(id).delete();
      res.json({ deleted: id });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });

  return router;
}

module.exports = createCollectionRouter;
