<template>
  <div class="vertical-center">
    <b-container>
      <b-form v-on:submit.prevent="onSubmit">
        <b-form-row>
          <b-col class="text-center mb-2"
                 cols="8" md="4" offset="2" offset-md="4">
            <h4>Регистрация</h4>
          </b-col>
        </b-form-row>
        <b-form-row v-if="error">
          <b-col cols="8" md="4" offset="2" offset-md="4" class="mb-2">
            <div id="error">{{error}}</div>
          </b-col>
        </b-form-row>
        <b-form-row>
          <b-col cols="8" md="4" offset="2" offset-md="4" class="mb-2">
            <b-form-input type="text" 
                          placeholder="Логин" 
                          v-model="username">
            </b-form-input>
          </b-col>
        </b-form-row>
        <b-form-row>
          <b-col cols="8" md="4" offset="2" offset-md="4" class="mb-2">
            <b-form-input type="password"
                          placeholder="Пароль"
                          v-model="password">
            </b-form-input>
          </b-col>
        </b-form-row>
        <b-form-row>
          <b-col cols="8" md="4" offset="2" offset-md="4" class="mb-2">
            <b-button class="btn-block mb-2"
                      variant="info"
                      type="submit">
              Зарегистрироваться
            </b-button>
          </b-col>
        </b-form-row>
      </b-form>
    </b-container>
  </div>
</template>

<script>
import auth from '../auth'

export default {
  data: function() {
    return {
      username: '',
      password: '',
      error: ''
    }
  },
  methods: {
    onSubmit: function() {
      auth.register(this, {
        username: this.username,
        password: this.password
      }, '/login')
    }
  }
}
</script>

<style scoped lang="scss">
  @import '../assets/scss/login-register';
</style>
