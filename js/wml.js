// wml.js - contains all WML-specific Javascript.

$(document).ready(function() {
  $('#groupon-banner-uk').hide();
  $('#groupon-banner-us').hide();
});

if(navigator.geolocation) {

  navigator.geolocation.getCurrentPosition(function(position) {
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;
    document.getElementById('lat').innerHTML = 'Latitude: ' + lat;
    document.getElementById('lon').innerHTML = 'Longitude: ' + lon;
    var latlng = new google.maps.LatLng(lat, lon);
    GeoCode(latlng);
  });
} else {
  $(BrowserWarning).show();
}

function GeoCode(latlng) {

  LoadingOn('LookingFor'); //turn loading animation on
  //This is declaring the 'Geocoder' variable
  var geocoder = new google.maps.Geocoder();

  // This is making the Geocode request
  geocoder.geocode({
    'latLng': latlng
  }, function(results, status) {

    if(!navigator.geolocation || status !== google.maps.GeocoderStatus.OK) {
      $(BrowserWarning).show();
    }
    // This is checking to see if the Geoeode Status is OK before proceeding
    if(status == google.maps.GeocoderStatus.OK) {
      if(results[0]) {
        // Creating a new marker and adding it to the map
        var address = (results[0].formatted_address);
        var components = (results[0].address_components);

        displayBannerForCountry(results);

        if(components.length >= 4) {
          //This is placing the returned address in the 'Address' field on the HTML form
          document.getElementById('city').innerHTML = "You're near to the beautiful <a href='http://www.google.com/search?sourceid=navclient&gfns=1&q=" + components[2].long_name + "%20" + components[3].long_name + "'>" + components[2].long_name + ", " + components[3].long_name + "</a>";
          GetLocations(latlng.lat(), latlng.lng(), components[2].long_name)

        } else {
          document.getElementById('city').innerHTML = "You seem to be at: " + address;
        }
      }
    }
  });
}

function displayBannerForCountry(results)
{
  for(var x in results)
  {
    if(results[x].types[0] === "country") {
      //this is the country value
      var countryValue = results[x].formatted_address;

      if (countryValue.toUpperCase() === "UNITED KINGDOM") {
        //display Groupon UK banner:
        $('#groupon-banner-uk').show();
        $('#groupon-banner-us').hide();

      } else { //assume US for now:
        $('#groupon-banner-us').show();
        $('#groupon-banner-uk').hide();
      }
    }
  }
}

function GetLocations(lat, lng, city) {
  $.getJSON('https://api.foursquare.com/v2/venues/search?ll=' + lat + ',' + lng + '&limit=10&client_id=GLVIDVQYR2QGJL1UOXATRQSIVZUF4AISATFE1VQBKFEIX4LM&client_secret=5B2TUYGOVCAWN5N0DODCWB5HIJRW2X5GG4Y1WHU1CLC0MT3X&v=20120916', function(data) {
    $.each(data.response.venues, function(i, venues) {
      if(venues.url != null) {
        //link to the URL of the venue
        content = '<li><a href="' + venues.url + '">' + venues.name + '</a></li>';
      } else {
        //no URL - link to google search for the venue
        content = '<li><a href="' + 'http://www.google.com/search?sourceid=navclient&gfns=1&q=' + venues.name + ', ' + city + '">' + venues.name + '</a></li>';
      }

      // see if we can add a phone number for the venue:
      /**if(venues.contact.phone != null)
                {
                  var phoneInfo = '<span class="label label-info">' + venues.contact.phone + '</span></li>';
                  $(phoneInfo).appendTo(content);
                } else
                {
                  $('</li>').appendTo(content);
                }
                **/

      $(content).appendTo("ul#NearbyList");
      document.getElementById('LookingFor').innerHTML = "Looking for stuff in " + city + "?";
      $(NearbyList).fadeIn('slow', function() {});
      //console.log(content);
    });
  });
}

function LoadingOn(elementName) {
  var opts = {
    lines: 10,
    // The number of lines to draw
    length: 5,
    // The length of each line
    width: 3,
    // The line thickness
    radius: 5,
    // The radius of the inner circle
    corners: 1,
    // Corner roundness (0..1)
    rotate: 0,
    // The rotation offset
    color: '#000',
    // #rgb or #rrggbb
    speed: 1,
    // Rounds per second
    trail: 60,
    // Afterglow percentage
    shadow: false,
    // Whether to render a shadow
    hwaccel: false,
    // Whether to use hardware acceleration
    className: 'spinner',
    // The CSS class to assign to the spinner
    zIndex: 2e9,
    // The z-index (defaults to 2000000000)
    top: 'auto',
    // Top position relative to parent in px
    left: 'auto' // Left position relative to parent in px
  };
  var target = document.getElementById(elementName);
  var spinner = new Spinner(opts).spin(target);
}

function LoadingOff(elementName) {
  var opts = {
    lines: 10,
    // The number of lines to draw
    length: 5,
    // The length of each line
    width: 3,
    // The line thickness
    radius: 5,
    // The radius of the inner circle
    corners: 1,
    // Corner roundness (0..1)
    rotate: 0,
    // The rotation offset
    color: '#000',
    // #rgb or #rrggbb
    speed: 1,
    // Rounds per second
    trail: 60,
    // Afterglow percentage
    shadow: false,
    // Whether to render a shadow
    hwaccel: false,
    // Whether to use hardware acceleration
    className: 'spinner',
    // The CSS class to assign to the spinner
    zIndex: 2e9,
    // The z-index (defaults to 2000000000)
    top: 'auto',
    // Top position relative to parent in px
    left: 'auto' // Left position relative to parent in px
  };
  var target = document.getElementById(elementName);
  var spinner = new Spinner(opts).spin(target);
}