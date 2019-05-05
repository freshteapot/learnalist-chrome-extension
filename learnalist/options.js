var config = {
  server: 'https://learnalist.net/api'
};

new Vue({
  el: '#app',
  data: {
    username: '',
    password: '',
    errorMessage: '',
    server: config.server
  },
  methods: {
    resetOptions() {
      localStorage.removeItem('username');
      localStorage.removeItem('basicAuth');
      localStorage.removeItem('server');

      localStorage.removeItem('renderScreen');
      localStorage.removeItem('aList');

      this.username = '';
      this.password = '';
      this.errorMessage = '';
      this.server = config.server;
      window.close();
    },
    saveOptions() {
      if (this.username !== '' && this.password !== '') {
        basicAuth = btoa(this.username + ':' + this.password);
        localStorage.setItem('username', this.username);
        localStorage.setItem('basicAuth', basicAuth);
      } else {
        this.errorMessage = 'You need to set a username and password';
        console.log(this.errorMessage);

        localStorage.setItem('username', '');
        localStorage.setItem('basicAuth', '');
        return false;
      }
      localStorage.setItem('server', this.server);
      window.close();
    }
  },
  created: function () {
    username = localStorage.getItem('username');
    if (username) {
      this.username = username;
    }
    server = localStorage.getItem('server');
    if (server) {
      this.server = server;
    }
  }
});
