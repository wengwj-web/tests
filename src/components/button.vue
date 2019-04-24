<template>
  <div class="font">
    <i-button>Default</i-button>
    <i-button type="primary">Primary</i-button>
    <i-button type="ghost">Ghost</i-button>
    <i-button type="dashed">Dashed</i-button>
    <i-button type="text">Text</i-button>
    <br>
    <br>
    <i-button type="info">信息按钮</i-button>
    <i-button type="success">成功按钮</i-button>
    <i-button type="warning">警告按钮</i-button>
    <i-button type="error">错误按钮</i-button>
    <br>
    <i-button type="primary" shape="circle" icon="ios-search"></i-button>
    <i-button type="primary" icon="ios-search">搜索</i-button>
    <br>
    <i-button type="info" size="large">信息按钮</i-button>
    <br>
     <i-button type="success" long>确认提交</i-button>
    <br><br>
    <i-button type="error" long>确认删除</i-button>
    <br>
     <i-button type="primary" :loading="loading" @click.native="toLoading">
        <span v-if="!loading">Click me!</span>
        <span v-else>Loading...</span>
    </i-button>
     <br><br>
    <Button-group>
        <i-button>取消</i-button>
        <i-button type="primary">确定</i-button>
    </Button-group>
    <br>
    <Icon type="ionic" style="font-size:40px"></Icon>
  </div>
</template>

<script>
export default {
  data(){
    return{
      loading: false
    }
  },
  methods: {
    toLoading(){
      this.loading = true
    }
  }
};
</script>

<style scoped>
.font {
  font-family: "Hiragino Sans GB";
  font-size: 20px;
}
</style>
