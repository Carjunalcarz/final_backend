const logoutMiddleware = async (req, res, next) => {
    if (req.user && req.user.loggedOut) {
      return res.status(401).json({ message: 'User  has been logged out' });
    }
    next();
  };
  
  export default logoutMiddleware;