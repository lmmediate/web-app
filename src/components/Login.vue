<template>
  <div class="vertical-center">
    <b-container>
      <b-form v-on:submit.prevent="onSubmit">
        <b-form-row>
          <b-col cols="8" md="4" offset="2" offset-md="4" class="mb-2">
            <div id="error" v-if="error">Неправильный логин/пароль.</div>
          </b-col>
        </b-form-row>
        <b-form-row>
          <b-col cols="8" md="4" offset="2" offset-md="4" class="mb-2">
            <b-form-input type="text" placeholder="Логин" v-model="username">
            </b-form-input>
          </b-col>
        </b-form-row>
        <b-form-row>
          <b-col cols="8" md="4" offset="2" offset-md="4" class="mb-2">
            <b-form-input type="password" placeholder="Пароль" v-model="password">
            </b-form-input>
          </b-col>
        </b-form-row>
        <b-form-row>
          <b-col cols="8" md="4" offset="2" offset-md="4" class="mb-2">
            <b-button type="submit">Войти</b-button>
          </b-col>
        </b-form-row>
      </b-form>
    </b-container>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      username: '',
      password: '',
      error: false
    }
  },
  methods: {
    onSubmit: function() {
      this.$http.post('auth/login', {
        username: this.username,
        password: this.password
      })
        .then(res => {
          localStorage.setItem('auth', 'Bearer ' + res.body);
          this.$router.push('/');
        }, res => {
          this.error = true; 
          console.log('Error(' + res.status + '): ' + res.body);
        });
    }
  }
}
</script>

<style>
#error {
  color: red;
}
.vertical-center {
  min-height: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
}
</style>
