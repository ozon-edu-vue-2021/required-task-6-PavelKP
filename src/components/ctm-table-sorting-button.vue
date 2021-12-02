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
		activeSorting: {
			type: Object,
		}
	},
	methods: {
		handleButtonClick() {
			const [sortingProp, sortingType] = this.activeSorting;
			let newActiveSorting = SortingType.ASC;

			if (sortingProp === this.prop) {
				newActiveSorting = this.activeSorting[1] === SortingType.ASC 
					? SortingType.DESC 
					: SortingType.ASC;
			}

			this.$emit('changeSorting', {
				type: 'SORTING',
				payload: {
					[this.prop]: newActiveSorting,
				}
			});
		},
	},
	render(h, context) {
		let icon = '↓';
		let isActive = false;

		const [sortingProp, sortingType] = this.activeSorting;
		if (sortingProp === this.prop) {
			icon = sortingType === SortingType.DESC ? '↓' : '↑';
			isActive = true;
		}

		this.$listeners

		return (
			<div class={this.$style?.sortingWrapper}>
				<button onClick={this.handleButtonClick} class={isActive && this.$style.activeSorting}>
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
.activeSorting {
	border: 2px solid grey;
}
</style>
