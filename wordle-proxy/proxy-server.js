import express from 'express';
import fetch from 'node-fetch';

const app = express();
const port = 3000;

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  next();
});

// 프록시 경로 설정: /api/word에 요청이 들어오면 Random Word API로 프록시 처리
app.get('/api/word', async (req, res) => {
  const apiUrl = 'https://random-word-api.herokuapp.com/word?number=1&length=5';

  try {
    console.log('프록시 서버로 요청이 들어옴. API 요청을 시도합니다.');
    const response = await fetch(apiUrl);
    
    // 응답 상태가 200이 아니면 에러 처리
    if (!response.ok) {
      throw new Error(`Random Word API 응답 오류: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Random Word API 응답 성공:', data); 
    res.json(data);
  } catch (error) {
    console.error('프록시 서버에서 발생한 오류:', error);
    res.status(500).json({ error: '프록시 서버에서 단어를 불러오는 중 오류가 발생했습니다.' });
  }
});

// 서버 실행
app.listen(port, () => {
  console.log(`Proxy server is running at http://localhost:${port}`);
});
