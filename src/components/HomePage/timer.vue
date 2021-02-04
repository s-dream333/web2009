<template>
  <div class="chooser-component">
    <ul class="chooser-list">
      <li
        v-for="(item, index) in timerData"
        :class="{ active: (currentIndex === index) }"
        :key="index"
        @click="timerHandle(item, index)"
      >
        {{ item.value }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentIndex: 0,
    };
  },
  props: {
    timerData: {
      type: Array,
      default: function () {
        return [
          {
            value: "text",
            id: 1,
          },
        ];
      },
    },
  },
  methods: {
    timerHandle(item, index) {
      this.currentIndex = index;
    },
  },
};
</script>

<style scoped>
.chooser-component {
  position: relative;
  display: inline-block;
}
.chooser-list li {
  display: inline-block;
  border: 1px solid #e3e3e3;
  height: 25px;
  line-height: 25px;
  padding: 0 8px;
  margin-right: 5px;
  border-radius: 3px;
  text-align: center;
  cursor: pointer;
}
.chooser-list li.active {
  border-color: #4fc08d;
  background: #4fc08d;
  color: #fff;
}
</style>