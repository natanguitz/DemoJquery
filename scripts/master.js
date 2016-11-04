 /* jshint esversion:6 */

var $box = $('.book');
var $title = $('#book-title');
var $author = $('#book-author');
var $cover = $('#book-url');

$.ajax({
	method: 'GET',
	url: 'http://exampel.net/books/',
	success: function(book){
    $.each(book, function(i , book){
      GetBooklist(book);
    });
	},
	error: function(){
		console.error('error geting the api data');
	}
});

/////POST A NEW BOOK
$('#btn-newbook').on('click', function(){
  $('.newbook-box').show();
    $('#btn-newbook').hide();

		$('#cancelnewbook').on('click', function(){
			$('.newbook-box').hide();
			$('#btn-newbook').show();
		});


  $('#sendnewbook').on('click', function(){
    var book = {
      title : $title.val(),
      author : $author.val(),
      cover : $cover.val()
    };

      $.ajax({
        type:'POST',
        url: 'http://exampel.net/books/',
        data: book,
        success: function(NewBook){
        GetBooklist(NewBook);
          $('#btn-newbook').show();
          $('.newbook-box').hide();
        },
        error: function(){
          alert('error saving the book');
          $('#btn-newbook').show();
          $('.newbook-box').hide();
        }
      });
    });
});


//Delete a book
$('.book').delegate('.Delete','click', function(){
			var $near = $(this).closest('.flex-item');

	$.ajax({
		type: 'DELETE',
		url: 'http://exampel.net/books/' + $(this).attr('data-id'),
		success: function(){
			$near.fadeOut(600, function(){
				$(this).remove();
			});
		}
	});
});

//Edit a book

$('.book').delegate('.Edit','click', function(){
	var $closest = $(this).closest('.flex-item');
	var update = $(this).attr('data-id');
	var $GetForm = $(`#${update}`);


	$closest.find('#formbox').show();
	$closest.find('#infobox').hide();
	console.log(update);

$GetForm.on('submit', function(e){
			e.preventDefault();
			$.ajax({
				method: 'PATCH',
				url:'http://exampel.net/books/' + update,
				data: $(this).serialize(),
				success: function(response){
					window.location.reload();
				}
			});
	});
});


$('.book').delegate('.canceledit','click', function(){
	var $near = $(this).closest('.flex-item');
	$near.find('#formbox').hide();
	$near.find('#infobox').show();

});

//populate  from API
function GetBooklist(book){
    $box.append(`
          <div id="book-container" class="flex-item">
            <div id="book-container-header">
								<div id="infobox">
		                <h1>Title: </h1>
										<span class="title">${book.title}</span>
		                <h3>Author: </h3>
										<span>${book.author} </span>
								</div>

								<div id="formbox">
									<form id="${book._id}" class="MyForm">
	  							Title:<br>
								  <input type="text" name="title" value="New title">
								  <br>
								  author:<br>
								  <input type="text" name="author" value="New author">
								  <br>
								 	Cover:<br>
								  <input type="text" name="cover" value="New author">
								  <br><br>
								  <input id="saveform" type="submit" value="Save">

									</form>
									<button class="canceledit ">Cancel</button>
								</div>
            </div>
            <div id="book-image">
                <img src="${book.cover}" />
            </div>
            <div id="buttons">
            <button class="BookButton Edit" data-id="${book._id}">Edit</button>
            <button data-id="${book._id}" class="BookButton Delete">Delete</button>
            </div>
          </div>
      `);
}
