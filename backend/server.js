require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const headerRouter = require('./routes/header');
const createCollectionRouter = require('./routes/collection');

const app = express();
app.use(cors({ origin: process.env.ALLOWED_ORIGIN || '*' }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'frontend')));

app.use('/api/header', headerRouter);
app.use('/api/education', createCollectionRouter('education'));
app.use('/api/work-experience', createCollectionRouter('work_experience'));
app.use('/api/skills', createCollectionRouter('skills'));
app.use('/api/certificates', createCollectionRouter('certificates'));
app.use('/api/languages', createCollectionRouter('languages'));
app.use('/api/interests', createCollectionRouter('interests'));

app.get('/health', (_req, res) => res.json({ status: 'ok', project: 'arturo-admin-cv' }));
app.get('/', (_req, res) => res.sendFile(path.join(__dirname, 'frontend', 'index.html')));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Arturo Admin CV API running on port ${PORT}`));
