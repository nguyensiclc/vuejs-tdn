<template>
    <div class="form-group col-md-6">
        <label for="inputState">{{title}}</label>
        <select class="form-control">
            <option :selected="idSelected == item.id"
                v-for="(item, index) in list"
                v-bind:key="index"
                v-bind:value="item.year">
                {{ item.year }}
            </option>
        </select>
    </div>
</template>
<script>
export default {
    props: {
        title: String,
        list: Array,
        keyShow: String,
        idSelected: Number
    }
}
</script>