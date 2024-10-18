const modeToggle = document.getElementById('mode-toggle');
const chatLog = document.getElementById('chat-log');
const userInputForm = document.getElementById('user-input-form');
const userInputInput = document.getElementById('user-input');
const voiceInputBtn = document.getElementById('voice-input-btn');
const historyLog = document.getElementById('history-log');
let userName = '';
let messageHistory = [];
let isNamePromptActive = false; // Track if asking for a name

// Dark mode toggle
modeToggle.addEventListener('click', function() {
  const body = document.body;
  const isLightMode = body.classList.toggle('light-mode');
  body.classList.toggle('dark-mode');
  this.innerHTML = isLightMode ? '&#9728;' : '&#9790;';
});

// NLP-based keyword detection using tokenization
const tokenize = (text) => {
  return text.toLowerCase().match(/\w+/g) || [];
};

const getKeywords = (text) => {
  const keywords = {
    python: ["python", "py", "data science", "machine learning"],
    javascript: ["javascript", "js", "web development", "frontend"],
    courses: ["course", "tutorial", "learn", "education", "guide"],
    ai: ["artificial intelligence", "ai", "neural networks"],
    c: ["c", "c programming", "c language"],
    cpp: ["c++", "cpp", "c plus plus"],
    csharp: ["c#", "csharp", "c sharp"],
    machinelearning: ["machine learning", "ml"],
    deeplearning: ["deep learning", "dl"],
    feedback: ["feedback", "suggest", "improve", "rate"],
    casual: [
      "hello", "how are you", "need help", "hi", "hey", "what's up", "how's it going", 
      "good morning", "good afternoon", "good evening", "thanks", "thank you", 
      "bye", "goodbye"
    ]
  };

  const tokens = tokenize(text);
  for (const [key, value] of Object.entries(keywords)) {
    if (value.some((kw) => tokens.includes(kw))) {
      return key;
    }
  }
  return null;
};

// Show typing indicator
const showTypingIndicator = () => {
  const typingIndicator = document.createElement('div');
  typingIndicator.classList.add('message', 'ai-message', 'typing-indicator');
  typingIndicator.innerHTML = "Chatbot is typing...";
  chatLog.appendChild(typingIndicator);
  chatLog.scrollTop = chatLog.scrollHeight;
  return typingIndicator;
};

// Remove typing indicator
const removeTypingIndicator = (typingIndicator) => {
  chatLog.removeChild(typingIndicator);
};

