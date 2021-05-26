<template>
     <tr>
        <th scope="row">{{ index + 1 }}</th>
        <td v-for="childItem in collumns"
            v-bind:key="childItem.key">
            {{showTitle(item, childItem)}}
        </td>
        <td>
            <comp-btn functionBtn="edit" className="btn btn-success" title="Edit" styleBtn="margin-right: 5px;" v-bind:itemEdit="item" v-on:editItem="editItem($event)"/>
            <comp-btn functionBtn="delete" className="btn btn-danger" title="Delete" v-bind:itemDelete="item" v-on:deleteItem="deleteItem($event)"/>
        </td>
    </tr>
</template>
<script>
export default {
    props: {
        item: Object,
        index: Number,
        collumns: Array,
    }
}
</script>