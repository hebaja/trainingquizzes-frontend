<template>
	<b-row class="mt-5">
		<b-col>
			<AppButton @appButtonClick="appRedirect">Click here to sign in</AppButton>
		</b-col>
	</b-row>
</template>

<script>

import AppButton from '../../components/buttons/AppButton.vue'

export default {
	name: "android-redirect",
	components: {AppButton},
	methods: {
		appRedirect() {
			window.location.href = "http://tq-androidapp-user.com?intent=signin"
		}
	}
}
</script>


<style>

</style>