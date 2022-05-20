import dayjs from 'dayjs'
import RelativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/zh'
dayjs.extend(RelativeTime);
dayjs.locale('zh')

/**
 * 
 * @param {*} targetTime 
 * @returns 
 */



export const timeAgo = (targetTime) => {
  var a = dayjs()
  var b = dayjs(targetTime)
  return a.to(b)
}

export const dateToStr = (date) => {
  return dayjs(date).format('YYYY- MM-DD')
}