// Handle user input form submission
userInputForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const userInput = userInputInput.value.trim();
  userInputInput.value = '';

  if (!userInput) {
    alert("Please input something.");
    return;
  }

  const userInputLowercase = userInput.toLowerCase();
  let response = '';
  const typingIndicator = showTypingIndicator();

  setTimeout(() => {
    removeTypingIndicator(typingIndicator);

    const keyword = getKeywords(userInputLowercase);

    // Handle case where the bot is asking for a name
    if (!userName && !isNamePromptActive) {
      userName = userInput;
      isNamePromptActive = false;  // Name is now set, stop expecting it
      chatLog.innerHTML += `<div class="message user-message"><p>You: ${userName}</p></div>`;
      chatLog.innerHTML += `<div class="message ai-message"><p>∞ Nice to meet you, ${userName}! What would you like to talk about?</p></div>`;
      return;
    }

    if (keyword) {
      switch (keyword) {
        case 'python':
          response = `Here's a suggested pathway to learn Python:<br><br>
              1. Start with the basics: <a href="https://www.codecademy.com/learn/learn-python" target="_blank">Codecademy's Python Course</a><br>
              2. Practice with exercises: <a href="https://leetcode.com/problemset/all/?listId=wp7h948" target="_blank">LeetCode's Python Exercises</a><br>
              3. Watch tutorials: <a href="https://www.youtube.com/channel/UCfzlCWGWYyIQ0aLC5w48gBQ" target="_blank">Corey Schafer's Python Tutorials</a><br><br>
              What do you think?`;
          break;
        case 'javascript':
          response = `Here's a suggested pathway to learn JavaScript:<br><br>
              1. Start with the basics: <a href="https://www.codecademy.com/learn/learn-javascript" target="_blank">Codecademy's JavaScript Course</a><br>
              2. Practice with exercises: <a href="https://leetcode.com/problemset/all/?listId=wp7h948" target="_blank">LeetCode's JavaScript Exercises</a><br>
              3. Watch tutorials: <a href="https://www.youtube.com/channel/UC29ju8bIPH5as8OGyP_4_bQ" target="_blank">Traversy Media's JavaScript Tutorials</a><br><br>
              What do you think?`;
          break;
        case 'ai':
          response = `If you're interested in AI, here's a learning path:<br><br>
              1. Intro to AI: <a href="https://www.coursera.org/learn/ai-for-everyone" target="_blank">AI for Everyone by Andrew Ng</a><br>
              2. Dive deeper into Deep Learning: <a href="https://www.deeplearning.ai/programs/" target="_blank">DeepLearning.AI Courses</a><br>
              3. Practical tutorials: <a href="https://www.youtube.com/c/3blue1brown" target="_blank">3Blue1Brown on YouTube</a><br><br>
              Does this help?`;
          break;
          case 'c':
            response = `Here's a suggested pathway to learn C:<br><br>
                1. Start with the basics: <a href="https://www.codecademy.com/learn/learn-c" target="_blank">Codecademy's C Course</a><br>
                2. Practice with exercises: <a href="https://leetcode.com/problemset/all/?listId=wp7h948" target="_blank">LeetCode's C Exercises</a><br>
                3. Watch tutorials: <a href="https://www.youtube.com/channel/UCZ2bu0f9uwLqQrj8P1lXOuw" target="_blank">The Cherno's C Tutorials</a><br><br>
                What do you think?`;
            break;
          case 'cpp':
            response = `Here's a suggested pathway to learn C++:<br><br>
                1. Start with the basics: <a href="https://www.codecademy.com/learn/learn-cpp" target="_blank">Codecademy's C++ Course</a><br>
                2. Practice with exercises: <a href="https://leetcode.com/problemset/all/?listId=wp7h948" target="_blank">LeetCode's C++ Exercises</a><br>
                3. Watch tutorials: <a href="https://www.youtube.com/channel/UCQ-W1KEEXfyUYeVQUpzTFvA" target="_blank">Chili's C++ Tutorials</a><br><br>
                What do you think?`;
            break;
          case 'csharp':
            response = `Here's a suggested pathway to learn C#:<br><br>
                1. Start with the basics: <a href="https://www.codecademy.com/learn/learn-csharp" target="_blank">Codecademy's C# Course</a><br>
                2. Practice with exercises: <a href="https://leetcode.com/problemset/all/?listId=wp7h948" target="_blank">LeetCode's C# Exercises</a><br>
                3. Watch tutorials: <a href="https://www.youtube.com/channel/UC29ju8bIPH5as8OGyP_4_bQ" target="_blank">Traversy Media's C# Tutorials</a><br><br>
                What do you think?`;
            break;
          case 'machinelearning':
            response = `If you're interested in Machine Learning, here's a learning path:<br><br>
                1. Intro to ML: <a href="https://www.coursera.org/learn/machine-learning" target="_blank">Machine Learning by Andrew Ng</a><br>
                2. Dive deeper into ML: <a href="https://www.deeplearning.ai/programs/" target="_blank">DeepLearning.AI Courses</a><br>
                3. Practical tutorials: <a href="https://www.youtube.com/c/3blue1brown" target="_blank">3Blue1Brown on YouTube</a><br><br>
                Does this help?`;
            break;
          case 'deeplearning':
            response = `If you're interested in Deep Learning, here's a learning path:<br><br>
                1. Intro to DL: <a href="https://www.coursera.org/learn/deep-learning" target="_blank">Deep Learning by Andrew Ng</a><br>
                2. Dive deeper into DL: <a href="https://www.deeplearning.ai/programs/" target="_blank">DeepLearning.AI Courses</a><br>
                3. Practical tutorials: <a href="https://www.youtube.com/c/3blue1brown" target="_blank">3Blue1Brown on YouTube</a><br><br>
                Does this help?`;
            break;
      
        case 'feedback':
          response = "We always appreciate feedback! Please let us know how we can improve!";
          break;
        case 'casual':
          const casualResponses = {
            "hello": "Hello! How can I assist you today?",
            "how are you": "I'm just a bot, but I'm doing great! How about you?",
            "hi": "Hey there! How can I help?",
            "hey": "Hey! Need any help?",
            "what's up": "Not much, just here to assist you! What's up with you?",
            "how's it going": "All good here! What can I do for you?",
            "good morning": "Good morning! What would you like to learn today?",
            "good afternoon": "Good afternoon! How can I assist you?",
            "good evening": "Good evening! What would you like to discuss?",
            "thanks": "You're welcome!",
            "thank you": "You're welcome!",
            "bye": "Goodbye! Have a great day!",
            "goodbye": "Goodbye! See you next time!"
          };
          response = casualResponses[userInputLowercase] || `Hello, ${userName}! How can I help?`;
          break;
        default:
          response = "Sorry, I didn't understand that. Can you please try again?";
      }
    } else {
      response = `Interesting! You said: ${userInput}. Can you tell me more about that?`;
    }

    // Save to message history with brief display for user messages
    messageHistory.push(`You: ${userInput}`);
    historyLog.innerHTML += `<li>${userInput.substring(0, 30)}...</li>`;

    // Add AI response
    chatLog.innerHTML += `<div class="message user-message"><p>You: ${userInput}</p></div>`;
    chatLog.innerHTML += `<div class="message ai-message"><p>∞ ${response}</p></div>`;
    chatLog.scrollTop = chatLog.scrollHeight;
  }, 1000);
});

// Voice Input
if ('webkitSpeechRecognition' in window) {
  const SpeechRecognition = webkitSpeechRecognition;
  const recognition = new SpeechRecognition();

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    userInputInput.value = transcript;
    userInputForm.dispatchEvent(new Event('submit'));
  };

  this.innerHTML = '&#xf130;'; // Microphone symbol
  voiceInputBtn.addEventListener('click', () => {
    recognition.start();
  });
}

// Emoji Reactions (if required)
chatLog.addEventListener('click', (event) => {
  if (event.target.classList.contains('ai-message')) {
    const emoji = prompt("React with an emoji:");
    if (emoji) {
      event.target.innerHTML += `<span class="reaction">${emoji}</span>`;
    }
  }
});
