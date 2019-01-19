/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/
// it('Should answer GET requests for /classes/messages with a 200 status code', function() {
//   // This is a fake server request. Normally, the server would provide this,
//   // but we want to test our function's behavior totally independent of the server code
//   var req = new stubs.request('/classes/messages', 'GET');
//   var res = new stubs.response();

//   handler.requestHandler(req, res);

//   expect(res._responseCode).to.equal(200); -- passed! res object's responseCode property currently equals 200
//   expect(res._ended).to.equal(true); -- passed! res object's ended property currently contains the default string 'Hello World'
// });


// it('Should send back parsable stringified JSON', function() {
//   var req = new stubs.request('/classes/messages', 'GET');
//   var res = new stubs.response();

//   handler.requestHandler(req, res);

//   expect(JSON.parse.bind(this, res._data)).to.not.throw();
//   expect(res._ended).to.equal(true); // ended still needs to contain something - I think this now
                      // need to modify data property to be the parsable stringified JSON (object?)
// });

// it('Should send back an object', function() {
//   var req = new stubs.request('/classes/messages', 'GET');
//   var res = new stubs.response();

//   handler.requestHandler(req, res);

//   var parsedBody = JSON.parse(res._data);
//   expect(parsedBody).to.be.an('object'); // typeof 
//   expect(res._ended).to.equal(true);
// });

// it('Should send an object containing a `results` array', function() {
//   var req = new stubs.request('/classes/messages', 'GET');
//   var res = new stubs.response();

//   handler.requestHandler(req, res);

//   var parsedBody = JSON.parse(res._data);
//   expect(parsedBody).to.have.property('results');
//   expect(parsedBody.results).to.be.an('array');
//   expect(res._ended).to.equal(true);
// });


// /* Import node's http module: */
// var http = require('http');   //??? This might not be needed, it's already imported to basic-server

  // Request and Response come from node's http module.
  //
  // They include information about both the incoming request, such as
  // headers and URL, and about the outgoing response, such as its status
  // and content.
  //
  // Documentation for both request and response can be found in the HTTP section at
  // http://nodejs.org/documentation/api/
  
  // Do some basic logging.
  //
  // Adding more logging to your server can be an easy way to get passive
  // debugging help, but you should always be careful about leaving stray
  // console.logs in your code.

  // modify the response. depending on the request properties
var resultObj = { results: [] };
var statusCode;

var requestHandler = function(request, response) {
    // The outgoing status. This is what we want to send back when handler.requestHandler(req, res) is invoked
    // var statusCode = 200;
    // See the note below about CORS headers.
    // resultObj = {results: [ {message}, {message2} ]}
    var headers = defaultCorsHeaders;
    var message;

    if (request.method === 'GET') {
      statusCode = 200;
      // return the object with a results property that stores: an array of objects
      response._data = resultObj;
    } else if (request.method === 'POST') {
      // right now,  we're sending back an array if it's a post
      statusCode = 201;
      // take the message that was posted and add it to the array at response.
        // coming in as a real object that we have to stringify
      message = request._postData; 
      resultObj.results.push(message);  //if not push, concat
      response._data = resultObj;
    }

  console.log('Serving request type ' + request.method + ' for url ' + request.url);

    // request is probably GET - what is the response??? 

     // i think we need to send back a JSON.stringified object, and a status code of 200

  // if the request.method is GET, then we need to return statusCode = 200;






  // Tell the client we are sending them plain text.
  
  // You will need to change this if you are sending something
  // other than plain text, like JSON or HTML.
    // I think we are sending back a JSON.stringified object...
  headers['Content-Type'] = 'text/plain'; // change text/plain to something else???

  // .writeHead() writes to the request line and headers of the response,
  // which includes the status and all headers.

  // response.writeHead(200, headers?)

  // modify the statusCode, possibly headers depending on the response
           // now we need to set var headers to app/JSON ?

  response.writeHead(statusCode, headers);

  // how to get the correct url path for /classes

  // if (request.method === 'GET' && request.url === '/classes/messages') {
  //   return statusCode;
  // }

 

  // Make sure to always call response.end() - Node may not send
  // anything back to the client until you do. The string you pass to
  // response.end() will be the body of the response - i.e. what shows
  // up in the browser.
  //
  // Calling .end "flushes" the response's internal buffer, forcing
  // node to actually send all the data over to the client.

  // string of the response is here

  response.end(JSON.stringify(resultObj)); // stringified object?
};

// These headers will allow Cross-Origin Resource Sharing (CORS).
// This code allows this server to talk to websites that
// are on different domains, for instance, your chat client.
//
// Your chat client is running from a url like file://your/chat/client/index.html,
// which is considered a different domain.
//
// Another way to get around this restriction is to serve your chat
// client from this domain by setting up static file serving.

// I think this allows the server we build to accept requests (GET, POST, etc from the our chat client)

var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10 // Seconds.
};

module.exports.requestHandler = requestHandler;

