require(['https://cdn.firebase.com/js/client/2.4.2/firebase.js'], function (firebase) {});
var count = 1;
rootRef.once("value", function (snapshot) {
    snapshot.forEach(function (childSnapshot) {
      count++;
    });
    if (count > 1) {
      count = count - 1;
    }
    var rand = Math.floor(Math.random()*5);
    $("#peopleInFront").html(count);

    rootRef.child("tas").once("value", function (snapshot) {
      snapshot.forEach(function (childSnapshot) {
         num = childSnapshot.val();
           if(isNaN(num)) {
            num = 0;
          	}
          $("#waitTime").html(Math.round(count*5/parseInt(num)));
      });
    });
    
});
