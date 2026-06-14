export default function handler(req, res) {
  // 允许跨域请求
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).send('Method Not Allowed');
  }

  const { app } = req.query;
  if (!app) {
    return res.status(400).send('Missing app name');
  }

  // 用临时内存存储（重启会清空，适合个人测试）
  if (!global.screenTimeLogs) {
    global.screenTimeLogs = [];
  }

  const now = new Date();
  const today = now.toISOString().split('T')[0];
  const todayLogs = global.screenTimeLogs.filter(log => log.date === today && log.app === app);

  if (todayLogs.length === 0 || todayLogs[todayLogs.length - 1].status === 'close') {
    // 记录打开
    global.screenTimeLogs.push({
      app,
      status: 'open',
      time: now.toISOString(),
      date: today
    });
    ret
