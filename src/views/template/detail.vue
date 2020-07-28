<template>
  <div id="flow">
    <flow-panel></flow-panel>
  </div>
</template>

<script>
import FlowPanel from "@/components/EasyFlow/panel";
import "element-ui/lib/theme-chalk/index.css";
import "@/components/EasyFlow/index.css";
export default {
  name: "Detail",
  components: { FlowPanel },
};
</script>

<style scoped></style>
