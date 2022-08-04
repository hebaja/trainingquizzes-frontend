<template>
	<b-button 
		:type="buttonType"
		:disabled="buttonDisabled"
		:style="buttonColor"		
		id="app-button"
		:class="buttonConfig"
		@click="$emit('appButtonClick')">
		<slot></slot>
	</b-button>
</template>

<script>
export default {
	name: 'appButton',
	data() {
		return {
			shadow: this.smallShadow
		}
	},
	props: {
		label: String,
		buttonStyle: String,
		smallShadow: Boolean,
		buttonType: {
			type: String,
			default: 'button'
		},
		buttonDisabled: {
			type: Boolean,
			default: false
		},
	},
	computed: {
		buttonConfig() {
			if(this.buttonStyle == 'large') return 'btn btn-lg w-100 ' + this.isSmallShadow
			return 'btn w-100 ' + this.isSmallShadow
		},
		buttonColor() {
			if(this.buttonStyle == 'delete') return 'background-color: #dc3545!important; color: white!important;'
			return 'background-color: #ffa726!important;'
		},
		isSmallShadow() {
			if(this.shadow) return 'shadow-sm'
			return 'shadow'
		}
	}
}
</script>

<style>
#app-button {
	transition:0.5s;
	color:  #333333;
	border: none;
}

#app-button:hover {
  filter: brightness(92%);
}

#app-button:active {
	transform: scale(0.98);
}

</style>