// motivationalMessages.js

export const positiveMessages = [
    "You are Correct! Great job!",
    "Excellent! You got it right!",
    "Well done! You are doing fantastic!",
  ];
  
  export const negativeMessages = [
    "Try Again! You'll get it next time!",
    "Oops! That wasn't the correct answer.",
    "Don't worry! Keep trying!",
  ];
  
  export const getRandomPositiveMessage = () => {
    const randomIndex = Math.floor(Math.random() * positiveMessages.length);
    return positiveMessages[randomIndex];
  };
  
  export const getRandomNegativeMessage = () => {
    const randomIndex = Math.floor(Math.random() * negativeMessages.length);
    return negativeMessages[randomIndex];
  };
  
  const completionMessages = {
    perfect: [
      "Congratulations! You're a perfectionist!",
      "You're a genius! Perfect score!",
      "Wow! You nailed it! 10/10!",
    ],
    good: [
      "Great job! You're doing fantastic!",
      "Excellent work! Keep it up!",
      "You're on fire!",
    ],
    tryAgain: [
      "Don't worry, try again!",
      "You'll get it next time!",
      "Keep practicing! You're improving!",
    ],
  };
  
  export const getCompletionMessage = (correctAnswersCount, totalQuestions) => {
    let scoreCategory;
  
    if (correctAnswersCount === totalQuestions) {
      scoreCategory = "perfect";
    } else if (correctAnswersCount > 7) {
      scoreCategory = "good";
    } else {
      scoreCategory = "tryAgain";
    }
  
    const messages = completionMessages[scoreCategory];
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
  
    return {
      message: randomMessage,
      className: scoreCategory, // Assign the class name based on scoreCategory
    };
  };
  
  
