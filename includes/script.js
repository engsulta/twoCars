
$(function() {

    var anim_id;
    
   
    
    //saving dom objects to variables
    
    var container = $('#container');
    var formula1 = $('#formula1');
    var formula2 = $('#formula2');
    var honda1 = $('#race1');
    var honda2 = $('#race2');
    var car_details=$('#car_details');
    var leftarrow=$('#leftarr');
    var rightarrow=$('#rightarr');
    var car1 = $('#car1');
    var car2 = $('#car2');
    var car_1 = $('#car_1');
    var car_2 = $('#car_2');
    var car_3 = $('#car_3');
    var cir_l=$('#circle_l');
    var cir_r=$('#circle_r');
    var rect_l=$('#rect_l');
    var rect_r=$('#rect_r');
    var line_1 = $('#line_1');
    var line_2 = $('#line_2');
    var line_3 = $('#line_3');
    var restart_div = $('#restart_div');
    var restart_btn = $('#restart');
    var start_div = $('#start_div');
    var start_btn = $('#start');
    var pause_btn=$('#pause');
    var mute_btn0=$('#mute_btn0');
    var mute_music0=$('#mute_music0');
    var mute_btn1=$('#mute_btn1');
    var mute_music1=$('#mute_music1');
    var helpskip=$('#helpskip');
    var helpdiv=$('#helpdiv');
    var done=$('#done');
    var audio_back = document.getElementById("back_sound");
    var inner_score = $('#inner_score');
    var speedsound=document.getElementById("speedsound");
    var crashsound=document.getElementById("crashsound");
    
    //saving some initial setup
    var container_left = parseInt(container.css('left'));
    var container_width = parseInt(container.width());
    var container_height = parseInt(container.height());
    var car1_width = parseInt(car1.width());
    var car1_height = parseInt(car1.height());
    var car2_width = parseInt(car2.width());
    var car2_height = parseInt(car2.height());
    var obstacle_width = parseInt(cir_l.width());
    var obstacle_height = parseInt(cir_l.height());
    
    var ismuted_sound=0;
    var ismuted_music=0;
   var exitfrom=0;
    var hitl=0;
    var hitr=0;
    var firstclick=0;
    //some other declarations
    var game_over = false;

    var score_counter = 1;

    var speed = 4;
    var line_speed = 8;
    
    var degrees;
    var paused=0;


    var highest_score=localStorage.getItem("highest_score");//
    if(highest_score==null) highest_score=0;
    var slideIndex = 1;
    var cars_details =["Formula 1 F1 1997 ","Formula 1 A1 2004 ","Honda 1 h1 2009 ","Honda 1 h1 2009 "];
    var cars_rates=[4,3,5,2];
    var acceptable_positions=[10,35,65,90];
    var acceptable_vpos=[0,50,90,130,180];
    var move_right = false;
    var move_left = false;
    var move_up = false;
    var move_down = false;
    var move_right_2 = false;
    var move_left_2 = false;
    var move_up_2= false;
    var move_down_2 = false;
  
    
    /////////////////////////////////////////////////sound setting 
    
     audio_back.volume = 0.4;
     mute_btn0.click(function() {
        ismuted_sound=(ismuted_sound+1)%2;
     if(ismuted_sound==1)    {
     speedsound.muted=true;
     crashsound.muted=true;
     mute_btn0.css({transform: "translateY(4px)"});
     mute_btn0.css('box-shadow','0 0 5px 5px rgba(248, 219, 219, 0.534)');
     mute_btn1.css({transform: "translateY(4px)"});
     mute_btn1.css('box-shadow','0 0 5px 5px rgba(248, 219, 219, 0.534)');
     }
     else     {
        
        speedsound.muted=false;
        crashsound.muted=false;
        mute_btn0.css({transform: "translateY(0px)"});
        mute_btn0.css('box-shadow','0 0');
        mute_btn1.css({transform: "translateY(0px)"});
        mute_btn1.css('box-shadow','0 0');
     }
    });
    mute_music0.click(function() {
        ismuted_music=(ismuted_music+1)%2;
        if(ismuted_music==1)
        {
            audio_back.volume=0;  
            mute_music0.css({transform: "translateY(4px)"});
            mute_music0.css('box-shadow','0 0 5px 5px rgba(248, 219, 219, 0.534)');
            mute_music1.css({transform: "translateY(4px)"});
            mute_music1.css('box-shadow','0 0 5px 5px rgba(248, 219, 219, 0.534)'); 
        }
        else 
        {
            audio_back.volume=.4; 
            mute_music0.css({transform: "translateY(0px)"});
            mute_music0.css('box-shadow','0 0');
            mute_music1.css({transform: "translateY(0px)"});
            mute_music1.css('box-shadow','0 0');      
        }
       });
       
       mute_btn1.click(function() {
        ismuted_sound=(ismuted_sound+1)%2;
     if(ismuted_sound==1)    {
        speedsound.muted=true;
        crashsound.muted=true;
        mute_btn0.css({transform: "translateY(4px)"});
        mute_btn0.css('box-shadow','0 0 5px 5px rgba(248, 219, 219, 0.534)');
        mute_btn1.css({transform: "translateY(4px)"});
        mute_btn1.css('box-shadow','0 0 5px 5px rgba(248, 219, 219, 0.534)');
        
     }
     else     {
        speedsound.muted=false;
        crashsound.muted=false;
        mute_btn0.css({transform: "translateY(0px)"});
        mute_btn0.css('box-shadow','0 0');
        mute_btn1.css({transform: "translateY(0px)"});
        mute_btn1.css('box-shadow','0 0');
        
     }
    });
    mute_music1.click(function() {
        ismuted_music=(ismuted_music+1)%2;
        if(ismuted_music==1)
        {
            audio_back.volume=0;   
            mute_music0.css({transform: "translateY(4px)"});
            mute_music0.css('box-shadow','0 0 5px 5px rgba(248, 219, 219, 0.534)');
            mute_music1.css({transform: "translateY(4px)"});
            mute_music1.css('box-shadow','0 0 5px 5px rgba(248, 219, 219, 0.534)');
        
        }
        else 
        {
            audio_back.volume=.4; 
            mute_music0.css({transform: "translateY(0px)"});
            mute_music0.css('box-shadow','0 0');
            mute_music1.css({transform: "translateY(0px)"});
            mute_music1.css('box-shadow','0 0');   
        }
       });
       
    
///////////////////////////////////////////////////////////mysideview here
    showDivs(slideIndex);

    function plusDivs(n) {
        showDivs(slideIndex += n);
    }
    
    function showDivs(n) {
        var i;
        var x = $(".mySlides");
        
        if (n > x.length) {slideIndex = 1;car_details.text(cars_details[0]);} 
        if (n < 1) {slideIndex = x.length;car_details.text(cars_details[x.length-1]);} 
        for (i = 0; i < x.length; i++) {
            x[i].style.display = "none"; 
        }
        x[slideIndex-1].style.display = "block"; 
        car_details.text(cars_details[slideIndex-1]);
        $('#stars li.star').removeClass('hover');
        for(var i=1;i<=cars_rates[slideIndex-1];i++){$('#stars li.star:nth-child('+i+')').addClass('hover');}

    }
    /*-----------------------drag car change car with selected in the menu----------------------------- */
    
    formula2.click(function(){
       
        $('#formula_selected_r').css('display','inline');
        car1.css('display','none');

        car1=$('#formula_selected_r');
    });
    formula1.click(function(){
       
        $('#formula_selected_l').css('display','inline');
        car2.css('display','none');
        car2=$('#formula_selected_l');
    });
    honda2.click(function(){
        $('#honda_selected_r').css('display','inline');
        car1.css('display','none');
        car1=$('#honda_selected_r');
    });
    honda1.click(function(){
        $('#honda_selected_l').css('display','inline');
        car2.css('display','none');
        car2=$('#honda_selected_l');
    });
    /* ------------------------------GAME CODE STARTS HERE------------------------------------------- */

    /* Move the car1s */
    $(document).on('keydown', function(e) {
        if (game_over === false) {
            var key = e.keyCode;
            if (key === 37 && move_left === false) {
                move_left = requestAnimationFrame(left); 
                degrees=-5;    
            } 
            if (key === 65 && move_left_2 === false) {
              
                move_left_2 = requestAnimationFrame(left_2);
                degrees=-5;
            }
            else if (key === 39 && move_right === false) {
                move_right = requestAnimationFrame(right);  
                degrees=5;
            }
            else if (key === 68 && move_right_2 === false) {
                move_right_2 = requestAnimationFrame(right_2); 
                degrees=5; 
            }
             else if ((key === 38) && move_up === false) {
                move_up = requestAnimationFrame(up);
            }
            else if ((key === 40) && move_down === false) {
                move_down = requestAnimationFrame(down);
            }
            else if ((key===87) && move_up === false) {
                move_up_2 = requestAnimationFrame(up_2);
            }
            else if ((key===83) && move_down === false) {
                move_down_2 = requestAnimationFrame(down_2);
            }
        }
    });

    $(document).on('keyup', function(e) {
        if (game_over === false) {
            var key = e.keyCode;
            if (key === 37) {
                car1.rotate(0);
                cancelAnimationFrame(move_left);
                move_left = false;
            } else if (key === 39) {
                car1.rotate(0);
                cancelAnimationFrame(move_right);
                move_right = false;
               
            } else if (key === 38) {
                cancelAnimationFrame(move_up);
                move_up = false;
            } else if (key === 40) {
                cancelAnimationFrame(move_down);
                move_down = false;
            }
            else if (key === 65) {
                car2.rotate(0);
                cancelAnimationFrame(move_left_2);
                move_left_2 = false;
                car2.rotate(0);
            } else if (key === 68) {
                car2.rotate(0);
                cancelAnimationFrame(move_right_2);
                move_right_2 = false;
            } else if (key === 87) {
                cancelAnimationFrame(move_up_2);
                move_up_2 = false;
            } else if (key === 83) {
                cancelAnimationFrame(move_down_2);
                move_down_2 = false;
            }
        }
    });

    jQuery.fn.rotate = function(degrees) {
        $(this).css({'transform' : 'rotate('+ degrees +'deg)'});
        return $(this);
    };

    function left() {
        if (game_over === false && parseInt(car1.css('left')) >.5 *(container_width+parseInt(line_1.width())) ){
            car1.css('left', parseInt(car1.css('left')) - 10);
            car1.rotate(--degrees);
            move_left = requestAnimationFrame(left);
        }
    }
    function left_2() {
        if (game_over === false && parseInt(car2.css('left')) >5 ){
            car2.css('left', parseInt(car2.css('left')) - 10);
            car2.rotate(--degrees);
            move_left_2 = requestAnimationFrame(left_2);
        }
    }
    function right() {
        if (game_over === false && parseInt(car1.css('left')) < container_width - car1_width-5) {
            car1.css('left', parseInt(car1.css('left')) + 10);
            car1.rotate(++degrees);
            move_right = requestAnimationFrame(right);
        }
    }
    function right_2() {
        if (game_over === false && parseInt(car2.css('left')) <.48*(container_width)-car2_width ) {
            car2.css('left', parseInt(car2.css('left')) + 10);
            car2.rotate(++degrees);
            move_right_2 = requestAnimationFrame(right_2);
        }
    }
    function up() {
        if (game_over === false && parseInt(car1.css('top')) > 0) {
            car1.css('top', parseInt(car1.css('top')) - 3);
            move_up = requestAnimationFrame(up);
        }
    }

    function down() {
        if (game_over === false && parseInt(car1.css('top')) < container_height - car1_height) {
            car1.css('top', parseInt(car1.css('top')) + 3);
            move_down = requestAnimationFrame(down);
        }
    }
    function up_2() {
        if (game_over === false && parseInt(car2.css('top')) > 0) {
            car2.css('top', parseInt(car2.css('top')) - 3);
            move_up_2 = requestAnimationFrame(up_2);
        }
    }

    function down_2() {
        if (game_over === false && parseInt(car2.css('top')) < container_height - car2_height) {
            car2.css('top', parseInt(car2.css('top')) + 3);
            move_down_2 = requestAnimationFrame(down_2);
        }
    }

    /*start the game logo*/
    
    /* Move the cars and lines */
   // 

    function repeat() {
        if (collision(car1, rect_l) || collision(car1, rect_r) ||collision(car2, rect_l) || collision(car2, rect_r) ) {
            stop_the_game();
            return;
        }
        
        if(hit(car1,cir_r)){
            cir_r.css('display','none'); 
           // cir_r.animate({transform: "scale(0)"}, 500, 'linear');
            hitr=1;

        }else if(hitr==0&&parseInt(car1.css('top'))<parseInt(cir_r.css('top'))-100){
            exitfrom=1;
            stop_the_game();
            return;
        }
        
        if(hit(car2,cir_l)){
            cir_l.css('display','none');
            hitl=1;    
        }else if(hitl==0&&parseInt(car2.css('top'))<parseInt(cir_l.css('top'))-100){
            exitfrom=1;
            stop_the_game();
            return;
        }
       
        score_counter++;

        if (score_counter % 20 == 0) {
            //score.text(parseInt(score.text()) + 1);
            inner_score.text(parseInt(inner_score.text()) + 1+hitl+hitr);
            
            
        }

        if (score_counter % 500 == 0) {
            speed++;
            line_speed++;
        }

        obst_down(cir_l,0);//
        obst_down(rect_r,1);//
        obst_down(cir_r,1);//
        obst_down(rect_l,0);//

        line_down(line_1);
        line_down(line_2);
        line_down(line_3);

        anim_id = requestAnimationFrame(repeat);
    }

    function obst_down(obst,lr) {
        var i,j;
        var obst_current_top = parseInt(obst.css('top'));
        if (obst_current_top > container_height) {
            //obst_current_top = -1*(200+Math.ceil(Math.random() *400));
            obst_current_top =-200;
            if(hitr===1){cir_r.css('display','inline');hitr=0;}
            if(hitl===1){cir_l.css('display','inline');hitl=0;}
            if(lr==0){
             i=(Math.ceil(Math.random() *10))%2;
            }
            else if (lr==1){
                i=(Math.ceil(Math.random() *10))%2+2;
            }
           
            var obst_left = parseInt(.01*acceptable_positions[i]*(container_width - obstacle_width));
           
            obst.css('left', obst_left);
            
        }
        obst.css('top', obst_current_top + speed);
    }

    function line_down(line) {
        var line_current_top = parseInt(line.css('top'));
        if (line_current_top > container_height) {
            line_current_top = -300;
        }
        line.css('top', line_current_top + line_speed);
    }

    restart_btn.click(function() {
        
        game_over = false;
        score_counter=0;
        audio_back.volume = 0.1;
        var hitl=0;
        var hitr=0;
        exitfrom=0;
        inner_score.text(0);
         speed = 4;
         line_speed = 8;
         var paused=0;
         car1.css({transform: "rotate(0deg)"});
         car2.css({transform: "rotate(0deg)"});
        start_div.css('display','none');  
        restart_div.css('display','none'); 
        speedsound.play();
        anim_id = requestAnimationFrame(repeat); 
        car2.css('left', '12.5%');
        car1.css('left', '87.5%');
        cir_l.css('top','-350px');cir_r.css('top','-650px');
        rect_l.css('top','-50px');rect_r.css('top','-450px');

    });
    
    start_btn.click(function() {
       
       
        start_div.slideUp();
        start_div.css('display','none');  
        audio_back.volume = 0.1;
        speedsound.play();
        anim_id = requestAnimationFrame(repeat);
    });
    
    
     pause_btn.click(function() {
       
        paused=(paused+1)%2;
        if (paused==1){
        pause_the_game();}
        else if(paused==0){
            audio_back.volume = 0.1; 
            speedsound.play();
            anim_id = requestAnimationFrame(repeat);
        }
        
        
    });
    
    helpskip.click(function() {
       
      
       helpdiv.css('display','none');
       start_div.css('display','block');
      
       
    
    });
    helpdiv.click(function() {
       
      
        helpdiv.css('display','none');
        start_div.css('display','block');
       
        
     
     });
     
    
    leftarrow.click(function() {
        plusDivs(-1);
       
    
    });
    rightarrow.click(function() {
       
        plusDivs(+1);
    
    });

    function stop_the_game() {
        game_over = true;
        audio_back.volume = 0.4;
        score_counter= parseInt(inner_score.text()) ;
        //score_counter=Math.floor(score_counter/20);
        if(highest_score<score_counter){highest_score=score_counter;localStorage.setItem("highest_score",highest_score); }
        $('#score_show').text(score_counter);   
        $('#best_score_show').text(highest_score);
        speedsound.pause();
        if(exitfrom==0)crashsound.play();
        else{}
        cancelAnimationFrame(anim_id);
        cancelAnimationFrame(move_right);
        cancelAnimationFrame(move_left);
        cancelAnimationFrame(move_up);
        cancelAnimationFrame(move_down);
        restart_div.slideDown();
        restart_btn.focus();
        
        
    }
    function pause_the_game() {
        
        audio_back.volume = 0.4;
        
        speedsound.pause();
        cancelAnimationFrame(anim_id);
        cancelAnimationFrame(move_right);
        cancelAnimationFrame(move_left);
        cancelAnimationFrame(move_up);
        cancelAnimationFrame(move_down);
       
       
        
        
    }

    /* ------------------------------GAME CODE ENDS HERE------------------------------------------- */


    function collision($div1, $div2) {
        var x1 = $div1.offset().left;
        var y1 = $div1.offset().top;
        var h1 = $div1.outerHeight(true);
        var w1 = $div1.outerWidth(true);
        var b1 = y1 + h1;
        var r1 = x1 + w1;
        var x2 = $div2.offset().left;
        var y2 = $div2.offset().top;
        var h2 = $div2.outerHeight(true);
        var w2 = $div2.outerWidth(true);
        var b2 = y2 + h2;
        var r2 = x2 + w2;

        if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
        return true;
    }
    function hit($div1, $div2) {
        var x1 = $div1.offset().left;
        var y1 = $div1.offset().top;
        var h1 = $div1.outerHeight(true);
        var w1 = $div1.outerWidth(true);
        var b1 = y1 + h1;
        var r1 = x1 + w1;
        var x2 = $div2.offset().left;
        var y2 = $div2.offset().top;
        var h2 = $div2.outerHeight(true);
        var w2 = $div2.outerWidth(true);
        var b2 = y2 + h2;
        var r2 = x2 + w2;

        if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
        else{ return true;}
    }

/*---------------------------------------Game speed sound here-------------------------------*/

});