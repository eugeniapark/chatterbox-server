

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

//Requiring the external URL library that will be used later
var url = require('url');
//Stores all of the 'POST' data sent from client to the server 
var resultObj = { results: [] };

//How the server handles the requests coming from the client to the server to create the response
var requestHandler = function(request, response) {
    // The outgoing status. This is what we want to send back when handler.requestHandler(req, res) is invoked
    var headers = defaultCorsHeaders;
    var message;
    //Default code to send back status of the client's request
    var statusCode = 200;
    let urlObj = url.parse(request.url);
    //If client sends 'GET' request to server to get the messages
    if (request.method === 'GET') {
      //Check if it's coming from an acceptable URL
      if (urlObj.pathname === '/classes/messages') {
      //If it doesn't, it sends back the error code
      } else {
        statusCode = 404;
      }
    //if the the request is a 'POST', it asks the server to store a message
    } else if (request.method === 'POST') {
      statusCode = 201;
      // take the message that was posted and add it to the array at response.
        // coming in as a stringified object
        //Creates an array, take the relevant bits, parses and stores
        let body = [];
        request.on('data', (chunk) => {
          body.push(chunk);
        }).on('end', () => {
          //Buffer takes in the relevant bits, turns it into a string, and parses it into an object
          body = Buffer.concat(body).toString();
          // at this point, `body` has the entire request body stored as a string
          body = JSON.parse(body);
          resultObj.results.push(body);
        });
      }

  console.log('Serving request type ' + request.method + ' for url ' + request.url);

  //Changes the content type to match the request which is a stringified JSON object
  headers['Content-Type'] = 'application/json';

  // .writeHead() writes to the request line and headers of the response, which includes the status and all headers.
  //Constructing the response by changing the writeHead property
  response.writeHead(statusCode, headers);
  
  //Sends the response object in stringified format to the client
  response.end(JSON.stringify(resultObj));
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

//CORS allows servers to accept request from client's on different URLs
var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10 // Seconds.
};

//Exporting the module allows other files to access the request handler: basic-server
module.exports.requestHandler = requestHandler;