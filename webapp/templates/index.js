<script>
    function sendMessage() {
        var userInput = document.getElementById('user-input').value;
        addChatBubble('user', userInput);

        // Display loading icon
        var loadingBubble = document.createElement('div');
        loadingBubble.classList.add('chat-bubble', 'loading');
        loadingBubble.innerHTML = '<img src="https://media.tenor.com/i2-B8Y4_oaYAAAAi/game-on-load-server.gif" alt="Loading...">';
        var chatContainer = document.querySelector('.chat-container');
        chatContainer.appendChild(loadingBubble);

        // Clear the input field
        document.getElementById('user-input').value = '';

        fetch('/generate_response', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ prompt: userInput }),
        })
        .then(response => response.json())
        .then(data => {
            var aiResponse = data.response;
            addChatBubble('ai', aiResponse);
            
            // Remove loading icon
            chatContainer.removeChild(loadingBubble);
        })
        .catch(error => {
            console.error('Error:', error);
            // Remove loading icon
            chatContainer.removeChild(loadingBubble);
        });
    }

    function addChatBubble(sender, message) {
        var chatContainer = document.querySelector('.chat-container');
        var chatBubble = document.createElement('div');
        chatBubble.classList.add('chat-bubble', sender);
        
        // Regular expression to match **bold** words
        var boldRegex = /\*\*(.*?)\*\*/g;
        var matches;
        var lastIndex = 0;
        
        // Loop through each match of the bold pattern
        while ((matches = boldRegex.exec(message)) !== null) {
            // Create a text node for the non-bold part of the message
            var textNode = document.createTextNode(message.substring(lastIndex, matches.index));
            chatBubble.appendChild(textNode);
            
            // Create a span element for the bold part of the message
            var boldSpan = document.createElement('span');
            boldSpan.style.fontWeight = 'bold';
            boldSpan.textContent = matches[1];
            chatBubble.appendChild(boldSpan);
            
            // Update the lastIndex to continue searching for matches
            lastIndex = boldRegex.lastIndex;
        }
        
        // Add any remaining non-bold part of the message
        var remainingText = message.substring(lastIndex);
        var remainingTextNode = document.createTextNode(remainingText);
        chatBubble.appendChild(remainingTextNode);
        
        // Replace line breaks with <br> tags to ensure each point starts on a new line
        chatBubble.innerHTML = chatBubble.innerHTML.replace(/\n/g, '<br>');

        chatContainer.appendChild(chatBubble);
        chatBubble.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
</script>
