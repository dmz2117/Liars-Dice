// GLOBAL DATABASE VARIABLES

let db = firebase.firestore();
let usersRef = db.collection('users');
let roomsRef = db.collection('rooms');

// VUE COMPONENTS

Vue.component("waiting-room", {
  props: ["username", "ready", "photoURL", "room", "thisRoom"],
  template:   `<div class="verticalBox" v-if="room == thisRoom">
                  <div>{{ username }}</div>
                  <div class="horizontalBox">
                    <img class="playerImage" :src="photoURL">
                    <div class="material-icons moodFace">{{ isReady }}</div>
                    <button
                  </div>
              </div>`,
  computed: {
    isReady() {
      if (this.ready) {
        return "done_outline";
      } else {
        return "query_builder";
      }
    }
  }
});

Vue.component("game-other-players", {
  props: ["username", "mood", "dice", "action", "bidNumber", "bidFace", "turn"],
  template: `<div :class="{ otherPlayerTurn: turn, otherPlayerWait: !turn }" class="flexBox">
              <div style="width: 20%">
                <div>{{ username }}</div>
                <div class="moodBox">{{ mood }}</div>
              </div>
              <div style="width: 50%; border-right: 1px solid white"><div style="font-size: 50px, vertical-align: middle" class="material-icons" v-for="die in dice">check_box_outline_blank</div></div>
              <div style="width: 30%" class="gameFont">{{ action }} <span v-if="action == 'bid'" style="vertical-align: middle" class="gameFont">{{ bidNumber }} <span style="vertical-align: middle" class="material-icons">close</span> <span style=" vertical-align: middle">{{ dieFaceReplace }}</span></span></div>
            </div>`,
  computed: {
    isReady() {
      if (this.ready) {
        return "check_box_outline_blank";
      } else {
        return "query_builder";
      }
    },

    dieFaceReplace() {
      if (this.bidFace == 1) {
        return
          `<div class="diceSmall first-face">
            <span class="dotSmall">
            </span>
          </div>`;
      } else if (this.bidFace == 2) {
        return
          `<div class="diceSmall second-face">
            <span class="dotSmall">
            </span>
            <span class="dotSmall">
            </span>
          </div>`;
      } else if (this.bidFace == 3) {
        return
          `<div class="diceSmall third-face">
            <span class="dotSmall"></span>
            <span class="dotSmall"></span>
            <span class="dotSmall"></span>
          </div>`;
      } else if (this.bidFace == 4) {
        return
          `<div class="diceSmall fourth-face">
            <div class="column">
              <span class="dotSmall"></span>
              <span class="dotSmall"></span>
            </div>
            <div class="column">
              <span class="dotSmall"></span>
              <span class="dotSmall"></span>
            </div>
          </div>`;
      } else if (this.bidFace == 5) {
        return
          `<div class="diceSmall fifth-face">
            <div class="column">
              <span class="dotSmall"></span>
              <span class="dotSmall"></span>
            </div>
            <div class="column">
              <span class="dotSmall"></span>
            </div>
            <div class="column">
              <span class="dotSmall"></span>
              <span class="dotSmall"></span>
            </div>
          </div>`;
      } else if (this.bidFace == 6) {
        return
        `<div class="diceSmall sixth-face">
          <div class="column">
            <span class="dotSmall"></span>
            <span class="dotSmall"></span>
            <span class="dotSmall"></span>
          </div>
          <div class="column">
            <span class="dotSmall"></span>
            <span class="dotSmall"></span>
            <span class="dotSmall"></span>
          </div>
        </div>`;
      }
    },
  }
});

Vue.component("dice-rolled", {
  props: ["die"],
  template: `<span class="diceAppearance"> {{ dieFaceReplace }} </span>`,
  computed: {
    dieFaceReplace() {
      if (this.die == 1) {
        return "⚀";
      } else if (this.die == 2) {
        return "⚁";
      } else if (this.die == 3) {
        return "⚂";
      } else if (this.die == 4) {
        return "⚃";
      } else if (this.die == 5) {
        return "⚄";
      } else if (this.die == 6) {
        return "⚅";
      }
    },
  },
});

// VUE INSTANCE

