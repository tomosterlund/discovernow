<template>
  <div class="registration-page__container">
      <app-header />
      <div class="form-container">
        <h1 class="registration-form__header">Register now</h1>
        <div class="input-container">
            <v-text-field @input="$v.newUser.name.$touch()" v-model.trim="newUser.name" class="vuetify-input" label="Name" outlined></v-text-field>
            <p class="error-box" v-if="$v.newUser.name.$error">Name field has to contain at least 3 characters</p>
        </div>
        <div class="input-container">
            <v-text-field @input="$v.newUser.email.$touch()" v-model.trim="newUser.email" class="vuetify-input" label="E-mail" outlined></v-text-field>
        </div>
        <div class="input-container">
            <v-text-field @blur="$v.newUser.password.$touch()" v-model.trim="newUser.password" class="vuetify-input" type="password" label="Password" outlined></v-text-field>
        </div>
        <p class="error-box" v-if="$v.newUser.password.$error">Password has to contain at least 6 characters</p>
        <div class="input-container">
            <v-text-field @input="$v.newUser.pwconfirm.$touch()" @keyup.enter="postNewUser" v-model.trim="newUser.pwconfirm" class="vuetify-input" label="Confirm password" type="password" outlined></v-text-field>
        </div>
        <p class="error-box" v-if="$v.newUser.pwconfirm.$error">Passwords need to match</p>
        <div class="input-container" style="margin-top: -20px; display: none">
            <label class="input-label" for="email">Picture</label>
            <input @change="selectFile" class="form-control-file" ref="file" type="file" name="image">
        </div>
        
        <v-text-field
            style="width: 300px;"
            label="Picture"
            outlined
            prepend-icon="mdi-camera"
            @click="pickFile"
            v-model="selectedFileName"
            readonly="readonly"
        >
        </v-text-field>
        <div class="button-container" style="margin-top: -10px">
            <button v-if="!$v.$invalid" @click="postNewUser" :disabled="$v.$invalid" class="registration-button">Register</button>
            <button v-if="$v.$invalid" @click.stop="dialog = true" class="registration-button">Register</button>
        </div>
        <app-dialog v-if="dialog" dialogText="You're not finished though" buttonText="OK!" :list="dialogList" />
        <app-dialog v-if="dialogTakenEmail" dialogText="This e-mail address is already registered with us!" buttonText="OK!" />
      </div>
  </div>
</template>

<script>
import axios from 'axios'
import appHeader from './../../components/Header'
import { required, minLength, maxLength, email, sameAs } from 'vuelidate/lib/validators'
import appDialog from '@/components/Dialog'

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
            nameRules: [
                v => !!v || 'Name is required',
                v => v.length <= 10 || 'Name must be less than 10 characters',
            ],
            selectedFileName: '',
            dialog: false,
            dialogTakenEmail: false,
            dialogList: ['We need at least:', '- Name', '- E-mail', '- Password']
        }
    },
    methods: {
        pickFile() {
            this.$refs.file.click();
        },
        selectFile(event) {
            this.selectedFile = event.target.files[0];
            this.selectedFileName = this.selectedFile.name;
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
                            console.log(response);
                            this.newUser.email = '';
                            this.dialog = false;
                            return this.dialogTakenEmail = true;
                        }
                        return this.$router.push({path: '/login'});
                        })
                    .catch(err => console.log(err));
            } else {
                alert('Passwords need to match');
            }
        },
    },
    components: { appHeader, appDialog },
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
                .vuetify-input {
                    width: 350px;
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
        // background-color: rgb(241, 197, 201);
        border: 1px solid rgb(241, 197, 201);
    }

    .error-box {
        background-color: rgb(241, 197, 201);
        padding: 0.5rem;
        border-radius: 3px;
        margin-top: -10px;
    }

    @media (max-width: 900px) {
        .form-container {
            width: 350px;
            .vuetify-input {
                width: 320px !important;
            }
        }
    }
</style>