/**
 * Universal Mock Controller for KrishiSetu Demo Mode
 * Automatically generates handlers dynamically so routes don't crash the app.
 */
const dynamicHandler = (req, res) => {
  const endpoint = req.originalUrl;
  console.log(`📡 Mock API hit: ${req.method} -> ${endpoint}`);
  
  // Return localized, clean static responses for demo purposes
  res.status(200).json({
    success: true,
    message: `KrishiSetu Live Demo Mode - Request processed successfully.`,
    path: endpoint,
    timestamp: new Date().toISOString(),
    data: req.method === 'POST' ? req.body : []
  });
};

// Use a Proxy object to intercept any function call (like createJob, getMarketPrices, etc.)
// and gracefully return our dynamic handler instead of throwing an error.
const fallbackController = new Proxy({}, {
  get: function(target, prop) {
    return dynamicHandler;
  }
});

module.exports = fallbackController;