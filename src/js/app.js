var myApp = angular.module("myApp", []);
myApp.controller("myController", function ($scope, $http, $q, $filter) {
  $scope.init = function () {
    sampleMusic();
  };

  getData = () => {
    var file = "data/scores.json";
    $http.get(file).then(function (response) {});
  };

  $scope.init();
});

function sampleMusic() {
  const { Factory } = Vex.Flow;
  // Create a VexFlow renderer attached to the DIV element with id="output".
  const vf = new Factory({ renderer: { elementId: "output" } });
  const score = vf.EasyScore();
  const system = vf.System();
  // Create a 4/4 treble stave and add two parallel voices.
  system
    .addStave({
      voices: [
        // Top voice has 4 quarter notes with stems up.
        score.voice(score.notes("C#5/q, B4, A4, G#4", { stem: "up" })),
        // Bottom voice has two half notes, with stems down.
        score.voice(score.notes("C#4/h, C#4", { stem: "down" })),
      ],
    })
    .addClef("treble")
    .addTimeSignature("4/4");
  // Draw it!
  vf.draw();
}

// FILTERS
myApp.filter("toDate", function () {
  return function (items) {
    return new Date(items);
  };
});

// DIRECTIVES
myApp.directive("booDirective", function () {
  return {
    link: postLink,
  };
  function postLink(scope, elem, attrs) {
    var len = window.innerWidth / 2;
    var VF = Vex.Flow;
    var div = elem[0];
    var renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);
    // Size our svg:
    renderer.resize(window.innerWidth / 2, 200);

    // And get a drawing context:
    var context = renderer.getContext();
    // Create a stave at position 0, 40 of width of 'len' on the canvas.
    var stave = new VF.Stave(0, 40, len);

    // Add a clef and time signature.
    stave.addClef("treble").addTimeSignature("4/4");

    // Connect it to the rendering context and draw!
    stave.setContext(context).draw();
  }
});
