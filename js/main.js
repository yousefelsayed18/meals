
// Sidebar
$(".sidebar-open-close").on("click", function () {
  let boxWidth = $(".sidebar-left").outerWidth();
  let isSidebarOpen = $(".sidebar-left").css("left") === "0px";

  if (isSidebarOpen) {
    closeSidebar(boxWidth, this);
  } else {
    // Open Sidebar
    $(".sidebar-right").animate({ left: `${boxWidth}px` }, 500);
    $(".sidebar-left").animate({ left: "0" }, 500);
    this.classList.remove("fa-align-justify");
    this.classList.add("fa-x");

    $(".sidebar-links li").each(function (index) {
      $(this)
        .delay(index * 100)
        .animate({ top: 0 }, 200);
    });
  }
});
function closeSidebar() {
  let boxWidth = $(".sidebar-left").outerWidth();

  $(".sidebar-right").animate({ left: "0" }, 500);
  $(".sidebar-left").animate({ left: `-${boxWidth}px` }, 500);

  $(".sidebar-open-close")[0].classList.remove("fa-x");
  $(".sidebar-open-close")[0].classList.add("fa-align-justify");

  $(".sidebar-links li").css(
    "cssText",
    `
        top: 100px;
    `
  );
}

// Display Meals
function displayMeals(arr) {
  let cartona = "";

  for (let i = 0; i < arr.length; i++) {
    cartona += `
      <div class="col-md-3">
          <div onclick="getMealDetails('${arr[i].idMeal}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
            <img class="w-100" src="${arr[i].strMealThumb}" alt="">
            <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
              <h3>${arr[i].strMeal}</h3>
            </div>
          </div>
      </div>
    `;
  }

  $("#homeData").html(cartona);
}

async function searchByName(name = "") {
  try {
    $(".loading-screen").removeClass("d-none");
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`
    );
    const data = await response.json();

    data ? displayMeals(data.meals.slice(0, 20)) : displayMeals([]);
    $(".loading-screen").addClass("d-none");
  } catch (error) {
    console.error(
      "There Has Been A Problem With Your Fetch Operation: ",
      error
    );
  }
}
searchByName();

async function searchByFirstLetter(letter) {
  try {
    letter === "" ? (letter = "a") : "";
    $(".loading-screen").removeClass("d-none");
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`
    );
    const data = await response.json();

    data ? displayMeals(data.meals.slice(0, 20)) : displayMeals([]);
    $(".loading-screen").addClass("d-none");
  } catch (error) {
    console.error(
      "There Has Been A Problem With Your Fetch Operation: ",
      error
    );
  }
}

// By Categories
async function getCategories() {
  try {
    $(".loading-screen").removeClass("d-none");
    const response = await fetch(
      "https://www.themealdb.com/api/json/v1/1/categories.php"
    );
    const data = await response.json();

    displayCategories(data.categories);
    $(".loading-screen").addClass("d-none");
  } catch (error) {
    console.error(
      "There Has Been A Problem With Your Fetch Operation: ",
      error
    );
  }
}
function displayCategories(arr) {
  let cartona = "";

  for (let i = 0; i < arr.length; i++) {
    cartona += `
        <div class="col-md-3">
          <div onclick="getCategorieMeals('${arr[i].strCategory}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
            <img class="w-100" src="${arr[i].strCategoryThumb}" alt="">
            <div class="meal-layer position-absolute text-center text-black p-2">
              <h3>${arr[i].strCategory}</h3>
              <p>${arr[i].strCategoryDescription}</p>
            </div>
          </div>
        </div>
    `;
  }

  $("#homeData").html("");
  $("#homeData").html(cartona);
}
async function getCategorieMeals(category) {
  try {
    console.log(category);
    $("#homeData").html("");

    $(".loading-screen").removeClass("d-none");
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
    );
    const data = await response.json();

    displayMeals(data.meals.slice(0, 20));
    $(".loading-screen").addClass("d-none");
  } catch (error) {
    console.error(
      "There Has Been A Problem With Your Fetch Operation: ",
      error
    );
  }
}

