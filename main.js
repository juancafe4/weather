"use strict"
$(() => {
  console.log("ready")

  let lat
  let lng

  function onPositionUpdate(position) {
    lat = position.coords.latitude;
    lng = position.coords.longitude;

    let location = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + lng + '&key=AIzaSyAGaS38U8-aKAmg5fZKWn9iFc2E17qCF4g'
    let url = 'https://api.forecast.io/forecast/89efe6a9cb79eb7175d2889d11b15b94/' + lat
    + ',' + lng
    console.log(url )
    
    //$.ajax('http://api.openweathermap.org/data/2.5/weather?lat=' + lat '&lon=' + lng + '&appid=9f56737df1c2c1701d590e60327250e3')
    

    $.ajax(location).done((data) => {
      let results = data.results

      let area =  results[1].address_components

      let currLocation = area[0].short_name + ", " + area[2].short_name + " " + area[3].short_name

      $('.loading').css('display', 'none')
      $('.location').text(currLocation)
      $.getScript("skyicons.js", function(){
        var skycons = new Skycons({"color": "orange"})

        $.ajax({
          url : url,
          dataType: 'jsonp',
          success: function (data) {
            let temp ="F° " + Math.floor(data.currently.temperature)
            
            $('#grade').append(temp)
            var  icon = data.currently.icon
            icon = icon.toUpperCase()
            icon = icon.replace('-', '_')
            console.log(icon)
            skycons.add("icon1", Skycons.icon);
            skycons.play()
          }
        });
      });
      
    }).fail((error) => {
      console.log()
    })
  }

  
  if(navigator.geolocation)
    navigator.geolocation.getCurrentPosition(onPositionUpdate);
  else
    alert("navigator.geolocation is not available");
});
