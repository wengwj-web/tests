<template>
  <div class="main">
    <div class="form_left">
      <p class="title">控件库</p>
      <ul>
        <draggable v-bind="getLeftOptions()" v-model="controlList">
          <li
            :title="item.name"
            class="li"
            v-for="(item,index) in controlList"
            :key="item.type + index"
          >
            <span class="li_name ellipsis">{{item.name}}</span>
            <img class="li_icon" :src="item.icon" alt>
          </li>
        </draggable>
      </ul>
    </div>
    <div class="form_center">
      <div class="form_center_bg">
        <img src="../assets/img/com.approval.form/approval_4.png" alt>
        <div class="form_center_con">
          <draggable
            v-bind="getCenterOptions()"
            class="form_center_drag"
            v-model="submitControlList"
            @add="centerDragAdd"
          >
            <div
              class="li cl"
              :class="{'active':item.selected}"
              v-for="(item,index) in submitControlList"
              :key="item.type + index"
            >
              <div
                class="border cl"
                @click.stop="showControlDetails(index)"
                :class="{'border_len':item.type == 'textarea' || item.type == 'explain'}"
              >
                <template v-if="item.type != 'datesection'">
                  <div class="requisite" v-if="item.required">*</div>
                  <div
                    class="title"
                    :class="{'title_upload':item.type == 'upload'}"
                  >{{item.titleVal}}</div>
                  <div class="placeholder">
                    <label v-if="item.type != 'upload'">{{item.placeholderVal}}</label>
                    <label v-else>
                      <input type="file" class="inp">
                    </label>
                  </div>
                </template>
                <template v-else>
                  <div class="requisite" v-if="item.required">*</div>
                  <div class="fl_l">
                    <div
                      class="tr cl"
                      v-for="(ditem,dindex) in item.dateList"
                      :key="ditem.titleVal + dindex"
                    >
                      <div class="title">{{ditem.titleVal}}</div>
                      <div class="placeholder">{{ditem.placeholderVal}}</div>
                    </div>
                  </div>
                </template>
                <div class="del">
                  <Icon size="20" type="ios-close-circle" @click.stop="delControl(index)"/>
                </div>
              </div>
            </div>
          </draggable>
        </div>
      </div>
    </div>
    <div class="form_right" v-if="submitControlList.length > 0">
      <p class="title">
        控件设置
        <span class="subtitle">({{submitControlObj.name}})</span>
      </p>
      <div class="tr">
        <div class="tr_title">
          <span class="span_name">标题</span>
          <span class="span_len">最多{{submitControlObj.len}}字</span>
        </div>
        <div class="tr_con">
          <Input
            v-if="submitControlObj.type != 'datesection'"
            :maxlength="submitControlObj.len"
            v-model="submitControlObj.titleVal"
            placeholder="请输入标题"
          />
          <div class="inp_list" v-else>
            <Input
              v-for="(ditem,dindex) in submitControlObj.dateList"
              :maxlength="submitControlObj.len"
              v-model="ditem.titleVal"
              :key="ditem.titleVal + dindex"
              placeholder="请输入标题"
            />
          </div>
        </div>
      </div>
      <div class="tr">
        <div class="tr_title">
          <span class="span_name">提示文字</span>
          <span class="span_len">最多{{submitControlObj.len}}字</span>
        </div>
        <div class="tr_con">
          <div class="inp_list" v-if="submitControlObj.type == 'datesection'">
            <Input
              v-for="(ditem,dindex) in submitControlObj.dateList"
              :maxlength="submitControlObj.len"
              v-model="ditem.placeholderVal"
              :key="ditem.placeholderVal + dindex"
              placeholder="请输入提示文字"
            />
          </div>
          <Input
            class="inp_big"
            :rows="10"
            type="textarea"
            v-else-if="submitControlObj.type == 'textarea' || submitControlObj.type == 'explain'"
            :maxlength="submitControlObj.len"
            v-model="submitControlObj.placeholderVal"
            placeholder="请输入提示文字"
          />
          <Input
            v-else
            :maxlength="submitControlObj.len"
            v-model="submitControlObj.placeholderVal"
            placeholder="请输入提示文字"
          />
        </div>
      </div>
      <div
        class="tr"
        v-if="submitControlObj.type == 'radio' || submitControlObj.type == 'checkbox' || submitControlObj.type == 'select'"
      >
        <div class="tr_title">
          <span class="span_name">选项</span>
          <span class="span_len">最多50项,每项最多{{submitControlObj.len}}个字</span>
        </div>
        <div class="tr_con">
          <div class="options_ul">
            <div
              class="o_tr"
              v-for="(oitem,oindex) in submitControlObj.option"
              :key="oitem + oindex"
            >
              <div class="o_num">{{(oindex+1)}}</div>
              <div class="o_inp">
                <Input
                  :maxlength="submitControlObj.len"
                  v-model="submitControlObj.option[oindex]"
                  placeholder="请输入选项"
                />
              </div>
              <div class="o_icon">
                <Icon size="30" type="ios-close-circle" @click="delOption(oindex)"/>
              </div>
            </div>
            <Button class="_theme_b" type="primary" @click="addOption">添加选项</Button>
          </div>
        </div>
      </div>
      <div
        class="tr"
        v-if="submitControlObj.type == 'date' || submitControlObj.type == 'datesection'"
      >
        <div class="tr_title">
          <span class="span_name">时间格式</span>
        </div>
        <div class="tr_con">
          <RadioGroup vertical v-model="submitControlObj.dategs">
            <Radio size="large" label="yyyy-mm-dd">年-月-日</Radio>
            <Radio size="large" label="yyyy-mm-dd hh:mm:ss">年-月-日 时:分</Radio>
          </RadioGroup>
        </div>
      </div>
      <div class="tr">
        <div class="tr_title">
          <span class="span_name">校验</span>
          <span class="span_len">设置校验条件</span>
        </div>
        <div class="tr_con">
          <Checkbox v-model="submitControlObj.required" size="large">是否必填</Checkbox>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";
