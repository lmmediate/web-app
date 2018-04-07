export default {
  
  user: {
    loggedIn: false
  },

  login: function(context, creds, redirect) {
    context.$http.post('auth/login', creds)
      .then(res => {
        localStorage.setItem('auth', 'Bearer ' + res.body);
        
        this.user.loggedIn = true;

        if(redirect) {
          context.$router.replace(redirect);
        }
      }, res => {
        context.error = res.data;
        console.log('Error(' + res.status + '): ' + res.body);
      });
  },

  logout: function() {
    localStorage.removeItem('auth');
    this.user.loggedIn = false;
    console.log('logout!');
  },

  register: function(context, creds, redirect) {
    this.$http.post('auth/register', creds)
      .then(res => {
        this.$router.replace('/login');
      }, res => {
        context.error = res.data;
        console.log('Error(' + res.status + '): ' + res.body);
      });
  },

  checkLogin: function() {
    var token = localStorage.getItem('auth');
    
    if(token) {
      this.user.loggedIn = true;
    } else {
      this.user.loggedIn = false;
    }
  }

}
