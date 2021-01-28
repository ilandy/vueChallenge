<template>
    <div class="search">
        <input type="text" class="input" v-model="keyword" placeholder="站點名稱搜尋">
        <div v-if="sliceSortStop.length === 0">
            沒有符合關鍵字的站點資訊
        </div>
    </div>
</template>
<script>
import store from '@/store/index.js';
export default {
    name: 'Search',
    computed:{
        keyword : {
            get(){
                return store.state.keyword
            },
            set(val){
                store.commit('setKeyWord', val)
            }
        },
        sliceSortStop (){
            return store.getters.sliceSortStop 
        },
    }
}
</script>
<style lang="scss" scoped>
@import '@/assets/scss/variable.scss';
@import '@/assets/scss/form.scss';
.search {
    padding: 30px 0 20px;
}

</style>