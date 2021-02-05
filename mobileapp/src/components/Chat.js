import { Button } from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router';


function Chat (){
    
    const history = useHistory();
    
return(
    <div className="chat-buttons">
        
            <Button className="chat-button" variant="contained" color="primary" >Chat with a therapist</Button>
            <Button variant="contained" color="primary" >Chat with a random person</Button>
        
    </div>
);
}



export default Chat;