var myFirebase = new Firebase("https://vivid-inferno-7337.firebaseio.com/");

$(document).ready(function() {
  myFirebase.on('child_added', function(snapshot){ 
      var data = snapshot.val();
      var key = snapshot.key();
      console.log(key);
      if(data.status == 'to do'){
        $('#tasks').append('<li class="collection-item avatar"><i class="material-icons circle light-blue darken-4">label_outline</i><span class="title">'+data.taskTitle+'</span><p>'+data.task+'</p><a href="" class="secondary-content done" id="'+key+'"><i class="material-icons">done</i></a><a href="" class="secondary-content" id="remove'+key+'"><i class="material-icons">delete</i></a></li>');
        $('#'+key).on('click', function () {
          var answer = confirm("Are you sure you are finish with this note?");
          if(answer == true)
            myFirebase.child(key).update({status:'done'});
        });
        $('#remove'+key).on('click', function () {
            var answer = confirm("Are you sure you want to remove this note?");
            if (answer == true) myFirebase.child(key).remove();
        });

      } else if(data.status == 'done'){
        $('#done').append('<li class="collection-item avatar"><i class="material-icons circle light-blue darken-4">label_outline</i><span class="title">'+data.taskTitle+'</span><p>'+data.task+'</p><a class="secondary-content" href="" id="remove'+key+'"><i class="material-icons">delete</i></a></li>');
        $('#remove'+key).on('click', function () {
            var answer = confirm("Are you sure you want to remove this note?");
            if (answer == true) myFirebase.child(key).remove();
        });
      }    
    });
});

function addNote(){
  var title = $('#title').val(); 
  var text = $('#textArea').val();
  myFirebase.push({taskTitle: title, task: text, status: 'to do'});
}

function removeNote(){
  var answer = confirm("Are you sure you want to remove ALL NOTES?");
  if (answer == true) {
      myFirebase.remove();
      alert("All notes cleared!");
  }
}