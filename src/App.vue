<template>
  <div id="app">
    <ctm-table
      :rows="rows"
			:activeSorting="queryData.sorting"
      :isFetching="isFetching"
			:totalPages="totalPages"
			:current-page="currentPage"
			:static-paging="true"
      @updateTable="updateTable"
    >
      <cm-table-column prop="id" title="Post ID" />

      <cm-table-column prop="id" title="User photo" width="104">
        <template v-slot:body="{ id }">
          <img
            :src="`https://randomuser.me/api/portraits/women/${id}.jpg`"
            alt="user photo"
          />
        </template>
      </cm-table-column>

      <cm-table-column prop="name" title="Full name" :isFilter="true" :isSorting="true"/>

      <cm-table-column prop="body" title="Post text"/>

      <cm-table-column prop="email" :isFilter="true" :isSorting="true">
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
			currentPage: 1,
			limit: 10,
			totalPages: 0,
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
		getPagingQuery(newPage) {
			return `_page=${newPage}&_limit=${this.limit}`;
		},
		async updateTable(action = {}) {
			const { type, payload } = action;

			if (type === 'SORTING') {
				this.queryData.sorting = payload;
				this.currentPage = 1;
			}
			if (type === 'FILTERING') {
				this.queryData.filter = payload;
				this.currentPage = 1;
			}
			if (type === 'PAGING') {
				this.currentPage = payload;
			}

			const strings = [
				this.filterToQuery(this.queryData.filter),
				this.sortingToQuery(this.queryData.sorting),
				this.getPagingQuery(this.currentPage),
			];

			let finalQuery = '';

			strings.forEach((string, i ,arr) => {
				if (string) {
					finalQuery += string;
				}
				if (i !== arr.length - 1 && string) {
					finalQuery += "&";
				}
			});

			const [posts, total] = await getPosts(`?${finalQuery}`);
			this.rows = posts;
			this.totalPages = Math.ceil(total / this.limit);
		},
	},
	async created() {
		this.isFetching = true;

		await this.updateTable();
		
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
