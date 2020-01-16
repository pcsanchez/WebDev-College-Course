

function onImageClick() {
    let imgs = $('.thumbnail');

   $(imgs).on('click', (event)=> {
       let source = $(event.target).attr('src');
       $('.hero').children().attr('src',source);
   });
    
}


function init() {
    onImageClick();
}

init();