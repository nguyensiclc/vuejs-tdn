<template>
    <div class="block-info container" v-if="position !== null">
        <h3 style="padding-top:15px">Position Infomation</h3>
        <form class="info-container row" v-on:submit.prevent="onSubmitEdit(position)">
            <div class="form-group col-6">
                <label>Name</label>
                <input ref="position" type="text" v-bind:value="position.position" class="form-control" placeholder="Enter name">
            </div>
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

export default {
    data() {
        return {
            typeObject: 'position'
        }
    },
    props: {
        position:Object
    },
    methods: {
        onSubmitEdit(position) { 
            position.position = this.$refs.position.value;
            if(position.id != null) {
                return axios.put('http://localhost:3000/positions/' + position.id, position).then(
                    this.$emit('edited', this.typeObject)
                )
            } else {
                axios.post('http://localhost:3000/positions/', position).then (
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