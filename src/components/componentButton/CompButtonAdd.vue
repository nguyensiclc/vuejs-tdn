<template>
    <button class="btn btn-primary" v-on:click="addItem">{{titleBtn}}</button>
</template>
<script>
export default {
    props: {
        className: String,
        titleBtn : String,
        typeObject: String
    },
    methods: {
        addItem() {
            this.$emit('addItem', this.typeObject);
        }
    }
}
</script>