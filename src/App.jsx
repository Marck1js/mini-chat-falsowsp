import {useEffect, useState} from 'react';
import './App.css'
import socket from './componentes/sockets';
import  {msj2} from './componentes/arraymsnj';
function App() {

 let user = 'Marco'

// Hoooks
const [mensaje, setMensaje] = useState({
  from: 'Me',
  texto: ''
});

const [chat, setChat] = useState([]);
 


// UseEffect Sockets 
  useEffect (()=> {
    socket.on('clientMessage', callback => {
        setChat(oldChat => [...oldChat, callback]);
    });

    socket.on('cliente-desconectado', callback => console.log(callback));

    return () => {
      socket.off('clientMessage');
      socket.off('cliente-desconectado');
    }
  },[]);


// OnChange
  const Change = (e) => {
    setMensaje({...mensaje, texto: e.target.value});
  }
// OnSubmit 
  const Send = (e) => {
    e.preventDefault();
    if(mensaje.texto !== ''){
      socket.emit('message', mensaje);
      setMensaje({...mensaje, texto: ''});
    }
  }






  return (
    <div className="App">
      <span>{user}</span>
   
      <div className='chat'>

    {chat.length !== 0 ? chat.map((e,index)=> {
      return (
        <p key={index} className='me'>{e.from}: {e.texto}</p>
      )
    }) : null} 

      </div>

      <form onSubmit={(e)=> Send(e)}>
        <div className='enviar_texto'>
          <div className='input'>
            <input type='text' value={mensaje.texto} placeholder='Escribe ...' onChange={(e)=> Change(e)}/>
          </div>
          <div className='button'>
            <button>Enviar</button>
          </div>
        </div>
      </form>
  

   

    </div>
  )
}

export {
  App
}