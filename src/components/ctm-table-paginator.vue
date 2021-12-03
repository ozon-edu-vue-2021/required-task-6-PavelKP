<script lang="jsx">

export default {
	props: {
		totalPages: {
			type: Number,
			default: 0
		},
		currentPage: {
			type: Number,
			default: 0
		},
	},
	computed: {
		pagesNumbers() {
			const { currentPage, totalPages } = this;

			if (currentPage <= 3) {
				if (totalPages < 5) {
					return new Array(totalPages).fill(null).map((val, i) => i + 1);
				}
				return [1, 2, 3, 4, 5];
			}

			if (currentPage >= totalPages - 2) {
				return [
					totalPages - 4,
					totalPages - 3,
					totalPages - 2,
					totalPages - 1,
					totalPages,
				];
			}

			return [
				currentPage - 2,
				currentPage - 1,
				currentPage,
				currentPage + 1,
				currentPage + 2,
			];
		},
	},
	render(h) {
		const { updateTable }= this.$listeners;

		return (
			<div>
				<span
					class={this.$style.control}
					on={{click: () => updateTable({type: 'PAGING', payload: 1})}}>
					{'<<'}
				</span>
				<span
					class={this.$style.control}
					on={{click: () => updateTable({type: 'PAGING', payload: this.currentPage - 1})}}>
					{'<'}
				</span>
				{this.pagesNumbers.map((page) => (
					<span 
						class={[
							this.$style.control,
							{[this.$style.active]: page === this.currentPage},
						]}
						on={{ click: () => updateTable({type: 'PAGING', payload: page}) }}
					>
						{page}
					</span>
				))}
				<span
					class={this.$style.control}
					on={{click: () => updateTable({type: 'PAGING', payload: this.currentPage + 1})}}>
					{'>'}
				</span>
				<span
					class={this.$style.control}
					on={{click: () => updateTable({type: 'PAGING', payload: this.totalPages})}}>
					{'>>'}
				</span>
			</div>
		)
	}
}
</script>

<style module>
.control {
  width: 24px;
  height: 24px;
  margin-right: 8px;
}
.control:last-of-type {
	margin-right: 0;
}
.control:hover {
	cursor: pointer;
}
.control.active {
	color: cornflowerblue;
	background: ivory;
	border: 1px solid #c8cacc;
	border-radius: 6px;
}
</style>
