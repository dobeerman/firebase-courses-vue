<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <h4>Edit {{ course.title }} Course</h4>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12>
        <form @submit.prevent="onEditCourse">
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="title"
                label="Title"
                id="title"
                v-model="course.title"
                required></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="imageUrl"
                label="Image URL"
                id="image-url"
                v-model="course.imageUrl"
                required></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <img :src="course.imageUrl" height="150">
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="description"
                label="Description"
                id="description"
                multi-line
                v-model="course.description"
                required></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <h4>Date & Time of start</h4>
            </v-flex>
          </v-layout>
          <v-layout row class="mb-2">
            <v-flex xs12 sm6 offset-sm3>
              <v-layout row wrap>
                <v-flex xs12 sm6>
                  <v-date-picker first-day-of-week="1" v-model="date.start"></v-date-picker>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-time-picker v-model="time.start" format="24hr"></v-time-picker>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <h4>Date & Time of the end</h4>
            </v-flex>
          </v-layout>
          <v-layout row class="mb-2">
            <v-flex xs12 sm6 offset-sm3>
              <v-layout row wrap>
                <v-flex xs12 sm6>
                  <v-date-picker first-day-of-week="1" v-model="date.end"></v-date-picker>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-time-picker v-model="time.end" format="24hr"></v-time-picker>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-btn
                class="primary"
                :disabled="!formIsValid"
                type="submit">Save Course</v-btn>
            </v-flex>
          </v-layout>
        </form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  props: ['id'],

  data () {
    return {
      date: { start: '', end: '' },
      time: { start: '', end: '' },

      course: {}
    }
  },

  beforeMount () {
    Object.assign(this.course, this.$store.getters.loadedCourse(this.id))

    Object.assign(this.date, {
      start: this.$moment(this.course.date.start).format('YYYY-MM-DD'),
      end: this.$moment(this.course.date.end).format('YYYY-MM-DD')
    })

    Object.assign(this.time, {
      start: this.$moment(this.course.date.start).format('HH:mm'),
      end: this.$moment(this.course.date.end).format('HH:mm')
    })
  },
  computed: {
    formIsValid () {
      return this.title !== '' && this.imageUrl !== '' && this.description !== ''
    },
    submittableDateTime () {
      let obj = {}

      Object.keys(this.date).map(key => {
        let date = new Date(this.date[key])

        if (typeof this.time[key] === 'string') {
          let hours = this.time[key].match(/^(\d+)/)[1]
          const minutes = this.time[key].match(/:(\d+)/)[1]
          date.setHours(hours)
          date.setMinutes(minutes)
        } else {
          date.setHours(this.time[key].getHours())
          date.setMinutes(this.time[key].getMinutes())
        }

        obj[key] = date
      })

      return obj
    },
    loading () {
      return this.$store.getters.loading
    }
  },
  methods: {
    onEditCourse () {
      if (!this.formIsValid) {
        return
      }
      const courseData = this.course
      Object.assign(courseData, { date: this.submittableDateTime })

      this.$store.dispatch('updateCourseData', courseData)
      this.$router.push('/courses/' + courseData.id)
    }
  }
}
</script>
