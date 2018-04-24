<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs8 offset-xs2>
        <v-card>
          <v-card-title>
            <h6 class="primary--text">{{ course.title }}</h6>
          </v-card-title>
          <v-card-media
            :src="course.imageUrl"
            height="400px"
          ></v-card-media>
          <v-card-text>
            <div class="info--text">{{ course.date.start | date }} - {{ course.date.end | date }}</div>
            <div>{{ course.description }}</div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="primary">Register</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  props: ['id'],
  computed: {
    course () {
      return this.$store.getters.loadedCourse(this.id)
    }
  }
}
</script>
