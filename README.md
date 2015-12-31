# ScoreKeeper
A web application for keeping score during a card game, etc. created by [Dustin Hart](http://designsrdu.com).

## Synopsis

[ScoreKeeper](http://score3.designsrdu.com) is an object-oriented JavaScript web application that keeps track of scores during a game.  It supports two to six players.  Written in HTML5, CSS3, JavaScript, and JQuery.

## Usage

The user has the option to enter player names or leave them as "Player 1", "Player 2", etc.  Once scores are entered into ScoreKeeper, the user can close the tab or even close the browser window with the scores still be stored.  When the user returns to ScoreKeeper, the scores page will be displayed.  A top banner will be displayed which allows the user to return to the first page and create a new game. 
A link to the History page is displayed below the History section once a user has entered 10 or more scores.  This links to a full history of scores for this game.

## Motivation

This is the third iteration in a sequence of score keeping web applications that I have written.  The first was a horrible and rough version written in ASP.NET and C#.  I created the second version in poorly written JavaScript.  This was an improvement over the first version (it was much faster), but was hard to maintain and still had several issues on the mobile Safari browser.  Version 3 (this version) uses [FastClick](http://github.com/ftlabs/fastclick) in order to handle issues with the mobile Safari browser as well as uses <div>s instead of input buttons in order to solve some of these issues as well.  It is much more aesthetically appealing and fun to use.


## API Reference

[FastClick](http://github.com/ftlabs/fastclick)


## Contributors

Created by [Dustin Hart](http://designsrdu.com)
