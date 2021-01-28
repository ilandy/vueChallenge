<template>
    <div v-if="sliceSortStop.length !== 0">
        Pages
      <ul class="pager">
        <li class="pager-prev" 
            :class="{'disable': currentPage === 1, 'active': currentPage > 1}" 
            @click="pageDirect(-1)"><i class="fa fa-angle-left"></i></li>
        <!-- <li v-for="(p) in pager" 
            :key="p" 
            :class="{'active': currentPage === p}"
            @click="currentPage = p">
          {{p}}
        </li> -->
        <li><input class="input input-min" maxlength="3" v-model.number="currentPage"></li>
        <li class="pager-next" 
            :class="{'disable': currentPage > pager - 1, 'active': currentPage < pager - 1  }" 
            @click="pageDirect(1)"><i class="fa fa-angle-right"></i></li>
      </ul>
    </div>
</template>
<script>
import store from '@/store/index.js';
export default {
    name: 'Paginatation',
    data() {
        return {
            
        }
    },
    computed:{
        pager (){
            return store.getters.pager
        },
        currentPage: {
            get(){
                return store.state.currentPage
            },
            set(val){

                let reg = /^[0-9]{1,2}$/;
                let retVal = reg.test(val) ? val:1
                
                if (retVal > store.getters.pager ){
                    store.commit('setCurrentPage', store.getters.pager)
                    return;
                }
                if (retVal < 0){
                    store.commit('setCurrentPage', 1)
                    return;
                }
                store.commit('setCurrentPage', retVal)
            }
        },
        sliceSortStop (){
            return store.getters.sliceSortStop 
        },
    },
    methods: {
        pageDirect(direct){

            let tmp = store.state.currentPage + direct;
            if (tmp > store.getters.pager || tmp <= 0){
                return;
            }
            store.commit('setCurrentPage', tmp)
        }
    }
}
</script>
<style lang="scss" scoped>
@import '@/assets/scss/variable.scss';
@import '@/assets/scss/form.scss';

ul.pager {
  list-style: none;
  display: inline-flex;
  padding-left: 0;
  li {
    min-width: 20px;
    cursor: pointer;
  }
  .pager-prev,
  .pager-next {
      height: 25px;
      width: 25px;
      margin: 0 10px;
      border: 1px solid rgba(0, 0, 0,.2);
      border-radius: 25px;
      line-height: 27px;
      text-align: center;
      &.active {
          &:hover {
              border-color: $color;
              color: $color
          }
      }
      &.disable {
          background-color: rgba(0,0,0,.3);
          opacity: .4;
          cursor: default;
      }
  }
}
</style>