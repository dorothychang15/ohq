require(['https://cdn.firebase.com/js/client/2.4.2/firebase.js'], function (firebase) {});

var temp = rootRef.child("filler");

$(document).ready(function () {
	// temp.set({count: 0});
  var numTa = $("#numTa").html();
  numTa = parseInt(numTa);
	temp.set({count: 0});
    var num;
    rootRef.child("tas").once("value", function (snapshot) {
      snapshot.forEach(function (childSnapshot) {
         num = childSnapshot.val();
           if(isNaN(num)) {
            num = 0;
            }
          $("#numTa").html(num);
      });
    });
});

var count = 0;

var func = function (snapshot) {
  var data = snapshot.val();
  var name = data.studentname;
  var issue = data.issue;
  var ms = Date.now() - data.timestamp;
  var time = Math.floor((Date.now() - data.timestamp) / 60000);
  var category = data.category;
  var rowElem = $("<tr>");
  var nameElem = $("<td>");
  var categoryElem = $("<td>");
  var issueElem = $("<td>");
  var timeElem = $("<td>");
  var doneButtonContainer = $("<span class='lilButtons'></span>");
  var doneButton = $("<img  src=img/DoneOff.png width=\"25px\"/>");
  doneButton.click(function(e) {
    rootRef.child(name).once("value", function (snapshot) {
      var data = snapshot.val();
      console.log(JSON.stringify(data));
      var timestamp = data.timestamp;
      var timePassed = Date.now() - timestamp;
      var minutes = timePassed / 60000.0;
      var d = new Date();
      var month = d.getMonth() + 1;
      var day = d.getDate();
      var date = month + '/' + day;
      rootRef.child("metrics").child(date).once("value", function (snap) {
        var dateSnap = snap.val();
        console.log(JSON.stringify(dateSnap));
        var total = dateSnap.time;
        rootRef.child("metrics").child(date).set({time: total + minutes});
      });
    });
    rootRef.child(name).remove();
    location.reload();
  });
  doneButton.mousedown(function(){
    $(this).attr("src", "img/DoneOn.png");
  });

  doneButtonContainer.append(doneButton);
  if (data.state==="waiting") {
  var helpButtonContainer = $("<span  class='lilButtons'></span>");
  var helpButton = $("<img src=img/HelpOff.png width=\"25px\"/>");
  helpButton.click(function(){
    var val = $("<input value='being_helped'>");
      var time = $("<input value='0'>");
    rootRef.child(name).set({studentname: name, issue: issue, category: category, timestamp: data.timestamp, state:val.val()});
    var img = $(this).attr("src");
    if (img === "img/HelpOff.png") {
      $(this).attr("src","img/HelpOn.png");
    } else {
      $(this).attr("src", "img/HelpOff.png");
    }
  });
  helpButtonContainer.append(helpButton);
} else if(data.state==="being_helped"){
  var helpButtonContainer = $("<span  class='lilButtons'></span>");
  var helpButton = $("<img src=img/HelpOn.png width=\"25px\"/>");
  helpButton.click(function(){
    var val = $("<input value='waiting'>");
     var time = $("<input value='0'>");
    rootRef.child(name).set({studentname: name, issue: issue, category: category, timestamp: data.timestamp, state:val.val()});
    var img = $(this).attr("src");
    if (img === "img/HelpOff.png") {
      $(this).attr("src","img/HelpOn.png");
    } else {
      $(this).attr("src", "img/HelpOff.png");
    }
  });
  helpButtonContainer.append(helpButton);
}
  nameElem.text(name);
  categoryElem.text(category);
  issueElem.text(issue);
  timeElem.text(time + " minutes");
  rowElem.append(nameElem);
  rowElem.append(categoryElem);
  rowElem.append(issueElem);
  rowElem.append(timeElem);
  rowElem.append(helpButtonContainer);
  rowElem.append(doneButtonContainer);
  if (time) {
    $("#queueElem").last().append(rowElem);
  }
};

rootRef.limitToLast(50).on("child_added", func);

rootRef.limitToLast(50).on("child_removed", func);

rootRef.limitToLast(50).on("value", func);

var nameField = $("#nameInput");
var issueField = $("#issueInput");
var otherDescrip = $("#otherDescrip");
var stateField = $("#state");

$("#issueForm").on("submit", function (e) {
  var name = nameField.val();
  var issue = issueField.val();
  var category = otherDescrip.val();
  var state = stateField.val();
  rootRef.once("value", function (snapshot) {
    snapshot.forEach(function (childSnapshot) {
      count++;
    });
    if (count > 4) {
      count = count - 4;
    }
  });
  rootRef.child(name).set({studentname: name, issue: issue, category: category, timestamp: Date.now(), state: state, people: count});
  var d = new Date();
  var month = d.getMonth() + 1;
  var day = d.getDate();
  var date = month + '/' + day;
  console.log('date' + date);
  rootRef.child("metrics").child(date).once("value", function (snapshot) {
    var flag = (snapshot.val() !== null);
    console.log(flag);
    if (flag) {
      var data = snapshot.val();
      var count = data.count;
      rootRef.child("metrics").child(date).set({count: count + 1});
      console.log(JSON.stringify(data));
      console.log("count " + (count+1));
    } else {
      rootRef.child("metrics").child(date).set({count: 1, time: 0});
      console.log("count " + 1);
    }
  });
  nameField.val('');
  issueField.val('');
  otherDescrip.val('');
  e.preventDefault();
});



$("#button").click(function() {
  // $("#issueForm").submit();
  checkform();
});


 $("#ohq").click(function(){
  window.location.href="index.html";

 });



$("#plusTa").click(function(){

  var num = $("#numTa").html();
  num = parseInt(num);
  if (isNaN(num)) {
    num = 0;
  } else {
    num++;
  }
    $("#numTa").html(num);

   rootRef.child("tas").set({num: num});
});

$("#minusTa").click(function(){
  var num = $("#numTa").html();
  num = parseInt(num);
  if (num > 0) {
    num--;
  }
    $("#numTa").html(num);

   rootRef.child("tas").set({num: num});
});

var checkform = function () {
  var name = $("#nameInput").val();
  var count = 0;
  var okay = true;
  console.log("okay= " + okay);
  rootRef.once("value", function (snapshot) {
    snapshot.forEach(function (childSnapshot) {
      var data = childSnapshot.val();
      if (data.studentname === name) {
        alert("You are already in the queue! Please wait, a TA will be with you as soon as possible.");
        window.location.href="studentForm.html";
        $("#nameInput").val('');
        $("#issueInput").val('');
        $("#otherDescrip").val('');
        okay = false;
      }
    });
    if (okay) {
      $("#issueForm").submit();
      window.location.href="studentSubmitted.html";
    }
  });
};

