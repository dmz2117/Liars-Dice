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
  props: ["username", "mood", "dice", "action", "bidNumber", "bidFace", "turn", "photoURL", "roomBidFace", "roomBidNumber", "roomShowDice"],

  template: ` <div :class="{ otherPlayerStatusWait : !turn , otherPlayerStatusTurn : turn }">
                <div class="verticalBox">
                  <div>{{ username }}</div>
                  <div v-if="mood != ''" class="moodFace">{{ mood }}</div><div v-else><img class="playerImage" :src="photoURL"></div>
                </div>
                <div v-if="!roomShowDice" class="otherPlayerDice">
                    <div class="diceBig" v-for="die in dice"></div>
                </div>
                <div v-if="roomShowDice" class="otherPlayerDice" v-html="dieFaceReplaceBig"></div>
                <div class="verticalBox" style="min-width: 160px" :class="{ hide : action == '' }">
                  <div class="gameFont"> {{ action }} </div>
                  <div class="horizontalBox">
                    <div v-if="action == 'bid'" class="gameFont">{{ bidNumber }}</div>
                    <div v-if="action == 'challenge'" class="gameFont">{{ roomBidNumber }}</div>
                    <div class="material-icons">close</div>
                    <div v-if="action == 'bid'" v-html="dieFaceReplace"></div>
                    <div v-if="action == 'challenge'" v-html="dieFaceReplaceRoom"></div>
                  </div>
                </div>
              </div>`,

  computed: {

  dieFaceReplaceBig() {
    var diceReplace = "";
    for (i of this.dice) {
      if (i == 1) {
        diceReplace +=
          `<div class="diceBig first-face">
            <span class="dotBig">
            </span>
          </div>`;
      } else if (i == 2) {
        diceReplace +=
          `<div class="diceBig second-face">
            <span class="dotBig">
            </span>
            <span class="dotBig">
            </span>
          </div>`;
      } else if (i == 3) {
        diceReplace +=
          `<div class="diceBig third-face">
            <span class="dotBig"></span>
            <span class="dotBig"></span>
            <span class="dotBig"></span>
          </div>`;
      } else if (i == 4) {
        diceReplace +=
          `<div class="diceBig fourth-face">
            <div class="column">
              <span class="dotBig"></span>
              <span class="dotBig"></span>
            </div>
            <div class="column">
              <span class="dotBig"></span>
              <span class="dotBig"></span>
            </div>
          </div>`;
      } else if (i == 5) {
        diceReplace +=
          `<div class="diceBig fifth-face">
            <div class="column">
              <span class="dotBig"></span>
              <span class="dotBig"></span>
            </div>
            <div class="column">
              <span class="dotBig"></span>
            </div>
            <div class="column">
              <span class="dotBig"></span>
              <span class="dotBig"></span>
            </div>
          </div>`;
      } else if (i == 6) {
        diceReplace +=
        `<div class="diceBig sixth-face">
          <div class="column">
            <span class="dotBig"></span>
            <span class="dotBig"></span>
            <span class="dotBig"></span>
          </div>
          <div class="column">
            <span class="dotBig"></span>
            <span class="dotBig"></span>
            <span class="dotBig"></span>
          </div>
        </div>`;
      }
    }
    return diceReplace;
  },

    dieFaceReplace() {
      var dieReplace = "";
      if (this.bidFace == 1) {
        dieReplace =
          `<div class="diceSmall first-face">
            <span class="dotSmall">
            </span>
          </div>`;
      } else if (this.bidFace == 2) {
        dieReplace =
          `<div class="diceSmall second-face">
            <span class="dotSmall">
            </span>
            <span class="dotSmall">
            </span>
          </div>`;
      } else if (this.bidFace == 3) {
        dieReplace =
          `<div class="diceSmall third-face">
            <span class="dotSmall"></span>
            <span class="dotSmall"></span>
            <span class="dotSmall"></span>
          </div>`;
      } else if (this.bidFace == 4) {
        dieReplace =
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
        dieReplace =
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
        dieReplace =
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
      return dieReplace;
    },

    dieFaceReplaceRoom() {
      var dieReplace = "";
      if (this.roomBidFace == 1) {
        dieReplace =
          `<div class="diceSmall first-face">
            <span class="dotSmall">
            </span>
          </div>`;
      } else if (this.roomBidFace == 2) {
        dieReplace =
          `<div class="diceSmall second-face">
            <span class="dotSmall">
            </span>
            <span class="dotSmall">
            </span>
          </div>`;
      } else if (this.roomBidFace == 3) {
        dieReplace =
          `<div class="diceSmall third-face">
            <span class="dotSmall"></span>
            <span class="dotSmall"></span>
            <span class="dotSmall"></span>
          </div>`;
      } else if (this.roomBidFace == 4) {
        dieReplace =
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
        dieReplace =
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
        dieReplace =
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
      return dieReplace;
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
    tempBidNumber: 1,
    tempBidFace: 1
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
      var playerSort = [];
      var num = this.currentUser.player + 1;
      for (i = 0; i < playerList.length; i++) {
        if (num > this.allPlayers.length) {
          num = 1;
        }
        for (j of playerList) {
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
    },

    turnAnnouncement: function () {
      if (this.currentUser.turn) {
        return "Your turn";
      } else {
        for (i of this.allPlayers) {
          if (i.turn) {
            return i.username + "'s turn";
          }
        }
      }
    },

    firstTurn: function() {
      if (this.currentRoom.totalTurns > 0) {
        return false;
      } else {
        return true;
      }
    },

    minimumBidNumber: function() {
      return this.currentRoom.bidNumber + 1;
    },

    minimumBidFace: function() {
      return this.currentRoom.bidFace;
    },

    dieFaceReplaceBig() {
      var diceReplace = "";
      for (i of this.currentUser.dice) {
        if (i == 1) {
          diceReplace +=
            `<div class="diceBig first-face">
              <span class="dotBig">
              </span>
            </div>`;
        } else if (i == 2) {
          diceReplace +=
            `<div class="diceBig second-face">
              <span class="dotBig">
              </span>
              <span class="dotBig">
              </span>
            </div>`;
        } else if (i == 3) {
          diceReplace +=
            `<div class="diceBig third-face">
              <span class="dotBig"></span>
              <span class="dotBig"></span>
              <span class="dotBig"></span>
            </div>`;
        } else if (i == 4) {
          diceReplace +=
            `<div class="diceBig fourth-face">
              <div class="column">
                <span class="dotBig"></span>
                <span class="dotBig"></span>
              </div>
              <div class="column">
                <span class="dotBig"></span>
                <span class="dotBig"></span>
              </div>
            </div>`;
        } else if (i == 5) {
          diceReplace +=
            `<div class="diceBig fifth-face">
              <div class="column">
                <span class="dotBig"></span>
                <span class="dotBig"></span>
              </div>
              <div class="column">
                <span class="dotBig"></span>
              </div>
              <div class="column">
                <span class="dotBig"></span>
                <span class="dotBig"></span>
              </div>
            </div>`;
        } else if (i == 6) {
          diceReplace +=
          `<div class="diceBig sixth-face">
            <div class="column">
              <span class="dotBig"></span>
              <span class="dotBig"></span>
              <span class="dotBig"></span>
            </div>
            <div class="column">
              <span class="dotBig"></span>
              <span class="dotBig"></span>
              <span class="dotBig"></span>
            </div>
          </div>`;
        }
      }
      return diceReplace;
    },

    dieFaceReplace() {
      var dieReplace = "";
      if (this.tempBidFace == 1) {
        dieReplace =
          `<div class="diceSmall first-face">
            <span class="dotSmall">
            </span>
          </div>`;
      } else if (this.tempBidFace == 2) {
        dieReplace =
          `<div class="diceSmall second-face">
            <span class="dotSmall">
            </span>
            <span class="dotSmall">
            </span>
          </div>`;
      } else if (this.tempBidFace == 3) {
        dieReplace =
          `<div class="diceSmall third-face">
            <span class="dotSmall"></span>
            <span class="dotSmall"></span>
            <span class="dotSmall"></span>
          </div>`;
      } else if (this.tempBidFace == 4) {
        dieReplace =
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
      } else if (this.tempBidFace == 5) {
        dieReplace =
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
      } else if (this.tempBidFace == 6) {
        dieReplace =
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
      return dieReplace;
    },

    dieFaceReplaceRoom() {
      var dieReplace = "";
      if (this.currentRoom.bidFace == 1) {
        dieReplace =
          `<div class="diceSmall first-face">
            <span class="dotSmall">
            </span>
          </div>`;
      } else if (this.currentRoom.bidFace == 2) {
        dieReplace =
          `<div class="diceSmall second-face">
            <span class="dotSmall">
            </span>
            <span class="dotSmall">
            </span>
          </div>`;
      } else if (this.currentRoom.bidFace == 3) {
        dieReplace =
          `<div class="diceSmall third-face">
            <span class="dotSmall"></span>
            <span class="dotSmall"></span>
            <span class="dotSmall"></span>
          </div>`;
      } else if (this.currentRoom.bidFace == 4) {
        dieReplace =
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
      } else if (this.currentRoom.bidFace == 5) {
        dieReplace =
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
      } else if (this.currentRoom.bidFace == 6) {
        dieReplace =
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
      return dieReplace;
    },

  },

// WATCH

  watch: {
    everyoneReady: function() {
      if (this.everyoneReady == true) {
        setTimeout(() => this.gameScreen(), 2000);
        setTimeout(() => this.goIntoGame(), 2000);
      }
    },

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
          bidFace: 1,
          bidNumber: 1,
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
          totalTurns: 0,
          turn: 1,
          caller: "",
          action: "",
          bidFace: 1,
          bidNumber: 1,
        }, {merge:true});
        var orderList = [];
        for (i of this.allPlayers) {
          var newDice = [];
          var firstTurn = false;
          for (j = 0; j < 5; j++) {
            newDice.push(Math.floor( Math.random() * 6 ) +1);
          }
          usersRef.doc(i.id).update({ dice: newDice });
          var playerOrder = Math.floor( Math.random() * this.allPlayers.length) +1;
          while (orderList.includes(playerOrder)) {
            playerOrder = Math.floor( Math.random() * this.allPlayers.length) +1;
          }
          orderList.push(playerOrder);
          if (playerOrder == 1) {
            firstTurn = true;
          }
          usersRef.doc(i.id).update({ player: playerOrder }).then(usersRef.doc(i.id).update({ turn: firstTurn }));
        }
      }
    },

    bidNumberUp() {
      this.tempBidNumber++;
    },

    bidNumberDown() {
      if (this.tempBidNumber > 1) {
        this.tempBidNumber--;
      }
    },

    bidFaceUp() {
      if (this.tempBidFace < 6) {
        this.tempBidFace++;
      }
    },

    bidFaceDown() {
      if (this.tempBidFace > 1) {
        this.tempBidFace--;
      }
    },

    changeMood: function(event) {
      targetID = event.currentTarget.id;
      usersRef.doc(this.id).update({ mood: targetID });
    },

    clearMood() {
      usersRef.doc(this.id).update({ mood: "" });
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
