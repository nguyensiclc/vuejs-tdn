<template>
    <div class="form-group" :style="styleBlock" v-bind:class="colClass">
        <label>{{label}}</label>
        <input ref="data" type="checkbox" :value="value" v-bind:class="className" v-model="checked"
            @change="picked()" v-if="'input' === type">
    </div>
</template>
<script>
export default {
    data() {
        return  {
            checked : this.value
        }
    },
    props: {
        type: String,
        typeInput: String,
        label: String,
        className: String,
        colClass: String,
        value: String,
        refName: String,
        listItem: Array,
        styleBlock: String,
        isChecked: Boolean
    },
    methods: {
        picked() {
            this.$emit('picked', this.checked);
        }
    },
    watch: {
        immediate: true, 
        value : function(newValue) {
            this.checked = newValue;
        }
    }
}
</script>