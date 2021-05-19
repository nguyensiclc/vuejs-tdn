<template>
    <button v-bind:class="className" v-bind:style="styleBtn" v-on:click="deleteItem">
        {{title}}
    </button>
</template>
<script>

export default {
    props: {
        title: String,
        className: String,
        styleBtn: String,
        itemDelete: Object
    },
    methods: {
        deleteItem() {
            this.$emit('deleteItem', this.itemDelete)
        }
    }
}
</script>
