<template>
    <button v-if="'def' === functionBtn" v-bind:type="typeBtn" v-vind:class="className" v-bind:style="styleBtn">{{title}}</button>
    <button v-if="'add' === functionBtn" :class="className" v-on:click="addItem">{{title}}</button>
    <button v-if="'edit' === functionBtn" v-bind:class="className" v-bind:style="styleBtn" v-on:click="editItem">
        {{title}}
    </button>
    <button v-if="'delete' === functionBtn" v-bind:class="className" v-bind:style="styleBtn" v-on:click="deleteItem">
        {{title}}
    </button>
</template>

<script>
export default {
    props: {
        className: String,
        typeBtn: String,
        styleBtn: String,
        title: String,
        functionBtn: String,

        itemEdit: Object,

        typeObject: String,

        itemDelete: Object
    },
    methods: {
        editItem() {
            this.$emit('editItem', this.itemEdit)
        },
        addItem() {
            this.$emit('addItem', this.typeObject);
        },
        deleteItem() {
            this.$emit('deleteItem', this.itemDelete)
        }
    },
    
}
</script>