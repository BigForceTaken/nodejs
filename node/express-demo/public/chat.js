window.onload = function() {
    var socket = io.connect();
    
    function addMessage(from, text) {
        let li = document.createElement('li');
        li.innerHTML = from + ': ' + text;
        document.getElementById('messages').appendChild(li);
        return li;
    }
    socket.on('connect', function() {
        socket.emit('join', prompt('What is your nickname?'))

        document.getElementById('chat').style.display = 'block'
    });

    socket.on('announcement', function(msg){
        var li = document.createElement('li');
        console.log('msg:', msg)
        li.className = 'announcement';
        li.innerHTML = msg;
        document.getElementById('messages').appendChild(li);
        // addMessage(announcement, msg)
    });
    socket.on('text', function(from,msg){
        addMessage(from, msg)
    })
    document.getElementById('form').onsubmit = function(){
        let li = addMessage('me',input.value)
        socket.emit('text',input.value, function(date){
            li.className = 'confirmed';
            li.title = date;
        });

        input.value = '';
        input.focus();

        return false;
    }
}