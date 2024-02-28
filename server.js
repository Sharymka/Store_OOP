const express = require('express');
const app = express();

app.use(express.static(__dirname)); // Раздача файлов из текущей директории

app.listen(3100, () => {
  console.log(
    'Сервер запущен на порту 3100! Перейти: http://localhost:3100/store.html'
  );
});
