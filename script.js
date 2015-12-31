window.addEventListener('load', function() {
    		new FastClick(document.body);
		}, false);

// After document finishes loading: 
$(function() {
	if (localStorage["newGame"] === "false") {
		$('#pg1').fadeOut(0);
		$('#pg2').fadeIn(200);
		$('#pg3').fadeIn(200);
		octopus.loadPrev();
		$('#newGameBanner').slideDown(1000);
	} 
	else {
		octopus.init();
		localStorage["newGame"] = "false";
	};
});


var model = {
	numPlayers: 2,
	names: [],
	scores: [],
	currentPos: 0, 
	tena: 0,
	histNames: [],
	histScores: []
};

var octopus = {
	init: function() {
		view.init();
		octopus.changePlayers(2);
	},
	changePlayers: function(num) {
		model.numPlayers = num;
		view.changeInputs(num);
	},
	storeNames: function() {
		// Sets empty player names to "Player 2", etc.
		for (var i = 0; i < model.numPlayers; i++) {
			if($('#player' + i).val() == "") {
				$('#player' + i).val($('#player' + i).attr("placeholder"));
			}
			// Adds player's names to model.names Array
			model.names.push($('#player' + i).val());
			model.scores.push(0);
		};
		// Store names in localStorage
		localStorage["names"] = JSON.stringify(model.names);
	},
	createTable: function() {
		model.numPlayers = model.names.length;
		var numPlayers = model.numPlayers;
		var names = model.names;
		var scores = model.scores;
		view.createRows(numPlayers, names, scores);
	},
	changeTena: function(amount) {
		var pos = model.currentPos;
		var viewTena = "#tena" + pos;
		// Add points to model.tena
		model.tena += amount;
		// Change tenaScore in the view
		view.changeTena(pos, viewTena, model.tena);
	},
	submit: function() {
		$('#newGameBanner').slideDown(1000);
		var i = model.currentPos;
		// Change the model score
		model.scores[i] += model.tena;
		// Change scores in localStorage to new scores
		localStorage["scores"] = JSON.stringify(model.scores);
		// Add scores to history
		octopus.updateHistory(model.names[i], model.tena);
		// Return tena to 0 in model
		model.tena = 0;
		// Change the visible score, return tena to 0, hide tena, remove .active class fron current pos. add .activr class to next pos
		view.changeScore(i, model.scores[i], model.numPlayers);
		// change pos in model
		if(i === model.numPlayers-1) {
			model.currentPos = 0;
		}
		else {
			model.currentPos += 1;
		}
	},
	updateHistory: function(name, scoreChange) {
		// Update History arrays in model
		model.histNames.unshift(name);
		model.histScores.unshift(scoreChange);
		// Save History in localStorage
		localStorage["histNames"] = JSON.stringify(model.histNames);
		localStorage["histScores"] = JSON.stringify(model.histScores);
		// Update History in View
		view.changeHistory(model.histNames, model.histScores);
	},
	showFullHistory: function() {
		view.changeFullHistory(model.histNames, model.histScores);
	},
	loadPrev: function() {
		// Set model arrays equal to arrays in localStorage
		model.names = JSON.parse(localStorage["names"]);
		model.scores = JSON.parse(localStorage["scores"]);
		model.histNames = JSON.parse(localStorage["histNames"]);
		model.histScores = JSON.parse(localStorage["histScores"]);
		// Fade out page 1
		$('#pg1').fadeOut(400);
		// Fade In page 2
		$('#pg2').delay(400).fadeIn(400);
		octopus.createTable();
		view.changeHistory(model.histNames, model.histScores);
	},
	newGame: function() {
		localStorage["newGame"] = true;
		location.href = location.href;
	}
};

