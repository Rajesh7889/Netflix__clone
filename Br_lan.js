//basic functionalities.....       
function functionalities(){
    $(document).ready(()=>{
      $('.nav').click(()=>{
         if($('.main-nav1').css('display','none')){ 
            $('.main-nav1').css('display','block')
         }else{
            $('.main-nav1').css('display','none')
         }
        
      })
               //navigations...
                for(let i=0;i<6;i++){ 
                          $('.nav-item').eq(i).click(()=>{
                             if(i==0){
                                window.location.href='mn.html';
                             }
                             if(i==1){
                                window.location.href='tvshows.html';
                             }
                             if(i==2){
                                window.location.href='movies.html';
                             }
                             if(i==3){
                                window.location.href='newsandpopuler.html';
                             }
                            if(i==4){
                                window.location.href='mylist.html';
                             }
                            if(i==5){
                                window.location.href='Br_Language.html';
                             }
                          })}
                          for(let i=0;i<6;i++){ 
                           $('.nav-item1').eq(i).click(()=>{
                             if(i==0){
                                window.location.href='mn.html';
                             }
                             if(i==1){
                                window.location.href='tvshows.html';
                             }
                             if(i==2){
                                window.location.href='movies.html';
                             }
                             if(i==3){
                                window.location.href='newsandpopuler.html';
                             }
                            if(i==4){
                                window.location.href='mylist.html';
                             }
                            if(i==5){
                                window.location.href='Br_Language.html';
                             }
                          })
                        
                 }

        
         
      })
}


functionalities();