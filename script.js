// Parent's Evening Game JavaScript

document.addEventListener('DOMContentLoaded', function () {
    // Game state
    var gameState = {
        parents: ['', '', ''],
        children: ['', '', ''],
        parentChildPairs: [{ parent: '', child: '' }, { parent: '', child: '' }, { parent: '', child: '' }],
        currentRound: 0,
        currentScreen: 'welcome-screen',
        childPoints: [0, 0, 0], // Points for each child throughout the game
        round1: {
            bids: [0, 0, 0],
            currentBidder: 0,
            bidAmount: 1,
            currentChild: 0, // Track which child is answering
            timer: null,
            timeLeft: 60,
            categories: [
                // Categories for 7-year-old Stephanie
                [
                    { category: "Colors", items: ["Red", "Blue", "Green", "Yellow", "Orange", "Purple", "Pink", "Brown", "Black", "White", "Gray", "Silver", "Gold"] },
                    { category: "Animals", items: ["Dog", "Cat", "Elephant", "Lion", "Tiger", "Bear", "Monkey", "Giraffe", "Zebra", "Horse", "Cow", "Pig", "Chicken"] },
                    { category: "Countries", items: ["USA", "UK", "France", "Germany", "Italy", "Spain", "Canada", "Australia", "Japan", "China", "India", "Brazil", "Mexico"] },
                    { category: "Foods", items: ["Apple", "Banana", "Bread", "Milk", "Cheese", "Eggs", "Chicken", "Rice", "Pasta", "Fish", "Vegetables", "Fruits", "Cereal"] }
                ],
                // Categories for 5-year-old Bethanie
                [
                    { category: "Colors", items: ["Red", "Blue", "Green", "Yellow", "Orange", "Purple", "Pink", "Brown"] },
                    { category: "Animals", items: ["Dog", "Cat", "Elephant", "Lion", "Bear", "Monkey", "Horse", "Cow", "Pig", "Chicken"] },
                    { category: "Toys", items: ["Ball", "Doll", "Car", "Blocks", "Teddy", "Puzzle", "Bicycle", "Tricycle", "Train", "Dinosaur"] },
                    { category: "Foods", items: ["Apple", "Banana", "Bread", "Milk", "Cheese", "Eggs", "Chicken", "Rice", "Pasta", "Fish"] }
                ],
                // Categories for 3-year-old Varchie
                [
                    { category: "Colors", items: ["Red", "Blue", "Green", "Yellow"] },
                    { category: "Animals", items: ["Dog", "Cat", "Cow", "Pig", "Duck", "Bird", "Fish"] },
                    { category: "Body Parts", items: ["Head", "Eyes", "Nose", "Mouth", "Hands", "Feet", "Arms", "Legs"] },
                    { category: "Foods", items: ["Milk", "Bread", "Apple", "Banana", "Eggs", "Cheese"] }
                ]
            ],
            answeredQuestions: [0, 0, 0], // Track for each child
            correctAnswers: [0, 0, 0], // Track for each child
            currentCategory: null,
            currentItems: [],
            questions: [
                // Questions for Colors category (50+ engaging questions for 3-year-olds)
                [
                    "What color is the sky?",
                    "What color is grass?",
                    "What color is a banana?",
                    "What color is an apple?",
                    "What color is an orange?",
                    "What color is an eggplant?",
                    "What color is a strawberry?",
                    "What color is the ocean?",
                    "What color is snow?",
                    "What color is a stop sign?",
                    "What color is a fire truck?",
                    "What color is a lemon?",
                ],
                // Questions for Animals category (50+ engaging questions)
                [
                    "What animal says 'woof'?",
                    "What animal says 'meow'?",
                    "What animal lives in a barn?",
                    "What animal is the biggest?",
                    "What animal has a long trunk?",
                    "What animal has spots?",
                    "What animal has a mane?",
                    "What animal lives in a barn and says 'moo'?",
                    "What animal can fly?",
                    "What animal says 'oink'?",
                    "What animal says 'moo'?",
                    "What animal says 'baa'?",
                    "What animal says 'neigh'?",
                ],
                // Questions for Foods category (50+ engaging questions for 5-year-olds)
                [
                    "What do you drink with breakfast?",
                    "What do you eat that's yellow and curved?",
                    "What do you eat that's red and crunchy?",
                    "What do you eat that comes from a cow?",
                    "What do you eat that's white and goes with cereal?",
                    "What do you eat that comes from chickens?",
                    "What do you eat that's orange and you can see with?",
                    "What do you eat that's green and crunchy?",
                    "What do you eat that's yellow and has seeds?",
                    "What do you eat that's white and you use to make bread?",
                    "What do you eat that's red and you put in salads?",
                    "What do you eat that's green and you can make soup with?",
                    "What do you eat that's orange and you drink in the morning?",
                    "What do you eat that's red and you put in sandwiches?",
                    "What do you eat that's green and you cook with eggs?",
                    "What do you eat that's yellow and you put in cakes?",
                    "What do you eat that's white and you put in coffee?",
                    "What do you eat that's red and you put on pizza?",
                ],
                // Questions for Countries category (50+ engaging questions for 7-year-olds)
                [
                    "What country has the Queen?",
                    "What country has the Statue of Liberty?",
                    "What country has the Eiffel Tower?",
                    "What country has the Great Wall?",
                    "What country has the Sydney Opera House?",
                    "What country has Mount Fuji?",
                    "What country has the Colosseum?",
                    "What country has Big Ben?",
                    "What country has the Pyramids?",
                    "What country has Christ the Redeemer?",
                    "What country has the Kremlin?",
                    "What country has the Acropolis?",
                    "What country has the Brandenburg Gate?",
                    "What country has the Leaning Tower of Pisa?",
                    "What country has the Sagrada Familia?",
                    "What country has the Atomium?",
                    "What country has the Tower Bridge?",
                    "What country has the Parthenon?",
                    "What country has the Alhambra?",
                    "What country has the Palace of Versailles?",
                    "What country has the Forbidden City?",
                    "What country has the Temple of Heaven?",
                    "What country has the Terracotta Army?",
                    "What country has the Potala Palace?",
                ],
                // Questions for Toys category (50+ questions)
                [
                    "What do you kick in a game?",
                    "What do you hold and hug?",
                    "What has wheels and you sit on?",
                    "What do you stack and build with?",
                    "What do you ride with pedals?",
                    "What do you play with that has tracks?",
                    "What do you play with that has tracks and wheels?",
                    "What do you play with that makes noise when you shake?",
                    "What do you play with that has a ball inside?",
                    "What do you play with that has wheels and a handle?",
                    "What do you play with that flies in the wind?",
                ],
                // Questions for Body Parts category (50+ engaging questions)
                [
                    "What do you look with?",
                    "What do you smell with?",
                    "What do you eat with?",
                    "What do you hold things with?",
                    "What do you walk with?",
                    "What do you think with?",
                    "What do you hear with?",
                    "What do you touch with?",
                    "What do you have on top of your body?",
                    "What do you have that connects your arms to your body?",
                    "What do you have that connects your legs to your body?",
                    "What do you have that beats in your chest?",
                ]
            ],
            currentQuestionIndex: 0, // This line was missing a comma
            askedQuestions: [], // Track which questions have been asked 
        },
        round2: {
            bids: [0, 0, 0],
            currentBidder: 0,
            bidAmount: 1,
            currentChild: 0, // Track which child is answering
            listQuestions: [
                // Questions for 7-year-old Stephanie
                [
                    { question: "Colors of the rainbow", required: 5 },
                    { question: "Animals with four legs", required: 5 },
                    { question: "Types of pets", required: 5 },
                    { question: "Things that are round", required: 5 }
                ],
                // Questions for 5-year-old Bethanie
                [
                    { question: "Foods that are sweet", required: 4 },
                    { question: "Things that are red", required: 4 },
                    { question: "Animals that say 'moo'", required: 3 }, // This is just to trick them - only 1 answer
                    { question: "Parts of your body", required: 4 }
                ],
                // Questions for 3-year-old Varchie
                [
                    { question: "Foods you eat", required: 3 },
                    { question: "Animals", required: 3 },
                    { question: "Colors", required: 3 },
                    { question: "Things that are big", required: 3 }
                ]
            ],
            currentListItems: [],
            requiredCount: 0
        },
        round3: {
            currentChild: 0, // Track which child is answering
            buzzedIn: -1, // -1 = no one buzzed, 0,1,2 = parent index
            timer: null, // Timer for round 3
            timeLeft: 20, // Time left for answering
            selectedChild: -1, // Which child is selected to answer
            currentPictureIndex: 0, // Current picture index
            pictureQuestions: [
                // Questions for 7-year-old Stephanie
                [
                    { question: "What animal is shown in this picture?", options: ["Dog", "Cat", "Elephant", "Lion"], answer: "Elephant" },
                    { question: "What is the color of this object?", options: ["Red", "Blue", "Green", "Yellow"], answer: "Red" },
                    { question: "What fruit is this?", options: ["Apple", "Banana", "Orange", "Grape"], answer: "Apple" },
                    { question: "What shape is this?", options: ["Circle", "Square", "Triangle", "Rectangle"], answer: "Circle" }
                ],
                // Questions for 5-year-old Bethanie
                [
                    { question: "What toy is shown in this picture?", options: ["Ball", "Doll", "Car", "Blocks"], answer: "Ball" },
                    { question: "What color is this?", options: ["Red", "Blue", "Green", "Yellow"], answer: "Blue" },
                    { question: "What animal is this?", options: ["Cat", "Dog", "Bird", "Fish"], answer: "Bird" },
                    { question: "What is this?", options: ["Book", "Pencil", "Crayon", "Eraser"], answer: "Book" }
                ],
                // Questions for 3-year-old Varchie
                [
                    { question: "What is this?", options: ["Ball", "Car", "Duck", "Hat"], answer: "Duck" },
                    { question: "What color is this?", options: ["Red", "Blue", "Yellow", "Green"], answer: "Yellow" },
                    { question: "What animal is this?", options: ["Cat", "Dog", "Cow", "Pig"], answer: "Cow" },
                    { question: "What is this?", options: ["Shoe", "Sock", "Hat", "Glove"], answer: "Shoe" }
                ]
            ]
        },
        finalRound: {
            answers: [
                // For the children's ages, make it simple matching game
                { text: "Red", correct: true },
                { text: "Blue", correct: true },
                { text: "Green", correct: true },
                { text: "Yellow", correct: true },
                { text: "Cat", correct: true },
                { text: "Dog", correct: true },
                { text: "Apple", correct: false },
                { text: "Ball", correct: false },
                { text: "Car", correct: false },
                { text: "Book", correct: false },
                { text: "Shoe", correct: false },
                { text: "Hat", correct: false }
            ],
            selected: Array(12).fill(false),
            correctCount: 0,
            wrongCount: 0,
            needed: 5,
            allowed: 3
        },
        banks: [0, 0, 0] // Each parent's bank
    };

    // DOM Elements
    var elements = {
        welcomeScreen: document.getElementById('welcome-screen'),
        round1Screen: document.getElementById('round1-screen'),
        round2Screen: document.getElementById('round2-screen'),
        round3Screen: document.getElementById('round3-screen'),
        finalRoundScreen: document.getElementById('final-round-screen'),
        resultsScreen: document.getElementById('results-screen'),
        parent1Name: document.getElementById('parent1-name'),
        child1Name: document.getElementById('child1-name'),
        parent2Name: document.getElementById('parent2-name'),
        child2Name: document.getElementById('child2-name'),
        parent3Name: document.getElementById('parent3-name'),
        child3Name: document.getElementById('child3-name'),
        startGameBtn: document.getElementById('start-game-btn'),
        bidAmount: document.getElementById('bid-amount'),
        bidUp: document.getElementById('bid-up'),
        bidDown: document.getElementById('bid-down'),
        confirmBidBtn: document.getElementById('confirm-bid-btn'),
        triviaQuestion: document.getElementById('trivia-question'),
        triviaOptions: document.getElementById('trivia-options'),
        submitTriviaBtn: document.getElementById('submit-trivia-btn'),
        auctionArea: document.getElementById('auction-area'),
        triviaArea: document.getElementById('trivia-area'),
        bankAmount: document.getElementById('bank-amount'),
        listBidAmount: document.getElementById('list-bid-amount'),
        listBidUp: document.getElementById('list-bid-up'),
        listBidDown: document.getElementById('list-bid-down'),
        confirmListBidBtn: document.getElementById('confirm-list-bid-btn'),
        listArea: document.getElementById('list-area'),
        listQuestion: document.getElementById('list-question'),
        correctItemsInput: document.getElementById('correct-items-input'),
        submitCorrectItemsBtn: document.getElementById('submit-correct-items-btn'),
        skipRound2Btn: document.getElementById('skip-round2-btn'),
        skipRound1Btn: document.getElementById('skip-round1-btn'),
        skipRound3Btn: document.getElementById('skip-round3-btn'),
        skipFinalRoundBtn: document.getElementById('skip-final-round-btn'),
        round3Picture: document.getElementById('round3-picture'),
        pictureDescription: document.getElementById('picture-description'),
        child1AnswerBtn: document.getElementById('child1-answer-btn'),
        child2AnswerBtn: document.getElementById('child2-answer-btn'),
        child3AnswerBtn: document.getElementById('child3-answer-btn'),
        markCorrectBtn: document.getElementById('mark-correct-btn'),
        markWrongBtn: document.getElementById('mark-wrong-btn'),
        child1Points: document.getElementById('child1-points'),
        child2Points: document.getElementById('child2-points'),
        child3Points: document.getElementById('child3-points'),
        listCategoryDisplay: document.getElementById('list-category-display'),
        listAuctionArea: document.getElementById('list-auction-area'),
        round2BankAmount: document.getElementById('round2-bank-amount'),
        buzzerBtn: document.getElementById('buzzer-btn'),
        buzzStatus: document.getElementById('buzz-status'),
        pictureArea: document.getElementById('picture-area'),
        pictureQuestionArea: document.getElementById('picture-question-area'),
        pictureQuestion: document.getElementById('picture-question'),
        pictureQuestionOptions: document.getElementById('picture-question-options'),
        submitPictureBtn: document.getElementById('submit-picture-btn'),
        finalBoard: document.getElementById('final-board'),
        finalBankAmount: document.getElementById('final-bank-amount'),
        correctNeeded: document.getElementById('correct-needed'),
        wrongAllowed: document.getElementById('wrong-allowed'),
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

        // Round 1 events
        elements.bidUp.addEventListener('click', function () {
            if (gameState.round1.bidAmount < 5) {
                gameState.round1.bidAmount++;
                elements.bidAmount.textContent = gameState.round1.bidAmount;
            }
        });

        elements.bidDown.addEventListener('click', function () {
            if (gameState.round1.bidAmount > 1) {
                gameState.round1.bidAmount--;
                elements.bidAmount.textContent = gameState.round1.bidAmount;
            }
        });

        elements.confirmBidBtn.addEventListener('click', confirmRound1Bid);
        // Removed submitTriviaBtn event listener as it's not needed in Round 1

        // Round 2 events
        elements.listBidUp.addEventListener('click', function () {
            if (gameState.round2.bidAmount < 10) {
                gameState.round2.bidAmount++;
                elements.listBidAmount.textContent = gameState.round2.bidAmount;
            }
        });

        elements.listBidDown.addEventListener('click', function () {
            if (gameState.round2.bidAmount > 1) {
                gameState.round2.bidAmount--;
                elements.listBidAmount.textContent = gameState.round2.bidAmount;
            }
        });

        elements.confirmListBidBtn.addEventListener('click', confirmRound2Bid);
        elements.submitCorrectItemsBtn.addEventListener('click', submitCorrectItems);
        elements.skipRound2Btn.addEventListener('click', skipRound2);
        elements.skipRound1Btn.addEventListener('click', skipRound1);
        elements.skipRound3Btn.addEventListener('click', skipRound3);
        elements.skipFinalRoundBtn.addEventListener('click', skipFinalRound);
        elements.child1AnswerBtn.addEventListener('click', function() { selectChildToAnswer(0); });
        elements.child2AnswerBtn.addEventListener('click', function() { selectChildToAnswer(1); });
        elements.child3AnswerBtn.addEventListener('click', function() { selectChildToAnswer(2); });
        elements.markCorrectBtn.addEventListener('click', markPictureCorrect);
        elements.markWrongBtn.addEventListener('click', markPictureWrong);

        // Final round events
        elements.playAgainBtn.addEventListener('click', resetGame);
    }

    // Start the game
    function startGame() {
        var parent1 = elements.parent1Name.value.trim();
        var parent2 = elements.parent2Name.value.trim();
        var parent3 = elements.parent3Name.value.trim();
        var child1 = document.getElementById('parent1-child').value;
        var child2 = document.getElementById('parent2-child').value;
        var child3 = document.getElementById('parent3-child').value;

        if (!parent1 || !parent2 || !parent3) {
            alert('Please enter all parent names');
            return;
        }

        // Check that each child is assigned to only one parent
        var children = [child1, child2, child3];
        if (children.filter((item, index) => children.indexOf(item) !== index).length > 0) {
            alert('Each child can only be assigned to one parent');
            return;
        }

        // Set the parent-child pairs
        gameState.parentChildPairs = [
            { parent: parent1, child: child1 },
            { parent: parent2, child: child2 },
            { parent: parent3, child: child3 }
        ];

        // Also set the separate arrays for compatibility
        gameState.parents = [parent1, parent2, parent3];
        gameState.children = [child1, child2, child3];

        // Start with Round 1
        gameState.currentRound = 1;
        showScreen('round1-screen');
        startRound1();
    }

    // Start Round 1: Auction & Trivia
    function startRound1() {
        gameState.round1.currentChild = 0;
        gameState.round1.answeredQuestions = [0, 0, 0];
        gameState.round1.correctAnswers = [0, 0, 0];
        startRound1Child();
    }

    // Confirm Round 1 bid
    function confirmRound1Bid() {
        var childIndex = gameState.round1.currentChild;
        gameState.round1.bids[childIndex] = gameState.round1.bidAmount;
        elements.auctionArea.style.display = 'none';
        elements.triviaArea.style.display = 'block';

        // Select a category based on the child's age
        var childCategories = gameState.round1.categories[childIndex];

        // Assign categories based on the actual child's name
        var childName = gameState.children[childIndex];
        var categoryIndex;
        switch (childName) {
            case "Stephanie": // 7 years old - Countries (most complex)
                categoryIndex = childCategories.findIndex(cat => cat.category === "Countries");
                break;
            case "Bethanie": // 5 years old - Foods (medium complexity)
                categoryIndex = childCategories.findIndex(cat => cat.category === "Foods");
                break;
            case "Varchie": // 3 years old - Colors (simplest)
                categoryIndex = childCategories.findIndex(cat => cat.category === "Colors");
                break;
            default:
                categoryIndex = 0; // fallback
        }

        // If the specific category isn't found, use the first one
        if (categoryIndex === -1) {
            categoryIndex = 0;
        }

        gameState.round1.currentCategory = childCategories[categoryIndex];
        gameState.round1.currentItems = [...gameState.round1.currentCategory.items]; // Copy the items

        // Reset asked questions for this round
        gameState.round1.askedQuestions = [];

        // Start the 60-second timer
        startRound1Timer();

        // Show the category for the child to answer
        showRound1Category();
    }

    // Show category for child to answer questions
    function showRound1Category() {
        var childIndex = gameState.round1.currentChild;

        // Display the category and current question
        elements.triviaQuestion.innerHTML = `
            <h3>Category: <span style="color: #fdbb2d;">${gameState.round1.currentCategory.category}</span></h3>
            <p>Time left: <span id="category-timer">${gameState.round1.timeLeft}</span> seconds</p>
            <div id="current-question-display">
                <h4>Current Question:</h4>
                <p id="question-text">Waiting for first question...</p>
            </div>
        `;

        // Create control buttons for the host
        elements.triviaOptions.innerHTML = `
            <div id="answer-controls" style="margin-top: 20px;">
                <button id="correct-btn" class="btn-primary" style="background-color: #4CAF50; margin-right: 10px; padding: 15px 25px; font-size: 1.2rem;">Correct Answer</button>
                <button id="wrong-btn" class="btn-primary" style="background-color: #F44336; padding: 15px 25px; font-size: 1.2rem;">Wrong Answer</button>
            </div>
            <div id="question-stats" style="margin-top: 20px;">
                <p>Correct Answers: <span id="correct-count">0</span> | Asked Questions: <span id="asked-count">0</span> | Bid: <span id="bid-count">${gameState.round1.bids[childIndex]}</span></p>
            </div>
        `;

        // Add event listeners for the buttons
        document.getElementById('correct-btn').addEventListener('click', markCorrectAnswer);
        document.getElementById('wrong-btn').addEventListener('click', markWrongAnswer);

        // Ask the first question
        nextRound1Question();
    }

    // Get the index of the question set that matches the current category
    function getCategoryQuestionIndex() {
        var category = gameState.round1.currentCategory.category;
        switch (category) {
            case "Colors":
                return 0;
            case "Animals":
                return 1;
            case "Foods":
                return 2;
            case "Countries":
                return 3;
            case "Toys":
                return 4;
            case "Body Parts":
                return 5;
            default:
                return 0; // Default to colors if not found
        }
    }

    // Ask the next question in the category
    function nextRound1Question() {
        var childIndex = gameState.round1.currentChild;
        var categoryQuestionIndex = getCategoryQuestionIndex();
        var categoryQuestions = gameState.round1.questions[categoryQuestionIndex];

        // Find a question that hasn't been asked yet
        var availableQuestions = [];
        for (var i = 0; i < categoryQuestions.length; i++) {
            if (!gameState.round1.askedQuestions.includes(i)) {
                availableQuestions.push(i);
            }
        }

        if (availableQuestions.length > 0) {
            // Pick a random available question
            var randomIndex = Math.floor(Math.random() * availableQuestions.length);
            var questionIndex = availableQuestions[randomIndex];

            // Mark this question as asked
            gameState.round1.askedQuestions.push(questionIndex);

            // Display the question
            document.getElementById('question-text').textContent = categoryQuestions[questionIndex];

            // Update stats
            updateRound1Stats();
        } else {
            // If all questions have been asked, display a message
            document.getElementById('question-text').textContent = "No more questions in this category!";
        }
    }

    // Mark the child's answer as correct
    function markCorrectAnswer() {
        var childIndex = gameState.round1.currentChild;
        gameState.round1.correctAnswers[childIndex]++;
        gameState.round1.answeredQuestions[childIndex]++;

        // Award points to the child immediately
        gameState.childPoints[childIndex] += 10; // Award 10 points per correct answer
        updateChildPointsDisplay(); // Update the display immediately

        // Update stats
        updateRound1Stats();

        // Move to next question automatically
        setTimeout(function () {
            if (gameState.round1.timeLeft > 0) {
                nextRound1Question();
            }
        }, 500);
    }

    // Mark the child's answer as wrong
    function markWrongAnswer() {
        var childIndex = gameState.round1.currentChild;
        gameState.round1.answeredQuestions[childIndex]++;

        // Update stats
        updateRound1Stats();

        // Move to next question automatically
        setTimeout(function () {
            if (gameState.round1.timeLeft > 0) {
                nextRound1Question();
            }
        }, 500);
    }

    // Update the stats display
    function updateRound1Stats() {
        var childIndex = gameState.round1.currentChild;
        document.getElementById('correct-count').textContent = gameState.round1.correctAnswers[childIndex];
        document.getElementById('asked-count').textContent = gameState.round1.answeredQuestions[childIndex];
        document.getElementById('bid-count').textContent = gameState.round1.bids[childIndex];
    }

    // Start Round 1 for a specific child
    function startRound1Child() {
        if (gameState.round1.currentChild >= 3) {
            endRound1();
            return;
        }

        // Reset asked questions for this child
        gameState.round1.askedQuestions = [];

        gameState.round1.bidAmount = 1;
        elements.bidAmount.textContent = gameState.round1.bidAmount;
        elements.auctionArea.style.display = 'block';
        elements.triviaArea.style.display = 'none';
        elements.bankAmount.textContent = `£${gameState.banks[gameState.round1.currentChild]}`;

        // Show the category based on the child's age in the auction area so the parent can see it before bidding
        var childIndex = gameState.round1.currentChild;
        var childCategories = gameState.round1.categories[childIndex];

        // Assign categories based on the actual child's name
        var childName = gameState.children[childIndex];
        var categoryToShow;
        switch (childName) {
            case "Stephanie": // 7 years old - Countries (most complex)
                categoryToShow = childCategories.find(cat => cat.category === "Countries");
                break;
            case "Bethanie": // 5 years old - Foods (medium complexity)
                categoryToShow = childCategories.find(cat => cat.category === "Foods");
                break;
            case "Varchie": // 3 years old - Colors (simplest)
                categoryToShow = childCategories.find(cat => cat.category === "Colors");
                break;
            default:
                categoryToShow = childCategories[0]; // fallback
        }

        // If the specific category isn't found, use the first one
        if (!categoryToShow) {
            categoryToShow = childCategories[0];
        }

        // Update prompt to show current child and category
        var pair = gameState.parentChildPairs[childIndex];
        document.querySelector('#round1-screen h3').textContent = `Auction Phase - ${pair.parent} bidding for ${pair.child}`;

        // Show the category that will be asked
        var auctionCategoryDiv = document.getElementById('auction-category');
        if (auctionCategoryDiv) {
            auctionCategoryDiv.innerHTML = `
                <p><strong>Category:</strong> ${categoryToShow.category}</p>
                <p><strong>Examples:</strong> ${categoryToShow.items.slice(0, 5).join(', ')}</p>
            `;
        } else {
            auctionCategoryDiv = document.createElement('div');
            auctionCategoryDiv.id = 'auction-category';
            auctionCategoryDiv.innerHTML = `
                <p><strong>Category:</strong> ${categoryToShow.category}</p>
                <p><strong>Examples:</strong> ${categoryToShow.items.slice(0, 5).join(', ')}</p>
            `;
            auctionCategoryDiv.style.margin = '15px 0';
            auctionCategoryDiv.style.padding = '10px';
            auctionCategoryDiv.style.backgroundColor = 'rgba(253, 187, 45, 0.2)';
            auctionCategoryDiv.style.borderRadius = '5px';
            auctionCategoryDiv.style.textAlign = 'left';

            // Insert after the first element in auction area
            var auctionArea = document.getElementById('auction-area');
            auctionArea.insertBefore(auctionCategoryDiv, auctionArea.children[1]);
        }
    }

    // Start the 60-second timer for Round 1
    function startRound1Timer() {
        // Clear any existing timer
        if (gameState.round1.timer) {
            clearInterval(gameState.round1.timer);
        }

        // Reset timer
        gameState.round1.timeLeft = 60;

        // Update the UI with the timer
        var timerDiv = document.createElement('div');
        timerDiv.id = 'round1-timer';
        timerDiv.textContent = `Time left: ${gameState.round1.timeLeft}s`;
        timerDiv.style.fontSize = '1.5rem';
        timerDiv.style.fontWeight = 'bold';
        timerDiv.style.color = '#fdbb2d';
        timerDiv.style.textAlign = 'center';
        timerDiv.style.margin = '10px 0';

        // Add timer to the trivia area
        var triviaArea = document.getElementById('trivia-area');
        if (!document.getElementById('round1-timer')) {
            triviaArea.insertBefore(timerDiv, triviaArea.firstChild);
        }

        // Start the countdown
        gameState.round1.timer = setInterval(function () {
            gameState.round1.timeLeft--;
            document.getElementById('round1-timer').textContent = `Time left: ${gameState.round1.timeLeft}s`;

            // Update the timer display in the trivia area too
            var timerDisplay = document.getElementById('category-timer');
            if (timerDisplay) {
                timerDisplay.textContent = gameState.round1.timeLeft;
            }

            if (gameState.round1.timeLeft <= 0) {
                clearInterval(gameState.round1.timer);
                // Time's up - move to next child or end round
                endRound1Timer();
            }
        }, 1000);
    }

    // End the timer when time runs out
    function endRound1Timer() {
        clearInterval(gameState.round1.timer);

        // Calculate score for this child based on the rules
        var childIndex = gameState.round1.currentChild;
        var bid = gameState.round1.bids[childIndex];
        var correct = gameState.round1.correctAnswers[childIndex];

        if (correct >= bid) {
            // If child answered at least the predicted number:
            // 10 points for each correct answer within the prediction limits + 2 points for each extra correct answer
            var points = (bid * 10) + ((correct - bid) * 2);
            gameState.banks[childIndex] += points;
            gameState.childPoints[childIndex] += points; // Also award to child
        } else {
            // If child did not reach the predicted number: 2 points for each correct answer
            var points = correct * 2;
            gameState.banks[childIndex] += points;
            gameState.childPoints[childIndex] += points; // Also award to child
        }

        // Move to next child
        gameState.round1.currentChild++;
        if (gameState.round1.currentChild < 3) {
            startRound1Child();
        } else {
            endRound1();
        }
    }

    // Submit trivia answer
    function submitTriviaAnswer() {
        // This function is now handled by selectTriviaOption
    }

    // Select trivia option (for other rounds)
    function selectTriviaOption(selectedOption) {
        // This function is used in other rounds
    }

    // End Round 1 and calculate score
    function endRound1() {
        // Calculate total correct answers across all children
        var totalCorrect = gameState.round1.correctAnswers.reduce((a, b) => a + b, 0);
        var totalBid = gameState.round1.bids.reduce((a, b) => a + b, 0);

        if (totalCorrect >= totalBid) {
            // Earn £100 per correct answer - distributed to all parents
            for (var i = 0; i < 3; i++) {
                gameState.banks[i] += Math.floor((totalCorrect * 100) / 3); // Distribute evenly
            }
        }

        elements.bankAmount.textContent = `£${gameState.banks[0]}`; // Show first parent's bank
        updateChildPointsDisplay(); // Update child points display

        // Move to Round 2
        setTimeout(function () {
            gameState.currentRound = 2;
            showScreen('round2-screen');
            startRound2();
        }, 1000);
    }

    // Start Round 2: Auction & List
    function startRound2() {
        gameState.round2.currentChild = 0;
        startRound2Child();
    }

    // Start Round 2 for a specific child
    function startRound2Child() {
        if (gameState.round2.currentChild >= 3) {
            endRound2();
            return;
        }

        gameState.round2.bidAmount = 1;
        elements.listBidAmount.textContent = gameState.round2.bidAmount;
        elements.listAuctionArea.style.display = 'block';
        elements.listArea.style.display = 'none';
        elements.round2BankAmount.textContent = `£${gameState.banks[gameState.round2.currentChild]}`;

        // Show list question appropriate for the child's age during auction phase
        var childIndex = gameState.round2.currentChild;
        var childName = gameState.children[childIndex];

        // Assign categories based on the actual child's name, similar to Round 1
        var question;
        switch (childName) {
            case "Stephanie": // 7 years old - Countries (most complex)
                question = { question: "Name countries", required: 5 };
                break;
            case "Bethanie": // 5 years old - Toys (medium complexity)
                question = { question: "Name toys", required: 4 };
                break;
            case "Varchie": // 3 years old - Body Parts (simplest)
                question = { question: "Name body parts", required: 3 };
                break;
            default:
                question = { question: "Name items", required: 3 }; // fallback
        }

        // Update the category display in the auction area
        elements.listCategoryDisplay.textContent = question.question;
        elements.listCategoryDisplay.style.display = 'block'; // Make sure it's visible

        // Update prompt to show current child
        var childName = gameState.children[gameState.round2.currentChild];
        var parentName = gameState.parents[gameState.round2.currentChild];
        document.querySelector('#round2-screen h3').textContent = `Auction Phase - ${parentName} bidding for ${childName}`;
    }

    // Confirm Round 2 bid
    function confirmRound2Bid() {
        var childIndex = gameState.round2.currentChild;
        var childName = gameState.children[childIndex];

        // Assign categories based on the actual child's name
        var question;
        switch (childName) {
            case "Stephanie": // 7 years old - Countries (most complex)
                question = { question: "Name countries", required: 5 };
                break;
            case "Bethanie": // 5 years old - Toys (medium complexity)
                question = { question: "Name toys", required: 4 };
                break;
            case "Varchie": // 3 years old - Body Parts (simplest)
                question = { question: "Name body parts", required: 3 };
                break;
            default:
                question = { question: "Name items", required: 3 }; // fallback
        }

        gameState.round2.bids[childIndex] = gameState.round2.bidAmount;
        elements.listAuctionArea.style.display = 'none';
        elements.listArea.style.display = 'block';

        // Show the category in the scoring area
        elements.listQuestion.textContent = `Name items in the list: ${question.question} (Need at least ${question.required})`;

        // Clear the input field
        elements.correctItemsInput.value = ''; // Clear the input field
    }

    // Submit correct items count
    function submitCorrectItems() {
        var childIndex = gameState.round2.currentChild;
        var bid = gameState.round2.bids[childIndex];
        var input = elements.correctItemsInput.value.trim();

        if (input === '') {
            alert('Please enter the number of correct items');
            return;
        }

        var actualCount = parseInt(input, 10);
        if (isNaN(actualCount) || actualCount < 0) {
            alert('Please enter a valid number of correct items');
            return;
        }

        // Calculate points: if actual count meets or exceeds bid, earn £200 per correct item
        if (actualCount >= bid) {
            gameState.banks[childIndex] += actualCount * 200; // Award to the correct parent's bank
            gameState.childPoints[childIndex] += actualCount * 200; // Also award to child
        } else {
            // If they didn't meet their bid, they get 0 points
            // Or you could choose to give them actualCount * 100 or some other penalty system
        }

        elements.round2BankAmount.textContent = `£${gameState.banks[childIndex]}`;
        updateChildPointsDisplay(); // Update child points display

        // Move to next child
        gameState.round2.currentChild++;
        if (gameState.round2.currentChild < 3) {
            startRound2Child();
        } else {
            endRound2();
        }
    }

    // Skip to next child in Round 2
    function skipRound2() {
        // Move to next child without scoring
        gameState.round2.currentChild++;
        if (gameState.round2.currentChild < 3) {
            startRound2Child();
        } else {
            endRound2();
        }
    }

    // Skip Round 1
    function skipRound1() {
        // End Round 1 immediately and move to Round 2
        gameState.currentRound = 2;
        elements.bankAmount.textContent = `£${gameState.banks[0]}`; // Update bank display
        showScreen('round2-screen');
        startRound2();
    }

    // Skip to next child in Round 2
    function skipRound2() {
        // Move to next child without scoring
        gameState.round2.currentChild++;
        if (gameState.round2.currentChild < 3) {
            startRound2Child();
        } else {
            endRound2();
        }
    }

    // End Round 2
    function endRound2() {
        elements.round2BankAmount.textContent = `£${gameState.banks[0]}`; // Show first parent's bank
        updateChildPointsDisplay(); // Update child points display

        // Move to Round 3
        setTimeout(function () {
            gameState.currentRound = 3;
            showScreen('round3-screen');
            startRound3();
        }, 1000);
    }

    // Skip Round 3
    function skipRound3() {
        // End Round 3 immediately and move to Final Round
        endRound3();
    }

    // Skip Final Round
    function skipFinalRound() {
        // End Final Round immediately and move to Results
        showScreen('results-screen');
        showResults();
    }

    // Start Round 3: Picture & Answer
    function startRound3() {
        // Initialize round 3 state
        gameState.round3.timer = null; // Clear any existing timer
        gameState.round3.timeLeft = 20; // Reset time
        gameState.round3.selectedChild = -1; // No child selected initially
        gameState.round3.currentPictureIndex = 0; // Reset picture index

        // Show a random picture appropriate for the round
        showRandomPicture();

        // Update the child points display
        updateChildPointsDisplay();
    }

    // Show a random picture for the round
    function showRandomPicture() {
        // Brand logos for children to identify
        var allPictures = [
            { src: "https://placehold.co/300/FF0000/FFFFFF?text=Coca-Cola", description: "Coca-Cola" },
            { src: "https://placehold.co/300/0000FF/FFFFFF?text=McDonald's", description: "McDonald's" },
            { src: "https://placehold.co/300/000000/FFFFFF?text=Nike", description: "Nike" },
            { src: "https://placehold.co/300/000000/FFFFFF?text=Apple", description: "Apple" },
            { src: "https://placehold.co/300/0000FF/FFFFFF?text=Samsung", description: "Samsung" },
            { src: "https://placehold.co/300/FF69B4/FFFFFF?text=Tesla", description: "Tesla" },
            { src: "https://placehold.co/300/0000FF/FFFFFF?text=Facebook", description: "Facebook" },
            { src: "https://placehold.co/300/0000FF/FFFFFF?text=Microsoft", description: "Microsoft" },
            { src: "https://placehold.co/300/FF0000/FFFFFF?text=Google", description: "Google" },
            { src: "https://placehold.co/300/0000FF/FFFFFF?text=Starbucks", description: "Starbucks" }
        ];

        // Select a random picture
        var randomIndex = Math.floor(Math.random() * allPictures.length);
        var picture = allPictures[randomIndex];

        elements.round3Picture.src = picture.src;
        elements.pictureDescription.textContent = picture.description;

        // Start the 20-second timer for the child to answer
        startRound3Timer();
    }

    // Start the 20-second timer for Round 3
    function startRound3Timer() {
        // Clear any existing timer
        if (gameState.round3.timer) {
            clearInterval(gameState.round3.timer);
        }

        // Set initial time
        gameState.round3.timeLeft = 20;

        // Update display
        var timerDisplay = document.createElement('div');
        timerDisplay.id = 'round3-timer';
        timerDisplay.style.cssText = 'position: absolute; top: 10px; right: 10px; font-size: 24px; font-weight: bold; color: #fdbb2d; background: rgba(0,0,0,0.5); padding: 5px 10px; border-radius: 5px;';
        timerDisplay.textContent = `Time: ${gameState.round3.timeLeft}s`;

        // Add timer to the picture area
        var pictureArea = document.getElementById('picture-area');
        var existingTimer = document.getElementById('round3-timer');
        if (existingTimer) {
            existingTimer.remove();
        }
        pictureArea.appendChild(timerDisplay);

        // Start the countdown
        gameState.round3.timer = setInterval(function() {
            gameState.round3.timeLeft--;
            timerDisplay.textContent = `Time: ${gameState.round3.timeLeft}s`;

            if (gameState.round3.timeLeft <= 0) {
                clearInterval(gameState.round3.timer);
                // Time's up - automatically mark as wrong if no answer given
                markPictureWrong();
            }
        }, 1000);
    }

    // Select which child will answer
    function selectChildToAnswer(childIndex) {
        gameState.round3.selectedChild = childIndex;
        var childName = gameState.children[childIndex];
        var parentName = gameState.parents[childIndex];

        // Update UI to indicate which child is selected
        elements.pictureDescription.textContent = `Selected: ${childName} will answer. Picture: ${elements.pictureDescription.textContent}`;
    }

    // Mark picture as correct
    function markPictureCorrect() {
        if (gameState.round3.selectedChild === -1) {
            alert("Please select which child will answer first!");
            return;
        }

        // Clear the timer
        if (gameState.round3.timer) {
            clearInterval(gameState.round3.timer);
            gameState.round3.timer = null;
        }

        // Award £500 to the parent of the child who answered correctly
        var correctParentIndex = gameState.round3.selectedChild;
        gameState.banks[correctParentIndex] += 500;

        // Award points to the child who answered correctly
        gameState.childPoints[correctParentIndex] += 100; // 100 points for correct brand identification

        // Update bank display for all parents
        elements.round3BankAmount.textContent = `£${gameState.banks[0]}`;

        // Update the child points display
        updateChildPointsDisplay();

        // Show a new picture
        setTimeout(function () {
            showRandomPicture();
            gameState.round3.selectedChild = -1; // Reset selection
        }, 1000);
    }

    // Mark picture as wrong - split points between other parents
    function markPictureWrong() {
        if (gameState.round3.selectedChild === -1) {
            alert("Please select which child will answer first!");
            return;
        }

        // Clear the timer
        if (gameState.round3.timer) {
            clearInterval(gameState.round3.timer);
            gameState.round3.timer = null;
        }

        // Calculate points to split between other children
        var pointsToSplit = 500;
        var otherChildren = [];

        // Find the other children (not the one who answered)
        for (var i = 0; i < 3; i++) {
            if (i !== gameState.round3.selectedChild) {
                otherChildren.push(i);
            }
        }

        // Split the points between the other children
        var pointsPerChild = Math.floor(pointsToSplit / otherChildren.length);

        for (var j = 0; j < otherChildren.length; j++) {
            gameState.childPoints[otherChildren[j]] += pointsPerChild;
        }

        // Update bank display for all parents
        elements.round3BankAmount.textContent = `£${gameState.banks[0]}`;

        // Update the child points display
        updateChildPointsDisplay();

        // Show a new picture
        setTimeout(function () {
            showRandomPicture();
            gameState.round3.selectedChild = -1; // Reset selection
        }, 1000);
    }

    // Update the child points display
    function updateChildPointsDisplay() {
        elements.child1Points.textContent = gameState.childPoints[0];
        elements.child2Points.textContent = gameState.childPoints[1];
        elements.child3Points.textContent = gameState.childPoints[2];
    }

    // End Round 3
    function endRound3() {
        elements.round3BankAmount.textContent = `£${gameState.banks[0]}`; // Show first parent's bank
        updateChildPointsDisplay(); // Update child points display

        // Move to Final Round
        setTimeout(function () {
            gameState.currentRound = 4;
            showScreen('final-round-screen');
            startFinalRound();
        }, 1000);
    }

    // Start Final Round: Risk & Double
    function startFinalRound() {
        // Combine all parent banks into one for the final round
        var totalBank = gameState.banks.reduce((a, b) => a + b, 0);
        gameState.banks[0] = totalBank; // Use first bank as the combined total

        updateChildPointsDisplay(); // Update child points display

        // Shuffle answers
        var shuffled = [...gameState.finalRound.answers];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }

        gameState.finalRound.answers = shuffled;
        gameState.finalRound.selected = Array(12).fill(false);
        gameState.finalRound.correctCount = 0;
        gameState.finalRound.wrongCount = 0;

        renderFinalBoard();
        elements.finalBankAmount.textContent = `£${gameState.banks[0]}`;
        elements.correctNeeded.textContent = gameState.finalRound.needed;
        elements.wrongAllowed.textContent = gameState.finalRound.allowed;
    }

    // Render final round board
    function renderFinalBoard() {
        elements.finalBoard.innerHTML = '';

        gameState.finalRound.answers.forEach(function (answer, index) {
            var card = document.createElement('div');
            card.className = 'final-card';
            card.textContent = '?';
            card.dataset.index = index;
            card.onclick = function () {
                revealFinalCard(parseInt(this.dataset.index));
            };
            elements.finalBoard.appendChild(card);
        });
    }

    // Reveal final card
    function revealFinalCard(index) {
        if (gameState.finalRound.selected[index]) return;

        gameState.finalRound.selected[index] = true;
        var card = document.querySelector(`.final-card[data-index="${index}"]`);
        var answer = gameState.finalRound.answers[index];

        card.textContent = answer.text;
        card.style.backgroundColor = answer.correct ? '#4CAF50' : '#F44336';

        if (answer.correct) {
            gameState.finalRound.correctCount++;
        } else {
            gameState.finalRound.wrongCount++;
        }

        // Update counters
        elements.correctNeeded.textContent = gameState.finalRound.needed - gameState.finalRound.correctCount;
        elements.wrongAllowed.textContent = gameState.finalRound.allowed - gameState.finalRound.wrongCount;

        // Check win/lose conditions
        if (gameState.finalRound.correctCount >= gameState.finalRound.needed) {
            // Win - double the bank
            gameState.banks[0] *= 2;
            setTimeout(function () {
                showResults();
            }, 1000);
        } else if (gameState.finalRound.wrongCount >= gameState.finalRound.allowed) {
            // Lose - keep original bank
            setTimeout(function () {
                showResults();
            }, 1000);
        }
    }

    // Show game results
    function showResults() {
        var resultsHTML = `
            <h3>Game Completed!</h3>
            <p>Congratulations to all parents on completing Parent's Evening!</p>

            <div class="results-details">
                <h4>Final Scores:</h4>
                <ul>
                    <li>Total Bank: £${gameState.banks[0]}</li>
                    <li>Stephanie's Points: £${gameState.childPoints[0]}</li>
                    <li>Bethanie's Points: £${gameState.childPoints[1]}</li>
                    <li>Varchie's Points: £${gameState.childPoints[2]}</li>
                </ul>

                <h4>Round Summaries:</h4>
                <p>Round 1 - Auction & Trivia: You bid on how many trivia questions each child could answer correctly</p>
                <p>Round 2 - Auction & List: You bid on how many list items each child could name</p>
                <p>Round 3 - Picture & Answer: You selected which child would answer and judged if the answer was correct</p>
                <p>Final Round - Risk & Double: You tried to find 5 correct answers to double your bank!</p>

                <h4>How did you do?</h4>
                <p>Stephanie (age 7) answered trivia questions, named list items, and helped with picture questions.</p>
                <p>Bethanie (age 5) answered trivia questions, named list items, and helped with picture questions.</p>
                <p>Varchie (age 3) answered trivia questions, named list items, and helped with picture questions.</p>
            </div>
        `;

        elements.resultsContent.innerHTML = resultsHTML;
        showScreen('results-screen');
    }

    // Reset game to initial state
    function resetGame() {
        elements.parent1Name.value = '';
        elements.child1Name.value = '';
        elements.parent2Name.value = '';
        elements.child2Name.value = '';
        elements.parent3Name.value = '';
        elements.child3Name.value = '';

        // Reset game state
        gameState = {
            parents: ['', '', ''],
            children: ['', '', ''],
            currentRound: 0,
            currentScreen: 'welcome-screen',
            round1: {
                bids: [0, 0, 0],
                currentBidder: 0,
                bidAmount: 1,
                triviaQuestions: [
                    { question: "Complete the phrase: 'The early bird catches the...'", options: ["Worm", "Worm", "Fish", "Bait"], answer: "Worm" },
                    { question: "Who was the Prime Minister of the UK in 2010?", options: ["Tony Blair", "David Cameron", "Gordon Brown", "Theresa May"], answer: "Gordon Brown" },
                    { question: "What is the capital of France?", options: ["Berlin", "Madrid", "Paris", "Rome"], answer: "Paris" },
                    { question: "Which planet is known as the Red Planet?", options: ["Venus", "Mars", "Jupiter", "Saturn"], answer: "Mars" },
                    { question: "How many sides does a triangle have?", options: ["3", "4", "5", "6"], answer: "3" }
                ],
                answeredQuestions: 0,
                correctAnswers: 0
            },
            round2: {
                bids: [0, 0, 0],
                currentBidder: 0,
                bidAmount: 1,
                listQuestions: [
                    { question: "Playable characters from Mario Kart", required: 5 },
                    { question: "Types of fruit", required: 5 },
                    { question: "Countries in Europe", required: 5 },
                    { question: "Types of vegetables", required: 5 }
                ],
                currentListItems: [],
                requiredCount: 5
            },
            round3: {
                currentParent: 0,
                buzzedIn: -1,
                pictureQuestions: [
                    { question: "What is the name of this famous landmark?", options: ["Eiffel Tower", "Big Ben", "Statue of Liberty", "Sydney Opera House"], answer: "Eiffel Tower" },
                    { question: "Which animal is shown in this picture?", options: ["Lion", "Tiger", "Leopard", "Cheetah"], answer: "Lion" },
                    { question: "What is the brand shown in this logo?", options: ["Apple", "Microsoft", "Google", "Amazon"], answer: "Apple" },
                    { question: "What type of vehicle is this?", options: ["Car", "Boat", "Airplane", "Train"], answer: "Airplane" }
                ]
            },
            finalRound: {
                answers: [
                    { text: "Paris", correct: true },
                    { text: "London", correct: true },
                    { text: "Berlin", correct: true },
                    { text: "Madrid", correct: true },
                    { text: "Rome", correct: true },
                    { text: "Tokyo", correct: true },
                    { text: "New York", correct: false },
                    { text: "Sydney", correct: false },
                    { text: "Moscow", correct: false },
                    { text: "Cairo", correct: false },
                    { text: "Lagos", correct: false },
                    { text: "Seoul", correct: false }
                ],
                selected: Array(12).fill(false),
                correctCount: 0,
                wrongCount: 0,
                needed: 5,
                allowed: 3
            },
            banks: [0, 0, 0]
        };

        showScreen('welcome-screen');
    }

    // Show specified screen
    function showScreen(screenId) {
        // Hide all screens
        var screens = document.querySelectorAll('.screen');
        screens.forEach(function (screen) {
            screen.classList.remove('active');
        });

        // Show requested screen
        document.getElementById(screenId).classList.add('active');
        gameState.currentScreen = screenId;
    }

    // Initialize the game
    initGame();
}); // End of DOMContentLoaded event listener