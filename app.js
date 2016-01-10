$(document).ready(function() {

  var tada = new Howl({
    urls: ['/assets/audio/tada.mp3'],
  });
  var fart = new Howl({
    urls: ['/assets/audio/fart.mp3'],
  });
  var ding = new Howl({
    urls: ['/assets/audio/ding.mp3'],
  });

  var keyStroke = 0;
  var score = 0;
  var targetScore = 3;

  // Load a puzzle here
  var puzzle;
  var puzzles = [
    {
      answer: "SHAUN",
      image: "shaun.jpg"
    },
    {
      answer: "NEMO",
      image: "nemo.png"
    },
    {
      answer: "SHARK",
      image: "shark.jpeg"
    },
    {
      answer: "DORY",
      image: "dory.jpeg"
    },
    {
      answer: "FARMER",
      image: "farmer.png"
    },
    {
      answer: "NIGEL",
      image: "nigel.jpg"
    },
    {
      answer: "PENGUIN",
      image: "penguin.jpg"
    },
  ];

  $('#target-score').text(targetScore);

  var updateScore = function(score) {
    $('#score').text(score);
  };

  var highlightNextLetter = function(index) {
    $('#answer').children().removeClass('highlighted-letter');
    var $el = $('#answer').children().eq(index)
    $el.css('color', 'red');
    $el.addClass('highlighted-letter');
  };

  _.templateSettings.variable = 'context';
  var puzzleTemplate = _.template($('#puzzle-view').html());
  var successTemplate = _.template($('#winner-view').html());

  var loadPuzzle = function() {
    keyStroke = 0;
    puzzle = puzzles[_.random(0, puzzles.length - 1)];
    $('.content-wrap').html(puzzleTemplate(puzzle));
  };

  highlightNextLetter(0);
  updateScore(score);
  loadPuzzle();

  $(document).keydown(function(e) {
    var character = String.fromCharCode(e.keyCode);
    if (character == puzzle.answer.charAt(keyStroke)) {
      if (keyStroke != puzzle.answer.length - 1) {
        ding.play();
      }
      $('*[data-entry-index="' + (keyStroke + 1) + '"]').text(character.toLowerCase());
      var $answerLetter = $('#answer').children().eq(keyStroke);
      $answerLetter.css('color', 'green');
      keyStroke += 1;
      highlightNextLetter(keyStroke);
    } else {
      fart.play()
    }
    if (keyStroke == puzzle.answer.length) {
      score += 1;
      updateScore(score);
      tada.play();
      if (score == targetScore) {
        $('.content-wrap').html(successTemplate());
      } else {
        loadPuzzle();
      }
    }
  });
});
