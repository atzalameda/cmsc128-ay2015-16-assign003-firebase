var myFirebase = new Firebase("https://vivid-inferno-7337.firebaseio.com/");

$(document).ready(function() {
  myFirebase.on('child_added', function(snapshot){ 
      var data = snapshot.val();
      $('#tasks').append('<p>'+data.taskTitle+'<br/>'+data.task+'</p>');
    });
});

function addNote(){
  var title = $('#title').val(); 
  var text = $('#textArea').val();
  myFirebase.push({taskTitle: title, task: text});
}