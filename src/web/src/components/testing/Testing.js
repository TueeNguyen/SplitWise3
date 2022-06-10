import React, { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';
const ENDPOINT = 'ws://localhost:6060';

const Testing = () => {
  const [response, setResponse] = useState('');

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on('increment', (data) => {
      console.log(data);
      setResponse(data);
    });
  }, []);
  return <div>{response}</div>;
};

export default Testing;
