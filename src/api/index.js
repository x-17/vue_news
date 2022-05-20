import request from "@/utils/request";


export const getAllChannelsAPI = () => request({
  url: '/v1_0/channels',
  method: 'get'
})
//登录
export const loginAPI = ({ mobile, code }) => request({
  url: '/v1_0/authorizations',
  method: 'POST',
  data: {
    mobile,
    code
  }
})
//获取用户频道列表
export const getUserChannelsAPI = () => request({
  url: '/v1_0/user/channels',
  method: 'get',
})
//获取文章列表
export const getAllArticleListAPI = ({ channel_id, timestamp }) => request({
  url: '/v1_0/articles',
  params: {
    channel_id,
    timestamp
  }
})
//对文章不感兴趣
export const dislikeArticleAPI = (target) => request({
  url: '/v1_0/article/dislikes',
  method: 'post',
  data: {
    target
  }
})
//举报文章
export const reportArticleAPI = ({ target, type }) => request({
  url: '/v1_0/article/reports',
  method: 'post',
  data: {
    target,
    type,
    remark: '我在骗你'
  }
})
//搜索联想
export const searchSuggestionAPI = (q) => request({
  url: '/v1_0/suggestion',
  params: {
    q
  }
})
//搜索结果
export const searchResultAPI = ({ q, page, pre_page = 10 }) => request({
  url: '/v1_0/search',
  params: {
    q,
    page,
    pre_page
  }
})
//文章详情
export const getArticleDetailAPI = (art_id) => request({
  url: '/v1_0/articles/' + art_id,
})

//关注
export const isFollowedAPI = (target) => request({
  url: '/v1_0/user/followings',
  method: 'post',
  data: {
    target
  }
})
//取关
export const notFollowedAPI = (author_id) => request({
  url: '/v1_0/user/followings/' + author_id,
  method: 'DELETE',
})
//点赞
export const islikeAPI = (target) => request({
  url: '/v1_0/article/likings',
  method: 'post',
  data: {
    target
  }
})
//取消点赞
export const notlikeAPI = (article_id) => request({
  url: '/v1_0/article/likings/' + article_id,
  method: 'DELETE',
})
//获取修改页个人资料
export const getuserProfile = () => request(
  {
    url: '/v1_0/user/profile'
  }
)
//获取首页基本信息
export const getuserInfo = () => request({
  url: '/v1_0/user'
}
)
//修改头像
export const editPhotoAPI = (fd) => request({
  url: '/v1_0/user/photo',
  method: 'PATCH',
  data: fd
}
)
//修改名字
export const editNameAndBirthAPI = (obj) => request({
  url: '/v1_0/user/profile',
  method: 'PATCH',
  data: obj
})


