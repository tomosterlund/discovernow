<template>
  <div class="login-page__container">
      <app-header />
      <div class="form-container">
          <h1 class="login-form__header">Sign in</h1>
          <div class="input-container">
              <v-text-field v-model="login.email" class="vuetify-input" label="E-mail" outlined></v-text-field>
          </div>
          <div class="input-container">
              <v-text-field @keyup.enter="postLogin" v-model="login.password" type="password" class="vuetify-input" label="Password" outlined></v-text-field>
          </div>
          <div class="button-container">
              <span @click="postLogin" style="margin-top: -30px">
                  <app-button buttonText="Sign in" />
              </span>
          </div>
      </div>
  </div>
</template>

<script>
import axios from 'axios'
import appHeader from './../../components/Header'
import appButton from './../../components/AppButton'

export default {
    data() {
        return {
            login: {
                email: '',
                password: ''
            },
            serverUrl: 'api/base/login',
        }
    },
    methods: {
        postLogin() {
            axios.post(this.serverUrl, this.login)
            .then(res => {
                this.$store.state.user = res.data.loggedInUser;
                console.log(this.$store.state.user);
                this.login.email = '';
                this.login.password = '';
                this.$router.push({ path: '/' })
            })
            .catch(err => console.log(err));
        }
    },
    components: {
        appHeader,
        appButton
    }
}
</script>

<style lang="scss" scoped>
    $darkGreen: #264653;
    $green: #2a9d8f;
    $yellow: #e9c46a;
    $orange: #f4a261;
    $darkOrange: #e76f51;

    .login-page__container {
        width: 100%;
        height: auto;
        min-height: 95vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        .login-form__header {
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
                .vuetify-input {
                    width: 350px;
                }
            }
            .button-container {
                display: flex;
                justify-content: center;
                margin-top: 20px;
            }
        }
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