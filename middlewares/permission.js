module.exports = (...roles) => (req, res, next) => {
  const { role } = req.user.data;

  if (!roles.includes(role)) {
    return res.status(405).json({
      status: 'error',
      message: 'You don\'t have permission!',
    });
  }

  return next();
};
