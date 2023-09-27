const fs = require('fs');

const index = fs.readFileSync(`${__dirname}/../client/client.html`);
const styles = fs.readFileSync(`${__dirname}/../client/style.css`);

const respond = (request, response, status, content, type) => {
  response.writeHead(status, { 'Content-Type': type });
  if (type === 'application/json') {
    const contentJSON = JSON.stringify(content);
    response.write(contentJSON);
  } else {
    response.write(content);
  }
  response.end();
};

const resourceNotFound = (request, response) => {
  const responseJSON = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };
  return respond(request, response, 404, responseJSON, 'application/json');
};

const getIndex = (request, response) => {
  respond(request, response, 200, index, 'text/html');
};

const getStyles = (request, response) => {
  respond(request, response, 200, styles, 'text/css');
};

module.exports = {
  getIndex,
  getStyles,
  resourceNotFound,
};
