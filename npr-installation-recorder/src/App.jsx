import "./App.css";
import { useState, useRef } from "react";
import AudioRecorder from "../src/AudioRecorder";
import MyForm from "../src/IntakeForm";
import { updatePlayerVisibility } from "../src/AudioRecorder";
import { displayPrompts } from "../src/IntakeForm";

const App = () => {
    let [recordOption, setRecordOption] = useState("video");
    const toggleRecordOption = (type) => {
        return () => {
            setRecordOption(type);
        };
    };

    const recordNow = (event) => {
        updatePlayerVisibility();
    }

    const showForm = (event) => {
        displayPrompts();
    }

    return (
        <div>
            <h1>NPR Media Installation</h1>

            <p>Contribute your voice and story to the sound installation!<br/>
                Note for Serendipity: if you submit the audio (and only if you submit it), 
                it might be used in the demo of the project.
            </p>
            <div>
                <h3>Are you ready to contribute to NPR Voices?</h3>

                <button onClick={recordNow}>
                    Yeah!
                </button>

                <button onClick={showForm}>
                    No, give me ideas
                </button>
            
                <AudioRecorder />
                <MyForm />
            </div>
        </div>
    );
};
export default App;
