<template>
    <div class="course-container" style="display: flex; flex-direction: column; justify-content: center">
        <half-circle-spinner
        :animation-duration="1000"
        :size="40"
        color="white"
        />
    </div>
</template>

<script>
import { HalfCircleSpinner } from 'epic-spinners'

export default {
    components: {
        HalfCircleSpinner
    }
}
</script>

<style lang="scss" scoped>
    .course-container {
        height: 270px;
        min-width: 220px;
        box-shadow: 0px 3px 9px 0px lightgray;
        margin: 15px;
        display: flex;
        flex-direction: column;
        align-items: center;
        cursor: pointer;
        background-color: $darkGreen;
        border-radius: 5px;
        color: white;
        padding: 0.3rem;
        &:hover {
            transform: scale(1.025);
            box-shadow: 0px 5px 10px 0px gray;
        }
    }

    @media (max-width: 900px) {
        .course-container {
            min-width: 150px;
            height: 220px;
        }
    }
</style>