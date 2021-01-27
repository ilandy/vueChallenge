<template>
  <div class="home">
    <!-- search component -->

    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    站點名稱搜尋 <input type="text" v-model="keyword">
    {{keyword}}

    <!-- table component -->
    <table>
      <thead>
        <tr>
          <td>#</td>
          <td>場站名稱</td>
          <td>場站區域</td>
          <td>目前可用車輛
              <span class="icon"  @click="setSort('sbi',true)">上</span>
              <span class="icon"  @click="setSort('sbi',false)">下</span>
          </td>
          <td>總停車格
              <span class="icon" @click="setSort('tot',true)">上</span>
              <span class="icon" @click="setSort('tot',false)">下</span>
          </td>
          <td>資料更新時間</td>
        </tr>

      </thead>
      <tbody>
        <tr v-for="s in sliceSortStop" :key="s.sno">
          <td>{{s.sno}}</td>
          <td>{{s.sna}}</td>
          <td>{{s.sarea}}</td>
          <td>{{s.sbi}}</td>
          <td>{{s.tot}}</td>

          <td>{{timeFormat(s.mday)}}</td>
        </tr>
      </tbody>
    </table>
    <!-- pager component -->
    <div>
      <ul class="pager">
        <li @click="pageDirect(-1)">prev</li>
        <li v-for="(p) in pager" 
            :key="p" 
            :class="{'active': currentPage === p}"
            @click="currentPage = p">
          {{p}}
        </li>
        <li @click="pageDirect(1)">next</li>
      </ul>
    </div>
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
// sno：站點代號、 sna：場站名稱(中文)、 tot：場站總停車格、
// sbi：場站目前車輛數量、 sarea：場站區域(中文)、 mday：資料更新時間、
// lat：緯度、 lng：經度、 ar：地(中文)、 sareaen：場站區域(英文)、
// snaen：場站名稱(英文)、 aren：地址(英文)、 bemp：空位數量、 act：全站禁用狀態
export default {
  name: 'List',
  components: {
    // HelloWorld
  },
  data(){
    return {
      test: 123,
      bikeStop: [],
      keyword: '',
      sortType: '',
      isAsc: null,
      pageItem: 10,
      currentPage: 1,
    }
  },
  computed: {
    filterStop (){
      return this.bikeStop.filter(d => d.sna.includes(this.keyword))
    },
    sortStop (){
      let newArr = [...this.filterStop]
      return this.isAsc ? 
                  newArr.sort((a,b) => a[this.sortType] - b[this.sortType]):
                  newArr.sort((a,b) => b[this.sortType] - a[this.sortType])
    },
    sliceSortStop (){
      return this.sortStop.slice( this.pageItem * this.currentPage - this.pageItem , this.pageItem*this.currentPage );
    },
    pager (){
      return Math.ceil(this.sortStop.length/this.pageItem)
    }
    
  },
  watch: {
    keyword (){
      this.currentPage = 1
    }
  },
  methods: {
    timeFormat(val) {
        const pattern = /(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/;
        return val.replace(pattern, "$1/$2/$3 $4:$5:$6");
    },
    setSort (target, asc){
      this.sortType = target;
      this.isAsc = asc
    },
    pageDirect(direct){
      let tmp = this.currentPage + direct;
      if (tmp > this.pager || tmp <= 0){
        return;
      }
      return this.currentPage = tmp;
    }

    
  },
  created() {
    fetch('https://tcgbusfs.blob.core.windows.net/blobyoubike/YouBikeTP.gz') // fetch 取得資料
      .then(res => res.json()) //將res轉為 json 格式並 return
      .then(json => {
        this.bikeStop = Object.keys(json.retVal).map(key => json.retVal[key])
        
      })
  }
}
</script>
<style lang="scss">
.icon {
  display: inline-flex;
  background-color: #ccc;
  width: 25px;
  height: 25px;
  margin: 0 5px;
  cursor: pointer;
  &.active {
    background-color: #f005;
  }
}
ul.pager {
  list-style: none;
  display: inline-flex;
  border: 1px solid #eee;
  padding-left: 0;
  li {
    border-right: 1px solid #eee;
    min-width: 20px;
    padding: 5px;
    cursor: pointer;
    &:last-child {
      border: none;
    }
    &.active {
      background-color: #eee;
      cursor: default;
    }
  }
}
</style>
