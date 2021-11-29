<script lang="jsx">

const SortingType = {
	ASC: 'ASC',
	DESC: 'DESC',
}

export default {
	props: {
		prop: {
			type: String,
		},
	},
	data() {
		return {
			type: SortingType.ASC,
		}
	},
	methods: {
		handleButtonClick() {
			this.type = this.type === SortingType.ASC 
				? SortingType.DESC 
				: SortingType.ASC;
		},
	},
	render(h, context) {
		const icon = this.type === SortingType.ASC ? '↑' : '↓';

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
