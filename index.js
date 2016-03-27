var myFirebase = new Firebase("https://vivid-inferno-7337.firebaseio.com/");

$(document).ready(function() {
  myFirebase.on('child_added', function(snapshot){ 
      var data = snapshot.val();
       $('#tasks').append('<li class="collection-item avatar"><i class="material-icons circle cyan accent-4">label_outline</i><span class="title">'+data.taskTitle+'</span><p>'+data.task+'</p><a href="" class="secondary-content done"><i class="material-icons">done</i></a><a href="" class="secondary-content"><i class="material-icons">delete</i></a></li>');
    });
});

function addNote(){
  var title = $('#title').val(); 
  var text = $('#textArea').val();
  myFirebase.push({taskTitle: title, task: text});

  dataRef.on('child_added', function(snapshot) {
    var data = snapshot.val();
    $('#tasks').append('<li class="collection-item avatar"><i class="material-icons circle cyan accent-4">label_outline</i><span class="title">'+data.taskTitle+'</span><p>'+data.task+'</p><a href="" class="secondary-content done"><i class="material-icons">done</i></a><a href="" class="secondary-content"><i class="material-icons">delete</i></a></li>');
  });
}

function removeNote(){
  var answer = confirm("Are you sure you want to complete all notes?");
  if (answer == true) {
      myFirebase.remove();
      alert("All notes cleared!");
  }
}

