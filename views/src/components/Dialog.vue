<template>
  <v-row justify="center">
    <v-dialog
      v-model="active"
      max-width="350"
    >
      <v-card>
        <v-card-title class="headline">{{ dialogText }}</v-card-title>
        <span v-if="list">
          <v-card-text v-for="item in list" :key="item">
            {{ item }}
          </v-card-text>
        </span>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            text
            @click="active = false"
          >
            {{ buttonText }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
    props: ['dialogText', 'buttonText', 'list'],
    data() {
        return {
            active: true
        }
    }
}
</script>

<style>

</style>