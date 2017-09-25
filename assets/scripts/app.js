window.onload = function (){
  var xhr = new XMLHttpRequest();
  var personnelRoles;
  var roleSelection = document.getElementById('roleSelection')
  var role;

  xhr.addEventListener('load', function() {
  	if (xhr.status !== 200) {
  		return;
  	}

    // Gets the titles from each object in the API array to display in the select dropdown menu
  	var personnelRoles = JSON.parse(xhr.responseText);
    for (var i = 0; i < personnelRoles.length; i++) {
      roleSelection.innerHTML += "<option>" + personnelRoles[i].title + "</option>"
    }

    //When somebody selects something in the drop drop-down
    // the img is replaced
    optionSelected = document.getElementsByTagName('select')
    optionSelected[0].addEventListener('change', function(e) {
      // this.value tells us what thing was selected,
      // then we need to find the img url in personnelRoles
      for (var j = 0; j < personnelRoles.length; j++) {
        if (personnelRoles[j].title == this.value) {
          document.getElementById('roleImg').setAttribute('src', personnelRoles[j].img)
          role = this.value
        }
      }
    })

  });
  xhr.open('GET', 'https://galvanize-student-apis.herokuapp.com/gpersonnel/roles');
  xhr.send();

  var button = document.getElementById('save')
  // when the button is clicked (some time in the future)
  button.addEventListener("click", function(e){
    // this code is what to do:
    e.preventDefault()

    // just makes a new XMLHttpRequest object, but does not
    // make the actual request (does nothing)
    var postRequest = new XMLHttpRequest();
    var firstName = document.getElementById('firstName').value
    var lastName = document.getElementById('lastName').value
    var requestBody = {firstName, lastName, role}

    var requestString = []
    // iterate through the requestBody Object
    for (var key in requestBody) {
      requestString.push(key + '=' + requestBody[key])
    }
    requestString = requestString.join('&')

    // in the future, the server will respond to the request which fires a
    // load event
    postRequest.addEventListener('load', function () {
      // code in here runs in the future when the server has responded to the
      // POST request. The response body should be in:
      console.log(postRequest.responseText);
      document.getElementsByClassName('save-status')[0].innerHTML = JSON.parse(postRequest.responseText).message
      var saveStatus = document.getElementsByClassName('save-status')
      saveStatus[0].style.display = 'block'

    })
    // tell it what URL and VERB
    postRequest.open('POST', 'https://galvanize-student-apis.herokuapp.com/gpersonnel/users')
    postRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    // actually perform the POST request:
    postRequest.send(requestString)
  })
}
