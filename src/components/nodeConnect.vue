<template>
  <div
    :style="{
      width: props.CanvasWidth + 'px',
      height: props.CanvasHeight + 'px',
    }"
    class="canvasContainer"
  >
    <canvas class="bgCanvas" :ref="setbg"></canvas>
    <canvas
      class="fgCanvas"
      :ref="setfg"
      @mousedown="mdown"
      @mousemove="mmove"
      @mouseup="mup"
    ></canvas>
    <div class="inputc" v-if="showInput">
      <div class="inputbox">
        <div class="close" @click="showInput = false">关闭</div>
        <div class="labelText">请输入节点名称</div>
        <input
          type="text"
          v-model="textInput"
          placeholder="按回车提交"
          @keydown.enter="setName"
        />
      </div>
    </div>
  </div>
</template>
<script>
class mynode {
  constructor(x, y) {
    this.nodeid = Math.random();
    this.currentx = x;
    this.currenty = y;
    this.fromx = x;
    this.fromy = y;
    this.text = "节点";
    this.status = "stop";
    this.padding = 20;
    this.drawArea = {
      stx: -99999999,
      sty: -99999999,
      width: 0,
      height: 0,
    };
  }
  setStatus(s) {
    this.status = s;
  }
  setText(txt) {
    this.text = txt;
  }
  move(addx, addy) {
    if (this.status == "stop") {
      this.setStatus("moving");
      this.fromx = this.currentx;
      this.fromy = this.currenty;
    }
    this.currentx += addx;
    this.currenty += addy;
  }
  isIn(x, y, stateToCheck) {
    if (
      x > this.drawArea.stx &&
      x < this.drawArea.stx + this.drawArea.width &&
      y > this.drawArea.sty &&
      y < this.drawArea.sty + this.drawArea.height
    ) {
      if (stateToCheck.linkingMode.linking) {

      } else {
        if (x - this.drawArea.stx <= 20||this.drawArea.stx + this.drawArea.width - x < 20) {
          stateToCheck.linkingMode = {
            linking: true
          };
        } 
        else {
          stateToCheck.linkingMode = {
            linking: false,
          };
        }
      }

      return true;
    }
    return false;
  }
  draw(ctx, stateToCheck) {
    // ctx.strokeText();
    ctx.lineWidth = 2;
    let text = this.text;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = "normal 20px arial";
    let textinfo = ctx.measureText(text);
    let textWidth = textinfo.width;
    let textHeight =
      textinfo.fontBoundingBoxAscent + textinfo.fontBoundingBoxDescent;

    ctx.fillText(this.text, this.currentx, this.currenty);

    let padding = this.padding;
    let pnt = {
      x: this.currentx - textWidth / 2 - padding,
      y: this.currenty - textHeight / 2 - padding,
    };
    //更新检测模型位置
    this.drawArea.stx = pnt.x;
    this.drawArea.sty = pnt.y;
    this.drawArea.width = textWidth + 2 * padding;
    this.drawArea.height = textHeight + 2 * padding;

    ctx.beginPath();
    ctx.moveTo(pnt.x, pnt.y);
    ctx.lineTo(pnt.x + this.drawArea.width, pnt.y);
    ctx.lineTo(pnt.x + this.drawArea.width, pnt.y + this.drawArea.height);
    ctx.lineTo(pnt.x, pnt.y + this.drawArea.height);
    // ctx.lineTo(pnt.x,pnt.y);
    ctx.closePath();
    ctx.strokeStyle = stateToCheck.currentNode == this.nodeid ? "#999" : "#333";

    ctx.stroke();
  }
}
</script>

