document.addEventListener("orientationchange", function (event) {
  switch (window.orientation) {
    case -90: case 90:
      /* Device is in landscape mode */
      break;
    default:
      console.log("Please use landscape mode");
  }
});


nx.onload = function () {
  console.log("yo");
  string1.strings = [];
  string1.numberOfStrings = 6;
  string1.init();

  string1.on("*", stringActions);
};

/*
var offsetBank = {
  "chromatic" : [0,1,2,3,4,5],
  "major" : [0,2,4,5,7,9],
  "minor": [0,2,3,5,7,10]
};
var noteOffsets = offsetBank["major"];
*/

var chordBank = {
  "open":
    ["E3", "A3", "D4", "G4", "B4", "E5"],

  "one":
    ["E3", "A3", "E4", "G4", "C4", "F#5"],

  "two":
    ["C3", "E3", "D4", "G4", "A#4", "E5"],

  "two":
    ["D3", "G3", "B4", "F#4", "A4", "D5"],
}

var synth = new Tone.PolySynth(6, Tone.synth);
synth.set({
  "envelope": {
    "release": 3
  }
});
synth.connect(Tone.Master);


function stringActions(event) {
  /*
  var clickPos = this.clickPos.x / this.width;
  var numChords = Object.keys(offsetBank).length;

  var chordIndex = clickPos * (numChords);
  chordIndex = Math.floor( chordIndex );
  
  var chordName = Object.keys(offsetBank)[chordIndex];
  noteOffsets = offsetBank[ chordName ];
  
  var stringNum = this.val.string;
  var rootNote = 60;
  var finalNote = 60 + noteOffsets[ stringNum ];
  
  var freq = Tone.Frequency(finalNote, "midi");
  */

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