let app = new Vue({
  el: "#app",

// DATA

  data: {
    screen: "start",
    id: "",
    username: "",
    users: [],
    rooms: [],
  },

// COMPUTED

  computed: {

    // Local User Reference

    currentUser: function () {
      if (this.id != "") {
        for (user of this.users) {
          if (this.id == user.id) {
            return user;
          }
        }
      } else {
        return {username: "undefined", id: "", ready: false, waiting: false, room: 0};
      }
    },

    // Waiting Room

    waitingUsers: function () {
      return this.users.filter(i => i.waiting);
    },

    roomWaitingUsers: function () {
      return this.users.filter(i => i.waiting && i.room == currentUser.room);
    },

    everyoneReady: function () {
      if (this.screen == "waiting" && this.roomWaitingUsers.length > 1) {
        let readiness = [];
        for (user of this.roomWaitingUsers) {
          readiness.push(user.ready)
        }
        return readiness.every(x => x);
      } else {
        return false;
      }
    },

    availableRooms: function () {
      var roomsAvail=[]
      for (i of this.rooms) {
        if (i.available == true) {
          roomsAvail.push(i);
        }
      return roomsAvail;
      }
    },

    currentRoomID: function () {
      return "room-" + String(this.currentUser.room);
    },

    nextRoomID: function () {
      return "room-" + String(this.rooms.length + 1);
    },

    // Game

    otherPlayers: function () {
      var playerList = []
      for (i of this.users) {
        if (i.room == this.currentUser.room && i.id != this.id) {
          playerList.push(i);
        }
      }
      return playerList;
    },

    allPlayers: function () {
      return this.users.filter(i => i.room == this.currentUser.room);
    },

    allDice: function () {
      var everyDie = [];
      for (i of this.allPlayers) {
        everyDie.concat(i.dice)
      }
      return everyDie;
    }

  },

// WATCH

  watch: {
    everyoneReady: function() {
      if (this.everyoneReady == true) {
        setTimeout(() => this.gameScreen(), 3000);
        setTimeout(() => this.goIntoGame(), 3000);
      }
    }
  },

// METHODS

  methods: {

    // Navigation

    startScreen() {
      this.screen = "start";
    },
    waitingScreen() {
      this.screen = "waiting";
    },
    gameScreen() {
      this.screen = "game";
    },

    // Login

    logInGoogle() {
      var provider = new firebase.auth.GoogleAuthProvider();

      firebase.auth().signInWithPopup(provider).then(result => {
        var googleUser = result.user;
        this.username = googleUser.displayName.split(' ')[0];
        this.id = googleUser.uid;

        usersRef.doc(this.id).set({
          username: this.username,
          id: this.id,
          photoURL: googleUser.photoURL,
          waiting: true,
          ready: false,
          room: 0,
          dice: [],
          action: "",
          bidFace: 0,
          bidNumber: 0,
          mood: "",
          player: 0
        }, {merge:true})
        .then(this.waitingScreen());
      });
    },

    // Waiting Room

    makeNewRoom() {
      roomsRef.doc(this.nextRoomID).set({
        roomNumber: this.rooms.length + 1,
        available: true
      })
    },

    joinRoom(clickedRoom) {
      usersRef.doc(this.id).update({
        room: clickedRoom,
        ready: false,
        waiting: true
      });
    },

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

    goIntoGame() {
      usersRef.doc(this.id).update({
        waiting: false,
        ready: false,
      }).then(this.gameStart());
    },

    // Game

    gameStart() {
      if (this.allPlayers[0].id == this.id) {
        roomsRef.doc(this.currentRoomID).set({
          available: false,
          turn: 1,
          action: "",
          bidFace: 0,
          bidNumber: 0,
        }, {merge:true});
        var orderList = [];
        for (i of this.allPlayers) {
          newDice = []
          for (j = 0; j < 5; j++) {
            newDice.push(Math.floor( Math.random() * 6 ) +1);
          }
          usersRef.doc(i.id).update({ dice: newDice });
          var playerOrder = Math.floor( Math.random() * this.allPlayers.length) +1;
          while (orderList.includes(playerOrder)) {
            playerOrder = Math.floor( Math.random() * this.allPlayers.length) +1;
          }
          orderList.push(playerOrder);
          usersRef.doc(i.id).update({ player: playerOrder });
        }
      }
    },

    /* FIX LATER

    selectedNumberDown() {
      this.selectedNumber--
    },

    selectedNumberUp() {
      this.selectedNumber++
    }
    */

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
    });

    roomsRef.onSnapshot(querySnapshot => {
      let rooms = [];
      querySnapshot.forEach(doc => {
        rooms.push(doc.data());
      });
      this.rooms = rooms;
    });
  }
})
