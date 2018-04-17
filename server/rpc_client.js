var jayson = require('jayson')

var client = jayson.client.http({
  port : 4040,
  hostname: 'localhost'
});

function add(a, b){
  return new Promise((resolve, reject) => {
    client.request('add', [a, b], (err, error, response) => {
      if (err) reject(err);
      resolve(response);
    });
  });
}

module.exports = {
  add : add
}
