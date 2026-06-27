# Sprint 3 - Group Assignment

## 1. Sprint Planning

### Sprint Goal

The goal of this sprint is to complete file handling, including saving, loading, displaying, and opening files, as well as finishing the editor functionality. In addition, the goal is to begin real-time collaboration via `socket.io`.

### Selected User Stories

We are continuing with the user stories from the previous sprint that we did not finish:

- US-201: Create, delete, and share files (Requirement 2.2.1)
- US-202: Display projects and file list (Requirement 2.2.2)

The new user stories we are starting are:

- US-301: Extended editor functionality (Requirements 2.3.2-2.3.5)
- US-302: Simultaneous editing (Requirement 2.4.1)

### Tasks

- T-201-3: Connect the UI to the backend through `fileServices`
- T-201-4: Invite members to the project
- T-201-5: Create modal dialogs for delete confirmation
- T-201-6: Create input fields for naming projects and files
- T-201-7: Create functions for user handling in `userServices.js` (added during Sprint 3)

- T-202-3: Implement fetching of projects and the file list in the UI
- T-202-4: Fetch metadata per project and file
- T-202-5: Implement sorting
- T-202-6: Open the clicked file in the code editor and highlight it
- T-202-7: Visually mark shared projects and files

- T-301-1: Configure syntax highlighting based on file extension
- T-301-2: Ensure line numbers and editor options
- T-301-3: Implement display of cursor position
- T-301-4: Verify search and replace in the active file
- T-301-5: Verify undo and redo

- T-302-1: Set up the socket connection between client and server
- T-302-2: Send editor changes from Monaco to the server
- T-302-3: Implement receiving real-time updates in the client
- T-302-4: Synchronize editor content between multiple clients
- T-302-5: Ensure correct syntax highlighting after external changes
- T-302-6: Load the latest file version when connecting to the editor

### Distribution

We used open allocation and first-come, first-served for all tasks in the backlog. Discussions about distribution took place continuously and on an ongoing basis. Since we all work on different days and at different times during the week, we do not want to block progress by reserving tasks that others may need in order to continue. Because of that, the backlog stays open for anyone to start a task when they have time.

### Estimation

Estimates are available here under the "Sprint 3" tab:
https://docs.google.com/spreadsheets/d/1C4emn6hofD2PmGw2cUFbroMHP918EOgcrvQGSVOMWcU/edit?gid=0#gid=0

### Acceptance Criteria

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

#### US-301

- Given that I have opened a file in the editor,
  When the file is displayed in the Monaco Editor,
  Then the code should be shown with syntax highlighting based on file type, such as HTML, CSS, or JavaScript.

- Given that I have opened a file in the editor,
  When I write or navigate in the code,
  Then the editor should show line numbers and use configured editor options that make the code easier to read and edit.

- Given that I have the cursor placed in the editor,
  When I move the cursor to another place in the code,
  Then the current line and column of the cursor position should be shown in the interface.

- Given that I have an active file open in the editor,
  When I use the search or replace function,
  Then I should be able to find and replace text in the active file.

- Given that I have made a change in the code,
  When I use undo or redo,
  Then the editor should correctly restore or recreate the change in the active file.

#### US-302

- Given that multiple users have opened the same file,
  When one user makes a change in the editor,
  Then the change should be shown to the other users in real time.

- Given that two or more users edit the same file at the same time,
  When changes are sent between the clients,
  Then the file content should remain synchronized for all users.

- Given that a user receives changes from another user,
  When the content is updated in the Monaco Editor,
  Then syntax rendering and editor rendering should be updated correctly.

- Given that a user connects to a file that is already open,
  When the file is loaded,
  Then the user should receive the latest version of the file content.

- Given that the connection to the real-time server is lost,
  When the user tries to continue editing,
  Then the user should receive feedback that real-time synchronization is not working.

#### GitHub Projects Start

![GitHub Projects - Sprint 3 start](images/projects-sprint3-start.png)

## 2. Delivery Documentation

