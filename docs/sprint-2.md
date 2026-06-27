# Sprint 2 - Group Assignment

## 1. Sprint Planning

### Sprint Goal

The goal is to complete authentication (login and logout), and to create a working code editor with support for file handling and basic editor settings.

### Selected User Stories

US-103, US-201, US-202, US-203, US-205

### Tasks

- T-103-2, T-103-3, T-103-4
- T-201-1, T-201-2, T-201-3, T-201-4
- T-202-1, T-202-2, T-202-3, T-202-4, T-202-5, T-202-6, T-202-7
- T-203-1, T-203-2, T-203-3, T-203-4, T-203-5
- T-205-1, T-205-2, T-205-3, T-205-4

### Distribution

We used open allocation and first-come, first-served for all tasks in the backlog. Since we all work on different days and at different times during the week, we do not want to block progress by reserving tasks that others may need in order to continue. Because of that, the backlog stays open for anyone to start a task when they have time.

### Estimation

Time estimates are available here under the tab "Sprint 2": https://docs.google.com/spreadsheets/d/1C4emn6hofD2PmGw2cUFbroMHP918EOgcrvQGSVOMWcU/edit?gid=0#gid=0

### Acceptance Criteria

#### US-103

- Given that I have an account,
  When I am on the page and there is a clear button at the top that I can click,
  Then a popup with a login form should be shown so that I can log in.

- Given that I have an account,
  When I click log in,
  Then I should be able to access my workspace.

- Given that I am logged in,
  When I want to log out of the account,
  Then there should be a "log out" button at the top that logs me out.

- Given that I have files in my account,
  When I am logged out of the page,
  Then I should not be able to access the files unless I log in.

- Given that I enter an invalid email or password,
  When I try to log in,
  Then error messages should be shown.

#### US-201

- Given that I am logged in,
  When I press the "New Project" button,
  Then a project folder should be created that I can name.

- Given that I have created a project,
  When I press the "New file" button,
  Then a file should be created that can be named.

- Given that there is a file in my project that I want to delete,
  When I click "Delete",
  Then a dialog should be shown to confirm the deletion.

- Given that I confirm the deletion of the selected file,
  When I delete the file,
  Then the file should disappear permanently.

- Given that I am logged in and own or have created a project,
  When I press the "Share" button,
  Then a form should be shown where I can enter the email address of the person I want to share the project with.

#### US-202

- Given that I am logged in,
  When I press the "Load Project" button,
  Then the selected project should be loaded together with its files.

- Given that I do not have a project,
  When I press the "Load Project" button,
  Then I should be offered the option to create a project.

- Given that I am not logged in,
  When I look at the page,
  Then no files or projects should be listed.

- Given that I am not logged in,
  When I try to click "Load Project",
  Then it should not be active.

- Given that I have created projects or files,
  When I click a project or file,
  Then the project or file should open in the code editor.

- Given that I have shared a project or file,
  When I navigate my file list,
  Then it should be clear which projects or folders are shared.

#### US-203

- Given that I am in a project with several files,
  When I type in the search field,
  Then the file list should be filtered in real time based on the file names.

- Given that I enter a search term,
  When there are matching files,
  Then only files whose names include the search term should be shown.

- Given that I enter a search term,
  When no files match,
  Then a message should be shown: "No files found."

- Given that I click a file in the result,
  Then the file should open in the editor.

#### US-205

- Given that I want to choose which programming language to use,
  When I click the button to switch language,
  Then that language should be set as the active language in the Monaco Editor.

- Given that I want to customize my code editor with some personal settings,
  When I have configured those settings,
  Then they should work.

- Given that I switch language,
  When I click the button,
  Then a short code example for that language should be inserted into the code editor.

### Trello: Before

![GitHub Projects - Sprint 2 start](images/trello-sprint2-bild1.png)
![GitHub Projects - Sprint 2 start](images/trello-sprint2-bild2.png)

### Trello: After

![GitHub Projects - Sprint 2 end](images/trello-sprint2-slut.png)

After we started using the time-estimation file, we felt that this Trello board became somewhat redundant, which is why we updated it less frequently.

### GitHub Projects: Before

![GitHub Projects - Sprint 2 start](images/projects-sprint2-start.png)

### GitHub Projects: After

![GitHub Projects - Sprint 2 end](images/projects-sprint2-slut.png)

## 2. Delivery Documentation

### Completed User Stories

- US-103: Login and authentication (requirement 2.1.1)
- US-205: Basic code editing (requirement 2.3.1)

### Completed Tasks

- T-103-2: Implement client-side validation for auth forms
- T-103-4: Implement logout by clearing the JWT
- T-103-3: Save and handle authentication with JWT
- T-102-5: Refactor the register-success step
- T-201-1: Create the `CreateFile` component
- T-201-2: Create a `FileList` component
- T-205-2: Handle language selection and initial code content in the editor
- T-201-2: Create functions for file and project handling in `fileServices.js`
- T-202-2: Create functions for fetching projects and files in `fileServices.js`
- T-205-1: Implement state handling for editor content
- T-205-2: Handle language selection and initial code content in the editor
- T-205-3: Ensure correct editor configuration
- T-205-4: Editor settings (UI + storing settings)

