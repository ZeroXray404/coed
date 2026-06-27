# Sprint 4 - Group Assignment

## 1. Sprint Planning

### Sprint Goal

The main goal of this sprint was to complete an MVP, and secondarily to finish as many medium-priority tasks as possible. Another goal was to review the codebase and refine both the features and the UI.

### Selected User Stories

- US-201: Create, delete, and share files (Requirement 2.2.1)
- US-202: Display projects and file list (Requirement 2.2.2)
- US-301: Extended editor functionality (Requirements 2.3.2-2.3.5)
- US-302: Simultaneous editing (Requirement 2.4.1)
- US-401: Show active users (Requirement 2.4.2)
- US-402: File tree and file explorer (Requirement 2.2.3)

### Tasks

- T-201-8: Implement removing a user from the project
- T-202-5: Implement sorting
- T-202-7: Visually mark shared projects and files
- T-202-9: Implement an indicator for the selected project
- T-202-10: Implement improved UX for the "create project" and "create file" buttons
- T-202-11: Implement functionality to expand projects on single click in `deleteMode`
- T-202-12: Move metadata functions to `fileServices.js`
- T-301-7: Ensure that undo and redo are not global across files
- T-302-6: Load the latest file version when connecting to the editor
- T-302-7: Handle error messages when the socket connection is lost
- T-302-8: Test simultaneous editing between multiple users locally
- Task: Refactor editor state to per-file state instead of global state
- T-401-1: Receive active users from the socket
- T-401-2: Show active users by name in `EditorToolbar`
- T-401-3: Give each user a unique color
- T-401-4: Show which file the user has open in `FileList`
- T-401-5: Listen for local cursor position in the editor
- T-401-6: Send cursor position through the socket
- T-401-7: Receive other users' cursor positions
- T-401-8: Store remote cursors in state
- T-401-9: Show remote cursors in Monaco
- T-401-10: Cleanup
- T-402-1: Implement validation for file names when creating files
- T-402-2: Create logic to identify file type based on file extension
- T-402-3: Implement error handling and user feedback for invalid file names
- T-402-4: Add icon support based on file type in the file list
- T-402-5: Create a mapping between file extensions and icons
- T-402-6: Ensure that unknown file types get a default icon
- T-402-7: Write tests for validation and rendering of file icons

### Distribution

We used open allocation and first-come, first-served for all tasks in the backlog. Discussions about distribution took place continuously and on an ongoing basis. Since we all work on different days and at different times during the week, we do not want to block progress by reserving tasks that others may need in order to continue. Because of that, the backlog stays open for anyone to start a task when they have time.

### Estimation

Estimates are available here under the "Sprint 4" tab:
https://docs.google.com/spreadsheets/d/1C4emn6hofD2PmGw2cUFbroMHP918EOgcrvQGSVOMWcU/edit?gid=0#gid=0

### Acceptance Criteria

#### Acceptance Criteria US-201

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

#### Acceptance Criteria US-202

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

#### Acceptance Criteria US-301

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

#### Acceptance Criteria US-302

- Given that multiple users have opened the same file,
  When one user makes a change in the editor,
  Then the change should be shown to the other users in real time.

- Given that two or more users edit the same file at the same time,
  When changes are sent between the clients,
  Then the file content should remain synchronized for all users.

- Given that a user receives changes from another user,
  When the content is updated in the Monaco Editor,
  Then syntax highlighting and editor rendering should be updated correctly.

- Given that a user connects to a file that is already open,
  When the file is loaded,
  Then the user should receive the latest version of the file content.

- Given that the connection to the real-time server is lost,
  When the user tries to continue editing,
  Then the user should receive feedback that real-time synchronization is not working.

#### Acceptance Criteria US-401

- Given that I am logged in and am a member of a project,
  When I am active at the same time as other project members,
  Then we should be able to see who is active in which file.

- Given that I am logged in and am a member of a project,
  When I am active in a file at the same time as another project member,
  Then we should each have our own cursor and the cursors should have different colors.

- Given that I am logged in and am a member of a project,
  When I click and mark a project as the active project,
  Then it should be visible which other project members are also active in that project.

#### Acceptance Criteria US-402

- Given that I create a new file,
  When I enter a file name without a valid file extension,
  Then I should receive a validation message explaining that a file extension is required.

- Given that I create a new file,
  When I enter a file name with a valid file extension such as `.js`, `.html`, or `.css`,
  Then the file should be created successfully.

- Given that files exist in the project's file list,
  When the files are displayed in the interface,
  Then each file should be shown with an icon that matches its file type.

- Given that a file type does not have a specific icon,
  When the file is shown in the file list,
  Then a default icon should be displayed.

#### GitHub Projects Start

![GitHub Projects - Sprint 4 start](images/projects-sprint4-start1.png)
![GitHub Projects - Sprint 4 start](images/projects-sprint4-start2.png)

## 2. Delivery Documentation

