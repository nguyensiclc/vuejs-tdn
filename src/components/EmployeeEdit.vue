<template>
    <div class="block-info container">
        <h3 style="padding-top:15px">Employee Infomation</h3>
        <form class="info-container row" v-on:submit.prevent="onSubmitEdit()">
            <comp-input colClass="col-6" className="form-control" typeInput="text" label="Name" placeholder="Enter name" 
                v-bind:value="employee.name" @inputed="inputedName($event)" type="input"/>
            <comp-input colClass="col-6" className="form-control" typeInput="text" label="Address" placeholder="Enter address" 
                v-bind:value="employee.address" @inputed="inputedAddress($event)" type="input"/>
            <comp-input colClass="col-6" className="form-control" typeInput="text" label="Old" placeholder="Enter old" 
                v-bind:value="employee.old" @inputed="inputedOld($event)" type="input"/>
            <div class="form-group col-md-6">
                <label for="inputState">Year Exp {{year}}</label>
                <select class="form-control" v-model="year">
                    <option :selected="year == item.year"
                        v-for="(item, index) in years"
                        v-bind:key="index"
                        v-bind:value="item.year">
                        {{ item.year }}
                    </option>
                </select>
            </div>
            <div class="form-group col-md-6">
                <label for="inputState">Position {{employee.posId}}</label>
                <select class="form-control" v-model="positionId">
                    <option
                        v-for="(item, index) in positions"
                        v-bind:key="index"
                        v-bind:value="item.id"
                        :selected="item.id == 1">    
                        {{ item.name}}
                    </option>
                </select>
            </div>
            <comp-checkbox colClass="col-2" v-bind:value="married" @picked="pickedMarrie($event)"
                styleBlock=" display: flex; flex-direction: column;" 
                className="form-check-input" typeInput="checkbox" label="Married"
                type="input"/>
            <comp-radio colClass="col-2" styleBlock="flex-direction: column; display: flex;" :list="nationals" v-bind:value="national"   @picked="pickedNational($event)"/>
            <div class="col-md-2 block-btn">
                <button type="submit" class="btn btn-primary" style="margin-right: 15px;">Submit</button>
                <button type="button" class="btn btn-secondary" v-on:click="cancelEditOrAdd()">Cancel</button>
            </div>
            
        </form>
    </div>
</template>

<script>
import axios from 'axios';
import compInput from './componentInput/Comp-Input.vue';
import compChekbox from './componentInput/Comp-checkbox.vue';
import compRadio from './componentInput/Comp-radio.vue';

export default {
    props: {
        employee:Object
    },
    data() {
        return {
            typeObject: 'employee',
            positions: [],
            empName : this.employee.name,
            empAddress: this.employee.address,
            empOld : this.employee.old,
            years: [{year:0},{year:1}, {year: 2}, {year: 3}, {year: 4}, {year: 5}],
            year : this.employee.year,
            married : this.employee.married,
            nationals: [{value: 'Viet Nam', key: 'vn'}, {value: 'Foregin', key: 'fn'}],
            national: 'vn',
            positionId : this.employee.posId
        }
    },
    components: {
        'comp-input' : compInput,
        'comp-checkbox' : compChekbox,
        'comp-radio' : compRadio
        
    },
    created() {
        axios.get('http://localhost:8080/pratice/pos/getAll')
          .then(res => this.positions = res.data);
    },
    watch: {
        employee: function(newEmp) { 
            this.year = newEmp.year;
            this.married = newEmp.married;
            this.national = newEmp.national;
            this.positionId = newEmp.posId;
        }
    }
    ,
    methods: {
        inputedName(event) {
            this.empName = event;
        },
        inputedAddress(event) {
            this.empAddress = event;
        },
        inputedOld(event) {
            this.empOld = event;
        },
        pickedMarrie(event) {
            this.married = event;
        },
        pickedNational(event) {
            this.national = event;
        },
        onSubmitEdit() { 
            if(this.employee.id != null) {
                console.log(this.year)
                return axios.post('http://localhost:8080/pratice/employee/update', {
                    id: this.employee.id,
                    name: this.empName,
                    address: this.empAddress,
                    old: this.empOld,
                    year: this.year,
                    married: this.married,
                    national: this.national,
                    posId : this.positionId
                }).then(
                        this.$emit('edited', this.typeObject)
                )
            } else {
                axios.post('http://localhost:8080/pratice/employee/add', {
                    name: this.empName,
                    address: this.empAddress,
                    old: this.empOld,
                    year: this.year,
                    married: this.married,
                    national: this.national
                }).then(
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