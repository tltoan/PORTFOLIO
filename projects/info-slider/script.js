let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides((slideIndex += n));
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides((slideIndex = n));
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
}

document.addEventListener("DOMContentLoaded", function () {
  const images = document.querySelectorAll(".fourthSlideImg img");

  images.forEach((img, index) => {
    setTimeout(() => {
      img.style.opacity = "1";
    }, index * 1000);
  });
});

$(document).ready(function () {
  var pathJson = window.location.pathname.replace(/\/[^\/]+?\.[^\/]+?$/, "/");

  $("#quiz_container").quiz({
    quizJson: pathJson + "quiz.json",
    onResults: function (good, total) {
      var perc = good / total;

      var alert = $('<div class="alert"></div>').prependTo(
        $(this).find("#quiz-body")
      );

      if (perc == 0) {
        alert
          .addClass("alert-danger")
          .html(
            "All wrong! You didn't get an answer right. Go take up knitting!"
          );
      } else if (perc > 0 && perc <= 0.25) {
        alert
          .addClass("alert-danger")
          .html(
            "Poor result! You only got " +
              good +
              " out of " +
              total +
              " answers right. Please try again."
          );
      } else if (perc > 0.25 && perc <= 0.5) {
        alert
          .addClass("alert-danger")
          .html(
            "Just enough! You got " +
              good +
              " out of " +
              total +
              " answers right. You can do better."
          );
      } else if (perc > 0.5 && perc <= 0.75) {
        alert
          .addClass("alert-success")
          .html(
            "Decent result! You got " +
              good +
              " out of " +
              total +
              " answers right. Please try again."
          );
      } else if (perc > 0.75 && perc < 1) {
        alert
          .addClass("alert-success")
          .html(
            "Good result! You got " +
              good +
              " out of " +
              total +
              " answers right. I think we're nearly there."
          );
      } else if (perc == 1) {
        alert
          .addClass("alert-success")
          .html("Congratulations, you have answered all the questions!");
      }
    },
  });
});
