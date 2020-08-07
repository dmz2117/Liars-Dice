// GLOBAL DATABASE VARIABLES

let db = firebase.firestore();
let usersRef = db.collection('users');

// VUE COMPONENTS

Vue.component("waiting-room", {
  props: ["username", "ready"],
  template: `<div><i class="material-icons">{{ isReady }}</i> {{ username }}</div>`,
  computed: {
    isReady() {
      if (this.ready) {
        return "done_outline";
      } else {
        return "query_builder";
      }
    }
  },
  methods: {
  }
});

// VUE INSTANCE

let app = new Vue({
  el: "#app",

// DATA

  data: {
    screen: "start",
    logInError: "",
    id: "",
    username: "",
    password: "",
    users: [],
  },

// COMPUTED

  computed: {

    // Login

    available: function () {
      let state = true;
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
    },

    // Local User Reference

    currentUser: function () {
      for (user of this.users) {
        if (this.username == user.username) {
          return user;
        }
      }
    },

    // Waiting Room

    waitingUsers: function () {
      return this.users.filter(i => i.waiting);
    },

    everyoneReady: function () {
      state = false;
      for (user of this.waitingUsers) {
        if (user.ready == false) {
          state = false;
          break;
        }
      }
      return state;
    }
  },

// WATCH

  watch: {
    everyoneReady: function() {
      setTimeout(() => this.gameScreen(), 5000);
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

    // Login

    addNewUser() {
      if (this.available) {
        usersRef.add({username: this.username, password: this.password, waiting: true, ready: false, loggedIn: true})
        .then(docRef => {
          this.id = docRef.id;
        });
        this.waitingScreen();
      }
    },

    logIn() {
      if (this.available) {
        this.logInError = "username";
      } else {
        for (user of this.users) {
          if (this.username == user.username) {
            if (this.password == user.password) {
              this.getUserID();
              this.waitingScreen();
              setTimeout(() => this.makeNotReady(), 500);
              break;
            } else {
              this.logInError = "password";
            }
          }
        }
      }
    },

    getUserID() {
      this.id = usersRef.where("username", "==", this.username)
        .get().then(querySnapshot => {
          querySnapshot.forEach(doc => {
            this.id = doc.id;
          })
        });
    },

    // Waiting Room

    makeNotReady() {
      usersRef.doc(this.id).update({
        ready: false,
        waiting: true
      });
    },

    getReady() {
      usersRef.doc(this.id).update({
        ready: true
      });
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
