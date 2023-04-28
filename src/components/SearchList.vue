<template>
  <div id="search-list">
    <form action="/">
      <van-search
        class="search-bar"
        v-model="value"
        @search="onSearch"
        shape="round"
        background="#4fc08d"
        placeholder="请输入搜索关键词"
      />
    </form>
    
    <van-list
      v-model="loading"
      :finished="finished"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
      finished-text="没有更多了"
      :immediate-check="false"
      @load="onLoad" >

      <div v-for="item in list" :key="item._id">
        <van-card
          num="1"
          :price= "item._source.price"
          :desc="'更新时间 '+item._source.change_date"
          :title="item._source.title"
          @click="item.popupIsShow = true"
        />
        <van-popup 
          v-model="item.popupIsShow"
          position="bottom" 
          closeable
          round
          safe-area-inset-bottom
          :style="{ height: '70%'}"
          >
          <div>{{ item._id }}</div>
          <div>{{ item._source }}</div>
        </van-popup>
      </div>
    </van-list>
  </div>
</template>

<script>

import axios from 'axios'
export default {
  name: 'search-list',
  data() {
    return {
      value: "",
      list: [],
      error: false,
      loading: false,
      finished: false,
      total: -1,
    }
  },
  methods: {
    onSearch() {
      this.onLoad();
    },
    async onLoad() {
      // this.loading = false;
      if (this.total === -1 || this.list.length < this.total) {
        try {
          console.log(this.list.length);
          let res = await axios.post(
            'http://localhost:8080/query?from='+this.list.length,
            {val: this.value}
          );
          
          console.log('query ok! ', res.data);
          let hits = res.data.hits;
          console.log(hits);
          this.total = hits.total.value;
          for(let i = 0; i < hits.hits.length; i++) {
            // console.log(hits.hits[i]);
            hits.hits[i].popupIsShow = false;
          }
          this.list.push(...hits.hits);

          // 加载状态结束
          this.loading = false;
          if (this.list.length === this.total) 
                this.finished = true;
        } catch (err) {
          this.error = true;
          console.log('err:@@@', err.response.data);
        }
      }
    }
  },
  watch: {
    value() {
      this.list.length = [];
      this.total = -1;
      this.finished = false;
      this.loading = true;
    }
  },
  mounted() {
    this.onLoad();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>


#search {
  background-color: #f7f7f7; 
}
</style>
