<template>
  <div class="hello">
    <draggable
      :options="{name:'people',draggable:'.item',animation:150,ghostClass:'sortable-ghost',chosenClass:'chosenClass',scroll:true,scrollSensitivity:200}"
      v-model="list2"
      @change="change"
      @start="start"
      @end="end"
      :move="move"
      style="display: inline-block; width:190px;height: 200px;background: #eee;overflow: auto"
    >
      <li v-for="(item, index) in list2" class="item" :class="setclass(item,index)" :key="index">{{item.name}}</li>
       <button slot="footer" @click="addPeople">Add</button>
    </draggable>

  </div>
</template>

<script>
import draggable from "vuedraggable";
export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      list2: [
        {
          id: 1,
          name: "1"
        },
        {
          id: 2,
          name: "2"
        },
        {
          id: 3,
          name: "3"
        },
        {
          id: 4,
          name: "4"
        },
        {
          id: 5,
          name: "5"
        },
        {
          id: 6,
          name: "6"
        }
      ]
    };
  },
  components: {
    draggable
  },
  methods: {
    addPeople(){

    },
    setclass(item,index){
      console.log(item,index)
    },
    //evt里面有两个值，一个evt.added 和evt.removed  可以分别知道移动元素的ID和删除元素的ID
    change: function(evt) {
      console.log(evt);
    },
    //start ,end ,add,update, sort, remove 得到的都差不多
    start: function(evt) {
      console.log(evt);
      console.log(this.list2)
    },
    end: function(evt) {
      console.log(evt);
      evt.item; //可以知道拖动的本身
      evt.to; // 可以知道拖动的目标列表
      evt.from; // 可以知道之前的列表
      evt.oldIndex; // 可以知道拖动前的位置
      evt.newIndex; // 可以知道拖动后的位置
      console.log(this.list2)
    },
    move: function(evt, originalEvent) {
      console.log(evt);
      console.log(originalEvent); //鼠标位置
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.chosenClass{
  color: red
}
.sortable-ghost{
  border:1px solid red
}
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
