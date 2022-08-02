<template>
    <b-button-group class="shadow">
		<b-button 
			@click="$emit('returnToList')"
			variant="warning">
			<span>
				<font-awesome-icon 
					class="me-1"
					icon="fa-solid fa-arrow-left">
				</font-awesome-icon>
				{{ returnButtonLabel }}
			</span>
		</b-button>
		<b-button 
			type="submit"
			variant="success"
			:disabled="saveButtonDisabled">
			<span>
				{{ saveButtonLabel }}
				<font-awesome-icon
					class="ms-1"
					icon="fa-solid fa-save">
				</font-awesome-icon>
			</span>
		</b-button>
	</b-button-group>
</template>

<script>
export default {
	name: 'formControlButtons',
	props: {
		returnButtonLabel: String,
		saveButtonLabel: String,
		saveButtonDisabled: {
			type: Boolean,
			default: false
		}
	}
}
</script>

<style>

</style>