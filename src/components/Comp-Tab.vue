<template>
    <div class="tab-container">
        <div class="block-tab">
            <h3>{{ title }}</h3>
        </div>
        <div class="tab-item">
            <slot></slot>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        title: String
    }
}
</script>
<style>
    .tab-container {
        background-color: #fff;
        box-shadow: 0 2px 4px 0 rgb(0 0 0 / 10%);
    }
    .block-tab {
        padding-top: 15px;
    }
</style>