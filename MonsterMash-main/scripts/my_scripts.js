$(document).ready(function() {
    let headclix = 0,
        eyeclix = 0,
        noseclix = 0,
        mouthclix = 0;
    const audio = new Audio('thunder.mp3');
    audio.playbackRate = 2;
    audio.play();
    lightning_one();
    lightning_two();
    lightning_three();



    $('#head').bind('contextmenu', function(e){
        e.preventDefault();
        if (headclix > 0) {
                $(this).animate( {left: "+=367px"}, 500 );
                headclix -= 1;
        }
        return false;
    })

    $('#eyes').bind('contextmenu', function(e){
        e.preventDefault();
        if (eyeclix > 0) {
            $( this ).animate( {left: "+=367px"}, 500 );
            eyeclix -= 1;
        }
        return false;
    })

    $('#nose').bind('contextmenu', function(e){
        e.preventDefault();
        if (noseclix > 0) {
            $( this ).animate( {left: "+=367px"}, 500 );
            noseclix -= 1
        }
        return false;
    })

    $('#mouth').bind('contextmenu', function(e){
        e.preventDefault();
        if (mouthclix > 0) {
            $( this ).animate( {left: "+=367px"}, 500 );
            mouthclix -= 1
        }
        return false;
    })


    $("#head").click( function() {
        if (headclix < 9 ) {
                $( this ).animate( {left: "-=367px"}, 500 );
                headclix += 1
        }
        else if (headclix  === 9) {
            $( this ).animate( {left: "0px"}, 500 );
            headclix = 0;
        }
    });

    $("#eyes").click(function() {
    if (eyeclix < 9) {
        $(this).animate({ left: "-=367px" }, 500);
        eyeclix += 1;
    } else {
        $(this).animate({ left: "0px" }, 500);
        eyeclix = 0;
    }
}); $("#nose").click(function() {
    $(this).animate({ left: "-=367px" }, 500);
    if (noseclix < 9) {
        noseclix += 1;
    } else {
        $(this).animate({ left: "0px" }, 500);
        noseclix = 0;
    }
})

$("#mouth").click(function() {
    if (mouthclix < 9) {
        $(this).animate({ left: "-=367px" }, 500);
        mouthclix += 1;
    } else {
        $(this).animate({ left: "0px" }, 500);
        mouthclix = 0;
    }
  })
})

function lightning_one() {
    $("#lightning1").fadeIn(250).fadeOut(250);
    setTimeout("lightning_one()", 4000);

}

function lightning_two() {
    $("#lightning2").fadeIn(250).fadeOut(250);
    setTimeout("lightning_two()", 5000);
}

function lightning_three() {
    $("#lightning3").fadeIn(250).fadeOut(250);
    setTimeout("lightning_three()", 7000);
}
