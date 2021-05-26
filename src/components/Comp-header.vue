<template>
    <div class="header">
        <div class="btn-header">
            <button class="btn btn-warning" data-toggle="modal" data-target="#exampleModalCenter">Sign in</button>
        </div>
  </div>


  <div ref="register" class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongTitle">Register account</h5>
        <button type="button" class="btn btn-default" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <div class="col-md-12">
            <label for="username" class="form-label">User name</label>
            <input type="text" v-on:change="validateUserName(username)" class="form-control" id="username" v-model="username" required>
            <div class="invalid-feedback">
                {{messvalidusername}}
            </div>
            <div class="invalid-feedback">
                {{messvalidusernameExsit}}
            </div>
        </div>
        <div class="col-md-12">
            <label for="email" class="form-label">Email</label>
            <input type="text" v-on:change="validateEmail(email)" class="form-control" id="email" v-model="email" required>
            <div v-if="messvalidemail != ''" class="invalid-feedback">
                {{messvalidemail}}
            </div>
            <div v-if="messvalidemailExsit != ''" class="invalid-feedback">
                {{messvalidemailExsit}}
            </div>
        </div>
        <div class="col-md-12">
            <label for="pass" class="form-label">Password</label>
            <input type="password" class="form-control" id="pass" v-model="pass" required>
            <div v-if="messvalidpass != ''" class="invalid-feedback">
                {{messvalidpass}}
            </div>
        </div>
        <div class="col-md-12">
            <label for="repass" class="form-label">Re password</label>
            <input type="password" class="form-control" id="repass" v-model="repass" required>
            <div v-if="messvalidrepass != ''" class="invalid-feedback">
                {{messvalidrepass}}
            </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" v-on:click="register">Save changes</button>

      </div>
    </div>
  </div>
</div>
</template>
<script>


// import $ from 'jquery'
import axios from 'axios';

export default {
    data() {
        return {
            username: '',
            email: '',
            pass: '',
            repass: '',

            messvalidusername: '',
            messvalidusernameExsit: '',
            messvalidemail: '',
            messvalidemailExsit: '',
            messvalidpass: '',
            messvalidrepass: '',
            closemodal : true,
        }
    },
    watch: {
        email(){
            this.messvalidemail = '';
            if (this.email === '') {
                this.messvalidemail = 'Email can not empty';
            } else {
                this.messvalidemail = '';
                if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(this.email))
                {
                    this.messvalidemail = '';
                } else{
                    this.messvalidemail = 'Email invalid, pls change!';
                } 
            }
            
        },
        username() {
            this.messvalidusername = '';
            if (this.username === '') {
                this.messvalidusername = 'Username can not empty!';
            } else {
                this.messvalidusername = '';
            }
        },
        pass() {
            this.messvalidpass = '';
            if(this.pass === '') {
                this.messvalidpass = 'Password can not empty'
            }
        },
        repass() {
            this.messvalidrepass = ''
            if(this.pass != this.repass) {
                this.messvalidrepass = 'Re password not match'
            } else {
                this.messvalidrepass = ''
            }
        }
    },
    methods: {
        async register() {
            if (this.username === '') {
                this.messvalidusername = 'Username cant not empty!';
            }
            if (this.email === '') {
                this.messvalidemail = 'Email can not empty';
            }
            if(this.pass === '') {
                this.messvalidpass = 'Password can not empty'
            }
            if(this.pass === '') {
                this.messvalidrepass = 'Re password can not empty'
            }
            if (this.messvalidusername === '' && this.messvalidusernameExsit === '' && this.messvalidemail === '' && 
            this.messvalidemailExsit === '' && this.messvalidpass === '' && this.messvalidrepass === '') {
                const newUser = {
                    username : this.username,
                    email : this.email,
                    pass : this.pass,
                    repass : this.repass
                };
                const res = await axios.post('http://localhost:8080/pratice/user/register', newUser);
                this.closemodal = res.data.error;
                window.$('#exampleModalCenter').modal('hide');
                this.email = '';
                this.username = '';
                this.pass = '';
                this.repass = '';
            }
            
        },
        async validateUserName(username) {
            const res = await axios.get('http://localhost:8080/pratice/user/getbyusername/' + username);
            const validUserName = res.data.valid;
            if (!validUserName) {
                this.messvalidusernameExsit = 'Username existed, pls use another!';
            } else {
                this.messvalidusernameExsit = '';
            }
        },
        async validateEmail(email) {
            const res = await axios.get('http://localhost:8080/pratice/user/getbyemail/' + email);
            const validEmail = res.data.valid;
            if (!validEmail) {
                this.messvalidemailExsit = 'Email existed, pls use another!';
            } else {
                this.messvalidemailExsit = '';
            }
        }
       
    }
   
}
</script>

<style>
    .header {
        background-color: #fff;
        box-shadow: 0 2px 4px 0 rgb(0 0 0 / 10%); 
        margin-bottom: 15px;
    }

    .btn-header {
        display: flex;
        justify-content: flex-end;
        padding: 15px;
    }

    .input-group-text {
        width: 115px;
    }

    .invalid-feedback {
        display: block;
    }
</style>