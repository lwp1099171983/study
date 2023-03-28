import { onMounted, onUnmounted } from "vue";

const useEventListener = (event, handler, target = window) => {
  onMounted(() => target.value.addEventListener(event, handler));
  onUnmounted(() => target.value.removeEventListener(event, handler));
};

export default useEventListener;
