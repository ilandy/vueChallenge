<template>
  <div class="home">
    <Table></Table>
    <Paginatation></Paginatation>
  </div>
</template>

<script>

import Table from '@/components/Table.vue'
import Paginatation from '@/components/Paginatation.vue'

export default {
  name: 'List',
  components: {
    Table,
    Paginatation
  }
}
</script>
<style lang="scss">


</style>
