<template>
    <div class="block-info container">
        <h3 style="padding-top:15px">Employee Infomation</h3>
        <form class="info-container row" v-on:submit.prevent="onSubmitEdit(employee)">
            <div class="form-group col-6">
                <label>Name</label>
                <input ref="name" type="text" v-bind:value="employee.name" class="form-control" placeholder="Enter name">
            </div>
            <div class="form-group col-md-6">
                <label>Address</label>
                <input ref="address" type="text" v-bind:value="employee.address" class="form-control" placeholder="Enter address">
            </div>
            <div class="form-group col-md-6">
                <label>Old</label>
                <input ref="old" type="text" v-bind:value="employee.old" class="form-control" placeholder="Enter old">
            </div>
            <div class="form-group col-md-6">
                <label for="inputState">Position</label>
                <select class="form-control">
                    <option
                        v-for="(item, index) in positions"
                        v-bind:key="index"
                        v-bind:value="item.id">
                        {{ item.position }}
                    </option>
                </select>
            </div>
            <div class="col-md-2 block-btn">
                <button type="submit" class="btn btn-primary" style="margin-right: 15px;">Submit</button>
                <button type="button" class="btn btn-secondary" v-on:click="cancelEditOrAdd()">Cancel</button>
            </div>
            
        </form>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            typeObject: 'employee',
            positions: [],
        }
    },
    created() {
        axios.get('http://localhost:3000/positions/')
          .then(res => this.positions = res.data);
    },
    updated() {
        
    },
    props: {
        employee:Object
    },
    methods: {
        onSubmitEdit(employee) { 
            employee.name = this.$refs.name.value;
            employee.address = this.$refs.address.value;
            employee.old = this.$refs.old.value;
            if(employee.id != null) {
                return axios.put('http://localhost:3000/employees/' + employee.id, employee).then(
                        this.$emit('edited', this.typeObject)
                )
            } else {
                axios.post('http://localhost:3000/employees/', employee).then(
                    this.$emit('addedItem', this.typeObject)
                );
                
               
                
            }
        },
        cancelEditOrAdd() {
            this.$emit('cancelUpdate', this.typeObject);
        }
        
    }
}
</script>
<style>
    .info-container {
        text-align: left;
    }
    .block-info {
        box-shadow: 0 2px 4px 0 rgb(0 0 0 / 10%);
        background-color: #fff;
        margin-top: 15px;
    }

    .block-btn {
        margin:15px 0px;
        display: flex;
    }
</style>