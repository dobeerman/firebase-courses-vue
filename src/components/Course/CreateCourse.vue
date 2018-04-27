<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <h4>Create a new Course</h4>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12>
        <form @submit.prevent="onCreateCourse">
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="title"
                label="Title"
                id="title"
                v-model="title"
                required></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="imageUrl"
                label="Image URL"
                id="image-url"
                v-model="imageUrl"
                required></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <img :src="imageUrl" height="150">
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="description"
                label="Description"
                id="description"
                multi-line
                v-model="description"
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
          <v-layout row v-if="overlap()">
            <v-flex xs12 sm6 offset-sm3>
              <v-alert class="warning" :value="true">
                Course is overlapped
              </v-alert>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-btn
                class="primary"
                :disabled="!formIsValid"
                type="submit">Create Course</v-btn>
            </v-flex>
          </v-layout>
        </form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      title: '',
      imageUrl: '',
      description: '',
      date: {
        start: '',
        end: ''
      },
      time: {
        start: '',
        end: ''
      }
    }
  },
  created () {
    const momentDate = this.$moment().format('YYYY-MM-DD')
    const momentTime = this.$moment().format('HH:mm')

    Object.assign(this.date, {
      start: momentDate,
      end: momentDate
    })
    Object.assign(this.time, {
      start: momentTime,
      end: momentTime
    })
  },
  computed: {
    formIsValid () {
      return (
        this.title !== '' && this.imageUrl !== '' && this.description !== '' && this.overlap() < 1
      )
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
    userCourses () {
      return this.$store.getters.userCourses
    },
    overlap () {
      return this.isOverlapped
    }
  },
  methods: {
    onCreateCourse () {
      if (!this.formIsValid) {
        return
      }
      const courseData = {
        title: this.title,
        location: this.location,
        imageUrl: this.imageUrl,
        description: this.description,
        date: this.submittableDateTime
        // TODO: add files to firebase
      }

      this.$store.dispatch('createCourse', courseData)
      this.$router.push('/courses')
    },

    isOverlapped () {
      const date = this.submittableDateTime
      const start = this.$moment(date.start)
      const end = this.$moment(date.end)

      const isOverlapped = this.userCourses
        .reduce((pv, cv) => {
          const cvStart = this.$moment(cv.date.start)
          const cvEnd = this.$moment(cv.date.end)

          const ok = start.isBetween(cvStart, cvEnd) || end.isBetween(cvStart, cvEnd)

          pv.push(ok)

          return pv
        }, [])
        .filter(el => el)

      return isOverlapped.length
    }
  }
}
</script>
