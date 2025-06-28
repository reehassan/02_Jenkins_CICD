// Import Express framework
const express = require('express');
// Initialize Express app
const app = express();
// Set port from environment variable or default to 3000
const port = process.env.PORT || 3000;

// Define /hello endpoint returning JSON response
app.get('/hello', (req, res) => {
  res.status(200).json({ message: 'Hello, World!' });
});

// Start server and log port
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Export app for testing
module.exports = app;