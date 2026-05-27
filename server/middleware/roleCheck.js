/**
 * Middleware to restrict backend resource access based on account roles
 * Supported App Roles: 'FARMER', 'LABOURER', 'BOTH'
 */
const roleCheck = (allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized access. Token validation missing.' });
    }

    const userRole = req.user.role; // Attached during JWT authorization execution

    // If account has absolute privileges ("BOTH") or explicitly matches allowed roles
    if (userRole === 'BOTH' || allowedRoles.includes(userRole)) {
      return next();
    }

    return res.status(403).json({ 
      message: `Access Denied: Your assigned profile role (${userRole}) is unauthorized to access this resource.` 
    });
  };
};

module.exports = roleCheck;