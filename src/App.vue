<template>
  <div id="app">
   <ctm-table-wrapper />
  </div>
</template>

<script>
import ctmTableWrapper from './components/index.vue'

export default {
	name: "App",
	components: {
		"ctm-table-wrapper": ctmTableWrapper,
	},
};
</script>

<style>
body {
	padding: 0;
	margin: 0;
}
* {
  box-sizing: border-box;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
