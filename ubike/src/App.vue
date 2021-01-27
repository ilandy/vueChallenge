<template>
  <div id="nav">
    <router-link to="/" @click="isMapMode = !isMapMode"  :class="{ 'active': !isMapMode }" >清單版</router-link>
    <router-link to="/about" @click="isMapMode = !isMapMode" :class="{ 'active': isMapMode }" >地圖版</router-link>
  </div>
  <router-view/>
  <!-- TODO: 
  1. 建立 fetch 抓取 ubike API
  2. 將資料轉換
  3. 新增尋關鍵字功能
  4. 新增排序功能
  5. 新增頁碼
  6. 分離為 components (透過 porps 傳遞資料)
  7. 將 props 改寫為 Vuex
  8. 新增 leaf map 功能
  9. 將 Vuex 改為 composition API 寫法
  -->

</template>
<script>
export default {
  data(){
    return {
      isMapMode: false
    }
  }
}

</script>
<style lang="scss">
$color: #42b983;
body {
  background-color: #f1f1f1;
  padding: 0;
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  padding: 30px 30px 15px;
  box-shadow: 0 -1px 0 rgba(0,0,0,.05) inset;

  a {
    position: relative;
    font-weight: bold;
    color: #2c3e50;
    text-decoration: none;
    margin-right: 30px;
    transition: color .3s;
    transition-timing-function: ease-in;
    &:after {
      content: "";
      position: absolute;
      left: calc(50% - 0%);
      top: calc(100% + 15px - 2px);
      width: 0%;
      height: 2px;
      border-radius: 5px;
      background-color: $color;
      transition: all .5s;
      transition-timing-function: ease-in-out;

    }
    
  }
  :hover {
    color: $color;
  }
  .active {
    position: relative;
    color: $color;

    &:after {
      left: calc(50% - 45%);
      width: 90%;
      height: 2px;
      background-color: $color;

    }
  }
}
</style>
