## CHATBOT

# Use:
Send messages to the chatbot to have a full conversation!

# Frontend:
React app built with Vite that uses bootstrap css.
The frontend manages the state of the API by keeping track of conversation history between the user and the API. This is managed in a stateful React variable, which also allows the user to clear the chat and immediately update the UI.
Initially, I directly called the openAI API from the frontend. This taught me how important security is when building applications, as my API Key was exposed via github and through the frontend page sources.
I now call a backend server that I created, which in turn calls the OpenAI API and sends the response back to the frontend.

# Backend:
The server is ran via Heroku. The server listens for requests which will send along an array of messages (this is the history of the conversation). 
The backend then checks the format of these messages and sends them to the OpenAI API. 
The API's responses are then formatted by the backend and sent back to the frontend.
My biggest struggle with the backend was with CORS. I learned about the importance of dependencies and validation, ensuring that the origin of the request was verified and permissible before the backend could make a request to the API.
