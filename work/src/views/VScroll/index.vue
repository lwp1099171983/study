<script lang="jsx">
import {
  ref,
  defineComponent,
  onMounted,
  nextTick,
  watchEffect,
  reactive,
} from "vue";
import useEventListener from "../VScroll/hooks/useEventListener";
export default defineComponent({
  name: "vScroll",
  setup(props) {
    const scrollList = ref(getData());
    const allRef = ref(null);
    const scrollRef = ref(null);
    const itemHeight = 60; // 子列表高度
    const scrollObj = reactive({
      data: [],
      start: 0, // 开始索引
      end: 0, // 结束索引
      bufferCount: 6, // 缓冲个数
      currentOffset: 0, // 当前位置
      scrollAllHeight: 0, // 容器的初始高度
      listHeight: 0, // 列表整体高度
      renderCount: 0, // 渲染节点数量
    });
    function getData() {
      const arr = [];
      for (let i = 0; i < 5000; i++) {
        arr.push(i);
      }
      return arr;
    }
    onMounted(() => {
      scrollObj.scrollAllHeight = allRef.value.offsetHeight;
      scrollObj.renderCount =
        Math.ceil(scrollObj.scrollAllHeight / itemHeight) +
        scrollObj.bufferCount;
      scrollObj.end = scrollObj.renderCount + 1;
      console.log("allRef：", scrollObj.start, scrollObj.end);
      scrollObj.listHeight = itemHeight * scrollList.value.length;
      scrollObj.data = scrollList.value.slice(scrollObj.start, scrollObj.end);
    });
    watchEffect(() => {
      console.log("watchEffect", scrollObj.start, scrollObj.end);
      scrollObj.data = scrollList.value.slice(scrollObj.start, scrollObj.end);
    });
    // 监听滚动事件
    useEventListener(
      "scroll",
      (e) => {
        // 顶部高度
        const { scrollTop } = allRef.value;
        console.log("scrollTop", scrollTop);
        scrollObj.start = Math.floor(scrollTop / itemHeight);
        scrollObj.end = Math.floor(
          scrollTop / itemHeight + scrollObj.renderCount + 1
        );
        scrollObj.currentOffset = scrollTop - (scrollTop % itemHeight);
      },
      allRef
    );
    return () => (
      <div ref={allRef} className={"allRef"}>
        <div ref={scrollRef} className={"scrollRef"}>
          {/* 占位区域 */}
          <div
            style={{
              height: `${scrollObj.listHeight}px`,
              position: "absolute",
              left: 0,
              top: 0,
              right: 0,
            }}
          ></div>
          {/* 渲染区域 */}
          <div
            style={{
              transform: `translate3d(0, ${scrollObj.currentOffset}px, 0)`,
              position: "relative",
              left: 0,
              top: 0,
              right: 0,
            }}
          >
            {scrollObj.data.map((id) => (
              <div key={id}>
                {/* 子组件 */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: 5,
                  }}
                >
                  <img
                    src={
                      "https://p3-passport.byteimg.com/img/user-avatar/1f319f0ad130fb837df9efd96cca79bd~100x100.awebp"
                    }
                    width={80}
                    height={60}
                    alt=""
                  />
                  列表{id}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  },
});
</script>

<style scoped lang="scss">
.allRef {
  position: relative;
  overflow: scroll;
  width: 100%;
  height: 100vh;
}
.scrollRef {
  height: 100%;
}
</style>
