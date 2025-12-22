// Parent's Evening Game JavaScript  
  
document.addEventListener('DOMContentLoaded', function() {  
    // Game state  
    var gameState = {  
        playerName: '',  
        parentName: '',  
        currentScreen: 'welcome-screen',  
        questions: [  
            {  
                id: 1,  
                text: "What's your child's favorite childhood memory?",  
                category: "Personal"  
            },  
            {  
                id: 2,  
                text: "What subject did your child struggle with most in school?",  
                category: "Education"  
            },  
            {  
                id: 3,  
                text: "What's your child's biggest fear?",  
                category: "Personal"  
            },  
            {  
                id: 4,  
                text: "What's your child's favorite movie?",  
                category: "Entertainment"  
            },  
            {  
                id: 5,  
                text: "What job did your child want to have when they were little?",  
                category: "Career"  
            },  
            {  
                id: 6,  
                text: "What's your child's favorite food?",  
                category: "Lifestyle"  
            },  
            {  
                id: 7,  
                text: "What's the most embarrassing thing your child has ever done?",  
                category: "Personal"  
            },  
            {  
                id: 8,  
                text: "What's your child's favorite music artist?",  
                category: "Entertainment"  
            }  
        ],  
        selectedQuestion: null,  
        score: 0,  
        totalQuestions: 5,  
        answeredQuestions: 0  
    };  
 
    // DOM Elements  
    var elements = {  
        welcomeScreen: document.getElementById('welcome-screen'),  
        parentScreen: document.getElementById('parent-screen'),  
        childScreen: document.getElementById('child-screen'),  
        resultsScreen: document.getElementById('results-screen'),  
        playerNameInput: document.getElementById('player-name'),  
        parentNameInput: document.getElementById('parent-name'),  
        startGameBtn: document.getElementById('start-game-btn'),  
        questionOptions: document.getElementById('question-options'),  
        selectedQuestion: document.getElementById('selected-question'),  
        answerInput: document.getElementById('answer-input'),  
        submitAnswerBtn: document.getElementById('submit-answer-btn'),  
        questionsRemaining: document.getElementById('questions-remaining'),  
        score: document.getElementById('score'),  
        childQuestionsRemaining: document.getElementById('child-questions-remaining'),  
        childScore: document.getElementById('child-score'),  
        resultsContent: document.getElementById('results-content'),  
        playAgainBtn: document.getElementById('play-again-btn')  
    };  
 
    // Initialize the game  
    function initGame() {  
        setupEventListeners();  
        showScreen('welcome-screen');  
    }  
  
    // Set up event listeners  
    function setupEventListeners() {  
        elements.startGameBtn.addEventListener('click', startGame);  
        elements.submitAnswerBtn.addEventListener('click', submitAnswer);  
        elements.playAgainBtn.addEventListener('click', resetGame);  
    }  
  
    // Start the game  
    function startGame() {  
        var playerName = elements.playerNameInput.value.trim();  
        var parentName = elements.parentNameInput.value.trim();  
  
    // Handle question selection by parent  
    function selectQuestion(question) {  
        // Remove selection from other options  
        var options = document.querySelectorAll('.question-option');  
    // Update game info for parent screen  
    function updateGameInfo() {  
        var remaining = gameState.totalQuestions - gameState.answeredQuestions;  
        elements.questionsRemaining.textContent = remaining;  
        elements.score.textContent = gameState.score;  
    }  
  
    // Update game info for child screen  
    function updateChildGameInfo() {  
        var remaining = gameState.totalQuestions - gameState.answeredQuestions;  
        elements.childQuestionsRemaining.textContent = remaining;  
        elements.childScore.textContent = gameState.score;  
    }  
  
    // Show specified screen  
    function showScreen(screenId) {  
        // Hide all screens  
        var screens = document.querySelectorAll('.screen');  
