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
  props: ["username", "mood", "dice", "action", "bidNumber", "bidFace", "turn", "photoURL", "roomBidFace", "roomBidNumber"],
  template: ` <div :class="{ !turn : otherPlayerStatusWait, turn : otherPlayerStatusTurn }">
                <div class="verticalBox">
                  <div>Mo</div>
                  <div v-if="mood != ''" class="moodFace">{{ mood }}</div><div v-else><img class="playerImage" :src="photoURL"></div>
                </div>
                <div class="otherPlayerDice">
                    <div class="diceBig" v-for="die in dice"></div>
                </div>
                <div class="verticalBox" :class="{ action == '' : hide }">
                  <div class="gameFont"> {{ action }} </div>
                  <div class="horizontalBox">
                    <div v-if="action == 'bid'" class="gameFont">{{ bidNumber }}</div>
                    <div v-if="action == 'challenge'" class="gameFont">{{ roomBidNumber }}</div>
                    <div class="material-icons">close</div>
                    <div v-if="action == 'bid'">{{ dieFaceReplace }}</div>
                    <div v-if="action == 'challenge'">{{ dieFaceReplaceRoom }}</div>
                  </div>
                </div>
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

    dieFaceReplaceRoom() {
      if (this.roomBidFace == 1) {
        return
          `<div class="diceSmall first-face">
            <span class="dotSmall">
            </span>
          </div>`;
      } else if (this.roomBidFace == 2) {
        return
          `<div class="diceSmall second-face">
            <span class="dotSmall">
            </span>
            <span class="dotSmall">
            </span>
          </div>`;
      } else if (this.roomBidFace == 3) {
        return
          `<div class="diceSmall third-face">
            <span class="dotSmall"></span>
            <span class="dotSmall"></span>
            <span class="dotSmall"></span>
          </div>`;
      } else if (this.roomBidFace == 4) {
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
      } else if (this.roomBidFace == 5) {
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
      } else if (this.roomBidFace == 6) {
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
      let roomUsers = [];
      for (user of this.waitingUsers) {
        if (user.room == this.currentUser.room) {
          roomUsers.push(user);
        }
      }
      return roomUsers;
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

    currentRoom: function () {
      var thisRoom;
      for (i of this.rooms) {
        if (i.roomNumber == this.currentUser.room) {
          return i;
        } else {
          return null;
        }
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
      var playerList = [];
      for (i of this.users) {
        if (i.room == this.currentUser.room && i.id != this.id) {
          playerList.push(i);
        }
      }
      return playerList;
    },

    otherPlayersSorted: function () {
      var playerSort = [];
      var num = this.currentUser.player + 1;
      for (i = 0; i < this.allPlayers.length; i++) {
        if (num > this.allPlayers.length) {
          num = 1;
        }
        for (j in this.otherPlayers) {
          if (j.player == num) {
            playerSort.push(j);
          }
        }
        num++;
      }
      return playerSort;
    },
    
    allPlayers: function () {
      return this.users.filter(i => i.room == this.currentUser.room);
    },

    allDice: function () {
      var everyDie = [];
      for (i of this.allPlayers) {
        everyDie.concat(i.dice);
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
/*
  playerTurn: function () {
    if (this.currentRoom.turn == this.currentUser.player) {
      usersRef.doc(this.id).update({
        turn: true
      });
    }
  },
*/
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
          player: 0,
          turn: false
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

    checkRoom(check) {
      return check.room == this.currentUser.room;
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
