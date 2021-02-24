const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

const playsound = async () => {
  let num = 0;
  for (let i in app.musicScore) {
    if (app.musicScore[i].substr(0, 1) == "d") {
      num = Number(app.musicScore[i].substr(1, app.musicScore[i].length - 1));
      console.log(num);
      await sleep((1000 / 8) * num);
    } else {
      let sound = "music/1/" + app.musicScore[i] + ".ogg";
      sound = new Audio(sound);
      sound.play();
    }
  }
};

const app = new Vue({
  el: "#app",
  data: {
    musicScore: [],
    currentTone: 60,
  },
  methods: {
    play() {
      playsound();
    },
    addTone(tone) {
      this.musicScore.push((tone + this.currentTone - 1).toString());
      let mp3 = "music/1/" + (tone + this.currentTone - 1).toString() + ".ogg";
      mp3 = new Audio(mp3);
      mp3.play();
    },
    addDelay(delay) {
      let len = this.musicScore.length;
      if (len > 0) {
        if (this.musicScore[len - 1].substr(0, 1) == "d") {
          let a =
            "d" +
            (
              Number(
                this.musicScore[len - 1].substr(
                  1,
                  this.musicScore[len - 1].length - 1
                )
              ) + delay
            ).toString();
          this.musicScore.pop();
          this.musicScore.push(a);
        } else {
          this.musicScore.push("d" + delay.toString());
        }
      } else {
        this.musicScore.push("d" + delay.toString());
      }
    },
    increaseTone() {
      if (this.currentTone < 120) {
        this.currentTone += 12;
      }
    },
    decreaseTone() {
      if (this.currentTone > 0) {
        this.currentTone -= 12;
      }
    },
    del() {
      this.musicScore.pop();
    },
  },
});
