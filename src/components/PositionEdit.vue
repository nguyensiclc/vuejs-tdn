<template>
    <div class="block-info container" v-if="position !== null">
        <h3 style="padding-top:15px">Position Infomation</h3>
        <form class="info-container row" v-on:submit.prevent="onSubmitEdit(position)">
            <comp-input colClass="col-6" className="form-control" typeInput="text" label="Name position" placeholder="Enter name position" 
                v-bind:value="position.name" @inputed="inputedName($event)" type="input"/>
            <div class="form-group col-md-6">
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
import compInput from './componentInput/Comp-Input.vue';

export default {
    data() {
        return {
            typeObject: 'position',
            posName : ''
        }
    },
    components: {
        'comp-input' : compInput
    },
    props: {
        position:Object
    },
    methods: {
        inputedName(event) {
            console.log(event);
            this.posName = event;
        },
        onSubmitEdit(position) { 
            if(position.id != null) {
                return axios.post('http://localhost:8080/pratice/pos/update', {
                    id : this.position.id,
                    name : this.posName
                }).then(
                    this.$emit('edited', this.typeObject)
                )
            } else {
                return axios.post('http://localhost:8080/pratice/pos/add', {
                    name : this.posName
                }).then(
                    this.$emit('addedItem', this.typeObject)
                )
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