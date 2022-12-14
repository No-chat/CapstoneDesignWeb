import mongoose from 'mongoose';

// 라즈베리파이로부터 넘겨받을 정보를 정의하는 스키마
// 차량번호, 찍힌 시간, 찍힌 당시 차의 속도, 해당하는 조건
const trafficSchema = mongoose.Schema({
  carNumber: {
    type: String,
    trim: true, 
  },
  carSpeed: {
    type: Number,
    default: 0,
  },
  date: {
    type: Date,
  },
  condition: {
    type: String,
    required: [true, "No condition err"]
  }
})


const CarValue = mongoose.model('car', trafficSchema);
export default CarValue;