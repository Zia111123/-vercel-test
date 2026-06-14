export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') return res.status(405).send('Method Not Allowed');

  const { app } = req.query;
  if (!app) return res.status(400).send('Missing app name');

  const now = new Date();
  const log = {
    app,
    time: now.toISOString(),
    date: now.toISOString().split('T')[0]
  };

  return res.status(200).json({ status: 'recorded', data: log });
}
