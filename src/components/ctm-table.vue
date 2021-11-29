<script lang="jsx">
export default {
  props: {
		rows: {
			type: Array,
			default: () => [],
		},
  },
	data() {
		return {
			filteredRows: [],
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
			const headerData = columnOptions.map((option) => {
				const renderedTitle = option.scopedSlots.title ? option.scopedSlots.title() : option.title

				const tableCellStyle = {
					style: {
						width: option.width && `${option.width}px`,
					}
				}

				return (
					<th key={option.prop} class={this.$style?.filterCell} {...tableCellStyle}>
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
								(
								<div class={this.$style?.sortingWrapper}>
									<button>></button>
								</div>
							)}
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
			return this.filteredRows.map((row, index) => {
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
		changeFilter(evt, prop) {
			const len = this.filteredRows.length;

			const filtered = this.rows.filter((row) => {
				const field = row[prop].toLowerCase().trim();
				const value = evt.target.value.toLowerCase().trim();

				return field.includes(value);
			})

			this.filteredRows = filtered;
		}
	},
	created() {
		this.filteredRows = this.rows.slice();
	},
	render(h) {
		const columnOptions = this.getColumnOptions();
		const tableHeader = this.renderHeader(h, columnOptions);
		const tableRows = this.renderRows(h, columnOptions);

		return (
			<table class={this.$style?.table}>
				<thead>
					{tableHeader}
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
.filterCellText {
  margin-bottom: 10px;
}
.tableCell {
  padding: 5px;
  border: 1px solid grey;
}
.filterInput {
  width: 100%;
}
.sortingWrapper {
	display: flex;
  margin-top: auto;
}
</style>
