<script lang="jsx">
export default {
  props: {
		rows: {
			type: Array,
			default: () => [],
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
			return columnOptions.map((option) => {
				const renderedTitle = option.scopedSlots.title ? option.scopedSlots.title() : option.title

				return (
					<th key={option.prop} class={this.$style?.tableHeaderCell}>
						{renderedTitle}
					</th>
				);
			});
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
	},
	render(h) {
		const columnOptions = this.getColumnOptions();
		const tableHeader = this.renderHeader(h, columnOptions);
		const tableRows = this.renderRows(h, columnOptions);

		return (
			<table class={this.$style?.table}>
				<thead>
					{...tableHeader}
				</thead>
				<tbody>
					{...tableRows}
				</tbody>
			</table>
		)
	}
}
</script>

<style module>
.table {
  border-collapse: collapse;
  margin: 8px;
  width: 100%;
}
.tableHeaderCell {
  padding: 15px;
  border: 1px solid grey;
}
.tableCell {
  padding: 5px;
  border: 1px solid grey;
}
</style>
