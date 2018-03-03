<template>
  <div>
    <div id="move">

    </div>
  </div>
</template>
<style lang="scss" scoped>
@import "../style/common.scss"; //引入
#move {
  height: 50px;
  width: 50px;
  background-color: red;
  position: absolute;
  left: 0;
  top: 0;
}
</style>
<script>
export default {
  data() {
    return {
      div: null,
      distance: 0
    };
  },
  methods: {
    move() {
      this.div.style.left = ++this.distance + "px";
      this.div.style.top = ++this.distance + "px";
    }
  },
  mounted() {
    this.div = document.getElementById("move");
    setInterval(() => {
      this.move();
    }, 30);
  }
};
</script>
