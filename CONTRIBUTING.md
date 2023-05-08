# Guide to Contributing

## Team Values:
- Keep an open line of communication. It's okay to ask for help and not know it all!

- Be respectful of each other's work. Criticism is welcomed. However, it must be done constructively.

- Be buddies. Each member will be assigned a buddy at the beginning of each sprint. Buddy pairs will ensure work is complete through checks and balances. If a teammate has issues with their code, they will first contact their buddy. If they cannot solve the problem with their buddy, the buddy pair will reach out to the rest of the team.

- If a team conflict arises, an anonymous group vote will occur. The majority wins the group vote.

## Sprint Cadence:
Sprints will be 2 weeks in duration.

## Daily Standups:
- Daily standups will occur on Sundays (virtual) at 11 am, Wednesdays (in-person) at 5:30 pm, and Friday (in-person) at 1 pm.

- Sunday meetings will be held via zoom, and Wednesday/Friday meetings will occur at Bobst. Attendance from all team members is required. Absences are allowed as long as they can communicate 24 hours prior to the meeting.

- Each teammate will present their progress. They will present only their progress, not the progress of any other teammate. 

- A member who makes no progress on a task for two or more standups will be reported to management.

## Coding Standards:
- Write minimum code to get things working end to end, only then iterate to improve.
- Always push working code, if you break the pipeline/build then fix it.
- Make granular and small commits, per feature or per bug fix.
- Provide descriptive commit messages.
- Use VS Code to write code.
- Write self documenting code. Use descriptive variable and function names. Avoid unnecessary name shortening.
- Don't leave dead/commented out code behind. If you see such code, delete it.
- Write automated tests to cover critical integration points and functionality.

## Rules of Contributing:
Teammates will complete the tasks they are given at the beginning of each sprint.

1. Pull recent changes
	git pull 

2. create branch. choose a branch name for what feature you’re doing
	git checkout -b <branch-name>

example:
	git checkout -b user-story/13/task/9/implement-user-login

3. Update task board TASK to “In Process” 

4. add and commit 
	git add .
	git commit -m “<message>”

5. merge remote changes
	git fetch origin
	git merge origin/master

6. push branch changes to YOUR BRANCH
	git push origin <branch-name>

7. go on github, go to your branch and go to PULL REQUESTS. Create a pull request to push your branch into the main branch

8. Update task board TASK to awaiting review 

9. AFTER someone else reviews, approves and merges your code,
delete your branch
	git push origin -d <branch-name>
THEN switch back to master
	git checkout master
THEN delete branch locally
	git branch -D <branch-name>


## Instructions for Setting up the Local Development Environment:
1. Clone the repository.
2. Create clone in VS Code.
3. Write code.
4. Enter the command 'git pull' into terminal.
5. Stage Changes.
6. Commit code with a descriptive message.

## Instructions for Building and Testing the Project:

PRIOR TO MAKING ANY PUSH REQUESTS: make sure to enter the command 'git pull' into your terminal, then stage your changes and push your code with a detailed message regarding the changes made.

1. Create a well-defined strategy to tackle the feature being built (sprint planning).
2. Analyze and anticipate potential issues in the code.
3. Run 'git pull'. Code the back-end/server technology (run a code review and push process periodically).
4. Have a teammate check your code!
5. Run 'git pull'. Create the application programming interface.
6. Have a teammate check your code!
7. Run 'git pull'. Develop the mobile app front-end or "client-side" interface (run a code review and push process periodically).
8. Developer requests a review of the code.
9. Run documentation testing.
10. Run functional testing (business functionality, target audience, and distribution channels).
11. Run usability testing (satisfaction, efficiency, effectiveness).
12. Run User interface testing.
13. Run compatibility testing (OS Configuration, Browser Configuration, Database Configuration, Device Configuration, Network Configuration).
14. Run performance testing (Load Testing, Stress Testing, Stability Testing, Volume Testing, Concurrency testing).
15. Run security testing.
16. Run certification testing.
