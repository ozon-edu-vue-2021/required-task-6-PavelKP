<template>
  <div id="app">
    <ctm-table :rows="rows">
			
      <cm-table-column prop="id" title="ID" />

      <cm-table-column prop="image" title="Product image" width="104">
        <template v-slot:body="{ image }">
          <img :src="image" alt="product image" />
        </template>
      </cm-table-column>

      <cm-table-column prop="name" title="Product name" :isFilter="true" />

			<cm-table-column 
        prop="category" 
        title="Category" 
        :isFilter="true" 
        :isSorting="true"
      />

      <cm-table-column prop="description" title="Description" />

			<cm-table-column prop="price" title="Price" />

      <cm-table-column prop="email">
        <template v-slot:title>
          <b>email</b>
        </template>
        <template v-slot:body="{ email }">
          <a :href="`mailto:${email}`">{{ email }}</a>
        </template>
      </cm-table-column>

    </ctm-table>
  </div>
</template>

<script>
import ctmTable from "./components/ctm-table.vue";
import cmTableColumn from "./components/ctm-table-column.vue";
import { rows } from './mock/mock';

export default {
  name: "App",
  components: {
    "ctm-table": ctmTable,
    "cm-table-column": cmTableColumn,
  },
  data() {
    return {
      rows: [],
    };
  },
	created() {
		this.rows = rows;
	},
};
</script>

<style>
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
