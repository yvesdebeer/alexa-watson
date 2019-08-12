/**
  *
  * main() will be run when you invoke this action
  *
  * @param Cloud Functions actions accept a single parameter, which must be a JSON object.
  *
  * @return The output of this action, which must be a JSON object.
  *
  */
var request = require("request");  

function main(params) {
  if (!params.location) return Promise.reject("Missing location");

  var url = "https://<node-red-url>/getWeather?location="+params.location;
  var options = {
    url: url,
    json: true,
  };

  return new Promise(function (resolve, reject) {
    request(options, function (err, resp) {
      if (err) {
        return reject({err: err})
      }

      resolve({text: resp.body});
    });
  });
}
