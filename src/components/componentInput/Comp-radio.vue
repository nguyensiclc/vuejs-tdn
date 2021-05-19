<template>
    <div class="form-group" :style="styleBlock" v-bind:class="colClass"  
            v-for="(item, index) in list"
            :key="index">
        <label>{{item.value}}</label>
        <input ref="data" type="radio" name="group" :value="item.key" v-bind:class="className"  
            @change="picked()" v-model="checked">
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
        list: Array
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