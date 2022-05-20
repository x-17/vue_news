// 以模块的方式导出"举报文章"时，后端接口约定的举报类型
const reports = [
  {
    type: 0,
    name: '其它问题'
  },
  {
    type: 1,
    name: '标题夸张'
  },
  {
    type: 2,
    name: '低俗色情'
  },
  {
    type: 3,
    name: '错别字多'
  },
  {
    type: 4,
    name: '旧闻重复'
  },
  {
    type: 6,
    name: '内容不实'
  },
  {
    type: 8,
    name: '侵权'
  },
  {
    type: 5,
    name: '广告软文'
  },
  {
    type: 7,
    name: '涉嫌违法犯罪'
  }
]
export default reports