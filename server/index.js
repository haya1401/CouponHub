import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/auth/pi', async (req, res) => {
  const { accessToken } = req.body;

  if (!accessToken) {
    return res.status(400).json({ error: 'Access token is required' });
  }

  try {
    // التحقق المباشر من التوكن عن طريق طلب GET لـ https://api.minepi.com/v2/me
    const response = await fetch('https://api.minepi.com/v2/me', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });

    if (!response.ok) {
      return res.status(401).json({ error: 'Invalid Pi Access Token' });
    }

    const userData = await response.json();

    // إرجاع بيانات المستخدم وبدء الجلسة
    return res.json({
      success: true,
      user: userData
    });
  } catch (error) {
    console.error('Pi auth verification error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

