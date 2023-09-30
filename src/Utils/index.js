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
  