<script lang="jsx">
import { ref, defineComponent } from "vue";
import { $ref } from "vue/macros";
export default defineComponent({
  name: "vScroll",
  setup(props) {
    const scrollList = $ref(getData());
    function getData() {
      const arr = [];
      for (let i = 0; i < 5000; i++) {
        arr.push(i);
      }
      return arr;
    }
    const Component = (proos) => {
      return (
        <div style={{ display: "flex", alignItems: "center", marginBottom: 5 }}>
          <img
            src={
              "https://p3-passport.byteimg.com/img/user-avatar/1f319f0ad130fb837df9efd96cca79bd~100x100.awebp"
            }
            width={80}
            height={60}
            alt=""
          />
          列表{proos.id}
        </div>
      );
    };
    return () => (
      <div ref="allRef">
        <div ref="scrollRef">
          {/* 占位区域 */}
          <div></div>
          {/* 渲染区域 */}
          <div>
            {scrollList.map((id) => (
              <div key={id}>
                {/* 子组件 */}
                <Component id={id} {...props} />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  },
});
</script>

<style scoped></style>
