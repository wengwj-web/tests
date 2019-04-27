<template>
  <div>
    <div  v-for="(item,index) in list" :key="index"  v-if="item%2==0">
      <span>
        {{item}}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      list: [1,2,3,4,5,6]
    }
  }
}
</script>
