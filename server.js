const http = require('http');
const fs = require('fs');
const path = require('path');

// Create an HTTP server
const server = http.createServer((req, res) => {
  // Set the content type for the response
  res.setHeader('Content-Type', 'text/html');

  // Handle different routes
  if (req.method === 'GET' && req.url === '/') {
    // Serve the index.html page
    const filePath = path.join(__dirname, 'index.html');

    // Read the HTML file and send it as a response
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end('Internal Server Error');
      } else {
        res.statusCode = 200;
        res.end(data);
      }
    });
  } else if (req.method === 'GET' && req.url === '/getDateTime') {
    // Respond with the current date and time
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    const currentDateTime = new Date().toLocaleString();
    res.end(currentDateTime);
  } else {
    // Handle 404 Not Found for other routes
    res.statusCode = 404;
    res.end('Not Found');
  }
});

// Start the server on port 3000
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
