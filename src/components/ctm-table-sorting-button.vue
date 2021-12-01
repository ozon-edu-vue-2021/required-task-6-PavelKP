<script lang="jsx">

const SortingType = {
	ASC: 'asc',
	DESC: 'desc',
}

export default {
	props: {
		prop: {
			type: String,
		},
	},
	data() {
		return {
			activeSorting: SortingType.DESC,
		}
	},
	methods: {
		handleButtonClick() {
			this.activeSorting = this.activeSorting === SortingType.ASC 
				? SortingType.DESC 
				: SortingType.ASC;

			this.$emit('changeSorting', {
				type: 'SORTING',
				payload: {
					[this.prop]: this.activeSorting, 
				}
			});
		},
	},
	render(h, context) {
		const icon = this.activeSorting === SortingType.DESC ? '↓' : '↑';

		return (
			<div class={this.$style?.sortingWrapper}>
				<button onClick={this.handleButtonClick}>
					{icon}
				</button>
			</div>
		)
	},
}
</script>

<style module>
.sortingWrapper {
  display: flex;
  margin-top: auto;
}
</style>
