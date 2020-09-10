<template>
  <div class="button-container">
      {{ buttonText }}<unicon name="arrow-down" fill="white" />
  </div>
</template>

<script>
export default {
    props: ['buttonText']
}
</script>

<style lang="scss" scoped>
    .button-container {
        padding: 0.5rem;
        background-color: $darkOrange;
        color: white;
        font-weight: 700;
        font-size: 18px;
        border: 2px solid $darkOrange;
        border-radius: 30px;
        cursor: pointer;
        &:hover {
            animation: roundedButtonHover;
            animation-duration: 0.27s;
            animation-iteration-count: 1;
            animation-fill-mode: forwards;
        }
    }

    @keyframes roundedButtonHover {
        100% {
            background-color: transparent;
            color: $darkOrange;
        }
    }
</style>