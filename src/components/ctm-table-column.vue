<script>
export default {
  props: {
    prop: {
      type: String,
      required: true,
    },
		title: {
			type: String,
			default: () => '',
		},
		width: {
			type: String,
		},
		isFilter: {
			type: Boolean,
		}
  },
};
</script>
