<template>
    <div class="form-group" :style="styleBlock" v-bind:class="colClass">
        <label>{{label}}</label>
        <input ref="data" :type="typeInput" :value="value" v-bind:class="className" v-bind:placeholder="placeholder" 
            @input="inputed()" v-if="'input' === type">
        
        
    </div>
</template>
<script>
export default {
    props: {
        type: String,
        typeInput: String,
        label: String,
        className: String,
        colClass: String,
        placeholder: String,
        value: String,
        refName: String,
        listItem: Array,
        styleBlock: String
    },
    methods: {
        inputed() {
            this.$emit('inputed', this.$refs.data.value);
        }
    }
}
</script>