<template>
  <div id="app">
    <ctm-table
      :rows="rows"
			:activeSorting="queryData.sorting"
      :isFetching="isFetching"
      @filter-change="updateTable"
      @sorting-change="updateTable"
    >
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

      <cm-table-column prop="website" title="Website" :isSorting="true" />

      <cm-table-column prop="phone" title="Phone" />

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
			queryData: {
				filter: {},
				sorting: {},
			},
		};
	},
	methods: {
		filterToQuery(filterData) {
			let str = "";

			Object.entries(filterData).map(([key, value], i, arr) => {
				str += `${key}_like=${value}`;
				if (i !== arr.length - 1) {
					str += "&";
				}
			});
			return str;
		},
		sortingToQuery(filterData) {
			let str = "";

			Object.entries(filterData).map(([key, value]) => {
				str += `_sort=${key}&_order=${value}`;
			});
			return str;
		},
		async updateTable(action) {
			const { type, payload } = action;

			if (type === 'SORTING') {
				this.queryData.sorting = payload;
			}
			if (type === 'FILTERING') {
				this.queryData.filter = payload;
			}

			const strings = [
				this.filterToQuery(this.queryData.filter),
				this.sortingToQuery(this.queryData.sorting),
			];

			let finalQuery = '';
			strings.forEach((string, i ,arr) => {
				if (string) {
					finalQuery += string;
				}
				if (i !== arr.length - 1) {
					finalQuery += "&";
				}
			});

			const posts = await getPosts(`?${finalQuery}`);
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
