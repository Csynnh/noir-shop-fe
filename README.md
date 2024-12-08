# React + TypeScript + Vite
# Documentation for Installing Node.js, npm, and Running a React TypeScript Project

## Prerequisites
- Ensure you have a terminal or command prompt available.
- Administrative privileges may be required for some installation steps.

## Step 1: Install Node.js and npm
Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine. npm is the package manager for Node.js.

1. **Download Node.js**:
  - Visit the [Node.js official website](https://nodejs.org/).
  - Download the LTS (Long Term Support) version for your operating system.

2. **Install Node.js**:
  - Run the downloaded installer.
  - Follow the installation prompts.
  - Ensure that the option to install npm is selected.

3. **Verify Installation**:
  - Open a terminal or command prompt.
  - Run the following commands to check the installed versions:
    ```sh
    node -v
    npm -v
    ```
  - You should see the version numbers of Node.js and npm.

## Step 2: Set Environment Variables
Setting environment variables allows your application to access configuration values securely and flexibly. These variables can be used to store sensitive information such as API keys, database URLs, and other configuration settings that should not be hard-coded in your source code.

1. **Add Environment Variables**:
  - Create a `.env` file in the root of your project directory.
  - Add the following environment variables to the `.env` file:
    ```sh
    REACT_APP_API_URL=https://api.example.com
    REACT_APP_API_KEY=your_api_key_here
    ```
  - Replace the values with your actual API URL and API key in report file.

## Step 3: Run the React TypeScript Project
1. **Install Dependencies**:
  - Navigate to your project directory in the terminal or command prompt.
  - Run the following command to install the necessary dependencies:
    ```sh
    npm install
    ```

2. **Start the Development Server**:
  - After the dependencies are installed, start the development server by running:
    ```sh
    npm run dev
    ```
  - This will start the Vite development server and you should see output indicating that the server is running and the project is available at a local URL (e.g., `http://localhost:80`).

3. **Open the Project in a Browser**:
  - Open your web browser and navigate to the local URL provided by the development server (e.g., `http://localhost:80`).
  - You should see your React TypeScript project running in the browser.

## Additional Resources
- [Node.js Documentation](https://nodejs.org/en/docs/)
- [npm Documentation](https://docs.npmjs.com/)
- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

By following these steps, you will have a React TypeScript project up and running on your local machine.

## Hosted Web URL
- [Noir](https://noir-shop.online)
