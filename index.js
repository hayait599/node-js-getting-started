/*const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
*/


var fs = require("fs");
var request = require("request");
const express = require('express');
var app = express();


var upload = require('express-fileupload');
const http = require('http');
http.Server(app).listen(80); // make server listen on port 80

app.use(upload()); // configure middleware
app.post('/upload', function (req, res) {
  file = req.body.upfile;
  var options = {
    method: 'POST',
    url: 'https://people2.wixstaging.com/api/file/upload',
    headers:
      {

        'X-API-KEY': 'dd8012ec-c533-45ec-aa60-dfebb6e602b7',
      },
    formData:
      {
        file:
          {
            value: 'fs.createReadStream(' + file + ')',
            options:
              {
                filename: file,
                contentType: null
              }
          }
      }
  };

  request(options, function (error, response, body) {
    if (error) throw new Error(error);

    res.send(body)
  });
})
