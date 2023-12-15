import { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import AudioRecorder from "../src/AudioRecorder";

var showComponent;
var setVisbility = () => {};

export function displayPrompts(){
    setVisbility(true);
}

const MyForm = () => { 
    // Options available in the dropdown
    const options = ['Shoutout', 'Interview', 'Advice', 'Remembrance', 'Pitch', 'AbtYou'];

    // State to manage the selected option
    const [selectedOption, setSelectedOption] = useState('');

    // Function to handle dropdown change
    const handleDropdownChange = (event) => {
        setSelectedOption(event.target.value);
    };

    // Function to generate a random option
    const generateRandomOption = () => {
        const randomIndex = Math.floor(Math.random() * options.length);
        return options[randomIndex];
    };

    // Effect to generate a random option when the component mounts
    useEffect(() => {
        setSelectedOption(generateRandomOption());
    }, []);

    // Render different text based on the selected option
    const renderTextBasedOnOption = () => {
        // if (selectedOption === randomOption) {
        //     return 'You randomly got ' + selectedOption + '! Try exploring other options.';
        // }

        switch (selectedOption) {
        case 'Shoutout':
            return <ul>
                <li>What did this person do?</li>
                <li>How did it make your life easier?</li>
                <li>What is great about this person?</li>
            </ul>
        case 'Interview':
            return <ul>
                <li>What do you want to talk about?</li>
                <li>Why is this interesting?</li>
                <li>What is the key takeaway?</li>
            </ul>
        case 'Advice':
            return <ul>
                <li>Things to do in your first 100 days</li>
                <li>What should someone add ot their NPR bucket list?</li>
            </ul>
        case 'Remembrance':
            return <p>Talk about a colleague or a friend who isn't here anymore</p>
        case 'Pitch':
            return <p>No matter how impractical and zany!</p>
        case 'AbtYou':
            return <ul>
                <li>How did you find your way to NPR?</li>
                <li>What motivates you to work at NPR?</li>
                <li>What was your first NPR memory?</li>
            </ul>
        default:
            return 'Please select an option.';
        }
    };

    [showComponent, setVisbility] = useState(false);


    return (
        <div style={{ display: showComponent ? "block" : "none" }}>

            <p>Your randomly generated prompt is:</p>
            <select id="dropdown" value={selectedOption} onChange={handleDropdownChange}>
                <option value="">Select an option</option>
                <option value="Shoutout">Shoutout to a colleague</option>
                <option value="Interview">Interview w/ friend/colleague</option>
                <option value="Advice">Advice for future Nippers</option>
                <option value="Remembrance">A remembrance</option>
                <option value="Pitch">Pitch a story/podcast</option>
                <option value="AbtYou">NPR and you</option>
            </select>

            <p>Think about what you want to say and start recording –</p>
            <p>Or choose another option in the dropdown!</p>

            <div>
                <p>What to talk about:</p>
                {renderTextBasedOnOption()}
            </div>
        </div>

    )
}

export default MyForm;

