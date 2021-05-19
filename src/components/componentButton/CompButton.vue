<template>
    <button v-bind:type="typeBtn" v-vind:class="className" v-bind:style="styleBtn">{{title}}</button>
</template>

<script>
export default {
    props: {
        className: String,
        typeBtn: String,
        styleBtn: String,
        title: String
    }
}
</script>