export default {
  data() {
    return {
      leftControlOptions: {
        group: {
          name: "control",
          pull: "clone",
          put: false,
          revertClone: false
        },
        sort: false
      },
      submitControlList: [],
      centerControlOptions: {
        group: {
          name: "control"
        }
      },
      controlList: [
        {
          //控件库
          type: "text",
          name: "单行输入框",
          icon: require("../assets/img/com.approval.form/control/icon_4.png"),
          placeholder: "请输入",
          titleVal: "单行输入框",
          placeholderVal: "请输入",
          required: false,
          len: 10,
          selected: false
        },
        {
          type: "textarea",
          name: "多行输入框",
          icon: require("../assets/img/com.approval.form/control/icon_4.png"),
          placeholder: "请输入",
          titleVal: "多行输入框",
          placeholderVal: "请输入",
          required: false,
          len: 200,
          selected: false
        },
        {
          type: "number",
          name: "数字输入框",
          icon: require("../assets/img/com.approval.form/control/icon_4.png"),
          placeholder: "请输入",
          titleVal: "数字输入框",
          placeholderVal: "请输入",
          required: false,
          len: 10
        },
        {
          type: "radio",
          name: "单选框",
          icon: require("../assets/img/com.approval.form/control/icon_9.png"),
          placeholder: "请选择",
          titleVal: "单选框",
          placeholderVal: "请选择",
          required: false,
          len: 10,
          option: ["选项", "选项"],
          selected: false
        },
        {
          type: "checkbox",
          name: "多选框",
          icon: require("../assets/img/com.approval.form/control/icon_9.png"),
          placeholder: "请选择",
          titleVal: "多选框",
          placeholderVal: "请选择",
          required: false,
          len: 10,
          option: ["选项", "选项"],
          selected: false
        },
        {
          type: "select",
          name: "下拉框",
          icon: require("../assets/img/com.approval.form/control/icon_9.png"),
          placeholder: "请选择",
          titleVal: "下拉框",
          placeholderVal: "请选择",
          required: false,
          len: 10,
          option: ["选项", "选项"],
          selected: false
        },
        {
          type: "date",
          name: "日期",
          icon: require("../assets/img/com.approval.form/control/icon_1.png"),
          placeholder: "请选择",
          titleVal: "日期",
          placeholderVal: "请选择",
          required: false,
          len: 10,
          dategs: "yyyy-mm-dd",
          selected: false
        },
        {
          type: "datesection",
          name: "日期区间",
          icon: require("../assets/img/com.approval.form/control/icon_1.png"),
          placeholder: "请选择",
          titleVal: "日期区间",
          placeholderVal: "请选择",
          len: 10,
          required: false,
          dategs: "yyyy-mm-dd",
          dateList: [
            {
              titleVal: "开始时间",
              placeholderVal: "请选择开始时间"
            },
            {
              titleVal: "结束时间",
              placeholderVal: "请选择结束时间"
            }
          ],
          selected: false
        },
        {
          type: "explain",
          name: "说明文字",
          icon: require("../assets/img/com.approval.form/control/icon_6.png"),
          placeholder: "请输入",
          titleVal: "说明文字",
          placeholderVal: "请输入",
          required: false,
          len: 200,
          selected: false
        },
        {
          type: "money",
          name: "金额",
          icon: require("../assets/img/com.approval.form/control/icon_7.png"),
          placeholder: "请输入",
          titleVal: "金额",
          placeholderVal: "请输入",
          required: false,
          len: 10,
          selected: false
        },
        {
          type: "upload",
          name: "上传",
          icon: require("../assets/img/com.approval.form/control/icon_8.png"),
          placeholder: "请上传",
          titleVal: "上传",
          placeholderVal: "请上传",
          required: false,
          len: 10,
          selected: false
        }
      ],
      controlActive: 0,
      submitControlObj: {}
    };
  },
  methods: {
    addOption() {
      let that = this;
      let option = that.submitControlList[that.controlActive].option;
      if (option.length >= 50) {
        that.$Notice.info({
          title: "提示",
          desc: "选项不能超过50个"
        });
        return;
      }
      option.push("选项");
    },
    delOption(active) {
      let that = this;
      let option = that.submitControlList[that.controlActive].option;
      if (option.length <= 1) {
        return;
      }
      option.splice(active, 1);
    },
    getLeftOptions() {
      return this.leftControlOptions;
    },
    getCenterOptions() {
      return this.centerControlOptions;
    },
    showControlDetails(dindex) {
      this.controlActive = dindex;
      this.submitControlList.forEach((item, index) => {
        item.selected = false;
        if (dindex == index) {
          item.selected = true;
        }
      });
      this.submitControlObj = this.submitControlList[dindex];
      console.log(this.submitControlObj);
    },
    delControl(index) {
      let obj = this.submitControlList[index];
      if (obj.selected && index > 0) {
        this.controlActive = index - 1;
        this.submitControlObj = this.submitControlList[this.controlActive];
        this.submitControlObj.selected = true;
      }
      this.submitControlList.splice(index, 1);
      if (obj.selected && index == 0 && this.submitControlList.length > 0) {
        this.controlActive = 0;
        this.submitControlObj = this.submitControlList[this.controlActive];
        this.submitControlObj.selected = true;
      }
    },
    centerDragAdd(item) {
      console.log(item);
      let submitControlList = JSON.parse(
        JSON.stringify(this.submitControlList)
      );
      submitControlList.forEach((item, index) => {
        item.selected = false;
      });
      submitControlList[item.newIndex].selected = true;
      this.submitControlList = submitControlList;
      this.controlActive = item.newIndex;
      this.submitControlObj = this.submitControlList[this.controlActive];
      var visibleBottom = document.querySelector(".form_center_con")
        .clientHeight;
      this.$nextTick(() => {
        var box = document
          .querySelector(".form_center_drag")
          .getElementsByClassName("active");
        var centerY = box[0].offsetTop + box[0].offsetHeight / 2;
        if (centerY > visibleBottom) {
          document.querySelector(".form_center_con").scrollTop =
            box[0].offsetTop;
        }
      });
    }
  },
  components: {
    draggable
  }
};
</script>

