let db = firebase.firestore();
let xxx = db.collection('xxx');

let app = new Vue({
  el: "#app",

// DATA

  data: {
    screen: "start",
    logInError: "",
    username: "",
    password: "",
    users: [
      {username: "Dave", password: "12345", waiting: false, loggedIn: false}
    ],
  },

// COMPUTED

  computed: {

    // Login Stuff

    available: function () {
      for (i in this.users) {
        if (this.username == this.users[i].username) {
          return false;
        } else {
          return true;
        }
      }
    },

    credentialsReady: function () {
      if (this.username !== "" && this.password !== "") {
        return true;
      } else {
        return false;
      }
    }
  },

// METHODS

  methods: {

    // Navigation

    startScreen() {
      this.screen = "start";
    },

    signUpScreen() {
      this.screen = "signup";
    },

    logInScreen() {
      this.screen = "login";
    },

    waitingScreen() {
      this.screen = "waiting";
    },

    gameScreen() {
      this.screen = "game";
    },

    // Login Stuff

    addNewUser() {
      if (this.available) {
        this.users.push({username: this.username, password: this.password, waiting: true, loggedIn: true});
        this.waitingScreen();
      }
    },

    logIn() {
      if (this.available) {
        this.logInError = "username";
      } else {
        for (i in this.users) {
          if (this.username == this.users[i].username) {
            if (this.password == this.users[i].password) {
              this.waitingScreen();
            } else {
              this.logInError = "password";
            }
          }
        }
      }
    },
  }
});
