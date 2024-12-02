$(function () {
    const amen = {};
    $("input#check_amen").change(function () {
        if ($(this).is(":checked")) {
            amen[$(this).attr("data-name")] = $(this).attr("data-id");
        } else {
            delete amen[$(this).attr("data-name")];
        }
        const objNames = Object.keys(amen);
        $(".amenities h4").text(objNames.sort().join(", "));
    });
});

$(function () {
    const apiUrl = "http://0.0.0.0:5001/api/v1/status/";
    $.get(apiUrl, function (data, status) {
        if (data.status === "OK" && status === "success") {
            $("#api_status").addClass("available");
        } else {
            $("#api_status").removeClass("available");
        }
    });

    const placesApiUrl = "http://0.0.0.0:5001/api/v1/places_search/";
    $.ajax({
        url: placesApiUrl,
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({}),
        success: function (data) {
            $(".places").empty();
            data.forEach((place) => {
                const article = `
                    <article>
                        <h2>${place.name}</h2>
                        <div class="price_by_night">${place.price_by_night}</div>
                        <div class="information">
                            <div class="max_guest">${place.max_guest} Guests</div>
                            <div class="number_rooms">${place.number_rooms} Bedrooms</div>
                            <div class="number_bathrooms">${place.number_bathrooms} Bathrooms</div>
                        </div>
                        <div class="description">${place.description}</div>
                    </article>`;
                $(".places").append(article);
            });
        }
    });
});
