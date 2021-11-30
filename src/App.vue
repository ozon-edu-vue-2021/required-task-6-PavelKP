<template>
  <div id="app">
    <ctm-table :rows="rows" :isFetching="isFetching" @sorting-change="sortData">
      <cm-table-column prop="id" title="ID" />

      <cm-table-column prop="id" title="User photo" width="104">
        <template v-slot:body="{ id }">
          <img
            :src="`https://randomuser.me/api/portraits/women/${id}.jpg`"
            alt="user photo"
          />
        </template>
      </cm-table-column>

      <cm-table-column prop="name" title="Full name" :isFilter="true" />

      <cm-table-column
        prop="username"
        title="Username"
        :isFilter="true"
        :isSorting="true"
      />

      <cm-table-column prop="website" title="Website" />

      <cm-table-column prop="phone" title="Phone" :isSorting="true" />

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
import { getPosts } from "./api/api";

export default {
	name: "App",
	components: {
		"ctm-table": ctmTable,
		"cm-table-column": cmTableColumn,
	},
	data() {
		return {
			rows: [],
			isFetching: false,
		};
	},
	methods: {
		objectToQuery(filterData) {
			let str = "?";

			Object.entries(filterData).map(([key, value], i, arr) => {
				str += `${key}_like=${value}`;
				if (i !== arr.length - 1) {
					str += "&";
				}
			});
			return str;
		},
		async sortData(payload) {
			const queryParam = this.objectToQuery(payload);
			const posts = await getPosts(queryParam);
			this.rows = posts;
		},
	},
	async created() {
		this.isFetching = true;

		const posts = await getPosts();
		this.rows = posts;

		this.isFetching = false;
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