[Link to GitHub Pages](https://zebwul.github.io/coed-grupp-12/)

### Completed User Stories

- US-301: Extended editor functionality (Requirements 2.3.2-2.3.5)
- US-402: File tree and file explorer

We reopened the user stories below because we created new tasks inside them when we identified a need to expand the functionality within the scope of the original user stories:

- US-201: Create, delete, and share files (Requirement 2.2.1)
- US-202: Display projects and file list (Requirement 2.2.2)
- US-302: Simultaneous editing (Requirement 2.4.1)

### Completed Tasks

Niklas:

- T-201-8: Implement removing a user from the project
- T-401-5: Listen for local cursor position in the editor
- Chore: Refactor the folder structure
- Bug: Jumping cursor (caret) in the editor during fast typing

Jenny:

- T-202-7: Visually mark shared projects and files
- T-402-4: Add icon support based on file type in the file list
- T-402-5: Create a mapping between file extensions and icons
- T-402-6: Ensure that unknown file types get a default icon

Arian:

- T-202-5: Implement sorting
- T-202-9: Implement an indicator for the selected project
- T-202-10: Implement improved UX for the "create project" and "create file" buttons
- T-202-11: Implement functionality to expand projects on single click in `deleteMode`
- T-202-12: Move metadata functions to `fileServices.js`
- T-402-1: Implement validation for file names when creating files
- T-402-2: Create logic to identify file type based on file extension
- T-402-3: Implement error handling and user feedback for invalid file names

Zebastian:

- T-302-6: Load the latest file version when connecting to the editor
- T-302-7: Handle error messages when the socket connection is lost
- T-302-8: Test simultaneous editing between multiple users locally
- Task: Refactor editor state to per-file state instead of global state
- T-401-1: Receive active users from the socket
- T-401-2: Show active users by name in `EditorToolbar`
- T-401-3: Give each user a unique color
- T-401-4: Show which file the user has open in `FileList`
- Chore: Refactor folder and component structure
- Bug: Fix real-time synchronization between users
- Chore: Styling for status messages in `EditorToolbar`

### Started but Not Completed Tasks

Niklas:

- T-401-6: Send cursor position through the socket
- T-401-7: Receive other users' cursor positions
- T-401-8: Store remote cursors in state
- T-401-9: Show remote cursors in Monaco

Jenny:

- N/A

Arian:

- N/A

Zebastian:

- N/A

### Time Outcome

Time outcome is available here under the "Sprint 4" tab: https://docs.google.com/spreadsheets/d/1C4emn6hofD2PmGw2cUFbroMHP918EOgcrvQGSVOMWcU/edit?gid=0#gid=0

### Definition of Done - Team 12

- The feature **meets** the user story's **acceptance criteria**
- The user story has **correct naming** and the task can be **traced back to the user story**
- Time estimates and **time reporting** for the task are **documented**
- The code **runs locally** **without errors**
- **Error handling** is implemented **where relevant**
- The README is updated when needed
- The **PR** description **explains what** was done and **links to a user story**
- **At least one** other group member **has reviewed** and approved the PR
- The code is merged into `main`
- The code follows the group's coding conventions:
  - Commits, code, and file names: English text
  - Body text in, for example, Trello/PR/code review: Swedish text
  - React `.jsx` files: PascalCase
  - `.js` files, variables, props: camelCase
  - CSS and SASS: kebab-case
  - Folders: lowercase

#### GitHub Projects End

![GitHub Projects - Sprint 4 end](images/projects-sprint4-end1.png)
![GitHub Projects - Sprint 4 end](images/projects-sprint4-end2.png)

## 3. Sprint Retrospective

### What worked well?

We think the collaboration continued to work well and that we had good communication. We made sure to assess the situation early so that we could determine whether reaching MVP was realistic, and that helped us throughout the sprint. We also started sprint planning a little earlier this sprint, which freed up more time. We made a focused push with the goal of finishing sprint planning in one day. It took a little longer than that, but that focused effort still helped us move forward more quickly.

### What worked less well?

We have consistently had a challenge in the group in that we all have different schedules, and those schedules also change over time. At the same time, we have consistently agreed to stay flexible, and we have worked through that challenge together.

### What created friction, delays, or frustration?

Our different schedules can create friction and frustration in the group. Everyone is engaged and wants to move forward, but when not everyone is present at a meeting, things more often become inefficient and it becomes harder to keep everyone aligned around the same overall picture. It also becomes harder to plan your own time when schedules overlap or change. This has really been an ongoing challenge for us throughout the project.

### What will we do differently next sprint?

Because the next sprint does not follow the same format as Sprints 1-4, we are using this section instead to reflect on what we would take with us if we were to do a similar project in the future.

We are taking with us the importance of continuously showing what we have done, describing ongoing work, and raising problems as they appear. We have learned that process and structure are important for working efficiently. The course has given us a very good understanding of how people can work together on coding and what kinds of challenges can arise. We have also found a few ways to reduce friction and simplify those challenges, such as working in smaller tasks so that we can update `main` more often and avoid merge conflicts as much as possible.

The framework for how we should work was developed gradually during this project. If we were starting a new project today, we would set up guidelines and structure immediately, such as the overview we created showing everyone's availability.

We also reflected on the fact that working life often includes a formal leader who helps the group establish a clear framework early on, which in turn would likely reduce friction and improve efficiency.

## 4. Time Logging and Estimation

### How well did the group's overall time estimates match the logged time during the sprint?

This sprint had mixed estimation outcomes. We had both tasks that took longer than estimated and tasks that moved faster than estimated.

### What will you bring into the next sprint planning session?

We are taking with us that estimation is difficult. The group agrees that this is a skill that improves with experience.
