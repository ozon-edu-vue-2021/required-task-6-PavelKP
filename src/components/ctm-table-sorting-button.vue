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
		type: {
			type: String,
		},
	},
	methods: {
		handleButtonClick() {
			this.type = this.type === SortingType.ASC 
				? SortingType.DESC 
				: SortingType.ASC;

			this.$emit('change-sorting', {
				[this.prop]: this.type, 
			});
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
