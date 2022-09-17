import io from 'socket.io-client';
const socket = io('https://chat-minamal.herokuapp.com/');
export default socket;