<script setup>
import { ref, onMounted, computed, reactive } from "vue";
let props = defineProps({
  CanvasWidth: {
    type: Number,
    default: 600,
  },
  CanvasHeight: {
    type: Number,
    default: 600,
  },
});
// ----------------------------全局设置-----------------------------------------
let width = props.CanvasWidth;
let height = props.CanvasHeight;
//------------------------------绑定ref-----------------------------------------
let bg = ref(null);
let fg = ref(null);
const setbg = (el) => {
  bg.value = el;
};
const setfg = (el) => {
  fg.value = el;
};
// --------------------------全局数据---------------------------------------------
let mystate = {
  nodes: {},
  lines: [],
  linkingLinePoint: {},
  linkingMode: {
    linking: false,
  },
  currentNode: 0,
  framec: 0,
  setText(txt) {
    this.nodes.get(this.currentNode).setText(txt);
  },
};
//-----------------------------绘制背景图--------------------------------------------------
let initbg = (ctx) => {
  for (let i = 0; i < width; i += 50) {
    ctx.moveTo(i, 0);
    ctx.lineTo(i, height);
  }
  for (let i = 0; i < height; i += 50) {
    ctx.moveTo(0, i);
    ctx.lineTo(width, i);
  }
  ctx.strokeStyle = "#eee";
  ctx.stroke();
};
//-----------mounted之后，才能拿到ref，所以，初始化需要在mounted里面进行-------------------
onMounted(() => {
  let canvasbg = bg.value;
  let ctx0 = canvasbg.getContext("2d");
  ctx0.translate(0.5, 0.5);
  canvasbg.width = props.CanvasWidth;
  canvasbg.height = props.CanvasHeight;
  let canvasfg = fg.value;
  let ctx1 = canvasfg.getContext("2d");
  ctx1.translate(0.5, 0.5);
  canvasfg.width = props.CanvasWidth;
  canvasfg.height = props.CanvasHeight;

  initbg(ctx0);
  //------------------
  let nodes = new Map();
  (function init() {
    for (let i = 0; i < 4; i++) {
      let node = new mynode(width * Math.random(), height * Math.random());
      node.setText("节点" + i);
      nodes.set(node.nodeid, node);
    }
  })();
  mystate.nodes = nodes;
  (function run() {
    update(ctx1);
    mystate.framec++;
    requestAnimationFrame(run);
  })();

  function update(ctx) {
    ctx.clearRect(0, 0, width, height);
    mystate.nodes.forEach((node) => {
      node.draw(ctx, mystate);
    });
    ctx.strokeStyle = "#333";
    mystate.lines.forEach((ls) => {
      let ids = ls.split("+");
      let node1 = mystate.nodes.get(ids[0] * 1);
      let node2 = mystate.nodes.get(ids[1] * 1);
      if (Math.abs(node1.currentx - node2.currentx) < 20) {
        let dir = node1.currenty - node2.currenty > 0 ? 1 : -1;
        ctx.moveTo(
          node1.currentx,
          node1.currenty - (dir * node1.drawArea.height) / 2
        );
        ctx.lineTo(
          node2.currentx,
          node2.currenty + (dir * node2.drawArea.height) / 2
        );
      } else {
        let dir = node1.currentx < node2.currentx ? 1 : -1;
        ctx.moveTo(
          node1.currentx + (dir * node1.drawArea.width) / 2,
          node1.currenty
        );
        let controlNum = 50;
        ctx.bezierCurveTo(
          node1.currentx + (dir * node1.drawArea.width) / 2 + dir * controlNum,
          node1.currenty,
          node2.currentx - (dir * node2.drawArea.width) / 2 - dir * controlNum,
          node2.currenty,
          node2.currentx - (dir * node2.drawArea.width) / 2,
          node2.currenty
        );
        ctx.stroke();
      }
    });
    if (
      mystate.linkingMode.linking &&
      mystate.linkingLinePoint.x != undefined
    ) {
      let cnode = mystate.nodes.get(mystate.currentNode);
      ctx.moveTo(cnode.currentx, cnode.currenty);
      let pnt = mystate.linkingLinePoint;
      ctx.lineTo(pnt.x, pnt.y);
      ctx.stroke();
    }
    ctx.stroke();
  }
});
//-------------------------------事件处理------------------------------------------------
let eventStore = {
  isMouseDown: false,
  isMouseMoving: false,
  mx: 0,
  my: 0,
  mouseUpTime: 0,
};
let showInput = ref(false);
let textInput = ref("");
let inputMode = "";
let mdown = function (e) {
  let x = e.offsetX;
  let y = e.offsetY;
  eventStore.isMouseDown = true;

  mystate.linkingMode.linking = false;

  let res = checkChoosedNode(x, y, mystate.nodes);
  if (res.hasNode) {
    mystate.currentNode = res.nodeid;
  } else {
    mystate.currentNode = 9999;
  }
  eventStore.mx = x;
  eventStore.my = y;
};
let mmove = function (e) {
  eventStore.isMouseMoving = true;
  let x = e.offsetX;
  let y = e.offsetY;
  if (eventStore.isMouseDown && mystate.currentNode < 1) {
    if (mystate.linkingMode.linking == false) {
      let addx = x - eventStore.mx;
      let addy = y - eventStore.my;
      eventStore.mx = x;
      eventStore.my = y;
      mystate.nodes.get(mystate.currentNode).move(addx, addy);
    } else {
      mystate.linkingLinePoint = {
        x,
        y,
      };
    }
  }
};
let mup = function (e) {
  let x = e.offsetX;
  let y = e.offsetY;
  let time = new Date().getTime();
  let res = checkChoosedNode(x, y, mystate.nodes);

  if (res.hasNode) {
    //判断添加连接线
    if (mystate.linkingMode.linking == true) {
      let fromnode = mystate.currentNode;
      let tonode = res.nodeid;
      if (fromnode != tonode) {
        let line = fromnode + "+" + tonode;
        console.log(line)
        if (!mystate.lines.includes(line)) {
          mystate.lines.push(line);
        }

        mystate.linkingMode.linking = false;
      }
    }
    mystate.currentNode = res.nodeid;
    mystate.nodes.get(mystate.currentNode).setStatus("stop");
  } else {
    mystate.currentNode = 9999;
  }
  //接线模式在鼠标释放时结束
  mystate.linkingMode = {
    linking: false,
  };
  //双击事件处理
  if (time - eventStore.mouseUpTime < 300) {
    console.log("dbclick");
    if (mystate.currentNode < 1) {
      showInput.value = true;
      inputMode = "change";
      textInput.value = mystate.nodes.get(mystate.currentNode).text;
    }
    //----双击空白处新建节点----
    if (!res.hasNode && mystate.currentNode > 1) {
      showInput.value = true;
      inputMode = "new";
      mystate.newNodeinfo = { x, y };
    }
  }
  mystate.linkingMode.linking = false;
  mystate.linkingLinePoint = {};
  eventStore.isMouseDown = false;
  eventStore.isMouseMoving = false;
  eventStore.mouseUpTime = time;
};
let setName = () => {
  showInput.value = false;
  if (inputMode == "new") {
    let node = new mynode(mystate.newNodeinfo.x, mystate.newNodeinfo.y);
    mystate.newNodeinfo = {};
    node.setText(textInput.value);
    mystate.nodes.set(node.nodeid, node);
  } else {
    mystate.setText(textInput.value);
    
  }
  textInput.value = ''
};
//----检查给定的坐标对应的node------
function checkChoosedNode(x, y, nodes) {
  //暂未考虑node层级问题
  let res = {
    hasNode: false,
    nodeid: 0,
  };
  try {
    nodes.forEach((node) => {
      if (node.isIn(x, y, mystate)) {
        let nid = node.nodeid;
        res.hasNode = true;
        res.nodeid = nid;
      }
    });
  } catch (e) {
    console.log(e);
  }
  return res;
}
</script>
<style scoped>
.canvasContainer {
  position: relative;
  background: white;
  cursor: pointer;
}
canvas {
  position: absolute;
  top: 0;
  left: 0;
}
.inputc {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 99;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(225, 225, 225, 0.5);
}

.close {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 40px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  /* border:2px solid #999; */
  color: rgb(240, 92, 92);
}

.inputbox {
  position: relative;
  width: 600px;
  height: 300px;
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.labelText {
  width: 100%;
  text-align: center;
  font-size: 18;
  line-height: 50px;
}

input {
  width: 360px;
  height: 40px;
  line-height: 40px;
  text-indent: 1em;
}
</style>