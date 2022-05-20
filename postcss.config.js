module.exports = {
  plugins: {
    'postcss-pxtorem': {
      //rootValue:转化px的基准值
      //一个像素是75px，转化为rem就是2rem
      rootValue: 37.5,
      propList: ['*']
    }
  }
}