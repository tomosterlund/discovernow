<template>
        <div class="texts-container">
            <div class="description">
                <div class="subheader-container">
                    <v-subheader @click="showVideoDescr = !showVideoDescr" :class="{ highlighted: showVideoDescr }" class="pointer">Video description</v-subheader>
                    <v-subheader @click="showVideoDescr = !showVideoDescr" :class="{ highlighted: !showVideoDescr }" class="pointer">Course description</v-subheader>
                </div>
                <p v-if="showVideoDescr" class="ml-4">{{ description }}</p>
                <p v-if="!showVideoDescr" class="ml-4">{{ courseDescription }}</p>
            </div>
        </div>
</template>

<script>
export default {
    props: ['description', 'courseDescription'],
    data() {
        return {
            showVideoDescr: true,
        }
    }
}
</script>

<style lang="scss" scoped>
    .texts-container {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        .description {
            width: 80%;
            height: fit-content;
            background-color: white;
            box-shadow: 0px 2px 3px 0px gray;
            padding: 0.5rem;
            margin: 10px 0;
            display: flex;
            flex-direction: column;
            .subheader-container {
            display: flex;
            align-items: center;
            .pointer {
                cursor: pointer;
            }
            .highlighted {
                color: rgb(100, 100, 199);
                font-weight: 600;
                text-decoration: underline;
            }
        }
        }
    }
</style>