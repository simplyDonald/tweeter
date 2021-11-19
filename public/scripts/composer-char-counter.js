$(document).ready(function() {
  
  $('#tweet-text').on('keyup',function(event){
    $('#long-tweet').css('display','none');
    $('#empty-value').css('display','none');

    const maxlength = 140;
    let inputLength = $(this).val().length;
    const charactersLength = maxlength - inputLength;
    let $counter = $(this).parent().children('#form-items').children('.counter');
    $counter.text(charactersLength);
    if (charactersLength < 0) {
      $counter.css('color','red');
    } else {
      $counter.css('color','black');
    }
  })

  // const currentDate = new Date();
  $('#article-date').text('10 days ago');
  

});
