<template>
    <div class="list-item-contaner">
        <div class="add-btn-block">
            <button class="btn btn-primary" v-on:click="addItem(typeObj)">Add +</button>
        </div>
        <table class="table">
            <thead class="thead-dark">
                <tr>
                    <th>STT</th>
                    <th v-for="collum in collumns"
                        v-bind:key="collum.key">
                        {{ collum.value }}
                    </th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in list"
                    v-bind:key="index">
                    <th scope="row">{{ index + 1 }}</th>
                    <td v-for="childItem in collumns"
                        v-bind:key="childItem.key">
                        {{showTitle(item, childItem)}}
                    </td>
                    <td>
                        <button class="btn btn-success" style="margin-right: 5px;" v-on:click="editItem(item, typeObj)">Edit</button>
                        <button class="btn btn-danger" v-on:click="removeItem(item, typeObj)">Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>    
    </div>
</template>

<script>
import axios from 'axios';
export default {
   name : 'list-item',
   data() {
       return {
           
       }
   },

   props: {
       list: Array,
       collumns : Array,
       typeObj: String
   },
   methods: {
       editItem(item, typeObj) {
           this.$emit('choseEditItem', {'item' : item, 'typeObj' : typeObj});
       },
       removeItem(item, typeObj) {
           if ('employee' === typeObj) {
                var confim = confirm("Confim delete user: " + item.name);
                if(confim) {
                    axios.delete('http://localhost:3000/employees/' + item.id, item)
                    this.$emit('upldateList', typeObj);
                }
            } else {
                confim = confirm("Confim delete position: " + item.position);
                if(confim) {
                    axios.delete('http://localhost:3000/positions/' + item.id, item)
                    this.$emit('upldateList', typeObj);
                }
            }
           
       },   
       addItem(typeObject) {
           this.$emit('addItem', typeObject);
       },
       showTitle(item, column) {
           var key = column.key;
           var show = '';
           if ('positionId' === key) {
               fetch('http://localhost:3000/positions/' + item.id)
               .then(res => res.json())
               .then(this.show = data.position)
           } else {
                show = item[key];
           }
           
           return show
       }
   }
}
</script>

<style>
    .add-btn-block {
        text-align:right;
        padding: 0 15px;
    }
</style>