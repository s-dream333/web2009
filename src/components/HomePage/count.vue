<template>
  <div>
    <div class="counter-component">
      <div class="counter-btn" @click="minHandle">-</div>
      <div class="counter-show">
        <input type="text" v-model="counter" @keyup="inputHandle" />
      </div>
      <div class="counter-btn" @click="addHandle">+</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      counter: 1,
      max: 20,
    };
  },
  methods: {
    minHandle() {
      if (this.counter <= 1) {
        return;
      }
      this.counter--;
    },
    addHandle() {
      if (this.counter >= this.max) {
        return;
      }
      this.counter++;
    },
    inputHandle() {
      var fix;
      if (typeof this.counter === "string") {
        fix = Number(this.counter.replace(/\D\g/, ""));
      } else {
        fix = 1;
      }
      if (fix <= 1) {
        fix = 1;
      }
      if (fix >= this.max) {
        fix = this.max;
      }
      this.counter = fix;
    },
  },
};
</script>

<style scoped>
.counter-component {
  position: relative;
  display: inline-block;
  overflow: hidden;
  vertical-align: middle;
}
.counter-show {
  float: left;
}
.counter-show input {
  border: none;
  border-top: 1px solid #e3e3e3;
  border-bottom: 1px solid #e3e3e3;
  height: 23px;
  line-height: 23px;
  width: 30px;
  outline: none;
  text-indent: 4px;
}
.counter-btn {
  border: 1px solid #e3e3e3;
  float: left;
  height: 25px;
  line-height: 25px;
  width: 25px;
  text-align: center;
  cursor: pointer;
}
.counter-btn:hover {
  border-color: #4fc08d;
  background: #4fc08d;
  color: #fff;
}
</style>