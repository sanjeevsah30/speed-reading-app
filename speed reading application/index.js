$(function(){
    //declare variable
    var myarray;
    var inputlength;
    var reading = false;
    var counter =0;
    var action;
    var freq=200;

    //on page load hide elements we don't need
    $("#new").hide();
    $("#resume").hide();
    $("#pause").hide();
    $("#sliders").hide();
    $("#result").hide();
    $("#error").hide();
    //click on start reading
    $("#start").click(function(){
         //split text into words store in array
         //\s will match spaces tabs newline etc;and + means one or more
         myarray=$("#userinput").val().split(/\s+/);
         //no of words
         inputlength=myarray.length;
         if(inputlength>1){
             //enough inputt
             //move to reading;
             reading=true;
             //hide start button/error/user/input,show sliders new pause
             $("#start").hide();
             $("#userinput").hide();
             $("#error").hide();
             $("#new").show();
             $("#pause").show();
             //$("#resume").show();
             $("#sliders").show();

             //set progress max
             $("#progress").attr("max",inputlength-1);
             //
             counter=0;
             $("#result").show();
            $("#result") .text(myarray[counter]);


            //set interval
            action=setInterval(read,freq);


         }
         else
         {
             //error msg
             $("#error").show();
         }


    });
    //click on new
    $("#new").click(function(){
        //reload
        $("#userinput").val("");
        location.reload();
    });
    //click on pause
    $("#pause").click(function(){
        //stop reading

        clearInterval(action);
        reading=false;
        $("#pause").hide();
        $("#resume").show();    
    });
    //click on resume
    $("#resume").click(function(){
        //start reading
        action=setInterval(read,freq);
        
        reading=true;
        $("#resume").hide();
        $("#pause").show();    
    });
    //change fontsize
    $("#fontsize").on("slidestop",function(event,ui){
          //refresh slidr
          $("#fontsize").slider("refresh");
          //get the value of slider
          var slidervalue=parseInt($("#fontsize").val());
          $("#result").css("fontSize",slidervalue);
          $("#fontsize1").text(slidervalue);
    });
    //speed
    $("#speed").on("slidestop",function(event,ui){
        //refresh slidr
        $("#speed").slider("refresh");
        //get the value of slider
        var slidervalue=parseInt($("#speed").val());
        
        $("#words").text(slidervalue);
        //stop reading
        clearInterval(action);
        //chan ge freq
        freq=60000/slidervalue;
        //resume reading
        if(reading==true)
        {
            action=setInterval(read,freq);

        }
  });
    //progress slider
    $("#progress").on("slidestop",function(event,ui){
        //refresh slidr
        $("#progress").slider("refresh");
        //get the value of slider
        var slidervalue=parseInt($("#progress").val());
        
       
        //stop reading
        clearInterval(action);
       counter=slidervalue;
       //change word
       $("result").text(myarray[counter]);
       //chng value
       $("#percent").text(Math.floor(counter/(inputlength-1)*100));
        //resume reading
        if(reading==true)
        {
            action=setInterval(read,freq);

        }
  });
    //function
    function read(){
            if(counter==inputlength-1)
            {

                //last word
                clearInterval(action);
                reading=false;
                $("#pause").hide();
            }
            else{
                //increase counter by one
                counter++;
                //getword
                $("#result").text(myarray[counter]);
                //change progress
                $("#progress").val(counter);
                $("#progress").slider("refresh");
                //change percentage
                $("#percent").text(Math.floor(counter/(inputlength-1)*100));



            }

    }

});