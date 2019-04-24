<template>
  <i-switch v-model="switch1" @on-change="change"/>
</template>
<script>
export default {
  data() {
    return {
      switch1: false
    };
  },
  methods: {
    change(status) {
      this.$Message.info("开关状态：" + status);
    }
  }
};
</script>