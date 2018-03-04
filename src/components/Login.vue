<template>
  <div>
    <b-form v-on:submit.prevent="onSubmit">
      <b-form-input
        type="text" v-model="username">
      </b-form-input>
      <b-form-input
        type="password" v-model="password">
      </b-form-input>
      <b-button type="submit">Submit</b-button>
    </b-form>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    onSubmit: function() {
      this.$http.post('auth/login', {
        username: this.username,
        password: this.password
      })
        .then(response => {
          localStorage.setItem('auth', 'Bearer ' + response.body);
        }, response => {
          // TODO: show 'bad credentials' error
          console.log('Error(' + response.status + '): ' + response.body);
        });
    }
  }
}
</script>

<style>
</style>
