import { Link } from 'react-router-dom';

export default function Documentation() {
    return (
        <div>
            <h1>WORD FIGHT</h1>
            <h2>Documentation</h2>
            <div className="list-bg">
                <p>Word Fight is a React project designed and developed by <a href="https://github.com/monxque">Monxque</a>.</p>

                <h3>Instructions to use: </h3>
                <ul>
                    <li>Word Fight is a word typing game. </li>
                    <li>First time player has to create a new profile. Access the profile page via the "Add Profile" button in frontpage. Multiple players can also create different profiles to store their scores separately.</li>
                    <li>Access the game play area via "Start" button in frontpage. After the words in the black textbox is loaded, player can start the game by pressing "GO!" and the monsters will start moving down to the castle. Player has to type the words according to the black textbox. Once three words are typed correctly consequently (without any typo in between), the closest monster will be erased. Any monster touching the castle will end the game.</li>
                    <li>Player's scores are saved in local storage and the top 10 scores can be viewed in Leaderboard page. Player can choose to filter only the current profile's best 10 scores. </li>
                    <li>Player can edit the name of their profiles via "Switch Profile" button in homepage, and the names in the Leaderboard page will be changed together. If they choose to delete the profile or clear all profiles, the corresponding scores will be removed. </li>
                </ul>
                <h3>Pages (Routes):</h3>
                <ul>
                    <li>There are different pages (routes) in this game: </li>
                    <li>1.  <Link to="/">Home</Link> (Route = /)</li>
                    <li>This button is located on the top left corner which can allow users to go back to frontpage at any time. </li>
                    <li>2. <Link to="/profileselection">Add / Switch Profile </Link> (Route = profileselection)</li>
                    <li>This button is located below the game title. The button name is "Add Profile" if it is first time player. If there is existing profile, the button is named "Switch Profile" and shown next to the current profile name and highest score. This page is to add, edit, remove profiles.</li>
                    <li>3. <Link to="/gameplay">Start</Link> (Route = gameplay)</li>
                    <li>This button is to access the game play area. Player can play the word typing game in this gameplay page.</li>
                    <li>4. <Link to="/leaderboard">Leaderboard </Link>(Route = leaderboard)</li>
                    <li>This page is to show the top 10 scores in the local storage. </li>
                    <li>5. <Link to="/documentation">Documentation </Link>(Route = documentation)</li>
                    <li>This button is to access this current page.</li>
                    <li>6. <Link to="/sources">Sources</Link>(Route = sources)</li>
                    <li>This page is to show the graphics and fonts used in this project.</li>
                </ul>

                <h3>Additional information:</h3>
                <ul>
                    <li>Since the API Pixel Encounter does not pass the CORS policy, a CORS proxy is used to allow fetching data from this API. The source of this proxy is mentioned in <Link to="/sources">Sources</Link> page.</li>
                    <li>Some validation checkings are added in the game. For example, player cannot start the game before they create the first profile. During actions like add profile or remove profile, there is automation to select a profile to avoid no current profile after the actions. A loading overlay is added during paragraph fetching to avoid player starts the game before it is loaded.</li>
                </ul>
                <h3>Third Party API:</h3>
                <ul>
                    <li>Two APIs are consumed in this project:</li>
                    <li>Monsters from <a href="https://pixelencounter.com/Api">Pixel Encounter</a></li>
                    <li>Words from <a href="http://metaphorpsum.com/">Metaphorpsum</a></li>
                </ul>
            </div>
        </div>
    );
}
