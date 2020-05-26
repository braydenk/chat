const socket = io();

const messages = document.querySelector('.messages');
const chatForm = document.querySelector('.chat-form');
const chatInput = document.querySelector('.chat-form-input');
const usernameInput = document.querySelector('.username');

let username = '';

usernameInput.addEventListener('keyup', event => {
  if (event.keyCode === 13) {
    event.preventDefault();
    username = usernameInput.value;
    socket.emit('add_user', username);

    document.querySelector('.login-container').classList.add('hidden');

    document.querySelector('.chat-container').classList.remove('hidden');
  }
});

chatForm.addEventListener(
  'submit',
  event => {
    event.preventDefault();

    const newMessage = document.createElement('li');
    newMessage.innerHTML = `${username}: ${chatInput.value}`;
    messages.append(newMessage);

    socket.emit('new_message', { message: chatInput.value });
    chatInput.value = '';

    return false;
  },
  false
);

// document.addEventListener('click', event => {
//   event.preventDefault();
// });

// document.querySelector('.send-button').addEventListener(
//   'click',
//   event => {
//     event.preventDefault();

//     const newMessage = document.createElement('li');
//     newMessage.innerHTML = `${username}: ${message}`;
//     messages.append(newMessage);

//     socket.emit('chat_message', { message: chatInput.value });
//     chatInput.value = '';

//     return false;
//   },
//   false
// );

/**
 * Socket events
 */
socket.on('user_joined', ({ username }) => {
  const systemMessage = document.createElement('li');
  systemMessage.classList.add('system-message');
  systemMessage.innerHTML = `${username} joined the chat`;
  messages.append(systemMessage);
});

socket.on('new_message', ({ username, message }) => {
  const newMessage = document.createElement('li');
  newMessage.innerHTML = `${username}: ${message}`;
  messages.append(newMessage);
});
