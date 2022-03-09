import { useState } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import Menu from "./components/Menu";
import Videos from "./components/Videos";
import "./App.css";

const firebaseConfig = {
   // Initialize Firebase
};

if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore();

// Initialize WebRTC
const servers = {
    iceServers: [
        {
            urls: [
                "stun:stun1.l.google.com:19302",
                "stun:stun2.l.google.com:19302",
            ],
        },
    ],
    iceCandidatePoolSize: 10,
};

const pc = new RTCPeerConnection(servers);

function App() {
    const [currentPage, setCurrentPage] = useState("home");
    const [joinCode, setJoinCode] = useState("");

    return (
        <div className="app">
            {currentPage === "home" ? (
                <Menu
                    joinCode={joinCode}
                    setJoinCode={setJoinCode}
                    setPage={setCurrentPage}
                />
            ) : (
                <Videos
                    firestore={firestore}
                    pc={pc}
                    mode={currentPage}
                    callId={joinCode}
                    setPage={setCurrentPage}
                />
            )}
        </div>
    );
}

export default App;
