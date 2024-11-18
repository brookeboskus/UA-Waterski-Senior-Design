# UA-Waterski-Senior-Design

This is the GitHub repository for the University of Alabama's Waterski team, built by Anastasia Spencer, Brian Son, Brooke Boskus, and Lilly Eide, for their CS 495 Capstone project during the Fall 2024 semester.
This site is currently hosted [here](https://www.uawaterski.com/).

The site uses React, Node.js, and Next.js for its framework. This README gives an overview on the entire project. Individual pages contain comments where deemed appropriate.

## Running the page locally

Steps to get started:

1. Ensure that Node.js is installed on your computer. A link to download Node.js can be found [here](https://nodejs.org/en/download/package-manager).
2. After installing Node.js, clone this repo and navigate to the capstone-computing-project within a Powershell/Terminal window.
3. Ensure that you have a .env file located within the capstone-computing-project, and ensure that it contains the correct information for the project to run.
> [!WARNING]
> This project does not provide the .env file required to run, as it contains sensitive information. Contact the project manager for more information on the .env file.
4. Run the command `npm i` within the terminal to install necessary dependencies for the project.
5. Run the command `npm run dev` to begin the server. A localhost server running the website should now be available to browse the website.

## Backend information

This site is currently published on Vercel, and is connected to this GitHub repository. The main branch is considered the production environment.
> [!CAUTION]
> As changes are made to the main branch, the site will automatically rebuild and deploy using the main branch as a basis. As such, caution should be taken to ensure that functionality of the site isn't broken with new changes.

One way to avoid breaking the site is to use a personal branch and deploy this branch on a separate URL. During development of the site, we have taken advantage of this, creating branches for our own unique developments and pulling their changes into main after testing them. Following this pattern will make it much less likely to push breaking changes to the production environment.

Persistent information such as set list times and team roster info is stored off-site on an AWS SQL database. This may change in the future, but is what we've chosen for now.

## Updating the site's content

The site is connected to a private Google Sheets page that allows for the site administrators to update the page as they see fit. This content is dynamically pulled from the Google Sheet on page load and displayed to the user.