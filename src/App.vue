<template>
  <comp-tab v-bind:title="title">
     <ul class="list-tab">
          <li v-for="(tab, index) in tabs"
              v-bind:key="tab.id"
              v-on:click="clickTab(index)"
              v-bind:class="{active : this.tabActive == index}">
              {{tab.text}}
          </li>
     </ul>
     <div class="tab-content" v-if="tabActive === 0">
        <list-item v-bind:list="employees" v-bind:collumns="employeeColumn" typeObj="employee"
          @choseEditItem="setEditItem($event, typeObj)" 
          @addItem="addNewItem($event)"
          @upldateList="updateList($event)"
        />
     </div>
     <div class="tab-content" v-else-if="tabActive === 1">
        <list-item v-bind:list="positions" v-bind:collumns="positionCollum" typeObj="position"
          @choseEditItem="setEditItem($event, typeObj)"
          @addItem="addNewItem($event)"
          @upldateList="updateList($event)"
        />
     </div>
  </comp-tab>
  <employee-edit v-if="employeeEdit != null" :employee="employeeEdit" @edited="editedOrCancel($event)" @addedItem="added($event)" @cancelUpdate="editedOrCancel($event)"/>
  <position-edit :position="positionEdit" @edited="editedOrCancel($event)" @addedItem="added($event)" @cancelUpdate="editedOrCancel($event)"/>

</template>

<script>

import CompTab from './components/Comp-Tab'
import ListItem from './components/ListItem'
import EmployeeEdit from './components/EmployeeEdit'
import PositionEdit from './components/PositionEdit'
import axios from 'axios';


export default {
  name: 'App',
  data() {
    return {
      tabs: [
        {id: 1,text: 'Employee'},
        {id: 2,text: 'Position'}
      ],
      tabActive: 0,
      title: 'Employee Management',
      employeeEdit : null,
      employees: [],
      employeeColumn: [
        {key: 'name', value: 'Name'},
        {key: 'address', value: 'Address'},
        {key: 'old', value: 'Old'},
        {key: 'positionId', value: 'Position'}
      ],
      positions:[],
      positionCollum: [
        {key: 'position', value: 'Position'}
      ],
      positionEdit: null
    }
  },
  mounted () {
      axios.get('http://localhost:3000/employees/')
          .then(res => this.employees = res.data)
  },
  components: {
    'comp-tab' : CompTab,
    'list-item' : ListItem,
    'employee-edit' : EmployeeEdit,
    'position-edit' : PositionEdit
  },
  methods: {
    clickTab(index) {
      this.tabActive = index;
      if(index === 0) {
        this.title = 'Employee Management';
      } else {
        this.title = 'Position Management';
        axios.get('http://localhost:3000/positions/')
          .then(res => this.positions = res.data)
      }
    },
    setEditItem(event) {
      var typeObj = event.typeObj;
      if(typeObj === 'employee') {
        console.log(event.item);
        this.employeeEdit = event.item;
      } else {       
        this.positionEdit = event.item;      }
    },
    editedOrCancel(event) {
      if ('employee' === event) {
        this.employeeEdit = null;
      } else {
        this.positionEdit = null;
      }
      
    },
    addNewItem(event) {
      if ('employee' === event) {
        var employNew = {name: '', address: '', old: 0};
        this.employeeEdit = employNew;
      } else {
        var postionNew = {'position' : ''};
        this.positionEdit = postionNew;
      }
      
    },
    added(event) {
      if ('employee' === event) {
        this.employeeEdit = null;
        axios.get('http://localhost:3000/employees/'),
        axios.get('http://localhost:3000/employees/')
        .then(res => this.employees = res.data)
      } else {
        this.positionEdit = null;
        axios.get('http://localhost:3000/positions/'),
        axios.get('http://localhost:3000/positions/')
        .then(res => this.positions = res.data)
      }
      
        
    },
    updateList(event) {
      if ('employee' === event) {
        axios.get('http://localhost:3000/employees/'),
        axios.get('http://localhost:3000/employees/')
        .then(res => this.employees = res.data)
      } else {
        axios.get('http://localhost:3000/positions/'),
        axios.get('http://localhost:3000/positions/')
        .then(res => this.positions = res.data)
      }
      
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.list-tab {
  list-style-type: none;
  display: flex;
  background-color: #eff5f5;
}

.list-tab a {
  color: #000;
  text-decoration-line: none;
}

.list-tab li {
  padding: 10px 5px;
}

.list-tab li:hover {
  cursor: pointer;
}

.list-tab li:last-child {
  border-left: none;
}

.active {
  background-color: #73a5a5;
  color: #fff !important;
  font-weight: bold;
}
</style>
