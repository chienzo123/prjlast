import React, {Component} from 'react';
import Post from '../post/post'
import {Consumer} from '../context'
import firebase from 'firebase/app';
import {datab} from '../../firebase';
import 'firebase/auth';
import 'firebase/database';




export default class Contactss extends Component{
    
    render(){
        
const user = {
    image : firebase.auth().currentUser.photoURL,
    name : firebase.auth().currentUser.displayName,
    userID: firebase.auth().currentUser.uid
}
        return(
            <Consumer>
                {
                    value => {
                        const{contacts} = value;
                        return(
                            <React.Fragment>
                                {
                                    

                                    contacts.length > 0 && contacts.filter(contact => 
                                    contact.userID == user.userID   
                                        ).map(contacts => <Post
                                            key={contacts.id}
                                            id={contacts.id}
                                            userID={contacts.userID}
                                            authorPic={contacts.authorPic}
                                            authorName={contacts.authorName}
                                            timestamp = {contacts.timestamp}
                                            message={contacts.message}
                                            optionalImg={contacts.optionalImg}
                                            like={contacts.like}
                                            /> )
                                        
                                }
                            </React.Fragment>
                        )
                    }
                }
            </Consumer>
        )
    }
}
