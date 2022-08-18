const deleteCheck = (req, res, next) => {
  const isDeleted = req.params.isDeleted

  switch(isDeleted) {
    case 'false':
      return res.json({
        success : false
      })
    case 'true':
      next();
      break
    default:
      return res.status(400).json({
        success : false,
        emsg : 'Wrong parameter!'
      })
  }
}


export default deleteCheck