<style lang="less">
.c1 {
  zoom: 1;
}
.main {
  display: flex;
  margin: 20px;
  .form_left {
    width: 40%;
    .title {
      color: #9eabbe;
      font-size: 16px;
      margin-bottom: 24px;
      font-weight: bold;
    }
    ul {
      list-style: none;
      li {
        padding: 11px 18px;
        border: 1px dashed #d9e1ec;
        border-radius: 4px;
        background-color: #f4f6fa;
        color: #9eabbe;
        font-size: 14px;
        position: relative;
        margin-bottom: 20px;
        cursor: move;
        .li_icon {
          position: absolute;
          right: 18px;
          top: 50%;
          -webkit-transform: translateY(-50%);
          -ms-transform: translateY(-50%);
          transform: translateY(-50%);
        }
      }
    }
  }
  .form_center {
    width: 304px;
    position: relative;
    margin-top: 40px;
    .form_center_con {
      position: absolute;
      left: 30px;
      right: 31px;
      bottom: 80px;
      top: 72px;
      border-bottom-left-radius: 20px;
      border-bottom-right-radius: 20px;
      overflow-y: auto;
    }
    .form_center_drag {
      height: 100%;
      padding-bottom: 10px;
      .li {
        padding-top: 10px;
        color: #9eabbe;
        font-size: 12px;
        &.active {
          .border {
            border: 1px solid #5d63ac;
          }
        }
        .border {
          background-color: #fff;
          border: 1px solid #9eabbe;
          padding: 10px;
          position: relative;
          overflow: hidden;
          &.border_len {
            min-height: 100px;
          }
          &:hover {
            .del {
              display: block;
            }
          }
        }
        .requisite {
          float: left;
          margin: 0 6px;
          color: #d0021b;
          font-size: 13px;
          font-weight: bold;
        }
        .title {
          float: left;
          margin-right: 12px;
          width: 60px;
        }
        .title_upload {
          line-height: 24px;
        }
        .placeholder {
          float: left;
          width: 100px;
        }
        .del {
          position: absolute;
          top: 50%;
          right: 10px;
          transform: translateY(-50%);
          display: none;
          cursor: pointer;
          z-index: 999;
        }
        .inp {
          width: 100%;
        }
        li {
          display: none;
        }
      }
    }
  }
  .form_right {
    float: left;
    padding-left: 12px;
    width: calc((100% - 304px) / 2);
    .title {
      color: #9eabbe;
      font-size: 16px;
      font-weight: bold;
      margin-bottom: 24px;
    }
    .subtitle {
      font-size: 12px;
      font-weight: 300;
      margin-left: 10px;
    }
    .tr {
      color: #c6cfdc;
      font-size: 14px;
      margin-bottom: 40px;
    }
    .tr_title {
      margin-bottom: 10px;
    }
    .span_name {
      color: #9eabbe;
      font-weight: bold;
      margin-right: 10px;
    }
    .span_len {
      color: #c6cfdc;
    }
    .ivu-input {
      color: #bfc9d8;
      font-size: 14px;
      background-color: #f4f6fa;
      border-radius: 4px;
      border: 0;
      padding: 0 10px;
      height: 40px;
      box-shadow: none;
    }
    .options_ul {
      .o_tr {
        position: relative;
        margin-bottom: 10px;
        &:not(:first-child):hover {
          .o_icon {
            display: block;
          }
        }
      }
      .o_inp {
        padding-right: 60px;
        padding-left: 20px;
      }
      .o_icon {
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        display: none;
        cursor: pointer;
      }
      .o_num {
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
      }
      .ivu-btn {
        border-radius: 2px;
        font-size: 12px;
        margin-top: 10px;
      }
    }
    .inp_list {
      .ivu-input-wrapper:first-child {
        margin-bottom: 10px;
      }
    }
    .inp_big {
      .ivu-input {
        padding: 10px;
        resize: none;
        height: 160px;
      }
    }
  }
}
</style>
