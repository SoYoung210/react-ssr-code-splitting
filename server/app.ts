import express from 'express';
import path from 'path';

const app = express();
app.set('views', path.join(__dirname, '../static'));
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, '../static')));

app.get('/ping', (req, res) => {
  res.send('pong!@#');
});

app.get('*',  (req, res) => {
  res.render('index');
});

// 404 Handler
app.use((req, res, next) => {
  res.status(404);
  res.redirect('/errors/page-not-found');
});

app.listen(5252, () => {
  console.log('listening on port 5252....');
});
