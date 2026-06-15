export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const { app } = req.query;
  if (!app) return res.status(400).json({ error: 'Missing app name' });

  const SUPABASE_URL = 'https://xyybchnyizumpljsruie.supabase.co';
  const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh5eWJjaG55aXp1bXBsanNydWllIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE0NDU2MzgsImV4cCI6MjA5NzAyMTYzOH0.VWIG07vOjNBcgi_QFlgaLEdwP72xKHTsxKmetk0k5Hk';

  if (req.method === 'POST') {
    const { action } = req.body || {};
    const r = await fetch(`${SUPABASE_URL}/rest/v1/screentime`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}`, 'Prefer': 'retu
