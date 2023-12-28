function moveup(){
$('.miralink').removeClass('miralink')
}

function due(input) {
    return input.replace(/\\u([0-9a-fA-F]{4})/g, function(match, p1) {
        return String.fromCharCode(parseInt(p1, 16));
    });
}

function getResponse(message ,model, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "https://ai.rusk2016.repl.co/api", true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify({
      message: message,
      model: model,
      temp: $('.form-range').val()
  }));

  xhr.addEventListener("load", function() {
      var text=xhr.responseText
      var text = text.replace(/\$\$/g, "`");

      callback(due(text).slice(1, -2));
  });
}
var prev=[]
var aimodel = 'bard';
function appendMessage(sender, message) {

    const chatBox = document.getElementById('chat-box');
    const messageElement = document.createElement('div');

  messageElement.classList.add('response');
  messageElement.classList.add(sender);

  var imageurl;
  if (sender=="AI" || sender=="AIL"){

     imageurl="https://rusk-games.pages.dev/images/miralink.png"}
  else 
  {imageurl="https://rusk-games.pages.dev/images/user.png"}

  if (sender=="AI"){
    // message= message.replaceAll('<', "&lt");
    //   message= message.replaceAll('&', "&amp");
    //   message= message.replaceAll('>', "&gt");

    const chatBox = document.getElementById('chat-box');
    const children = chatBox.children;
    if (children.length >= 2) {
      chatBox.removeChild(children[children.length - 1]);
    }
  }
  function grs(length) {
      var result           = '';
      var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      var charactersLength = characters.length;
      for ( var i = 0; i < length; i++ ) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      return result;
  }
  msgId=grs(10)
  
  if (sender == 'User'){
  messageElement.innerHTML = '<div class="row" style="margin-top: 30px;"> <div class="col-md-auto '+ sender.toLowerCase()+'"> <img src="'+imageurl+'" alt=""  style="height: 2.3em;border-radius: 10px; margin-top: 0em;"></div> <div class="col '+ msgId +'" style="padding-top: 0.45em;">'+'</div> </div>'; 

    chatBox.appendChild(messageElement);


  $('.' + msgId).text(message);}

  else{
    messageElement.innerHTML = '<div class="row" style="margin-top: 30px;"> <div class="col-md-auto '+ sender.toLowerCase()+'"> <img src="'+imageurl+'" alt=""  style="height: 2.3em;border-radius: 10px; margin-top: 0em;"></div> <div class="col '+ msgId +'" style="padding-top: 0.45em;">'+message+'</div> </div>';
    chatBox.appendChild(messageElement);

  }

    // Scroll to the bottom of the chat box
    chatBox.scrollTop = chatBox.scrollHeight;
  hljs.highlightAll();
}
$("#user-input").keypress(function (e) {
if(e.which === 13 && !e.shiftKey) {
  e.preventDefault();
$('#send-btn').click()
}
});

$("#text-input").submit(function (e) {
  e.preventDefault();

  var message = $(this).find('#user-input').val();
  const lastElement = document.querySelector('#chat-box').lastElementChild;
  var classList;
  if (lastElement == null) {
      classList = "AI";
  }
  else{
    classList=lastElement.classList[1];
  }

  if  (classList == "AI"){
  appendMessage("User", message);
    $('#user-input').val("");


  appendMessage("AIL", '<div class="load"> <div class=""> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -10 90 100" width="50px" > <circle cx="15" cy="15" r="10" fill="#7f7f7f"> <animate attributeName="fill" values="#7f7f7f;#333333;#7f7f7f" dur="2s" keyTimes="0;0.5;1" repeatCount="indefinite" /> </circle> <circle cx="45" cy="15" r="10" fill="#7f7f7f"> <animate attributeName="fill" values="#7f7f7f;#333333;#7f7f7f" dur="2s" keyTimes="0;0.5;1" begin="0.66s" repeatCount="indefinite" /> </circle> <circle cx="75" cy="15" r="10" fill="#7f7f7f"> <animate attributeName="fill" values="#7f7f7f;#333333;#7f7f7f" dur="2s" keyTimes="0;0.5;1" begin="1.32s" repeatCount="indefinite" /> </circle> </svg> </div> </div>')
if (aimodel == 'bard'){
  message = "Previous Messages: " + prev.join(';\n ') + "Actual Message: " + '\n'  + message;}
  getResponse(message, aimodel, function (response) {
    prev.push(response);

    var converter = new showdown.Converter();
    response = response.replace(/(\\r\\n|\\n|\\r)/g, "<br>")
    response = converter.makeHtml(response)
    appendMessage("AI", response)
    })
  };
});
window.onload=function(){
  document.querySelector('.gpt').addEventListener('click', function(event) {
    aimodel="gpt";
    $('.selector').css({'transform':'translate(calc(100% + 8.5px), 0.5px)'})
  });
  document.querySelector('.bard').addEventListener('click', function(event) {
    aimodel="bard";
    $('.selector').css({'transform':'translate(0.5px, 0.5px)'})
  });
}

var r = document.querySelector(':root');
$(document).ready(function() {r.style.setProperty('--scrollwid', getScrollbarWidth()+"px");})
function getScrollbarWidth() {

  const outer = document.createElement('div');
  outer.style.visibility = 'hidden';
  outer.style.overflow = 'scroll'; 
  outer.style.msOverflowStyle = 'scrollbar'; 
  document.body.appendChild(outer);

  const inner = document.createElement('div');
  outer.appendChild(inner);

  const scrollbarWidth = (outer.offsetWidth - inner.offsetWidth);

  outer.parentNode.removeChild(outer);
  return scrollbarWidth;

}