<template>
  <v-container>
    <v-layout row wrap v-for="course in courses" :key="course.id" class="mb-2">
      <v-flex xs12 sm10 md8 offset-sm1 offset-md2>
        <v-card>
          <v-container fluid>
            <v-layout row>
              <v-flex xs5 sm4 md3>
                <v-card-media
                  :src="course.imageUrl"
                  height="130px"
                ></v-card-media>
              </v-flex>
              <v-flex xs7 sm8 md9>
                <v-card-title primary-title>
                  <div>
                    <h5 class="mb-0">{{ course.title }}</h5>
                    <div>
                      {{ course.date.start | date }} – {{ course.date.end | date }}
                    </div>
                  </div>
                </v-card-title>
                <v-card-actions>
                  <v-btn flat :to="'/courses/' + course.id">
                    <v-icon left light>arrow_forward</v-icon>
                    View Course
                  </v-btn>
                </v-card-actions>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  computed: {
    courses () {
      return this.$store.getters.loadedCourses
    }
  }
}
</script>