var view = {
	// When Num of Players buttons clicked, change btn colors to show selection
	init: function() {
	    $('.btn').click( function() {
			$(".btn").removeClass('btn-selected');
			$(this).addClass('btn-selected');
			octopus.changePlayers($('.btn-selected').attr('value'));
		});
		// onclick for Let's Play! Button
		$('#pg1Submit').click( function() {
			octopus.storeNames();
			// Fade out page 1
			$('#pg1').fadeOut(400);
			// Fade In page 2
			$('#pg2').delay(400).fadeIn(400);
			octopus.createTable();
		});
		// Add "Load Prev Scores" link to pg1 
		// If prev scores in localStorage...
		if(localStorage["names"]) {
			$('#loadPrev').html('<p>or <a onclick="octopus.loadPrev()">Load Previous Scores</a></p>');
		};
	},
	changeInputs: function(num) {
		// If Any Inputs, Remove All Inputs
		$('#playersNames').html('');
		// Add Inputs
		for (var i = 0; i < num; i++) {
			$('<input type="text" class="playerInputs" id="player' + i + '" placeholder="Player ' + (i+1) + '"/><br>').appendTo('#playersNames');

		};
		// When user clicks enter on playerInputs, submits info like a form -- same as clicking "Let's Play" Button
		$(".playerInputs").keyup(function (e) {
    	if (e.keyCode == 13) {
        	octopus.storeNames();
			// Fade out page 1
			$('#pg1').fadeOut(400);
			// Fade In page 2
			$('#pg2').delay(400).fadeIn(400);
			octopus.createTable();
    	}
		});
	},
	createRows: function(numPlayers, names, scores) {
		// for each player...
		for (var i = 0; i < numPlayers; i++) {
			$('<tr id="tr'+ i +'"><td id="name'+ i +'"></td><td id="score'+ i +'">'+ scores[i] +'</td><td style="visibility: hidden;" id="tena'+ i +'">0</td></tr>').appendTo('#scoreTable');
			$('#name' + i).text(names[i]);
		};
		// Show initially selected row (row 0)
		$('#name0').addClass('active');
		$('#score0').addClass('active');
		$('#tena0').addClass('active');
	},
	changeTena: function(currentPos, viewTena, tenaScore) {
		// Change visible tena score color
		if (tenaScore < 0) {
			$(viewTena).css("color", "#C41535"); // red [or #F9F62C yellow]
			// Change view Tena
			$(viewTena).text(tenaScore);
		}
		else if (tenaScore > 0) {
			$(viewTena).css("color", "#345E38");  // green [or #505050 grey]
			// Change view Tena
			$(viewTena).text("+" + tenaScore);	
		}
		else {
			$(viewTena).css("color", "#FFF");  // white (normal)
			// Change view Tena
			$(viewTena).text(tenaScore);
		};
		// Make Current viewTena Visible
		$(viewTena).css('visibility', 'visible');
		$(viewTena).addClass('active');
	},
	changeScore: function(pos, newScore, numPlayers) {
		var score = "#score" + pos;
		var tena = "#tena" + pos;
		var name = "#name" + pos;
		var nextPos = pos + 1;
		if(pos === numPlayers-1) {
			nextPos = 0;
		};	
		var nextName = "#name" + nextPos;
		var nextScore = "#score" + nextPos;	
		var nextTena = "#tena" + nextPos;
		// Change visible score
		$(score).text(newScore);
		// Hide tenaScore, un-highlight currently selected row
		$(tena).text(0).css('visibility', 'hidden');
		$(score).removeClass('active');
		$(name).removeClass('active');
		$(tena).removeClass('active');
		// Make next row .active
		$(nextName).addClass('active');
		$(nextScore).addClass('active');
		$(nextTena).addClass('active');
	},
	changeHistory: function(namesArray, scoresArray) {
		// If History is invisible (pg3 display: none), make visible
			$('#pg3').delay(400).fadeIn(400);

		// Delete Current History
		$('#hist').html('');

		// Create tr for each name and score up to 10 rows
		for (var i = 0; i < namesArray.length && i <= 9; i++) {
		  $('<tr id="hist'+ i +'"><td class="histName">' + namesArray[i] + " " + '</td><td class="histScore">' + scoresArray[i] +'</td></tr>').appendTo('#hist');
		  // Sets color of each history row (red, green, white)
		  if (scoresArray[i] < 0) {
		 	$('#hist' + i).css("color", "#C41535"); // red [or #F9F62C yellow]
		  }
		  else if (scoresArray[i] > 0) {
		 	$('#hist' + i).css("color", "#345E38");  // green [or #505050 grey]
		  }; 
		};
		// If > 10 rows, add link 5o view full history
		if (namesArray.length >= 10) {
			$('<tr><td id="seeFullHist" colspan="2"><a href="history/index.html">See full history</a></td></tr>').appendTo("#hist");
		};
	}
};