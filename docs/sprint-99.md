# Sprint 99 - Group Assignment

## 1. Short Description of the Product

### What was delivered

The application is a web-based code editor designed to give the user a pedagogical tool for front-end development. We developed it with the intention of making it as intuitive and user-friendly as possible. On the landing page, the user is offered the chance to try the editor without creating an account, but the full experience requires the user to register or log in.

An onboarded user can create and share project folders with other users, create and delete files inside those projects, and edit files together in real time. The application supports the 10 most common file types, including syntax highlighting for HTML, CSS, JavaScript, React (`.jsx`, `.tsx`), Python, and more.

Our shared assessment is that the application fulfills the MVP. See the next section for more information.

## 2. Which MVP Requirements Are Fulfilled

An approved implementation means that the items below from the requirements specification work without errors. We checked off the completed MVP requirements as they were finished.

- [x] A user registers an account and logs in.
- [x] The user creates a new file, writes code with syntax highlighting, and invites another user to the file.
- [x] The invited user logs in, opens the same file, and begins editing - both users can see each other's changes and cursor positions in real time.
- [x] The code is saved automatically.
- [x] Both users can see which other users are active in the file.
- [x] The application is deployed and accessible through GitHub Pages.
- [x] The code is version-controlled and can be run locally according to the README.

In addition to the items above, all requirements with **High** priority were also implemented.
This means that the application can execute code correctly, is stable, and fulfills at least every high-priority part of the requirements specification. The application also provides a clear and functioning user experience.

## 3. How the Group Worked

### Tools and Technical Scope

In addition to React and Monaco, which were the recommended tools, we also chose to work with SCSS and the Lucide icon library. We also installed Prettier and Vite, and used ESLint. Socket support was also necessary to handle the real-time updates. We worked with a component-based structure and aimed to break components down into as small parts as possible. In VS Code, we wrote the code and set up the code structure. We spent a lot of time on that structure to make it easier to navigate, and as part of that we created a folder structure.

See below for a summary of the tools and links to read more about them:

#### Web-based code editor

- [Monaco-Editor](https://microsoft.github.io/monaco-editor/)

#### Other tools

- [React](https://react.dev/)
- [Vite](https://vite.dev/)
- [SCSS](https://sass-lang.com/install/)
- [socket.io-client](https://socket.io/docs/v4/client-api/)
- [Prettier](https://prettier.io/)
- [ESLint](https://eslint.org/)
- [Lucide](https://lucide.dev)

#### Architecture

- Component-based architecture

### Process and Working Method

Our communication started quickly and smoothly thanks to the fact that we created a shared Discord channel. That channel functioned as the hub for our communication, where we had our shared group chat, collected links to tools used in the project, and documented decisions that had been made. We also held daily check-ins and work meetings through Discord. Anyone who could not join the daily check-in instead posted an update in a Discord channel. We did this so that everyone could stay informed about the current status and so that we could support each other if someone had blockers. Whiteboard is another tool in Discord that we used to sketch application layouts when discussing what should be included in our tasks in order to complete our user stories. It gave us a clearer shared picture of what we wanted to build and a better basis for discussion. We also saved those sketches in a Discord channel.

During the first two weeks, we spent a lot of time on project planning and structure. During that time, we also built up a plan in Trello. It helped us keep track of spikes, meetings, and deadlines during the first sprints.

We also started using GitHub Projects early. There, we created cards mainly to manage progress in the coding work. We wrote epics, which we broke down into user stories, for which we then wrote acceptance criteria. Each user story was also broken down into tasks. Epics, user stories, and tasks all existed as planning cards.

We also connected those cards in GitHub Projects to Discord. That helped everyone stay updated on each other's work. For example, when a task was opened or closed, we received a notification in Discord. In the same way, we also received a notification in Discord when a PR was opened or closed.

During Sprint 1, we logged our time in GitHub Projects under the user story to which the task belonged. When we later received the time-logging file, we started logging time there instead. Because that file also included rows for things such as spikes, meetings, and time spent on submissions, Trello started to feel redundant, and we chose to focus on GitHub Projects and the time-logging file instead.

Throughout the project, we worked using GitHub Flow. For example, we always started a branch to connect it to at least one task. From that branch, we created a pull request (PR). At least one person in the group reviewed that PR. When a PR was created, ESLint and Prettier formatting checks also ran. Once the code was approved, it was merged into `main`. This helped us work on different versions of the code at the same time.

#### Summary of workflow and communication

- Communication through Discord: chat, information sharing, and meetings
- GitHub Projects for task management
- Work in branches with PR -> merge to `main`
- Version control through GitHub (GitHub Flow)
- Trello or the time-logging file for broader planning

## 4. What worked well and less well in your collaboration

Everyone showed strong engagement and drive to solve the tasks despite having a lot going on in private life. One positive effect of that was that everyone understood the need to be flexible in both our working method and our schedule. That likely also helped us use our time efficiently during the course.

The biggest challenge was still finding meeting times that worked for everyone for shared check-ins. During the project, we tried to find ways to clarify our available times, which helped to some extent, but it was still difficult to maintain because several of us had schedules that could change quickly.

## 5. What you would have done differently

### If you started the project today, what would you do differently?

In the previous sprint, we partly reflected on this question, and the result of that reflection is quite similar to what we wrote last week. This time, we chose to list the lessons below. The points in the list are therefore the lessons we would have acted on or brought with us from the beginning if we were starting a new project.

We have learned that:

- it helps to work in smaller tasks to avoid merge conflicts as much as possible
- regularly showing each other what we have done leads to faster feedback and a shared picture of the goal
- it is good to have regular check-ins so that everyone understands what is going on and has a chance to raise problems or other blockers
- structure and process are important for working efficiently
- GitHub Projects and Discord are strong foundational tools for working together on code, and we would ideally have connected them even earlier
- it helps to quickly set up guidelines and structure for when all project members are available for work and meetings, so that expectations are clear for everyone involved

## 6. Link to Issue for Code Review

### (see below under the heading "Code Review")

https://github.com/GabrielGlennJohansson/coed-grupp-10/issues/98
