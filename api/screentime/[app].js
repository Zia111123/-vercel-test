import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://xyybchnyizumpljsruie.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh5eWJjaG55aXp1bXBsanNydWllIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE0NDU2MzgsImV4cCI6MjA5NzAyMTYzOH0.VWIG07vOjNBcgi_QFlgaLEdwP72xKHTsxKmetk0k5Hk'

);

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const { app } = req.query;
  if (!app) return res.status(400).json({ error: 'Missing app name' });

  if (req.method === 'POST') {
    const { action } = req.body || {};
    const { error } = await supabase
      .from('screentime')
      .insert([{ app, action: action || 'open', timestamp: new Date().toISOString() }]);

    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json({ status: 'recorded' });
  }

  if (req.method === 'GET') {
    const { data, error
