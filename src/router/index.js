//该文件用于创建整个应用的路由器
import VueRouter from "vue-router";
// 引入组件
import SearchList from "../components/SearchList";
import AddItem from '../components/AddItem.vue'

//创建并暴露一个路由器
export default new VueRouter({
    routes:[
        {
            path:'/index',
            component: SearchList
        },
        {
          path:'/add',
          component: AddItem
        },
    ]
})