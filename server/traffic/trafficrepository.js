import CarValue from "../model/model.js";

const getAllData = async (req, res, next) => {
  try {
    const result = await CarValue.find().all();
    return res.status(200).json(result)
  }
  catch(e){
    console.log(e);
    return res.status(400).json({
      success: false,
      emsg : 'Falied to load data from db',
      errlog : e
    })
  }
}

const getFilteredData = async (req, res, next) => {
  const {minSpeed, maxSpeed, startDate, endDate} = req.query;
  try{
    let result
    if(startDate === undefined || endDate === undefined) {
      result = await CarValue.find().where('carSpeed').gte(Number(minSpeed)).lte(Number(maxSpeed))
    } else if(minSpeed === undefined || maxSpeed === undefined) {
      
      result = await CarValue.find().where('date').gte(startDate).lte(endDate)
    } else {
      result = await CarValue.find()
      .where('carSpeed').gte(Number(minSpeed)).lte(Number(maxSpeed))
      .where('date').gte(startDate).lte(endDate)
    }
    if (result.length === 0) {
      return res.status(400).json({
        success : false,
        emsg : 'No match data'
      })
    }
    return res.status(200).json(result)
  }
  catch(e){
    return res.status(400).json({
      success: false,
      emsg: 'Failed to load data from db',
      errlog : e
    })
  }
}

// client에서 체크된 _id값에 해당되는 값을 보내주면 그에 맞는 데이터를 db에서 삭제해준다
const deleteDataById = async (req, res, next) => {
  const deleteIds = req.body._ids
  try{
    const result = await CarValue.deleteOne({_id : {$in: deleteIds}})
    if(result !== deleteIds.length) {
      return res.status(400).json({
        success : false,
        emsg : 'Deleting data falied'
      })
    }
    return res.status(200).json({
      success : true,
      msg : 'Deleting data complete'
    })
  }
  catch(e) {
    console.log(e)
  }
}

export {
  getAllData,
  getFilteredData,
  deleteDataById
}