### Distribution - who was responsible for what?

- Jenny:
  T-103-2
- Niklas:
  T-103-3, T-103-4, T-201-2, T-202-2, T-102-5
- Arian:
  T-201-1, T-202-1
- Zebastian:
  T-205-1, T-205-2, T-205-3, and T-205-4

### Time Outcome - how many hours per task?

- T-103-2: 6 hours
- T-103-3: 1 hour
- T-103-4: 2 hours
- T-102-5: 2 hours (this was not part of the original plan)
- T-201-1: 4 hours
- T-201-2: 6 hours
- T-202-2: 3 hours
- T-205-1: 4 hours
- T-205-2: 4 hours
- T-205-3: 3 hours
- T-205-4: 6 hours (this was not part of the original plan)

## Definition of Done

### Definition of Done - Team 12

A user story is considered complete when all criteria below are met.

#### Functionality and Requirements

- The feature **meets** the user story's **acceptance criteria**

### Traceability and Planning

- The user story has **correct naming** and the task can be **traced back to the user story**
- Time estimates and **time reporting** for the task are **documented**

### Code Quality

- The code **runs locally** **without errors**
- **Error handling** is implemented **where relevant**

### Documentation

- The README is updated when needed

### Code Review and Delivery

- The **PR** description **explains what** was done and **links to a user story**
- **At least one** other group member **has reviewed** and approved the PR
- The code is merged into `main`

### Code Standard

- The code follows the group's coding conventions:
  - Commits, code, and file names: English text
  - Body text in, for example, Trello/PR/code review: Swedish text
  - React `.jsx` files: PascalCase
  - `.js` files, variables, props: camelCase
  - CSS and SASS: kebab-case
  - Folders: lowercase

## 3. Sprint Retrospective

**What worked well? For example, what are you satisfied with technically, process-wise, or collaboration-wise?**

We think daily standups are useful and that we should continue with them. We are also good at being flexible with each other's schedules. We support one another well and keep the work moving forward even when we cannot all meet at the same time, or when we run into difficulties in tasks or in life in general. Our process is to update each other in Discord when someone has not been present so that everyone can catch up easily.

**What worked less well? What created friction, delays, or frustration? Be honest - the retrospective is a tool for improvement, not an evaluation of the group.**

We have not fully gotten our daily standups running in the way we agreed on in the previous sprint retrospective. We therefore need to focus more clearly on keeping the daily standup within 30 minutes. During that time, we should go around the group and answer what we plan to do today and whether there are any blockers. Potential blockers should not be discussed during the daily standup itself. Instead, the people involved should agree on who can solve them together after the meeting. A separate work session can then start for those tasks and should not be part of the daily standup.

**What will we do differently next sprint? Formulate at least one concrete action - not just an insight. An action is something you can actually follow up on: what should be done, by whom, and when?**

We can get even better at summarizing:

- what each person plans to do during the day in the daily update
- or taking meeting notes about what was done during a work session if that would help the rest of the group understand what was discussed

This means that if someone was not present at the daily standup or a work meeting:

- Daily standup: everyone posts an update in the Discord daily-update channel according to our template, which means that even people who did not attend the meeting write a short update, including if they are not able to work at all because they are busy with other things
- Other meetings: summarize together what was said and done in the meeting if it could benefit other group members

We can also become more structured in how we share planned presence or absence in advance for the daily standup. In addition, we can share our upcoming availability for work in a more structured way for the next sprint.

This will be handled more clearly from the next sprint onward, starting in Sprint 3, by filling in a tab in our shared Google Sheets document instead of writing in the chat.

## 4. Time Logging and Estimation

**How well did the group's overall time estimates match the logged time during the sprint? Highlight one concrete example of a task that took more or less time than estimated and discuss why.**

One example of a task that took longer than planned is T-103-2: Implement client-side validation for auth forms. As a group, we estimated that it would take 6 hours. After 6 hours, it felt like the task was largely done, but we re-estimated it to require 2 more hours because some fixes remained, a PR had to be created, and test instructions had to be written. However, the remaining coding took more time and required a better understanding of `useState` in React, among other things. As a group, we also needed to agree on the best solution for error output and whether the solution was good enough. After some discussion, we created a solid solution for error output beyond the standard validation in the form element. The PR was created, but the code review brought back valuable feedback and identified further improvement potential. That also took a couple of extra hours. During that time, all feedback points were addressed except for one part that was particularly tricky. That part took two hours for two group members to solve together through discussion. After that, the PR was approved and merged. In total, the task took 14 hours, partly because more than one participant was involved. It had originally been estimated at 6 hours, as mentioned earlier.

**What will you bring into the next sprint planning session?**

One thing we are taking with us is that we tend to estimate tasks too optimistically compared to the time they take in reality. We are also taking with us that it is difficult to create a fully comprehensive plan. For example, it is hard to predict every sub-step in detail and foresee every obstacle or challenge that might appear on the way to a finished task. It is also important to plan time for code review and for adjustments based on code review, which we underestimated somewhat during this sprint.
