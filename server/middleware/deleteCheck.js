// params가 아닌 req header에서 예 / 아니오 여부 확인
const deleteCheck = (req, res, next) => {
  //const isDeleted = req.params.isDeleted
  const isDeleted = req.body.isDeleted
  if(!isDeleted) {
    return res.json({
      success : false
    })
  }
  next();
}


export default deleteCheck