// By Area
async function getArea() {
  try {
    $(".loading-screen").removeClass("d-none");
    const response = await fetch(
      "https://www.themealdb.com/api/json/v1/1/list.php?a=list"
    );
    const data = await response.json();

    displayArea(data.meals);
    $(".loading-screen").addClass("d-none");
  } catch (error) {
    console.error(
      "There Has Been A Problem With Your Fetch Operation: ",
      error
    );
  }
}
function displayArea(arr) {
  let cartona = "";

  for (let i = 0; i < arr.length; i++) {
    cartona += `
        <div class="col-md-3">
          <div onclick="getAreaMeals('${arr[i].strArea}')" class="rounded-2 text-center cursor-pointer">
            <i class="fa-solid fa-house-laptop fa-4x"></i>
            <h3>${arr[i].strArea}</h3>
          </div>
        </div>
    `;
  }

  $("#homeData").html("");
  $("#homeData").html(cartona);
}
async function getAreaMeals(area) {
  try {
    $(".loading-screen").removeClass("d-none");
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
    );
    const data = await response.json();

    displayMeals(data.meals.slice(0, 20));
    $(".loading-screen").addClass("d-none");
  } catch (error) {
    console.error(
      "There Has Been A Problem With Your Fetch Operation: ",
      error
    );
  }
}

// By Ingredients
async function getIngredients() {
  try {
    $(".loading-screen").removeClass("d-none");
    const response = await fetch(
      "https://www.themealdb.com/api/json/v1/1/list.php?i=list"
    );
    const data = await response.json();

    displayIngredients(data.meals);
    $(".loading-screen").addClass("d-none");
  } catch (error) {
    console.error(
      "There Has Been A Problem With Your Fetch Operation: ",
      error
    );
  }
}
function displayIngredients(arr) {
  arr = arr.slice(0, 20);
  let cartona = "";

  for (let i = 0; i < arr.length; i++) {
    cartona += `
        <div class="col-md-3">
          <div onclick="getIngredientsMeals('${arr[i].strIngredient}')" class="rounded-2 text-center cursor-pointer">
            <i class="fa-solid fa-drumstick-bite fa-4x"></i>
            <h3>${arr[i].strIngredient}</h3>
            <p>${arr[i].strDescription.split(" ").slice(0, 20).join(" ")}</p>
          </div>
        </div>
    `;
  }

  $("#homeData").html("");
  $("#homeData").html(cartona);
}
async function getIngredientsMeals(ingredient) {
  try {
    $(".loading-screen").removeClass("d-none");
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
    );
    const data = await response.json();

    displayMeals(data.meals.slice(0, 20));
    $(".loading-screen").addClass("d-none");
  } catch (error) {
    console.error(
      "There Has Been A Problem With Your Fetch Operation: ",
      error
    );
  }
}

// Meals Details
async function getMealDetails(id) {
  try {
    $(".loading-screen").removeClass("d-none");
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    );
    const data = await response.json();

    displayMealDetails(data.meals[0]);
    $(".loading-screen").addClass("d-none");
  } catch (error) {
    console.error(
      "There Has Been A Problem With Your Fetch Operation: ",
      error
    );
  }
}
function displayMealDetails(meal) {
  let ingredients = "";
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients += `<li class="alert alert-info m-2 p-1">${
        meal[`strMeasure${i}`]
      } ${meal[`strIngredient${i}`]}</li>`;
    }
  }

  let tags = meal.strTags?.split(",");
  if (!tags) {
    tags = [];
  }

  let tagsHtml = "";
  for (let i = 0; i < tags.length; i++) {
    tagsHtml += `<li class="alert alert-danger m-2 p-1">${tags[i]}</li>`;
  }

  let cartona = `
        <div class="col-md-4">
          <img class="w-100 rounded-2" src="${meal.strMealThumb}" alt="">
          <h2>${meal.strMeal}</h2>
        </div>

        <div class="col-md-8">
          <h2>Instructions</h2>
          <p>${meal.strInstructions}</p>
          <h3>
            <span class="fw-bolder">Area : </span>
            <span>${meal.strArea}</span>
          </h3>
          <h3>
            <span class="fw-bolder">Category : </span>
            <span>${meal.strCategory}</span>
          </h3>
          <h3>Recipes :</h3>
          <ul class="d-flex flex-wrap list-unstyled g-3">
            ${ingredients}
          </ul>
          <h3>Tags :</h3>
          <ul class="d-flex flex-wrap list-unstyled g-3">
            ${tagsHtml}
          </ul>
          <a class="btn btn-success" target="_blank" href="${meal.strSource}">Source</a>
          <a class="btn btn-danger" target="_blank" href="${meal.strYoutube}">Youtube</a>

        </div>
  `;

  $("#homeData").html(cartona);
}

// For Search
function showSearch() {
  $("#searchContainer").html(`
    <div class="row py-4">
      <div class="col-md-6">
        <input onkeyup="searchByName(this.value)" class="form-control bg-transparent text-white" type="text" placeholder="Search By Name">
      </div>
      <div class="col-md-6">
        <input onkeyup="searchByFirstLetter(this.value)" maxlength="1" class="form-control bg-transparent text-white" type="text" placeholder="Search By First Letter">
      </div>
    </div>
    `);

  $("#homeData").html("");
}

