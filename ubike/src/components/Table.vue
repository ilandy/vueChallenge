<template>
    <table class="table" v-if="sliceSortStop.length !== 0">
        <colgroup>
            <col >
            <col style="width: 450px">
            <col >
            <col >
        </colgroup>
      <thead>
        <tr>
          <td>#</td>
          <td>場站名稱</td>
          <td>場站區域</td>
          <td>目前可用車輛
              <span class="icon" :class="{'active': sortType==='sbi' && isAsc }" @click="setSort('sbi',true)"><i class="fa fa-caret-up"></i></span>
              <span class="icon" :class="{'active': sortType==='sbi' && !isAsc }" @click="setSort('sbi',false)"><i class="fa fa-caret-down"></i></span>
          </td>
          <td>總停車格
              <span class="icon" :class="{'active': sortType==='tot' && isAsc }" @click="setSort('tot',true)"><i class="fa fa-caret-up"></i></span>
              <span class="icon" :class="{'active': sortType==='tot' && !isAsc }" @click="setSort('tot',false)"><i class="fa fa-caret-down"></i></span>
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
</template>
<script>
import store from '@/store/index.js';
export default {
    name: 'Table',
    computed:{
        filterStop (){
            return store.getters.filterStop
        },
        sortStop (){
            return store.getters.sortStop 
        },
        sliceSortStop (){
            return store.getters.sliceSortStop 
        },
        pager (){
            return store.getters.pager
        },
        currentPage: {
            get(){
                return store.state.currentPage
            },
            set(val){
                store.commit('setCurrentPage', val)
            }
        },
        sortType (){
            return store.state.sortType
        },
        isAsc (){
            return store.state.isAsc
        }
    },
    methods: {
        timeFormat(val) {
            const pattern = /(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/;
            return val.replace(pattern, "$1/$2/$3 $4:$5:$6");
        },
        setSort (target, asc){
            store.state.sortType = target;
            store.state.isAsc = asc
        },
    }
    
}
</script>
<style lang="scss" scoped>
@import "@/assets/scss/variable.scss";

.table {
    width: 100%;
    border-spacing: 0 10px;
    tr {
        background: #fff;
        border-radius: 2px;
        box-shadow: 0 0 1px rgb(0 0 0 / 30%) inset;
        border-spacing: 100px;
        td {
            padding: 20px;
            margin: 0;
        }
    }
}

.icon {
  display: inline-flex;
  width: 10px;
  height: 25px;
  align-items: center;
  justify-content: center;
  margin: 0 5px;
  cursor: pointer;

  &.active {
    color: $color;
  }
}
</style>