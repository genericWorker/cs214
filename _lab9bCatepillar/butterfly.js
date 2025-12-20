 $(function() {  
    $('#restore').hide(); 
    $("#transform").on('click', function() {
           $('#restore').show(); 
           $('#transform').hide(); 
           $("#p1").html('This is a <strong>butterfly</strong> in its natural habitat:'); 
            $("title").text('Challenge: The changing butterfly');
            $("h1" ).text( "The butterfly" );
            $( "#p1" ).html( "This is a <strong>butterfly</strong> in its natural habitat:" );
            $( "h2" ).addClass('butterfly');
            $('img').attr('src', 'https://www.kasandbox.org/programming-images/animals/butterfly_monarch.png');
            $("a").attr("href", 'https://en.wikipedia.org/wiki/Butterfly'); 
            $('a').text('Butterfly');
         
            $('#p1').addClass('butterfly');
          //  $('a').after('<p> Hello World!</p>'); 
          //   $('a').append('<ul>'); 
            $('a').after('<ul>'); 
            $('ul').append('<li>There are more than 20,000 species of butterflies.</li>');
            $('ul').append('<li>Butterflies have up to 12000 eyes.</li>');
            $('ul').append('<li>Butterflies live only a few weeks.</li>');
            $('ul').append('<li>Butterflies use their feet to taste.</li>');
        });

        $("#restore").on('click', function() {
            location.reload(true); 
        }); 
}); 