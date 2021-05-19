<template>
    <button v-bind:class="className" v-bind:style="styleBtn" v-on:click="editItem">
        {{title}}
    </button>
</template>
<script>

export default {
    props: {
        title: String,
        className: String,
        styleBtn: String,
        itemEdit: Object
    },
    methods: {
        editItem() {
            this.$emit('editItem', this.itemEdit)
        }
    }
}
</script>
