const http = require('http');
const url = require('url');
const query = require('querystring');
const responseHandler = require('./responses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
  '/': responseHandler.getIndex,
  '/style.css': responseHandler.getStyles,
  notFound: responseHandler.resourceNotFound,
};

const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url);
  const params = query.parse(parsedUrl.query);
  // Expecting JSON only, so no need for this line
  // const acceptedTypes = request.headers.accept.split(',')

  if (urlStruct[parsedUrl.pathname]) {
    urlStruct[parsedUrl.pathname](request, response, params);
  } else {
    urlStruct.notFound(request, response, params);
  }
};

http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1:${port}`);