[Link to GitHub Pages](https://zebwul.github.io/coed-grupp-12/)

### Completed User Stories

- US-301: Extended editor functionality (Requirements 2.3.2-2.3.5)
- US-201: Create, delete, and share files (Requirement 2.2.1)

### Completed Tasks

Niklas:

- T-202-3: Implement fetching of projects and the file list in the UI
- T-201-3: Connect the UI to the backend through `fileServices`
- Bug: The "delete" and "addUser" buttons were broken

Jenny:

- T-201-4: Invite members to the project
- T-201-7: Create functions for user handling in `userServices.js`

Arian:

- T-201-5: Create a modal dialog for delete confirmation
- T-202-4: Fetch metadata per project and file
- Chore: Add environment variables to `pages.yml`
- Chore: Refactor the sidebar
- T-201-6: Create input fields for naming projects and files

Zebastian:

- T-202-6: Open the clicked file in the code editor and highlight it
- T-301-1: Configure syntax highlighting based on file extension
- T-301-2: Ensure line numbers and editor options
- T-301-3: Implement display of cursor position
- T-301-4: Verify search and replace in the active file
- T-301-5: Verify undo and redo
- T-302-1: Set up the socket connection between client and server
- T-302-2: Send editor changes from Monaco to the server
- T-302-3: Implement receiving real-time updates in the client
- T-302-4: Synchronize editor content between multiple clients
- T-302-5: Ensure correct syntax highlighting after external changes

### Started but Not Completed Tasks

Niklas:

- N/A

Jenny:

- T-202-7: Visually mark shared projects and files

Arian:

- N/A

Zebastian:

- N/A

### Time Outcome

Time outcome is available here under the "Sprint 3" tab: https://docs.google.com/spreadsheets/d/1C4emn6hofD2PmGw2cUFbroMHP918EOgcrvQGSVOMWcU/edit?gid=0#gid=0

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

#### GitHub Projects End

![GitHub Projects - Sprint 3 end](images/projects-sprint3-slut.png)

## 3. Sprint Retrospective

### What worked well?

We had very good energy and were highly creative as a group, which we want to continue building on. We also managed to get most of the basic structure in place, which we are very satisfied with.

### What worked less well?

We agree that we do not always follow through on the decisions we make. We have discussed that we may be setting our goals too high and need to find a middle ground for what should be done. If attendance at meetings had been better and everyone had gathered more often, the need to strictly follow the process would have been lower because updates would have happened directly during meetings. For example, there was some uncertainty during this sprint about whether the daily standup would happen live or not.

### What created friction, delays, or frustration?

We reviewed the process for how decisions are made because decisions were not always followed, which meant that we ended up working in different ways. For example, we did not consistently handle presence updates in the same way, which may have created frustration because not everyone felt informed and that, in turn, led to confusion about whether meetings would happen.

During this sprint we also had several tightly coupled tasks that depended on each other, which resulted in partly inefficient work because it led to code conflicts that had to be resolved afterward.

### What will we do differently next sprint?

We decided that everyone should go into our shared spreadsheet and update when they are available for group work and when they will participate in the daily standup. That gives everyone one shared document to check and keeps everyone informed about who is available and when. This is intended to help us remain flexible with each group member's schedule. We also want to have the times for sprint planning and sprint retrospective scheduled in advance so that as many people as possible can participate. The sprint retrospective should therefore be held after lunch on Thursday when the sprint review is complete so that everyone can attend.

We also decided to write comments in the code more often so that it becomes easier for the other group members to read and understand.

There are different ways to avoid conflicts that become too large when we work on tightly connected tasks. We will review whether we can, where possible, work in different files instead of having several people making changes in the same files. We will also try to merge the code we work on more frequently, create more but smaller PRs, and make tasks smaller in order to increase the likelihood that our ongoing work stays closer together.

## 4. Time Logging and Estimation

### How well did the group's overall time estimates match the logged time during the sprint?

The majority of the tasks matched the estimates. However, we overestimated the time for US-301, and it took us less time than expected to complete the five tasks connected to that user story. This was because many of the tasks we created and estimated were already supported by the Monaco library.

We also had a few tasks where we underestimated the time because they were more complex than we initially expected. After reflecting on them, we felt that some of those tasks could even have been their own user stories.

### What will you bring into the next sprint planning session?

We will make a strong effort to break down the requirements specification into more user stories with more, smaller tasks. Our goal is for each task to take no more than 3 hours to complete, plus 1 hour for code review, merge to `main`, and other daily routine work such as daily standups, time reporting, and similar activities.
