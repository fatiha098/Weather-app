$('#cities').on('change', function(e){
  
  const value = e.target.value;

  const coords = value.split(',');


  const url = `https://api.open-meteo.com/v1/forecast?latitude=${coords[0]}&longitude=${coords[1]}&current=temperature_2m,rain&daily=temperature_2m_max,temperature_2m_min,rain_sum&timezone=auto`;
  


  $('#body-bg').css('background', `url(./images/agadir.jpg) no-repeat center`).hide();
  $('#card-bg').css('background', `url(./images/agadir.jpg) no-repeat center`).hide();

  $('#body-bg').css('background', `url(./images/casablanca.jpg) no-repeat center`).hide();
  $('#card-bg').css('background', `url(./images/casablanca.jpg) no-repeat center`).hide();

  $('#body-bg').css('background', `url(./images/mombai.jpg) no-repeat center`).hide();
  $('#card-bg').css('background', `url(./images/mombai.jpg) no-repeat center`).hide();

  $('#body-bg').css('background', `url(./images/paris.jpg) no-repeat center`).hide();
  $('#card-bg').css('background', `url(./images/paris.jpg) no-repeat center`).hide();

  $('#body-bg').css('background', `url(./images/newyork.jpg) no-repeat center`).hide();
  $('#card-bg').css('background', `url(./images/newyork.jpg) no-repeat center`).hide();


  const city = $(this).find('option:selected').text()
  

  $('#body-bg').css('background', `url(./images/${city}.jpg) no-repeat center`).fadeIn();
  $('#card-bg').css('background', `url(./images/${city}.jpg) no-repeat center`).fadeIn();
  $('#card-bg').css('background-size', "cover");
    


  
  $.get(url, function(data){

    const time = data.current.time.split("T");
    const hour = parseInt(time[1].split(':')[0], 10);
    const week_temp = data.daily.temperature_2m_max;
    console.log(week_temp)

    $('#temp').text(data.current.temperature_2m) ;
    $('#deg').html("&deg;").css('margin-left', '4px') ;
    
    // time city date
    $('#time').text(time[1]) ;

    let date = new Date(time[0]);
    let formateDate = date.toLocaleDateString('en-US', 
    {
      weekday: 'long',
      month: 'long',
      day: '2-digit'
    });
    $('#dateInfo').text(formateDate) ;
    $('#city').text(city) ;

    if(hour >= 0 &&  hour <= 12 ){
      $('#MN').text('AM') ;
    }else{
      $('#MN').text('PM') ;
    }


    $.each(week_temp , function(index, temp){

      $(`#day${index} .temper`).html(temp + '<span>&deg;</span>');

      if(data.daily.rain_sum[index] != 0){
        $(`#stat${index}`).attr("src", "./icons/rain.svg");
  
      }else if(temp >= 26 ){
        $(`#stat${index}`).attr("src", "./icons/sun.svg");
      }
      else{
        $(`#stat${index}`).attr("src", "./icons/cloudy.svg");
      }

    })

    // $('.stat').attr('src', "./icons/sun.svg");
    



    if(data.current.rain != 0){

      $('#status').attr("src", "./icons/rain.svg");

    }else if(hour > 6 &&  hour < 18 ){
      $('#status').attr("src", "./icons/sun.svg");
    }
    else{

      $('#status').attr("src", "./icons/moon.svg");
    }

  }, "json");

})

