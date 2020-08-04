let db = firebase.firestore();
let usersRef = db.collection('users');



let app = new Vue({
  el: "#app",

// DATA

  data: {
    screen: "start",
    logInError: "",
    username: "",
    password: "",
    users: [],
  },

// COMPUTED

  computed: {

    // Login Stuff

    available: function () {
      let state = true;
      // Jin's elegant code
      for (user of this.users) {
        if (this.username == user.username) {
          state = false;
        }
      }
      return state;
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
        usersRef.add({username: this.username, password: this.password, waiting: true, ready: false, loggedIn: true});
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
  },

// MOUNTED

  mounted() {

    // Real time
    usersRef.onSnapshot(querySnapshot => {
      let users = [];
      querySnapshot.forEach(doc => {
        users.push(doc.data());
      });
      this.users = users;
    })
  }
})
