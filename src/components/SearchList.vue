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

      <div class="card-container" v-for="item in list" :key="item._id">
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
            {{item._source}}
            <van-cell-group class="margin-top-small">
              <van-cell :value="item._source.title" />
              <van-cell title= "更新日期" :value="item._source.change_date" :label="item._source.note" />
              <van-cell title="价格" :value="item._source.price + '￥'"/>
              <van-cell title="联系方式" :value="item._source.contact"/>
              <van-cell title="地点" :value="item._source.place"/>
            </van-cell-group>
            <van-button type="danger" class="margin-left-small"
              @click="item.deleteIsShow = true"
            >删除</van-button>
            <van-popup 
              v-model="item.deleteIsShow"
              closeable
              round
            ><van-field v-model="item.deleteKey" class="delete-pop" placeholder="请输入删除key" />
            <van-button type="danger"
              @click="deleteById(item)"
            >确认删除</van-button>
          </van-popup>
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
    refresh() {
      this.list = [];
      this.total = -1;
      this.finished = false;
    },
    async onLoad() {
      // this.loading = false;
      if (this.total === -1 || this.list.length < this.total) {
        try {
          console.log(this.list.length);
          let res = await axios.post(
            'http://192.168.43.132:8080/query?from='+this.list.length,
            {val: this.value}
          );
          
          console.log('query ok! ', res.data);
          let hits = res.data.hits;
          let total = hits.total.value;
          this.$toast({message: "查询成功, 找到 " + total + " 个结果",
        });
          console.log(hits);
          this.total = hits.total.value;
          for(let i = 0; i < hits.hits.length; i++) {
            // console.log(hits.hits[i]);
            hits.hits[i].popupIsShow = false;
            hits.hits[i].deleteIsShow = false;
            hits.hits[i].deleteKey = "";
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
    },
    deleteById(item) {
      if(item.deleteKey !== item._source.user.id) {
        this.$toast.fail({message: '删除Key错误, 请重试', position: 'top'});
        return
      }
      axios.post('http://192.168.43.132:8080/delete?id=' + item._id)
        .then(
        res => {
          console.log('request successfully', res.data);
          this.$toast.success("删除成功!")
          item.deleteIsShow = false;
          item.popupIsShow = false;
          setTimeout(this.refresh, 1500)
          setTimeout(this.onLoad, 1500)
          // this.refresh();
          // this.onLoad();
        },
        err => {
            console.log('err', err.message);
            this.$toast.fail('服务器错误, 请重试');
        }
      );
    }
  },
  watch: {
    value() {
      this.refresh();
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
.card-container {
  margin: 5px 0;
  /* border-radius: 9px; */
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.2);
}

.margin-top-small {
  margin-top: 35px;
}

.margin-left-small {
  margin-left: 10px;
}

.delete-pop {
  margin: 50px 1px 20px;
  width: 70vw;
}
</style>
