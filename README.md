AI Mock Interview Practice
This is a tool to help you get ready for job interviews. It's like practicing with a computer that acts like an interviewer.

What it does:

Feels like a real interview: You get questions just like in a real job interview.
Different kinds of questions: You can practice questions about tech stuff, how you act at work, and how you lead.
You can pick what you want: Choose the type of interview and how hard the questions are.
Computer tells you how you did: After you answer, the computer gives you a score and tells you what you did well and what you can do better.
It checks if you used the right words.
It sees if you answered everything.
Counts your words: It shows you how many words you've used.
Shows how far you've gone: You can see how many questions you've answered.
Good answers to look at: You can see examples of strong answers.
Keeps track of your tries: You can make an account to save your practice interviews.

What we used to make it:

React: Makes the website look and work.
TypeScript: Helps make sure the code is good.
Tailwind CSS (or something like it): Makes the website look nice quickly.
react-router-dom: Helps you move around the website.
lucide-react (or something like it): Gives us the little pictures (icons).
Supabase: Like a place to keep all the info (questions, your tries). It also helps with accounts.
Supabase Functions: Little computer programs that run on the internet to check your answers using smart stuff (AI).
How to start using it:

You need these things on your computer:

Node.js (make sure it's version 18 or newer)
npm or yarn (these help run the website)
Supabase CLI (you might not need this right away)
A Supabase account (you need to sign up on their website)
Get the code:

Bash

git clone [https://github.com/your-username/ai-mock-interview.git](https://github.com/your-username/ai-mock-interview.git)
cd ai-mock-interview
Install the stuff the website needs:

Bash

npm install
# or
yarn install
Tell the website about your Supabase account:

Make a file called .env.local in the same folder as the code.
Put these lines in that file, but use your own info from Supabase:
Code snippet

VITE_SUPABASE_URL=YOUR_SUPABASE_URL
VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
(Maybe) Set up the smart answer checker:

If we have a special computer program (Supabase Function) to check your answers, you might need to set it up on Supabase. Look at their website for how to do that.
How to use it:

Start the website on your computer:

Bash

npm run dev
# or
yarn dev
Go to the website in your internet browser (it will probably be http://localhost:5173).

Make an account or log in.

Go to the "Practice" page.

Pick the kind of interview (Tech, Behavior, Leadership) and how hard it should be.

Click "Start Interview".

Read the question and type your answer.

Click "Submit Answer" to see how you did.

Keep going until the interview ends.

Look at your past tries and the feedback on the "My Interviews" page.

How the computer checks your answers:

The computer uses smart programs (AI) to see how good your answers are. It looks for:

Right words: If you used important words for the question.
Good enough answer: If you talked about all the important parts.
Easy to understand: If your answer is clear and makes sense.
It will give you a score and tell you what you can do better. Remember, this is just a computer, so also try to get feedback from real people!

Want to help make it better?

If you have ideas or want to fix something, here's how:

Copy the code to your own account (fork it).
Make a new copy (branch) to work on.
Make your changes.
Save your changes (commit).
Send your changes to your copy online (push).
Ask us to put your changes into the main code (pull request).
Make sure your code looks good and has tests (ways to check if it works right).

License:

This project is free to use (under the MIT License).
