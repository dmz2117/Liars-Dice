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
  props: ["username", "mood", "dice", "action", "bidNumber", "bidFace", "turn", "photoURL", "out", "roomBidFace", "roomBidNumber", "roomShowDice", "challengedFace"],

  template: ` <div :class="{ otherPlayerStatusWait : !turn , otherPlayerStatusTurn : turn }">
                <div class="verticalBox">
                  <div>{{ username }}</div>
                  <div v-if="mood != ''" class="moodFace">{{ mood }}</div><div v-else><img class="playerImage" :src="photoURL"></div>
                </div>
                <div v-if="!roomShowDice" class="otherPlayerDice">
                    <div class="diceBig" v-for="die in dice"></div>
                </div>
                <div v-if="roomShowDice" class="otherPlayerDice" v-html="dieFaceReplaceBig"></div>
                <div v-if="out" class="gameFont">Just watching.</div>
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
        if (this.challengedFace == 1) {
          diceReplace +=
            `<div class="diceBig first-face" style="background-color: yellow">
              <span class="dotBig">
              </span>
            </div>`;
        } else {
          diceReplace +=
            `<div class="diceBig first-face">
              <span class="dotBig"></span>
            </div>`;
        }
      } else if (i == 2) {
        if (this.challengedFace == 2) {
          diceReplace +=
            `<div class="diceBig second-face" style="background-color: yellow"">
              <span class="dotBig"></span>
              <span class="dotBig"></span>
            </div>`;
        } else {
          diceReplace +=
            `<div class="diceBig second-face">
              <span class="dotBig"></span>
              <span class="dotBig"></span>
            </div>`;
        }
      } else if (i == 3) {
        if (this.challengedFace == 3) {
          diceReplace +=
            `<div class="diceBig third-face" style="background-color: yellow">
              <span class="dotBig"></span>
              <span class="dotBig"></span>
              <span class="dotBig"></span>
            </div>`;
        } else {
          diceReplace +=
            `<div class="diceBig third-face">
              <span class="dotBig"></span>
              <span class="dotBig"></span>
              <span class="dotBig"></span>
            </div>`;
        }
      } else if (i == 4) {
        if (this.challengedFace == 4) {
          diceReplace +=
            `<div class="diceBig fourth-face" style="background-color: yellow"">
              <div class="column">
                <span class="dotBig"></span>
                <span class="dotBig"></span>
              </div>
              <div class="column">
                <span class="dotBig"></span>
                <span class="dotBig"></span>
              </div>
            </div>`;
        } else {
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
        }
      } else if (i == 5) {
        if (this.challengedFace == 5) {
          diceReplace +=
            `<div class="diceBig fifth-face" style="background-color: yellow">
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
        } else {
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
        }
      } else if (i == 6) {
        if (this.challengedFace == 6) {
          diceReplace +=
          `<div class="diceBig sixth-face" style="background-color: yellow">
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
        } else {
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

// VUE INSTANCE

let app = new Vue({
  el: "#app",

// DATA

  data: {
    screen: "start",
    id: "",
    username: "",
    newUsername: "",
    usernameToggleValue: false,
    users: [],
    rooms: [],
    tempBidNumber: null,
    tempBidFace: null,
    errorMessage: "",
    reset: false,
    previousPlayer: {},
    nextPlayer: {},
    finalWinner: {}
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
          if (user.ready) {
            readiness.push(user)
          }
        }
        if (readiness.length == this.roomWaitingUsers.length) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    },

/*  FOR SOME REASON DIDN'T WORK -- UPDATE: ABOVE DOESN'T WORK EITHER, IT'S SOMETHING WITH SAFARI, MAYBE!

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
*/
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
      for (i of this.rooms) {
        if (i.roomNumber == this.currentUser.room) {
          return i;
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
        for (j of i.dice) {
          everyDie.push(j);
        }
      }
      return everyDie;
    },

    playerMoveAnnouncement: function () {
      var announce = this.currentRoom.caller + " ";
      if (this.currentRoom.action == "bid") {
        announce += "bid "
      } else if (this.currentRoom.action == "challenge") {
        var liar = Math.floor( Math.random() * 6 ) +1;
        if (liar == 1) {
          announce += "calls bullshit."
        } else if (liar == 2) {
          announce += "finds that hard to believe."
        } else if (liar == 3) {
          announce += "thinks that's a crock."
        } else if (liar == 4) {
          announce += "isn't buying it."
        } else if (liar == 5) {
          announce += "wants proof."
        } else if (liar == 6) {
          announce = "It's " + this.currentRoom.caller + ", bitch."
        }
      }
      return announce;
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
      return "";
    },

    firstTurn: function() {
      if (this.currentRoom.totalTurns > 0) {
        return false;
      } else {
        return true;
      }
    },

    challengedFace: function() {
      if (this.currentRoom.action == "challenge" && this.currentRoom.showDice) {
        return this.currentRoom.bidFace;
      } else {
        return 0;
      }
    },

    minimumBidNumber: function() {
      if (this.currentRoom == undefined) {
        return 1;
      } else {
        return this.currentRoom.bidNumber;
      }
    },

    minimumBidFace: function() {
      if (this.currentRoom == undefined) {
        return 1;
      } else {
        return this.currentRoom.bidFace;
      }
    },

    winner: function () {
      if (this.currentRoom == undefined) {
        return "";
      } else {
        if (this.currentRoom.winnerID != "") {
          for (i of this.allPlayers) {
            if (i.id == this.currentRoom.winnerID) {
              return i.id;
            }
          }
        } else {
          return "";
        }
      }
    },


    dieFaceReplaceBig() {
      var diceReplace = "";
      for (i of this.currentUser.dice) {
        if (i == 1) {
          if (this.challengedFace == 1) {
            diceReplace +=
              `<div class="diceBig first-face" style="background-color: yellow">
                <span class="dotBig">
                </span>
              </div>`;
          } else {
            diceReplace +=
              `<div class="diceBig first-face">
                <span class="dotBig"></span>
              </div>`;
          }
        } else if (i == 2) {
          if (this.challengedFace == 2) {
            diceReplace +=
              `<div class="diceBig second-face" style="background-color: yellow"">
                <span class="dotBig"></span>
                <span class="dotBig"></span>
              </div>`;
          } else {
            diceReplace +=
              `<div class="diceBig second-face">
                <span class="dotBig"></span>
                <span class="dotBig"></span>
              </div>`;
          }
        } else if (i == 3) {
          if (this.challengedFace == 3) {
            diceReplace +=
              `<div class="diceBig third-face" style="background-color: yellow">
                <span class="dotBig"></span>
                <span class="dotBig"></span>
                <span class="dotBig"></span>
              </div>`;
          } else {
            diceReplace +=
              `<div class="diceBig third-face">
                <span class="dotBig"></span>
                <span class="dotBig"></span>
                <span class="dotBig"></span>
              </div>`;
          }
        } else if (i == 4) {
          if (this.challengedFace == 4) {
            diceReplace +=
              `<div class="diceBig fourth-face" style="background-color: yellow"">
                <div class="column">
                  <span class="dotBig"></span>
                  <span class="dotBig"></span>
                </div>
                <div class="column">
                  <span class="dotBig"></span>
                  <span class="dotBig"></span>
                </div>
              </div>`;
          } else {
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
          }
        } else if (i == 5) {
          if (this.challengedFace == 5) {
            diceReplace +=
              `<div class="diceBig fifth-face" style="background-color: yellow">
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
          } else {
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
          }
        } else if (i == 6) {
          if (this.challengedFace == 6) {
            diceReplace +=
            `<div class="diceBig sixth-face" style="background-color: yellow">
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
          } else {
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
    everyoneReady() {
      if (this.everyoneReady == true) {
        setTimeout(() => this.gameScreen(), 2000);
        setTimeout(() => this.goIntoGame(), 2000);
      }
    },

    minimumBidNumber(val) {
      console.log(val);
      this.changeBidNumber();
    },

    minimumBidFace(val) {
      console.log(val);
      this.changeBidFace();
    },

    winner() {
      if (this.winner != "") {
        for (i in this.allPlayers) {
          if (i.id == this.winner) {
            this.finalWinner = i;
            screen = "winScreen";
            if (this.finalWinner == this.currentUser) {
              this.clearRoomAndUser();
            } else {
              this.clearUser();
            }
          }
        }
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
          turn: false,
          out: false,
        })
        .then(this.waitingScreen());
      });
    },

    clearRooms() {
      for (i of this.users) {
        usersRef.doc(i.id).update({
          waiting: true,
          ready: false,
          room: 0,
          dice: [],
          action: "",
          bidFace: 1,
          bidNumber: 1,
          mood: "",
          player: 0,
          turn: false,
          out: false,
        });
      }
      for (i of this.rooms) {
        roomsRef.doc("room-" + String(i.roomNumber)).update({
          available: true,
          totalTurns: 0,
          turn: 1,
          caller: "",
          action: "",
          bidFace: 1,
          bidNumber: 1,
          showDice: false,
          resultsAnnouncementOne: "",
          resultsAnnouncementTwo: "",
          challengeResult: "",
          winnerID: "",
        })
      }
      this.reset = true;
    },

    // Waiting Room

    usernameToggle() {
      this.usernameToggleValue = !this.usernameToggleValue;
    },

    changeUsername() {
      if (this.newUsername != "") {
        this.usernameToggleValue = false;
        this.username = this.newUsername;
        usersRef.doc(this.id).update({ username: this.newUsername });
      }
    },

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
      this.finalWinner = {};
      if (this.allPlayers[0].id == this.id) {
        roomsRef.doc(this.currentRoomID).update({
          available: false,
          totalTurns: 0,
          turn: 1,
          caller: "",
          action: "",
          bidFace: 1,
          bidNumber: 1,
          roomNumber: this.currentUser.room,
          showDice: false,
          resultsAnnouncementOne: "",
          resultsAnnouncementTwo: "",
          challengeResult: "",
          winnerID: "",
        });
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

    changeMood: function(event) {
      targetID = event.currentTarget.id;
      usersRef.doc(this.id).update({ mood: targetID });
    },

    clearMood() {
      usersRef.doc(this.id).update({ mood: "" });
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

    changeBidNumber() {
      if (this.tempBidNumber < this.minimumBidNumber) {
        this.tempBidNumber = this.minimumBidNumber;
      }
      if (this.currentRoom.totalTurns == 0) {
        this.tempBidNumber = this.minimumBidNumber;
      }
    },

    changeBidFace() {
      if (this.tempBidFace < this.minimumBidFace) {
        this.tempBidFace = this.minimumBidFace;
      }
      if (this.currentRoom.totalTurns == 0) {
        this.tempBidFace = this.minimumBidFace;
      }
    },

    startBid() {
      if (this.firstTurn) {
        this.makeBid();
      } else {
        if (this.tempBidNumber < this.currentRoom.bidNumber || this.tempBidFace < this.currentRoom.bidFace) {
          this.errorMessage = "Your bid must be either a higher number of dice or a higher face than the previous bid.";
        } else {
          if (this.tempBidNumber == this.currentRoom.bidNumber && this.tempBidFace == this.currentRoom.bidFace) {
          this.errorMessage = "Your bid must be either a higher number of dice or a higher face than the previous bid.";
          } else {
            this.makeBid();
          }
        }
      }
    },

    makeBid() {
      this.errorMessage = "";
      usersRef.doc(this.id).update({
        action: "bid",
        bidNumber: this.tempBidNumber,
        bidFace: this.tempBidFace,
        turn: false
       });
      var nextTurn = this.currentUser.player + 1;
      if (nextTurn > this.allPlayers.length) {
        nextTurn = 1;
      }
      var playerFound = false;
      while (!playerFound) {
        for (i of this.allPlayers) {
          if (i.player == nextTurn && i.out) {
            nextTurn++;
            if (nextTurn > this.allPlayers.length) {
              nextTurn = 1;
            }
          } else if (i.player == nextTurn) {
            playerFound = true;
          }
        }
      }
      roomsRef.doc(this.currentRoomID).update({
        action: "bid",
        bidNumber: this.tempBidNumber,
        bidFace: this.tempBidFace,
        caller: this.currentUser.username,
        turn: nextTurn,
        totalTurns: this.currentRoom.totalTurns + 1
      });
      for (i of this.allPlayers) {
        if (i.id != this.id) {
          if (i.player == nextTurn) {
            usersRef.doc(i.id).update({
              action: "",
              bidNumber: this.tempBidNumber,
              bidFace: this.tempBidFace,
              turn: true
            });
          } else {
            usersRef.doc(i.id).update({
              action: "",
              bidNumber: this.tempBidNumber,
              bidFace: this.tempBidFace
            });
          }
        }
      }
    },

    makeChallenge() {
      usersRef.doc(this.id).update({
        action: "challenge",
        bidNumber: this.currentRoom.bidNumber,
        bidFace: this.currentRoom.bidFace,
        turn: false
       });
       roomsRef.doc(this.currentRoomID).update({
         action: "challenge",
         caller: this.currentUser.username,
         totalTurns: 0
       });
       for (i of this.allPlayers) {
         usersRef.doc(i.id).update({
           action: ""
         });
       }
       setTimeout(() => this.challengeReveal(), 3000);
    },

    challengeReveal() {
      var countResult = 0;
      var challengePassOrFail = "";
      for (i of this.allDice) {
        if (i == this.currentRoom.bidFace) {
          countResult++
        }
      }
      if (countResult >= this.currentRoom.bidNumber) {
        challengePassOrFail = "fail";
      } else {
        challengePassOrFail = "pass";
      }
      if (this.currentRoom.bidFace == 1) {
        var faceName = "one";
      } else if (this.currentRoom.bidFace == 2) {
        var faceName = "two";
      } else if (this.currentRoom.bidFace == 3) {
        var faceName = "three";
      } else if (this.currentRoom.bidFace == 4) {
        var faceName = "four";
      } else if (this.currentRoom.bidFace == 5) {
        var faceName = "five";
      } else if (this.currentRoom.bidFace == 6) {
        var faceName = "six";
      }
      if (countResult == 1) {
        var countAnnouncement = "There is 1 " + faceName + ".";
      } else {
        if (this.currentRoom.bidFace == 6) {
          var countAnnouncement = "There are " + String(countResult) + " sixes.";
        } else {
          var countAnnouncement = "There are " + String(countResult) + " " + faceName + "s.";
        }
      }
      roomsRef.doc(this.currentRoomID).update({
        showDice: true,
        resultsAnnouncementOne: countAnnouncement,
        challengeResult: challengePassOrFail,
      }).then(this.roundWinnerRevealWait());
    },

    roundWinnerRevealWait() {
      setTimeout(() => this.roundWinnerReveal(), 3000);
    },

    roundWinnerReveal() {
      var winnerResultOne = "";
      var winnerResultTwo

      // Set previous and next players for next round

      var turnBefore = this.currentUser.player - 1;
      if (turnBefore == 0) {
        turnBefore = this.allPlayers.length;
      }
      var previousFound = false;
      while (!previousFound) {
        for (i of this.allPlayers) {
          if (i.player == turnBefore && i.out) {
            turnBefore--;
            if (turnBefore == 0) {
              turnBefore = this.allPlayers.length;
            }
          } else if (i.player == turnBefore) {
            this.previousPlayer = i;
            previousFound = true;
          }
        }
      }
      var turnAfter = this.currentUser.player + 1;
      if (turnAfter > this.allPlayers.length) {
        turnAfter = 1;
      }
      var nextFound = false;
      while (!nextFound) {
        for (i of this.allPlayers) {
          if (i.player == turnAfter && i.out) {
            turnAfter++;
            if (turnAfter > this.allPlayers.length) {
              turnAfter = 1;
            }
          } else if (i.player == turnAfter) {
            this.nextPlayer = i;
            nextFound = true;
          }
        }
      }

      if (this.currentRoom.challengeResult == "fail") {
        winnerResultOne = this.previousPlayer.username + " wasn't lying!";
        winnerResultTwo = this.currentUser.username + " loses a die."
        roomsRef.doc(this.currentRoomID).update({
          resultsAnnouncementOne: winnerResultOne,
          resultsAnnouncementTwo: winnerResultTwo,
        }).then(this.nextRoundWait());
      } else if (this.currentRoom.challengeResult == "pass") {
        winnerResultOne = this.currentUser.username + " was right! " + this.previousPlayer.username + " is a liar!";
        winnerResultTwo = this.previousPlayer.username + " loses a die."
        roomsRef.doc(this.currentRoomID).update({
          resultsAnnouncementOne: winnerResultOne,
          resultsAnnouncementTwo: winnerResultTwo,
        }).then(this.nextRoundWait());
      }
    },

    nextRoundWait() {
      setTimeout(() => this.nextRoundResetDice(), 3000);
    },

    nextRoundResetDice() {
      roomsRef.doc(this.currentRoomID).update({ showDice: false }).then(this.nextRound());
    },

    nextRound() {
      if (this.currentRoom.challengeResult == "fail") {
        var playerNewDiceLength = this.currentUser.dice.length - 1;
        if (playerNewDiceLength == 0) {
          usersRef.doc(this.currentUser.id).update({
            action: "",
            dice: [],
            out: true,
          }).then(usersRef.doc(this.nextPlayer.id).update({
            turn: true
          })).then(this.checkForWinner());
        } else {
          var playerNewDice = [];
          for (i = 0; i < playerNewDiceLength; i++) {
            playerNewDice.push(Math.floor( Math.random() * 6 ) +1);
          }
          usersRef.doc(this.currentUser.id).update({
            action: "",
            dice: playerNewDice,
            turn: true,
          });
        }
        for (i of this.allPlayers) {
          if (i.id != this.currentUser.id && !i.out) {
            var newDice = [];
            for (j = 0; j < i.dice.length; j++) {
              newDice.push(Math.floor( Math.random() * 6 ) +1);
            }
            usersRef.doc(i.id).update({ dice: newDice });
          }
        }
        if (this.currentUser.out) {
          roomsRef.doc(this.currentRoomID).update({
            totalTurns: 0,
            turn: this.nextPlayer.player,
            caller: "",
            action: "",
            bidFace: 1,
            bidNumber: 1,
            showDice: false,
            resultsAnnouncementOne: "",
            resultsAnnouncementTwo: "",
            challengeResult: ""
          });
        } else {
          roomsRef.doc(this.currentRoomID).update({
            totalTurns: 0,
            turn: this.currentUser.player,
            caller: "",
            action: "",
            bidFace: 1,
            bidNumber: 1,
            showDice: false,
            resultsAnnouncementOne: "",
            resultsAnnouncementTwo: "",
            challengeResult: ""
          });
        }
      } else if (this.currentRoom.challengeResult == "pass") {
        var loserNewDiceLength = this.previousPlayer.dice.length - 1;
        if (loserNewDiceLength == 0) {
          usersRef.doc(this.previousPlayer.id).update({
            action: "",
            dice: [],
            out: true,
          }).then(usersRef.doc(this.currentUser.id).update({
            turn: true
          })).then(this.checkForWinner());
        } else {
          var loserNewDice = [];
          for (i = 0; i < loserNewDiceLength; i++) {
            loserNewDice.push(Math.floor( Math.random() * 6 ) +1);
          }
          usersRef.doc(this.previousPlayer.id).update({
            action: "",
            dice: loserNewDice,
            turn: true,
          });
        }
        for (i of this.allPlayers) {
          if (i.id != this.previousPlayer.id && !i.out) {
            var newDice = [];
            for (j = 0; j < i.dice.length; j++) {
              newDice.push(Math.floor( Math.random() * 6 ) +1);
            }
            usersRef.doc(i.id).update({ dice: newDice });
          }
        }
        if (this.previousPlayer.out) {
          roomsRef.doc(this.currentRoomID).update({
            totalTurns: 0,
            turn: this.currentUser.player,
            caller: "",
            action: "",
            bidFace: 1,
            bidNumber: 1,
            showDice: false,
            resultsAnnouncementOne: "",
            resultsAnnouncementTwo: "",
            challengeResult: ""
          });
        } else {
          roomsRef.doc(this.currentRoomID).update({
            totalTurns: 0,
            turn: this.previousPlayer.player,
            caller: "",
            action: "",
            bidFace: 1,
            bidNumber: 1,
            showDice: false,
            resultsAnnouncementOne: "",
            resultsAnnouncementTwo: "",
            challengeResult: ""
          });
        }
      }
    },

    checkForWinner() {
      var stillHere = [];
      for (i in this.allPlayers) {
        if (!i.out) {
          stillHere.push(i);
        }
      }
      if (stillHere.length == 1) {
        var winnerID = ""
        for (i in stillHere) {
          newWinnerID = i.id;
        }
        roomsRef.doc(this.currentRoomID).update({
          winnerID: newWinnerID
        });
      }
    },

    clearRoomAndUser() {
      roomsRef.doc(this.currentRoomID).update({
        available: true,
        totalTurns: 0,
        turn: 1,
        caller: "",
        action: "",
        bidFace: 1,
        bidNumber: 1,
        showDice: false,
        resultsAnnouncementOne: "",
        resultsAnnouncementTwo: "",
        challengeResult: "",
        winnerID: "",
      }).then(this.clearUser());
    },

    clearUser() {
      usersRef.doc(i.id).update({
        waiting: true,
        ready: false,
        room: 0,
        dice: [],
        action: "",
        bidFace: 1,
        bidNumber: 1,
        mood: "",
        player: 0,
        turn: false,
        out: false,
      });
    },

    backToWaitingRoom() {
      this.screen = "waiting";
    }

  },

// CREATED

  created() {
    this.tempBidNumber = 1;
    this.tempBidFace = 1;
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
