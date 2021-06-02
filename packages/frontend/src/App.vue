<template>
  <div id="app">
    <DonateForm />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import DonateForm from "./components/DonateForm.vue";

@Component({
  components: {
    DonateForm,
  },
})
export default class App extends Vue {}
</script>

<style lang="scss">
#app *,
#app *::before,
#app *::after {
  box-sizing: inherit;
}
#app ul {
  list-style: none;
}
#app {
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}
</style>
