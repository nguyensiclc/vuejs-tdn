<template>
    <div class="list-item-contaner">
        <div class="add-btn-block">
            <comp-btn functionBtn="add" v-on:addItem="addItem($event)" className="btn btn-primary" title="Add +" v-bind:typeObject="typeObj"/>
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
                        <comp-btn functionBtn="edit" className="btn btn-success" title="Edit" styleBtn="margin-right: 5px;" v-bind:itemEdit="item" v-on:editItem="editItem($event)"/>
                        <comp-btn functionBtn="delete" className="btn btn-danger" title="Delete" v-bind:itemDelete="item" v-on:deleteItem="deleteItem($event)"/>
                    </td>
                </tr>
            </tbody>
        </table>    
    </div>
</template>

<script>
import axios from 'axios';
import compBtn from './componentButton/CompButton.vue';
export default {
   name : 'list-item',
   data() {
       return {
           canDelete :''
       }
   },
    components: {
        'comp-btn' : compBtn
    },
    props: {
       list: Array,
       collumns : Array,
       typeObj: String
    },
    methods: {
       editItem(item) {
           this.$emit('choseEditItem', {'item' : item, 'typeObj' : this.typeObj});
       },
       deleteItem(item) {
           if ('employee' === this.typeObj) {
                var confim = confirm("Confim delete user: " + item.name);
                if(confim) {
                    axios.post('http://localhost:8080/pratice/employee/delete' , {
                        id : item.id
                    })
                    this.$emit('upldateList', this.typeObj);
                }
            } else {    
                 confim = confirm("Confim delete position: " + item.name);
                    if(confim) {
                        axios.post('http://localhost:8080/pratice/pos/delete' , {
                            id : item.id
                        }).then (
                            res => alert(res.data.mess)                        )
                        this.$emit('upldateList', this.typeObj);
                    }      
            }
           
       },   
       addItem(event) {
           this.$emit('addItem', event);
       },
       showTitle(item, column) {
           var key = column.key;
           var show = '';
           if ('positionId' === key) {
               fetch('http://localhost:3000/positions/' + item.id)
               .then(res => res.json())
               .then(data => {
                   show = data.position;
               })
           } else {
               if('married' === key) {
                   show = item[key] ? 'Yes' :  'No';
               } else {
                    show = item[key];
               }
           }
           
          return show;
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