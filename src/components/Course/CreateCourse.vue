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
      location: '',
      imageUrl: '',
      description: '',
      date: {
        start: new Date(),
        end: new Date()
      },
      time: {
        start: new Date(),
        end: new Date()
      }
    }
  },
  computed: {
    formIsValid () {
      return this.title !== '' && this.imageUrl !== '' && this.description !== ''
    },
    submittableDateTime () {
      let obj = {}

      Object.keys(this.date).map(key => {
        let date = new Date(this.date[key])
        console.log(date)

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
      console.log(courseData)
      this.$store.dispatch('createCourse', courseData)
      this.$router.push('/courses')
    }
  }
}
</script>
