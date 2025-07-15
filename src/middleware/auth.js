const adminAuth = (req, res, next) => {
  const token = "xyz";
  const isAdminAuth = token === "xyz";
  if (!isAdminAuth) {
    res.status(401).send("unauthorize request");
  } else {
    next();
  }
};
const userAuth = (req, res, next) => {
  const token = "xyza";
  const isAdminAuth = token === "xyz";
  if (!isAdminAuth) {
    res.status(401).send("unauthorize request");
  } else {
    next();
  }
}; 
module.exports={adminAuth,userAuth}

