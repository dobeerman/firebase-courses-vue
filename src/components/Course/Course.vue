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
            <v-btn class="primary">Register</v-btn>
            <v-spacer></v-spacer>
            <!-- Add roles to show this button -->
            <v-btn
              class="success"
              :to="{ name: 'EditCourse', params: { id: this.id } }"
            >
              Edit
            </v-btn>
            <v-btn
              class="warninig"
              flat
              @click="onDeleteCourse"
            >
              Delete
            </v-btn>

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
  },
  methods: {
    onDeleteCourse () {
      this.$store.dispatch('deleteCourseData', this.id)
      this.$router.push('/courses')
    }
  }
}
</script>
