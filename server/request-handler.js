// url - this is an external library we are importing 

var url = require('url');

/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/

  // Request and Response come from node's http module.
  //
  // They include information about both the incoming request, such as
  // headers and URL, and about the outgoing response, such as its status
  // and content.
  //
  // Documentation for both request and response can be found in the HTTP section at
  // http://nodejs.org/documentation/api/
  
  // modify the response. depending on the request properties
var resultObj = { results: [] };

var requestHandler = function(request, response) {
    // The outgoing status. This is what we want to send back when handler.requestHandler(req, res) is invoked
    var headers = defaultCorsHeaders;
    var message;
    var statusCode = 200;
    let urlObj = url.parse(request.url);
    if (request.method === 'GET') {
      if (urlObj.pathname === '/classes/messages') {
      statusCode = 200;
      // return the object with a results property that stores: an array of objects
      } else {
        statusCode = 404;
      }
    } else if (request.method === 'POST') {
      // right now,  we're sending back an array if it's a post
      statusCode = 201;
      // take the message that was posted and add it to the array at response.
        // coming in as a real object that we have to stringify 
        let body = [];
        request.on('data', (chunk) => {
          body.push(chunk);
        }).on('end', () => {
          // console.log(body);
          body = Buffer.concat(body).toString();
          // at this point, `body` has the entire request body stored in it as a string
          body = JSON.parse(body);
          resultObj.results.push(body);
        });
    }

  console.log('Serving request type ' + request.method + ' for url ' + request.url);

  // Tell the client we are sending them plain text.
  
  // You will need to change this if you are sending something
  // other than plain text, like JSON or HTML.
    // I think we are sending back a JSON.stringified object...
  headers['Content-Type'] = 'application/json'; // change text/plain to something else???

  // .writeHead() writes to the request line and headers of the response,
  // which includes the status and all headers.
  
  response.writeHead(statusCode, headers);
  
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

var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10 // Seconds.
};

module.exports.requestHandler = requestHandler;

