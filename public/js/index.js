
$(function () {

  //  common
  $('#year').text(new Date().getFullYear())

  // ------------ intropage ----------------//

  // navbar

  let bodyexpend = false; // toggle down

  $('#introdropdown').on("click",()=>{
    if(!bodyexpend){
      $('body').animate({
        "margin-top" : "+=128px" 
      })
      bodyexpend = true
    }
    else{
      $('body').animate({
        "margin-top" : "-=128px"
      }) 
      bodyexpend = false
    }
  })

  // intro-image-section

  $('.content.intropage .slider .item').click(function()
  {

    let windowWith = screen.availWidth
    let mousePosition_x = event.pageX

    if((windowWith/2 < mousePosition_x)){
      $('html').animate( { scrollLeft: '+=460' }, 700)
    }
    else{
      $('html').animate( { scrollLeft: '-=460' }, 700)
    }
  })

   

  // ------------ intropage end ----------------//
})