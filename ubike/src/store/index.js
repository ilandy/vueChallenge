import { createStore } from 'vuex'

export default createStore({
  state: {
    bikeStop: [],
    keyword: '',
    sortType: '',
    isAsc: null,
    pageItem: 10,
    currentPage: 1,
  },
  getters: {
    filterStop (state){
      return state.bikeStop.filter(d => d.sna.includes(state.keyword))
    },
    sortStop (state, getter){
      let newArr = [...getter.filterStop]
      return state.isAsc ? 
                  newArr.sort((a,b) => a[state.sortType] - b[state.sortType]):
                  newArr.sort((a,b) => b[state.sortType] - a[state.sortType])
    },
    sliceSortStop (state, getter){
      return getter.sortStop.slice( state.pageItem * state.currentPage - state.pageItem , state.pageItem*state.currentPage );
    },
    pager (state, getter){
      return Math.ceil(getter.sortStop.length/state.pageItem);
    }
  },
  mutations: {
    setBikeStops(state, payload) {
      state.bikeStop = payload;
    },
    setKeyWord(state, payload) {
      state.currentPage = 1;
      state.keyword = payload;
    },
    setCurrentPage(state, payload) {
      state.currentPage = payload;
    },
    
  },
  actions: {
    async fetchData ({commit}){
      const RES = await fetch('https://tcgbusfs.blob.core.windows.net/blobyoubike/YouBikeTP.gz') // fetch 取得資料
          .then(res => res.json()) //將res轉為 json 格式並 return
          .then(json => {
            return Object.keys(json.retVal).map(key => json.retVal[key])})

            commit("setBikeStops", RES);
      }
  }
})
