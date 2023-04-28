<template>
  <div id="app">
    <nav>
      <router-link to="/index" class="router" active-class="active">主页</router-link>
      <router-link to="/add" class="router" active-class="active">添加</router-link>
      <a href="#" class="router">管理</a>
      <a href="#" class="router">其他</a>
    </nav>
      <router-view></router-view>
  </div>
</template>

<script>
import SearchList from './components/SearchList.vue'
import AddItem from './components/AddItem.vue'

export default {
  name: 'App',
  components: {
   SearchList, AddItem
  },
  mounted() {
    this.$router.replace({name: 'index'}, err => {});
  }
}
</script>


<style>
#app {
  font-size: 1rem;
}
nav {
  display: flex;
}
.router:link, .router:visited {
  flex: 1;
  text-transform: uppercase;
  text-decoration: none;
  text-align: center;
  /* padding: 3vh auto; */
  display: block;
  border: 1px solid #ddd;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  color: #555;
  font-weight: 600;
  line-height: 6vh;
  height: 6vh;
}

.router.active {
  background-color: #4fc08d;
  /* border-color: #337ab7; */
}

</style>
