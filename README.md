# Interactive Registration Form - Reflection

### 1. How did event.preventDefault() help in handling form submission?
When you hit submit on a standard HTML form, the browser immediately tries to refresh or redirect the page. If that happens, all entered input values and console messages disappear instantly. Using `event.preventDefault()` stops that automatic refresh so JavaScript can step in, run through all our validation checks, show error messages on the screen, and save the data without the page flashing or reloading.

### 2. What is the difference between using HTML5 validation attributes and JavaScript-based validation? Why might you use both?
HTML5 attributes like `required`, `minlength`, and `type="email"` handle basic rules natively right in the markup without needing extra code. However, native browser validation can feel clunky and doesn't handle custom logic well—like comparing whether two password inputs match. JavaScript lets us give live feedback on keystrokes, customize our error messages, and control exactly where and when errors show up. Using both is best because HTML5 sets clear baseline rules, while JavaScript makes the experience smooth and user-friendly.

### 3. Explain how you used localStorage to persist and retrieve the username. What are the limitations of localStorage for storing sensitive data?
Once all the validation checks pass, I saved the entered name using `localStorage.setItem('savedUsername', usernameInput.value)`. When the page reloads, a `DOMContentLoaded` event listener checks if that key exists with `localStorage.getItem('savedUsername')` and auto-fills the username field so the user doesn't have to retype it. 
As for limitations, `localStorage` stores plain text that isn't encrypted at all, and any script running in the browser can read it. That makes it unsafe against Cross-Site Scripting (XSS) attacks, so sensitive information like passwords or credit card numbers should never be stored there.

### 4. Describe a challenge you faced in implementing the real-time validation and how you solved it.
One tricky part was keeping the Confirm Password field accurate if someone typed both passwords, then went back and edited the first password box. At first, the error wouldn't update unless they clicked back into the second box. I fixed this by adding a check inside the main password's input listener: whenever the main password changes, it automatically re-runs the match check if the confirm field isn't empty.

### 5. How did you ensure that custom error messages were user-friendly and displayed at the appropriate times?
I added empty `` tags right under each field and added `novalidate` to the `
` so the default browser tooltips wouldn't pop up. Errors show up in real-time as the user types and