// For Contact
function showContact() {
  let cartona = `
        <div class="contact min-vh-100 d-flex justify-content-center align-items-center">
          <div class="container w-75 text-center">
            <div class="row g-4">
              <div class="col-md-6">
                <input class="form-control" onkeyup="inputsValidation()" type="text" id="nameInput" placeholder="Enter Your Name">
                <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                  Special characters and numbers not allowed
                </div>
              </div>
              <div class="col-md-6">
                <input class="form-control" onkeyup="inputsValidation()" type="email" id="emailInput" placeholder="Enter Your Email">
                <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                  Email not valid *exemple@yyy.zzz
                </div>
              </div>
              <div class="col-md-6">
                <input class="form-control" onkeyup="inputsValidation()" type="text" id="phoneInput" placeholder="Enter Your Phone">
                <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                  Enter valid Phone Number
                </div>
              </div>
              <div class="col-md-6">
                <input class="form-control" onkeyup="inputsValidation()" type="number" id="ageInput" placeholder="Enter Your Age">
                <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                  Enter valid age
                </div>
              </div>
              <div class="col-md-6">
                <input class="form-control" onkeyup="inputsValidation()" type="password" id="passwordInput" placeholder="Enter Your Password">
                <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                  Enter valid password *Minimum eight characters, at least one letter and one number:*
                </div>
              </div>
              <div class="col-md-6">
                <input class="form-control" onkeyup="inputsValidation()" type="password" id="repasswordInput" placeholder="Repassword">
                <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                  Enter valid repassword 
                </div>
              </div>
            </div>
            <button id="submitBtn" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
          </div>
        </div>
  `;

  $("#homeData").html("");
  $("#homeData").html(cartona);

  $("#nameInput").on("focus", () => (nameInputFocused = true));
  $("#emailInput").on("focus", () => (emailInputFocused = true));
  $("#phoneInput").on("focus", () => (phoneInputFocused = true));
  $("#ageInput").on("focus", () => (ageInputFocused = true));
  $("#passwordInput").on("focus", () => (passwordInputFocused = true));
  $("#repasswordInput").on("focus", () => (repasswordInputFocused = true));
}

let nameInputFocused = false;
let emailInputFocused = false;
let phoneInputFocused = false;
let ageInputFocused = false;
let passwordInputFocused = false;
let repasswordInputFocused = false;

function inputsValidation() {
  if (nameInputFocused) {
    toggleAlert(nameValidation(), "#nameAlert");
  }
  if (emailInputFocused) {
    toggleAlert(emailValidation(), "#emailAlert");
  }
  if (phoneInputFocused) {
    toggleAlert(phoneValidation(), "#phoneAlert");
  }
  if (ageInputFocused) {
    toggleAlert(ageValidation(), "#ageAlert");
  }
  if (passwordInputFocused) {
    toggleAlert(passwordValidation(), "#passwordAlert");
  }
  if (repasswordInputFocused) {
    toggleAlert(repasswordValidation(), "#repasswordAlert");
  }

  if (
    nameValidation() &&
    emailValidation() &&
    phoneValidation() &&
    ageValidation() &&
    passwordValidation() &&
    repasswordValidation()
  ) {
    $("#submitBtn").removeAttr("disabled");
  } else {
    $("#submitBtn").attr("disabled", true);
  }
}

function toggleAlert(isValid, alertId) {
  if (isValid) {
    $(alertId).removeClass("d-block").addClass("d-none");
  } else {
    $(alertId).removeClass("d-none").addClass("d-block");
  }
}

function nameValidation() {
  return /^[a-zA-Z ]+$/.test($("#nameInput").val());
}

function emailValidation() {
  return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    $("#emailInput").val()
  );
}

function phoneValidation() {
  return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(
    $("#phoneInput").val()
  );
}

function ageValidation() {
  return /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test($("#ageInput").val());
}

function passwordValidation() {
  return /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test($("#passwordInput").val());
}

function repasswordValidation() {
  return $("#repasswordInput").val() === $("#passwordInput").val();
}

$("#nameInput").on("focus", () => {
  nameInputFocused = true;
});
$("#emailInput").on("focus", () => {
  emailInputFocused = true;
});
$("#phoneInput").on("focus", () => {
  phoneInputFocused = true;
});
$("#ageInput").on("focus", () => {
  ageInputFocused = true;
});
$("#passwordInput").on("focus", () => {
  passwordInputFocused = true;
});
$("#repasswordInput").on("focus", () => {
  repasswordInputFocused = true;
});

$(
  "#nameInput, #emailInput, #phoneInput, #ageInput, #passwordInput, #repasswordInput"
).on("input", inputsValidation);
