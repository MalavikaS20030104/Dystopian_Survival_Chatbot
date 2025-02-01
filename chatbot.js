// Function to handle user input and provide responses

// Handle user input on keypress (Enter key)
document.getElementById('user-input').addEventListener('keypress', async function(event) {
    if (event.key === 'Enter') {
        const userInput = event.target.value;  // Get the user input
        event.target.value = '';  // Clear the input field

        // Display user input in the chatbox
        const userMessage = document.createElement('div');
        userMessage.className = 'user-response';
        userMessage.innerText = userInput;
        document.getElementById('chatbox').appendChild(userMessage);

        // Send user input to the backend (Flask server)
        try {
            const response = await fetch('http://127.0.0.1:5000/message', {  // Flask API URL
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ input: userInput })  // Send user input in JSON format
            });

            // Wait for the backend response
            const data = await response.json();  // Parse the JSON response

            // Display bot response in chatbox (response from LLM)
            const botMessage = document.createElement('div');
            botMessage.className = 'bot-response';
            botMessage.innerText = data.botResponse;  // Get bot response from the backend
            document.getElementById('chatbox').appendChild(botMessage);

            // Scroll to the bottom of the chatbox so the latest message is visible
            document.getElementById('chatbox').scrollTop = document.getElementById('chatbox').scrollHeight;

        } catch (error) {
            console.error('Error with fetch request:', error);
        }
    }
});
