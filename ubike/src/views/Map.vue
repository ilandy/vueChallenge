<template>
  
    <div id="ubike-map"></div>
</template>
<script>
import store from '@/store/index.js';
import L from 'leaflet';
import placeImg from '@/assets/place.png';
import placeShadow from '@/assets/placeShadow.png';

export default {
  name: 'Map',
  data () {
    return {
      map: null
    }
  },
  computed: {

    ubikeStops () {
      return store.getters.filterStop;
    },
  },
  methods: {
    mapInit () {
      // 預設以台北車站經緯度為中心
      const center = [25.046273, 121.517498]

      // 對應 id="ubike-map"
      this.map = L.map('ubike-map', { center: center, zoom: 14 });

      // 版權宣告
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '<a target="_blank" href="https://www.openstreetmap.org/">© OpenStreetMap 貢獻者</a>',
        maxZoom: 18,
      }).addTo(this.map);
    },
    addMarker(stop) {
      const map = this.map;
      const greenIcon = L.icon({
          iconUrl: placeImg,
          shadowUrl: placeShadow,

          iconSize:     [20, 28], // size of the icon
          shadowSize:   [7, 4], // size of the shadow
          iconAnchor:   [10, 14], // point of the icon which will correspond to marker's location
          shadowAnchor: [4, -11],  // the same for the shadow
          popupAnchor:  [0, -15] // point from which the popup should open relative to the iconAnchor
      });
      // 彈跳對話框
      const popupHTML = `<div class="popup-box">
          <h3>${stop.sna}</h3>
          <p>站點位置 : ${stop.ar}</p>
          <p>總車輛 : ${stop.tot} 輛</p>
          <p>目前車輛 : ${stop.sbi} 輛</p>
          <p>更新時間 : ${stop.mday}</p>
        </div>`;

      L.marker([stop.lat, stop.lng],{icon: greenIcon})
        .addTo(map)
        .bindPopup(popupHTML);
    },
    clearMarkers() {
      if( this.map === null ) return;

      this.map.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
          this.map.removeLayer(layer);
        }
      });
    },
    markerRepaint(stops = this.ubikeStops) {
      if( this.map !== null ) {
        this.clearMarkers();
        stops.forEach((element) => this.addMarker(element) );
      }
    },

  },
  watch: {
    ubikeStops (stops) {
      // 當 ubikeStops 變動時重新繪製
      this.markerRepaint(stops);
    }
  },
  mounted () {
    this.mapInit();
     this.markerRepaint();
  },
}
</script>
<style lang="scss" scoped>
#ubike-map {
  width: 100%;
  display: block;
  background-color: #ccc;
  height: 500px;
}
.leaflet-container a.leaflet-popup-close-button {
  padding: 14px;
}
</style>
