import express from 'express';
import axios from 'axios';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors());

app.post('/send-email', async (req, res) => {
  try {
    const { data } = await axios.post('https://api.resend.com/emails', req.body, {
      headers: {
        Authorization: `Bearer re_3ySfPSX5_BSvsS48eZ2nXTCWJ9on1BZki`, // Reemplaza con tu clave de API de Resend
        'Content-Type': 'application/json',
      },
    });
    res.json(data);
  } catch (error) {
    res.status(error.response ? error.response.status : 500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
