const express = require('express');
const router = express.Router();
// const members = require('../../Members');
const uuid = require('uuid');


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '');
    next();
  });

  app.get('/monsters/random', (req, res) => {
      request(
        { url: 'https://app.pixelencounter.com/api/basic/monsters/random' },
        (error, response, body) => {
          if (error || response.statusCode !== 200) {
            return res.status(500).json({ type: 'error', message: err.message });
          }
    
          res.json(JSON.parse(body));
          console.log(res);
        }
      )
    });
    
    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => console.log(`listening on ${PORT}`));


module.exports = router;