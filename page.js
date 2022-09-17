var firebaseConfig = {
    apiKey: "AIzaSyAd1hXExO63yYI3pcDbXDaaEm5gtyO5B2U",
    authDomain: "kwitter-f1c8a.firebaseapp.com",
    databaseURL: "https://kwitter-f1c8a-default-rtdb.firebaseio.com",
    projectId: "kwitter-f1c8a",
    storageBucket: "kwitter-f1c8a.appspot.com",
    messagingSenderId: "91814116560",
    appId: "1:91814116560:web:68be2c687b4d8b565972d5",
    measurementId: "G-LVJL6X4KFG"
  };
  
  // Initialize Firebase
   firebase.initializeApp(firebaseConfig);
user_name = localStorage.getItem("user_name");


function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
       firebase_message_id = childKey;
       message_data = childData;
//Start code
console.log(firebase_message_id);
console.log(message_data);
name = message_data['name'];
message = message_data['message'];
like = message_data['like'];
name_with_tag = " <h4> " +  name +" <img class='user_tick' src=''tick.png'></h4>";
message_with_tag = "<h4 class='message_h4'>" + message + "</h4>";
like_button = "<button class='btn btn-warning' id="+firebase_massage_id+"value="+like+" onclickl='updateLike(this.id'>";
span_with_tag =  "<span class='glyphicon glyphicon-thumbs-up'>Like: "+ like +"</span></button><hr>";

row = name_with_tag + message_with_tag+ like_button + span_with_tag;
document.getElementbyIdd("output").innerHTML += row;
//End code
    } });  }); }
getData();

function updateLike(message_id)
{
    console.log("clicked on like button - " + message_id);
    button_id = message_id;
    like = documeny.getElementById(button_id).value;
    updated_likes = Number(likes) +1;
    console.log(updated_likes);

    firebase.database().ref(room_name).child(message_id).update({
        like : updated_likes  
    });
}

function logout() {
    localStorage.removeItem("user_name");
    localStorage.removeItem("room_name");
    window.location.replace("kwitter.html");
}

function send()
{
    msg = document.getElementById("msg").value;
firebase.database().ref(room_name).push({
name:user_name, 
  message:msg,
  like:0  
});
document.getElementById("msg").value = "";
}