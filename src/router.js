import Vue from 'vue'
import Router from 'vue-router'
import AddClass from './views/message/AddClass.vue'
import AddNews from './views/message/AddNews.vue'
import ClassList from './views/message/ClassList.vue'
import NewsList from './views/message/NewsList.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/addClass',
      name: '新增分类',
      component: AddClass
    },
    {
      path: '/addNews',
      name: '新增资讯',
      component: AddNews
    },
    {
      path: '/classList',
      name: '分类列表',
      component: ClassList
    },
    {
      path: '/newsList',
      name: '资讯列表',
      component: NewsList
    },
  ]
})
