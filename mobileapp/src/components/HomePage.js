import React from "react";
import {Link} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import forumImage from '../images/forum.jpg';
import blogImage from '../images/blog.jpg';
import chatImage from '../images/chat.jpg';

import "../styles.css";


function HomePage() {
    return (
        <>
        <div class="centerContent">
            <h1 class="header-1">Welcome to Forum App!</h1>
            <p>Forum App is a place where you can speak openly and anonymously about your mental health experiences.</p>
            <p>In our forums you can share experiences, ask questions or vent your emotions with people who know what it is like to experience mental health difficulties.</p>
            <div class="card-row">
                <div class="card-column">
                    <Card class="card">
                        <CardMedia
                            component="img"
                            alt="Forums List"
                            height="200"
                            image={forumImage}
                            title="Mental Health Forums"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                            Get Started
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                            This is a safe space to connect with users like you. Get started by browsing the list of forums we offer.
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button className="accessibleButton" variant="contained" style={{margin: "0 auto"}}>
                                <Link to="/forums" style={{color: "white", textDecoration: "none"}}>List of Forums</Link>
                            </Button>
                        </CardActions>
                        </Card>
                    </div>

                <div class="card-column">
                    <Card class="card">
                        <CardMedia
                            component="img"
                            alt="Blog"
                            height="200"
                            image={blogImage}
                            title="Blog"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                            Blog
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                            We provide information to help everyone suffering from a mental health condition to achieve their best mental health.
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button className="accessibleButton" variant="contained" style={{margin: "0 auto"}}>
                                <Link to="/Blog" style={{color: "white", textDecoration: "none"}}>Blog</Link>
                            </Button>
                        </CardActions>
                    </Card>
                </div>
                
                <div class="card-column">
                    <Card class="card">
                        <CardMedia
                            component="img"
                            alt="Chat support"
                            height="200"
                            image={chatImage}
                            title="Chat support"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                            Chat with a Therapist
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                            For professional help, we offer a chat service to allow communication with a registered therapist. 
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button className="accessibleButton" variant="contained" style={{margin: "0 auto"}}>
                                <Link to="/chat" style={{color: "white", textDecoration: "none"}}>Start Chatting</Link>
                            </Button>
                        </CardActions>
                        </Card>
                    </div>

            </div>
        </div>
            
        
        </>
    )
}

export default HomePage;