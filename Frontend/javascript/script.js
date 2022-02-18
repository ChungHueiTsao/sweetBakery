$(document).ready(function () {

  /** reload page when back_forward **/
  var perfEntries = performance.getEntriesByType("navigation");

  if (perfEntries[0].type === "back_forward") {
    location.reload(true);
  }

  /** increment/decrement **/
  var remain = parseInt($(".remain").text())

  $(".plus").on("click", function () {

    var inputNum = $(".inputNum");
    var value = $(".inputNum").val();
    value++;
    inputNum.val(value);
    console.log(value)

    if (value > remain) {
      $(".errorMsg").css("display", "inline-block");
      $(".signUpBtn").prop("disabled", true);
    } else {
      $(".errorMsg").css("display", "none");
      $(".signUpBtn").prop("disabled", false);
    }

    sessionStorage.setItem("key", value)
    var data = sessionStorage.getItem("key")
    $(".test").text(data)

  })

  $(".inputNum").on("keyup", function () {
    var value = $(".inputNum").val();

    if (value > remain) {
      $(".errorMsg").css("display", "inline-block");
      $(".signUpBtn").prop("disabled", true);
    } else {
      $(".errorMsg").css("display", "none");
      $(".signUpBtn").prop("disabled", false);
    }

    sessionStorage.setItem("key", value)
    var data = sessionStorage.getItem("key")
    console.log(`storage ${data}`)

  })

  $(".minus").on("click", function () {

    var inputNum = $(".inputNum");
    var value = $(".inputNum").val();
    if (value > 1) {
      value--;
      inputNum.val(value);
    }

    if (value <= remain) {
      $(".errorMsg").css("display", "none");
      $(".signUpBtn").prop("disabled", false)
    } else {
      $(".errorMsg").css("display", "inline-block");
      $(".signUpBtn").prop("disabled", true)
    }

    sessionStorage.setItem("key", value)
    var data = sessionStorage.getItem("key")
    console.log(`session storage ${data}`)
    $(".test").text(data)
  })

  //open product modal when click on product cart
  $(".fa-shopping-cart").on("click", () => {
    $(".modal-container").show()
  })

  //close product modal when click on X
  $(".closeModal").on("click", function () {
    $(".modal-container").hide()
  })

  //close product modal when click outside of modal
  $(".modal-container").on("click", function () {
    $(".modal-container").hide()
  })

  //toggle burger menu on click
  $(".burgerMenu").on("click", function (e) {
    $(".nav-items").toggleClass("active")
  })

  $(window).resize(function () {
    if ($(".nav-items").hasClass("active")) {
      $(".nav-items").removeClass("active");
    }
  })

  //Sign in and sign up events
  $("#signUp").on("click", () => {
    $(".container").addClass("right-panel-active")
    console.log("signup")
  })

  $("#signIn").on("click", () => {
    $(".container").removeClass("right-panel-active")
    console.log("signin")
  })

  $(".userIcon").on("click", function () {
    $(".loginModal").show()
  })

  //Close login/forget pw modal event
  $(".closeModal").on("click", function () {
    $(".loginModal").hide()
    $(".forgetPwModal").hide()
  })

  //click forgetpwbtn to open modal
  $(".forgetPwBtn").on("click", function () {
    $(".loginModal").hide()
    $(".forgetPwModal").show()
  })

  //click loginbtn to open modal
  $(".loginBtn").on("click", function () {
    $(".forgetPwModal").hide()
    $(".loginModal").show()
  })

  //close login modal when click outside
  $(".modal-overlay").on("click", function () {
    $(".loginModal").hide()
  })

  // toggle search input field
  $(".searchBtn").on("click", function () {
    $(".search-input").toggleClass("active")
  })



  /* Product Search Function */
  var productTitleArray = [];

  //refresh productTitleLength
  function refreshproductTitleLength() {
    productTitleArray = [];
    var productTitleLength = $('.productTitle').length;
    for (i = 0; i < productTitleLength; i++) {
      productTitleArray.push({ name: $('.productTitle:eq(' + i + ')').text() });
    }
  }

  refreshproductTitleLength();

  // keyDown search btn  
  $(".searchBtn, .search-input").on("click keyup", function (e) {
    $(".search-input").toggleClass("active");
    $(`.productTitle`).parents(".productCard").css("display", "none");
    var val = $.trim($('.search-input').val()); //copy search inputContent    "trim" > remove space 
    if (val) {
      val = val.toLowerCase();
      console.log("val: " + val)
      $.each(productTitleArray, function (_, item) {
        if (item.name.toLowerCase().indexOf(val) != -1) {
          $(`.productTitle:contains('${val}')`).parents(".productCard").css("display", "");
        }
      });
    } else {
      $(`.productTitle`).parents(".productCard").css("display", "");
    }

    // refresh again
    refreshproductTitleLength();
  })

});


//change images when click on thumbnail
let thumbnails = document.getElementsByClassName('thumbnail')

let activeImages = document.getElementsByClassName('active')

for (var i = 0; i < thumbnails.length; i++) {

  thumbnails[i].addEventListener('click', function () {

    if (activeImages.length > 0) {
      activeImages[0].classList.remove('active')
    }

    this.classList.add('active')
    document.getElementById('featured').src = this.src
  })
}