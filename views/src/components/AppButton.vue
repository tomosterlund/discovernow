<template>
    <button class="submit-button">{{ buttonText }}</button>
</template>

<script>
export default {
    props: ['buttonText']
}
</script>

<style lang="scss" scoped>
    $darkGreen: #264653;
    $green: #2a9d8f;
    $yellow: #e9c46a;
    $orange: #f4a261;
    $darkOrange: #e76f51;

    .submit-button {
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
</style>