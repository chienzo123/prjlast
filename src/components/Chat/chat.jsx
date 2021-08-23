import React, {useState, useEffect} from 'react'
import './chat.scss'
import  firebase from 'firebase/app';
import {datab} from '../../firebase';
import 'firebase/auth';
import 'firebase/database';
import { Avatar } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
function Chat () {

    const user = {
        id: firebase.auth().currentUser.uid,
        img : firebase.auth().currentUser.photoURL,
        name : firebase.auth().currentUser.displayName
    }
    const [UserID, setUserID] = useState("");
    const [value, setValue] = useState("");
    const [listChat, setListChat] = useState([]);
     console.log(user.id);
    const [Check, setCheck]=useState(true);
    const showchat = () => {
        setCheck(!Check);
        if(Check){
            document.getElementById("chatbutton").setAttribute("style","max-height: 500px ");

        }
        if(!Check){
            document.getElementById("chatbutton").removeAttribute("style","max-height: 500px ");
        }
        let today = new Date();
        let hours = today.getHours();
        let minutes = today.getMinutes();

        if (hours < 10) {
            hours = "0" + hours;
        }

        if (minutes < 10) {
            minutes = "0" + minutes;
        }

        let time = hours + ":" + minutes;
        document.getElementById("chat-timestamp").innerHTML = time.toString();
    }
    const submit = () => {
            let fireStore = firebase.database().ref('/Chat');
            let data = {
            UserID : user.id,
            value,
            
            };
            try {
            fireStore.push(data);
            console.log('push success!');
            setUserID('');
            setValue('');

            } catch (error) {
            console.log("error", error);

            }
    }
    useEffect(() => {
        // get list data here
        const fireStore = firebase.database().ref('/Chat')
        fireStore.on('value', (res) => {
          const data = res.val();
          let chatList = [];
          for (let id in data) {
            chatList.push({
              id,
              value: data[id].value,
              userID: data[id].UserID
              
            })
          }
          setListChat(chatList);
        })
    
      }, [])
      console.log(listChat);
    return (

        <div>
                <form>
                <div className="chat-bar-collapsible">
        <button id="chat-button" type="button" onClick={showchat} className="collapsible active">
            <Avatar src={user.img} />
           <p>{user.name}</p>
           
        </button>

        <div className="content" id="chatbutton" >
            <div className="full-chat-block">
               
                <div className="outer-container">
                    <div className="chat-container">
                       
                        <div id="chatbox">
                            <h5 id="chat-timestamp"></h5>
                            {
                                listChat && listChat.map(el => {
                                    if(el.userID == user.id){
                                        return <p class="userText"><span>{el.value}</span></p>
                                    }
                                    if(el.userID != user.id){
                                       return <p id="botStarterMessage" className="botText"><span>{el.value}</span></p>
                                    }
                                    if(el.userID == "start"){
                                        return <p style={{display: 'none'}}></p>
                                    }
                                })
                            }
                          
                        </div>

                 
                        <div class="chat-bar-input-block">
                            <div id="userInput">
                                <input id="text" value={value} onChange={(e) => {setValue(e.target.value)}} className="input-box" type="text" placeholder="Tap 'Enter' to send a message"/>
                                <p></p>
                            </div>

                            <div className="chat-bar-icons">
                                {/* <i id="chat-icon" style={{color: crimson}} className="fa fa-fw fa-heart"
                                    onclick="heartButton()"></i> */}
                                    <button onClick={submit} id="send" ><SendIcon/></button>
                            </div>
                        </div>

                        <div id="chat-bar-bottom">
                            <p></p>
                        </div>

                    </div>
                </div>

            </div>
        </div>

    </div>
               
            </form>
        </div>
    )
}

export default Chat