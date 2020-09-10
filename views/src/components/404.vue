<template>
  <div class="home-page__container">
      <app-header />
        <div class="error-container">
            <span>Sorry, it seems like the page you were looking for does not exist.</span>
            <button @click="redirectHome" class="redirect-button">
                Take me someplace better
            </button>
        </div>
  </div>
</template>

<script>
import appHeader from './Header'

export default {
    components: {
        appHeader
    },
    methods: {
        redirectHome() {
            this.$router.push({ path: '/' });
        }
    }
}
</script>

<style lang="scss" scoped>
    .home-page__container {
        width: 100%;
        height: auto;
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        background-color: rgb(222, 228, 231);
        .error-container {
            height: 70vh;
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            font-size: 25px;
            .redirect-button {
                padding: 0.5rem;
                font-weight: 700;
                font-size: 18px;
                background-color: $darkOrange;
                color: white;
                border: 1px solid $darkOrange;
                outline: none;
                cursor: pointer;
                border-radius: 3px;
                margin: 10px 0 0 0;
                &:hover {
                    animation: buttonHover;
                    animation-iteration-count: 1;
                    animation-duration: 0.3s;
                    animation-fill-mode: forwards;
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
    }
</style>