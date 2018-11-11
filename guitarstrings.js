document.addEventListener("orientationchange", function (event) {
  switch (window.orientation) {
    case -90: case 90:
      /* Device is in landscape mode */
      break;
    default:
      console.log("Landscape mode works best");
  }
});

window.addEventListener("resize", function(){
  if( string1 == undefined )
    return;

  var stringCanvas = string1.canvas;
  
  stringCanvas.style.width = '100%';
  stringCanvas.style.height = '100%';
  string1.init();
});

nx.onload = function () {
  console.log("yo");
  string1.strings = [];
  string1.numberOfStrings = 6;
  string1.init();

  string1.on("*", stringPluck);
};

var chordBank = {
  "open":
    ["E3", "A3", "D4", "G4", "B4", "E5"],

  "one":
    ["E3", "A3", "E4", "G4", "C4", "F#5"],

  "two":
    ["C3", "E3", "D4", "G4", "A#4", "E5"],

  "three":
    ["D3", "G3", "B4", "F#4", "A4", "D5"],

  "s" : 
  ["A2", "F#3", "A3", "D4", "F#4", "C5"],

  "four":
    ["D3", "A3", "F#4", "C4", "F#5", "D5"],
}

var synth = new Tone.PolySynth(6, Tone.synth);
synth.set({
  "envelope": {
    "release": 3
  }
});
synth.connect(Tone.Master);

function stringPluck(event) {
  var clickPos = this.clickPos.x / this.width;
  var numChords = Object.keys(chordBank).length;

  var chordIndex = clickPos * (numChords);
  chordIndex = Math.floor(chordIndex);

  var chordName = Object.keys(chordBank)[chordIndex];
  var notes = chordBank[chordName];

  var stringNum = this.val.string;
  var note = notes[stringNum];

  var freq = Tone.Frequency(note);
  synth.triggerAttackRelease(freq, "16n")

}