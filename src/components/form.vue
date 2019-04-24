<template>
  <div>
    <i-input v-model="value" @input="search" placeholder="请输入..." style="width: 300px"></i-input>
    <br>
    <i-input>
      <span slot="prepend">http://</span>
      <span slot="append">.com</span>
    </i-input>
    <br>
    <i-input>
      <i-select v-model="select1" slot="prepend" style="width: 80px">
        <i-option value="http">http://</i-option>
        <i-option value="https">https://</i-option>
      </i-select>
      <i-select v-model="select2" slot="append" style="width: 70px">
        <i-option value="com">.com</i-option>
        <i-option value="org">.org</i-option>
        <i-option value="io">.io</i-option>
      </i-select>
    </i-input>
    <br>
    <i-input>
      <i-select v-model="select3" slot="prepend" style="width: 80px">
        <i-option value="day">日活</i-option>
        <i-option value="month">月活</i-option>
      </i-select>
      <i-button slot="append" icon="ios-search"></i-button>
    </i-input>
    <br>
    <br>
    <Radio-group v-model="disabledGroup" @on-change="onChange">
      <Radio label="金斑蝶"></Radio>
      <Radio label="爪哇犀牛"></Radio>
      <Radio label="印度黑羚"></Radio>
    </Radio-group>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value: "",
      select1: "http",
      select2: "com",
      select3: "day",
      single: false,
      disabledGroup: '爪哇犀牛'
    };
  },
  methods: {
    search() {
      console.log(this.value);
    },
    onChange(v){
      console.log(v)
    }
  }
};
</script>