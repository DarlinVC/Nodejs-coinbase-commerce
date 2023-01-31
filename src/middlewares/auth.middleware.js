const { ENV } = require("../configs/configs");

/**
 * @description Check if the token is valid.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns : Authorized or not authorized.
 */
export function verifyToken(req, res, next) {
  if (!req.headers.authorization)
    return res.status(401).send({
      authorized: false,
      message: "EmptyAuthorization",
    });
  const token = req.headers.authorization.substr(7);
  if (token !== "") {
    const content = jwt.verify(token, ENV.Auth.SECRET_KEY, (err, _) => {
      if (err) return res.status(401).send({ message: "Unauthorized" });
    });
    req.data = content;
    next();
  } else {
    res.status(401).send("Token unexpected");
  }
}
