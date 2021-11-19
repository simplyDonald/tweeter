/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const createTweetElement = (tweetObj) =>{
  const img = tweetObj.user.avatars;
  const timeAgo = timeago.format(tweetObj.created_at); 
  const $template = $(
    `<article id='tweet-card'>
      <div class='article-header'>
      <div class='img-sub'>
        <div><img src='${img}' alt='profile-pic' width='30px'></div>
        <div id='name'>${tweetObj.user.name}</div>
      </div>
      <div id='user-handle'>${tweetObj.user.handle}</div>
      </div>
      <span id='article-tweet'>${tweetObj.content.text}</span>
      <footer id='article-footer'>
        <div id='article-date'>${timeAgo}</div>
        <div class='icons'>
          <i class='far fa-flag'></i>
          <i class='fas fa-retweet'></i>
          <i class='fas fa-heart'></i>
        </div>
      </footer>
    </article>`);
    //replace the user inputted string with the escaped string using jquery's .text() method
    $template.find('#article-tweet').text(tweetObj.content.text);
  return $template;
}

const renderTweets = (tweets) =>{
    // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
  for (const tweet of tweets) {
  $('.fresh-tweets').prepend(createTweetElement(tweet));
  }
}

$(function() {
  // Handler for .ready() called.
  let $counter = $(this).find('.counter');
  $('#btn').on('click',function(){
    $('#tweet-form').slideToggle('fast');
    $('#tweet-text').focus();
  });
  $( '#tweet-form' ).submit(function( event ) {
    event.preventDefault();
    if (!event.target.text.value) {
      $('#long-tweet').css('display','none');
      $('#empty-value').slideDown('slow');
      return;
    }

    if (event.target.text.value.length > 140) {
      $('#empty-value').css('display','none');
      $('#long-tweet').slideDown('slow');
      return;
    }

    const val = $(event.target.text).serialize();
    $.post(`/tweets/`, val).then(() => {
      event.target.text.value = '';
      loadTweets();
      $counter.html('140');
    })
  });

  const loadTweets = ()=>{
    $.get(`/tweets`).then((data)=>{
      renderTweets(data);
    })
  }
  loadTweets();
});



