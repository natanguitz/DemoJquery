'use strict';

/* jshint esversion:6 */

var $box = $('.book');
var $title = $('#book-title');
var $author = $('#book-author');
var $cover = $('#book-url');

$.ajax({
	method: 'GET',
	url: 'http://exampel.net/books/',
	success: function success(book) {
		$.each(book, function (i, book) {
			GetBooklist(book);
		});
	},
	error: function error() {
		console.error('error geting the api data');
	}
});

/////POST A NEW BOOK
$('#btn-newbook').on('click', function () {
	$('.newbook-box').show();
	$('#btn-newbook').hide();

	$('#cancelnewbook').on('click', function () {
		$('.newbook-box').hide();
		$('#btn-newbook').show();
	});

	$('#sendnewbook').on('click', function () {
		var book = {
			title: $title.val(),
			author: $author.val(),
			cover: $cover.val()
		};

		$.ajax({
			type: 'POST',
			url: 'http://exampel.net/books/',
			data: book,
			success: function success(NewBook) {
				GetBooklist(NewBook);
				$('#btn-newbook').show();
				$('.newbook-box').hide();
			},
			error: function error() {
				alert('error saving the book');
				$('#btn-newbook').show();
				$('.newbook-box').hide();
			}
		});
	});
});

//Delete a book
$('.book').delegate('.Delete', 'click', function () {
	var $near = $(this).closest('.flex-item');

	$.ajax({
		type: 'DELETE',
		url: 'http://exampel.net/books/' + $(this).attr('data-id'),
		success: function success() {
			$near.fadeOut(600, function () {
				$(this).remove();
			});
		}
	});
});

//Edit a book

$('.book').delegate('.Edit', 'click', function () {
	var $closest = $(this).closest('.flex-item');
	var update = $(this).attr('data-id');
	var $GetForm = $('#' + update);

	$closest.find('#formbox').show();
	$closest.find('#infobox').hide();
	console.log(update);

	$GetForm.on('submit', function (e) {
		e.preventDefault();
		$.ajax({
			method: 'PATCH',
			url: 'http://exampel.net/books/' + update,
			data: $(this).serialize(),
			success: function success(response) {
				window.location.reload();
			}
		});
	});
});

$('.book').delegate('.canceledit', 'click', function () {
	var $near = $(this).closest('.flex-item');
	$near.find('#formbox').hide();
	$near.find('#infobox').show();
});

//populate  from API
function GetBooklist(book) {
	$box.append('\n          <div id="book-container" class="flex-item">\n            <div id="book-container-header">\n\t\t\t\t\t\t\t\t<div id="infobox">\n\t\t                <h1>Title: </h1>\n\t\t\t\t\t\t\t\t\t\t<span class="title">' + book.title + '</span>\n\t\t                <h3>Author: </h3>\n\t\t\t\t\t\t\t\t\t\t<span>' + book.author + ' </span>\n\t\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t\t<div id="formbox">\n\t\t\t\t\t\t\t\t\t<form id="' + book._id + '" class="MyForm">\n\t  \t\t\t\t\t\t\tTitle:<br>\n\t\t\t\t\t\t\t\t  <input type="text" name="title" value="New title">\n\t\t\t\t\t\t\t\t  <br>\n\t\t\t\t\t\t\t\t  author:<br>\n\t\t\t\t\t\t\t\t  <input type="text" name="author" value="New author">\n\t\t\t\t\t\t\t\t  <br>\n\t\t\t\t\t\t\t\t \tCover:<br>\n\t\t\t\t\t\t\t\t  <input type="text" name="cover" value="New author">\n\t\t\t\t\t\t\t\t  <br><br>\n\t\t\t\t\t\t\t\t  <input id="saveform" type="submit" value="Save">\n\n\t\t\t\t\t\t\t\t\t</form>\n\t\t\t\t\t\t\t\t\t<button class="canceledit ">Cancel</button>\n\t\t\t\t\t\t\t\t</div>\n            </div>\n            <div id="book-image">\n                <img src="' + book.cover + '" />\n            </div>\n            <div id="buttons">\n            <button class="BookButton Edit" data-id="' + book._id + '">Edit</button>\n            <button data-id="' + book._id + '" class="BookButton Delete">Delete</button>\n            </div>\n          </div>\n      ');
}