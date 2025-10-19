export function requireAuthentication(req: any, res:any, next:any) {
  if (!req.session.accountId) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
  next();
};
