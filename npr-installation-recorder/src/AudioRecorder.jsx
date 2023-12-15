import { useState, useRef } from "react";
import storage from "./firebaseConfig.js"
import {ref, uploadBytesResumable, getDownloadURL, updateMetadata} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js"
import {v4 as uuidv4} from "uuid";

var showPlayer;
var setValue = () => {};

export function updatePlayerVisibility(){
    setValue(true);
}

const mimeType = "audio/webm";
const AudioRecorder = () => {
    const [permission, setPermission] = useState(false);
    const mediaRecorder = useRef(null);
    const [recordingStatus, setRecordingStatus] = useState("inactive");
    const [stream, setStream] = useState(null);
    const [audioChunks, setAudioChunks] = useState([]);
    const [audio, setAudio] = useState(null);
    const [percent, setPercent] = useState(0);

    const getMicrophonePermission = async () => {
        if ("MediaRecorder" in window) {
            try {
                const streamData = await navigator.mediaDevices.getUserMedia({
                    audio: true,
                    video: false,
                });
                setPermission(true);
                setStream(streamData);
            } catch (err) {
                alert(err.message);
            }
        } else {
            alert("The MediaRecorder API is not supported in your browser.");
        }
    };

    const startRecording = async () => {
        setRecordingStatus("recording");
        //create new Media recorder instance using the stream
        const media = new MediaRecorder(stream, { type: mimeType });
        //set the MediaRecorder instance to the mediaRecorder ref
        mediaRecorder.current = media;
        //invokes the start method to start the recording process
        mediaRecorder.current.start();
        let localAudioChunks = [];
        mediaRecorder.current.ondataavailable = (event) => {
            if (typeof event.data === "undefined") return;
            if (event.data.size === 0) return;
            localAudioChunks.push(event.data);
        };
        setAudioChunks(localAudioChunks);
    };

    const stopRecording = () => {
        setRecordingStatus("inactive");
        //stops the recording instance
        mediaRecorder.current.stop();
        mediaRecorder.current.onstop = () => {
            //creates a blob file from the audiochunks data
            const audioBlob = new Blob(audioChunks, { type: mimeType });
            //creates a playable URL from the blob file.
            const audioUrl = URL.createObjectURL(audioBlob);
            setAudio(audioUrl);
            setAudioChunks([]);
        };
    };

    const handleUpload = async () => {
        if (!audio) {
            alert("Please choose a file first!")
        }

        const audioBlob = await fetch(audio).then(r => r.blob());

        const storageRef = ref(storage, `/files/audio-upload-${uuidv4()}`)
        const metadata = {
            contentType: 'audio/webm'
        };
        updateMetadata(storageRef, metadata)
            .then((metadata) => {
                // Updated metadata for 'images/forest.jpg' is returned in the Promise
            }).catch((error) => {
            // Uh-oh, an error occurred!
        })

        const uploadTask = uploadBytesResumable(storageRef, audioBlob);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const percent = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );

                // update progress
                setPercent(percent);
            },
            (err) => console.log(err),
            () => {
                // download url
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    console.log(url);
                });
            }
        );
    };

    [showPlayer, setValue] = useState(false);

    return (
        <div style={{ display: showPlayer ? "block" : "none" }}>
            <h2>Say something!</h2>
            <main>
                <div className="audio-controls">
                    {!permission ? (
                        <button onClick={getMicrophonePermission} type="button">
                            Get Microphone
                        </button>
                    ) : null}
                    {permission && recordingStatus === "inactive" ? (
                        <button onClick={startRecording} type="button">
                            Start Recording
                        </button>
                    ) : null}
                    {recordingStatus === "recording" ? (
                        <button onClick={stopRecording} type="button">
                            Stop Recording
                        </button>
                    ) : null}
                </div>
                <div>
                    {audio ? (
                        <div>
                            <div className="audio-container">
                                <div className="audio-controls">
                                    <audio src={audio} controls></audio>
                                </div>
                                <div className="audio-download">
                                    <a download href={audio}>
                                        Download Recording
                                    </a>
                                </div>
                            </div>
                            <div>
                                <button onClick={handleUpload} type="button">
                                    Submit Audio
                                </button>
                                <p>{percent}% uploaded</p>
                            </div>
                        </div>
                    ) : null}
                </div>
            </main>
        </div>
    );
};
export default AudioRecorder;