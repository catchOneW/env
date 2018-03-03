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
      distance: 0,
      speed: 5 //控制速度，负数可改变方向
    };
  },
  methods: {
    move() {
      this.distance += this.speed;
      //this.div.style.left = this.distance + "px";
      this.div.style.top = this.distance + "px";
      if (this.distance == this.speed * 10) {
        this.speed += 10;
        console.log(this.speed);
      }
      if (this.distance == this.speed * 20) {
        this.speed += 10;
      }
    }
  },
  mounted() {
    this.div = document.getElementById("move");
    var itv = setInterval(() => {
      this.move();
      if (this.distance > 600) {
        window.clearInterval(itv);
      }
    }, 30);
  }
};
</script>
