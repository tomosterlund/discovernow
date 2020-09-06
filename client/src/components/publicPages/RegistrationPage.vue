<template>
  <div class="registration-page__container">
      <app-header />
      <div class="form-container">
        <h1 class="registration-form__header">Register now</h1>
        <div class="input-container">
            <label class="input-label" for="name">Name</label>
            <input @input="$v.newUser.name.$touch()" v-model.trim="newUser.name" type="text" :class="{ errorUX: $v.newUser.name.$error }" class="form-control" placeholder="Enter your name">
        </div>
        <p class="error-box" v-if="$v.newUser.name.$error">Name field has to contain at least 3 characters</p>
        <div class="input-container">
            <label class="input-label" for="email">E-mail</label>
            <input @input="$v.newUser.email.$touch()" v-model.trim="newUser.email" type="email" :class="{ errorUX: $v.newUser.email.$error }" class="form-control" placeholder="Enter your e-mail address">
        </div>
        <div class="input-container">
            <label class="input-label" for="password">Password</label>
            <input @blur="$v.newUser.password.$touch()" v-model.trim="newUser.password" type="password" :class="{ errorUX: $v.newUser.password.$error }" class="form-control" placeholder="Choose a password">
        </div>
        <p class="error-box" v-if="$v.newUser.password.$error">Password has to contain at least 6 characters</p>
        <div class="input-container">
            <label class="input-label" for="pwconfirm">Confirm password</label>
            <input @input="$v.newUser.pwconfirm.$touch()" v-model.trim="newUser.pwconfirm" type="password" :class="{ errorUX: $v.newUser.pwconfirm.$error }" class="form-control" placeholder="Confirm your password">
        </div>
        <div class="input-container">
            <label class="input-label" for="email">Picture</label>
            <input @change="selectFile" class="form-control-file" ref="file" type="file" name="image" placeholder="Enter your e-mail address">
        </div>
        <div class="button-container">
            <button @click="postNewUser" :disabled="$v.$invalid" class="registration-button">Register</button>
        </div>
      </div>
  </div>
</template>

<script>
import axios from 'axios'
import appHeader from './../mainComponents/Header'
import { required, minLength, maxLength, email, sameAs } from 'vuelidate/lib/validators'

export default {
    data() {
        return {
            newUser: {
                name: '',
                email: '',
                password: '',
                pwconfirm: '',
                rdmString: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
            },
            selectedFile: '',
            serverUrl: 'api/base/registration',
        }
    },
    methods: {
        selectFile(event) {
            this.selectedFile = event.target.files[0];
            console.log(this.selectedFile.name);
        },
        postNewUser() {
            if (this.newUser.password === this.newUser.pwconfirm) {
                const fd = new FormData();
                const userData = JSON.stringify(this.newUser);
                console.log(userData);
                fd.append('image', this.selectedFile);
                fd.append('user', userData);
                axios.post(this.serverUrl, fd)
                    .then(response => {
                        if (response.data.success === false) {
                            this.newUser.name = '';
                            this.newUser.email = '';
                            this.newUser.password = '';
                            return this.newUser.pwconfirm = '';
                        }
                        return this.$router.push({path: '/login'});
                        })
                    .catch(err => console.log(err));
            } else {
                alert('Passwords need to match');
            }
        }
    },
    components: {
        appHeader
    },
    validations: {
        newUser: {
            name: {
                required,
                minLength: minLength(3),
                maxLength: maxLength(100)
            },
            email: {
                required,
                email,
                maxLength: maxLength(50)
            },
            password: {
                required,
                minLength: minLength(6),

            },
            pwconfirm: {
                sameAs: sameAs('password')
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    $darkGreen: #264653;
    $green: #2a9d8f;
    $yellow: #e9c46a;
    $orange: #f4a261;
    $darkOrange: #e76f51;

    .registration-page__container {
        width: 100%;
        height: auto;
        min-height: 95vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        .registration-form__header {
            font-size: 22px;
        }
        .form-container {
            width: 400px;
            padding: 10px;
            display: flex;
            flex-direction: column;
            align-items: center;
            background-color: white;
            border-radius: 10px;
            .input-container {
                margin-top: 10px;
                display: flex;
                flex-direction: column;
                align-items: center;
                .input-label {
                    font-size: 18px;
                    margin-bottom: 3px;
                }
                .form-control {
                    width: 300px;
                    padding: 0.7rem;
                    border-radius: 20px;
                    border: 1px solid black;
                    &:focus {
                        border: 1px solid $orange;
                        outline: none;
                        box-shadow: 0px 1px 3px 0px $darkOrange;
                    }
                }
                .file-input {
                    padding: 0.5rem;
                }
            }
            .button-container {
                display: flex;
                justify-content: center;
                margin-top: 20px;
            }
            .registration-button {
                padding: 0.5rem;
                font-weight: 600;
                font-size: 16px;
                background-color: $darkOrange;
                color: white;
                border: 1px solid $darkOrange;
                outline: none;
                cursor: pointer;
                border-radius: 3px;
                &:hover {
                    animation: buttonHover;
                    animation-iteration-count: 1;
                    animation-duration: 0.3s;
                    animation-fill-mode: forwards;
                }
            }
        }
    }
    @keyframes buttonHover {
        0% {
            color: white;
            background-color: $darkOrange;
        }
        100% {
            color: $darkOrange;
            background-color: white;
            transform: scale(1.04);
        }
    }

    // VUELIDATE CLASSES
    .errorUX {
        background-color: rgb(241, 197, 201);
    }

    .error-box {
        background-color: rgb(241, 197, 201);
        margin-top: 10px;
        padding: 0.5rem;
        border-radius: 3px;
    }
</style>