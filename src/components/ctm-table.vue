<script lang="jsx">
import ctmTableSortingButton from './ctm-table-sorting-button.vue';
import ctmTablePaginator from './ctm-table-paginator.vue';
import { getPosts } from '../api/api.js';

export default {
	components: {
		'ctm-table-sorting-button': ctmTableSortingButton,
		'ctm-table-paginator': ctmTablePaginator,
	},
	props: {
		rows: {
			type: Array,
			default: () => [{}],
		},
		totalPages: {
			type: Number,
			default: 0
		},
		currentPage: {
			type: Number,
			default: 0
		},
		staticPaging: {
			type: Boolean,
			default: true
		},
		isFetching: {
			type: Boolean,
			default: false,
		},
		activeSorting: {
			type: Object,
		},
	},
	data() {
		return {
			filter: {},
			sorting: {},
		}
	},
	methods: {
		getColumnOptions() {
			const slots = this.$slots.default;
			const filteredSlots = slots.filter((slot) => slot.componentOptions.tag === 'cm-table-column');
			const options = filteredSlots.map((slot) => Object.assign(
				{},
				{
					...slot.componentOptions.propsData,
					scopedSlots: slot.data?.scopedSlots || {},
				}
			))

			return options;
		},
		renderHeader(h, columnOptions) {
			const headerData = columnOptions.map((option, i) => {
				const renderedTitle = option.scopedSlots.title ? option.scopedSlots.title() : option.title

				const tableCellStyle = {
					style: {
						width: option.width && `${option.width}px`,
					}
				}

				const activeSorting = Object.entries(this.activeSorting || {})?.[0] || [];

				return (
					<th key={i} class={this.$style?.filterCell} {...tableCellStyle}>
						<div class={this.$style?.cellWrapper}>
							<div class={this.$style?.cellInnerWrapper}>
								<div class={this.$style?.filterCellText}>
									{renderedTitle}
								</div>
								{option.isFilter && 
									(
										<input
											onInput={(evt) => this.changeFilter(evt, option.prop)}
											class={this.$style?.filterInput} 
										/>
									)}
							</div>
							{option.isSorting && 
								<ctm-table-sorting-button 
									onChangeSorting={this.changeSorting}
									prop={option.prop}
									activeSorting={activeSorting}
								/>}
						</div>
					</th>
				);
			});

			return (
				<tr>
					{...headerData}
				</tr>
			)
		},
		renderRows(h, columnOptions) {
			return this.rows.map((row, index) => {
				return (
					<tr key={row.id || index}>
						{this.renderCell(h, row, columnOptions)}
					</tr>
				)
			})
		},
		renderCell(h, row, columnOptions) {
			return columnOptions.map((option) => {
				const renderedCell = option.scopedSlots.body ? option.scopedSlots.body(row) : row[option.prop];

				const tableCellStyle = {
					style: {
						width: option.width && `${option.width}px`,
					}
				}

				return (
					<td {...tableCellStyle} class={this.$style?.tableCell}>
						{renderedCell}
					</td>
				);
			})
		},
		async changeFilter(evt, prop) {
			const value = evt.target.value.trim();

			this.filter = {
				...this.filter,
				[prop]: value,
			}

			this.$listeners.updateTable({
				type: 'FILTERING',
				payload: this.filter,
			});
		},
		async changeSorting(action) {
			const { payload } = action;
			
			this.sorting = payload;
			this.$listeners.updateTable(action);
		},
	},
	render(h) {
		if (this.isFetching) {
			return <p>Loading...</p>
		}

		const columnOptions = this.getColumnOptions();
		const tableHeader = this.renderHeader(h, columnOptions);
		const tableRows = this.renderRows(h, columnOptions);
		const { updateTable } = this.$listeners;

		return (
			<div>
				<table class={this.$style?.table}>
					<thead>
						{tableHeader}
					</thead>
					<tbody>
							{...tableRows}
					</tbody>
				</table>
				{this.staticPaging 
					&& <ctm-table-paginator
						on={{updateTable: updateTable}}
						totalPages={this.totalPages} 
						currentPage={this.currentPage}
					/>}
			</div>
		)
	}
}
</script>

<style module>
.table {
  border-collapse: collapse;
  margin: 8px;
}
.cellWrapper {
  display: flex;
  position: relative;
}
.cellInnerWrapper {
  width: 100%;
}
.tableHeaderCell {
  padding: 15px;
  border: 1px solid grey;
}
.filterCell {
  padding: 0 15px;
  border: 1px solid grey;
  height: 70px;
}
.tableCell {
  padding: 5px;
  border: 1px solid grey;
}
.filterInput {
  width: 100%;
}
</style>
