<template>
  <div>
    <Row>
      <i-col span="12">col-12</i-col>
      <i-col span="12">col-12</i-col>
    </Row>
    <br>
    <Row :gutter="16">
      <i-col span="6">
        <div>col-6</div>
      </i-col>
      <i-col span="6">
        <div>col-6</div>
      </i-col>
      <i-col span="6">
        <div>col-6</div>
      </i-col>
      <i-col span="6">
        <div>col-6</div>
      </i-col>
    </Row>
  </div>
</template>

<script>
export default {
  name: "grid"
};
</script>

<style>
</style>

