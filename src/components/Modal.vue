<template>
  <b-modal :id="modalId" hide-header>
        <div class="d-block text-center">
            <h3>{{ message }}</h3>
        </div>
        <template #modal-footer>
            <b-button
                variant="success"
                size="md"
                class="float-right"
                @click="$bvModal.hide(modalId)">
                    Cancel
            </b-button>
            <b-button
                variant="danger"
                size="md"
                class="float-right"
                @click="$emit('componentFunction')">
                    {{ confirmButtonLabel }}
            </b-button>
        </template>
    </b-modal>
</template>

<script>
export default {
    name: "app_modal",
    props: [
        'modalId',
        'message',
        'confirmButtonLabel',
    ]

}
</script>

<style>

</style>