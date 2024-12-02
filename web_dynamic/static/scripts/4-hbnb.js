#!/bin/node
$(document).ready(function () {
  const amen = {};
  $('input.amenities-list').change(function () {
    const amenityName = $(this).attr('data-name');
    const amenityId = $(this).attr('data-id');

    if ($(this).is(':checked')) {
      amen[amenityName] = amenityId;
    } else {
      delete amen[amenityName];
    }
    const objNames = Object.keys(amen);
    $('.amenities h4').text(objNames.sort().join(', '));
  });

$.get('http://0.0.0.0:5001/api/v1/status/', function (data) {
    if (data.status === 'OK') {
      $('#api_status').addClass('available');
    } else {
      $('#api_status').removeClass('available');
    }
      console.log(`data.status:\n${data.status}`);
  });

  $('button[type="button"]').click(function () {
    const selectedAmenities = Object.values(amen);
    const placesApiUrl = 'http://0.0.0.0:5001/api/v1/places_search/';
    $.ajax({
      url: placesApiUrl,
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({ amenities: selectedAmenities }),
      success: function (data) {
        $('.places').empty();
        data.forEach((place) => {
          const article = `
            <article>
              <div class="title_box">
                <h2>${place.name}</h2>
                <div class="price_by_night">$${place.price_by_night}</div>
              </div>
              <div class="information">
                <div class="max_guest">${place.max_guest} Guest(s)</div>
                <div class="number_rooms">${place.number_rooms} Bedroom(s)</div>
                <div class="number_bathrooms">${place.number_bathrooms} Bathroom(s)</div>
              </div>
              <div class="description">
                ${place.description}
              </div>
            </article>
          `;
          $('.places').append(article);
        });
      }
    });
  });
});
