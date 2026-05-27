/**
 * Mock Authentication Middleware for KrishiSetu Demo Mode
 * Bypasses intensive JWT verification but populates a dummy user 
 * so that role checking doesn't crash the server.
 */
module.exports = (req, res, next) => {
  // Simulating an authenticated user. 
  // In a real environment, this extracts and decodes a JWT token.
  req.user = {
    id: "demo_user_123",
    name: "Ravi Kumar",
    role: "BOTH", // Allows testing both Farmer and Labourer dashboard views
    state: "Karnataka",
    district: "Mandya"
  };
  
  next(); // Pass control to the next middleware or controller function
};