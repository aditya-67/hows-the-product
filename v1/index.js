$(document).ready(function () {
  // Get reviews on load
  $.get(`${api_url}/api/reviews`, function (data, status) {
    makeReviews(data.data);
  });

  // Get the number of stars the use has selected
  $("#review input").on("click", function () {
    const rbs = document.querySelectorAll('input[name="rating-review"]');
    let selectedValue;
    for (const rb of rbs) {
      if (rb.checked) {
        selectedValue = rb.value;
        break;
      }
    }
    $("#rating").text(selectedValue / 2);
  });

  // Get the text entered in the textbox
  $("#review-text").on("change", function () {
    let review = $("#review-text").val();
    if (review) {
      $("#submit-review").attr("disabled", false);
    } else {
      $("#submit-review").attr("disabled", true);
    }
  });

  // Submit review on button click
  $("#submit-review").click(function () {
    let rating = $("#rating").text();
    let review = $("#review-text").val();

    $.post(
      `${api_url}/api/review`,
      {
        rating: rating,
        review: review,
      },
      function (data, status) {
        if (status === "success") {
          $("#ratingModal").modal("hide");

          // Show toast and auto hide after 3 seconds
          $("#toast").toast({ delay: 3000 });
          $("#toast").toast("show");
        }
      }
    );
  });
});

////////// Function to create dynamic review elements on DOM/////////

function makeReviews(data) {
  let avg_rating = 0;

  // If no data in table
  if (data.length === 0) {
    $(".wait-until-load").css("visibility", "visible");
    $(".spinner-border").hide();
    $("#avg-rating").text(0);
    return;
  }

  // Loop through all the reviews received
  data.forEach((element, index) => {
    avg_rating += element.rating;
    let $div = $("<div>", {
      class: "single-review text-left d-flex align-items-center",
    });
    // Call fieldset function to make <fieldset> element
    let fieldset = makeFieldset(index + 1);
    $div.append(fieldset);

    let $review_text = $("<h6>");
    $review_text.text(element.rating + " out of 5, " + element.review);
    $div.append($review_text);

    $(".reviews").append($div);

    let rating_id = "#rating" + element.rating * 2 + "-" + (index + 1);
    $(rating_id).attr("checked", true);
  });

  $(".wait-until-load").css("visibility", "visible");
  $(".spinner-border").hide();

  // Calculate and set avg. rating for the product
  avg_rating = (avg_rating / data.length).toFixed(1);
  $("#avg-rating").text(avg_rating);
  let avg_stars = Math.round(avg_rating * 2);
  $("#rating" + avg_stars).attr("checked", true);
}

//////// Make dynamic fieldsets for reviews based on the user rating ////////

function makeFieldset(reviewNumber) {
  // Create empty fieldset element
  let $fieldset = $("<fieldset>", { class: "rate mr-4", id: "display" });
  for (var i = 10; i >= 1; i--) {
    // Create label for fieldset
    let $label = $("<label>", {
      for: "rating" + i + "-" + reviewNumber,
      title: i / 2 + " stars",
    });
    if (i % 2 !== 0) {
      $label.addClass("half");
    }
    // Create input for fieldset
    let $input = $("<input>", {
      id: "rating" + i + "-" + reviewNumber,
      name: "rating" + i + "-" + reviewNumber,
      value: i,
      type: "radio",
    });
    // Append them to parent
    $fieldset.append($input);
    $fieldset.append($label);
  }

  return $fieldset;
}
