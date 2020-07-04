export default (schema, source = "body") => {
  return (req, res, next) => {
    try {
      const { error } = schema.validate(req[source]);
      if (!error) return next();

      const { details } = error;
      console.log(details);
    } catch {
      next(error);
    }
  };
};
