// Import dependencies
import React, { useRef, useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import * as cocossd from "@tensorflow-models/coco-ssd";
import Webcam from "react-webcam";
import "./App.css";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { fade, makeStyles } from "@material-ui/core/styles";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";


import {drawRect} from "./utilities";


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));


function App() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const [onStart, setOnStart] = useState(false);
  const [score, setScore] = useState(0);
  const [onObjectChange, setOnObjectChange] = usestate([]);

  console.log("TESTING", onObjectChange);
  const classes = useStyles();

  // Main function
  const runCoco = async () => {
    const net = await cocossd.load();
    //  Loop and detect hands
    setInterval(() => {
      detect(net);
    }, 10);
  };

  const detect = async (net) => {
    // Check data is available
    
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get Video Properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // Set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Set canvas height and width
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      // 4. TODO - Make Detections
      // e.g. const obj = await net.detect(video);
      const obj = await net.detect(video);
      console.log(obj);
      
      console.log("HAHAHAHHAHAHHA ITO NA YON" + net)
      setOnObjectChange(net);
      // Draw mesh
      const ctx = canvasRef.current.getContext("2d");

      // 5. TODO - Update drawing utility
      // drawSomething(obj, ctx)  
      drawRect(obj,ctx);
    }
  };

  useEffect(()=>{runCoco()},[]);

  return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography className={classes.title} variant="h6" noWrap>
              Object Detection
            </Typography>
          </Toolbar>
        </AppBar>
        <Paper
          elevation={3}
          style={{ maxWidth: "50%", margin: "auto", marginTop: "5%" }}
        >
          <div style={{ height: 300 }}>
            {/* Put Image here Here */}
            {onStart ? (
            <header  style={{height:"100%"}}>
              <Webcam
                ref={webcamRef}
                muted={true} 
                style={{
                  position: "absolute",
                  marginLeft: "auto",
                  marginRight: "auto",
                  left: 0,
                  right: 0,
                  textAlign: "center",
                  zindex: 9,
                  width: "100%",
                  height: "40%",
                }}
              />
              <canvas
                ref={canvasRef}
                style={{
                  position: "absolute",
                  marginLeft: "auto",
                  marginRight: "auto",
                  left: 0,
                  right: 0,
                  textAlign: "center",
                  zindex: 8,
                  width: "20%",
                  height: "40%",
                }}
              />
            </header>
            ) : (
              <CardMedia
                style={{ height: "100%" }}
                image="https://miro.medium.com/max/739/1*IrptRDRG8IL9o-55BKjbLA.png"
                title="Contemplative Reptile"
              />
            )}
          </div>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Object detection
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Object detection is a computer technology related to computer vision
              and image processing that deals with detecting instances of semantic
              objects of a certain class (such as humans, buildings, or cars) in
              digital images and videos.
            </Typography>
            <div style={{ textAlign: "center" }}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setOnStart(true)}
              >
                Start
              </Button>

              

            </div>
          </CardContent>
        </Paper>
      </div>
  );
}

export default App;




