## Setup Instructions

Follow the steps below to set up the project locally:

1. Install Dependencies
After cloning the repository, install the project dependencies using `pnpm`:
```sh
pnpm install
```

2. Configure Environment Variables
Create a `.env` file in the root directory of the project. You can either:
- Copy the contents of `.env.example` into a new `.env` file, or
- Rename `.env.example` to `.env`.

3. Run the Server Locally
To run the server locally, use the following command:
```sh
pnpm dev
```

4. Build and Start the Application
To build the application, run:
```sh
pnpm build
```
Once the build is complete, you can start the application using:
```sh
pnpm start
```

---

### Related Packages

- `axios`:
axios is a promise-based HTTP client for making API requests. It simplifies sending HTTP requests from the browser or Node.js. It also supports request and response interceptors, which can be used to automatically handle authentication (e.g., refreshing expired sessions after receiving a 401 Unauthorized response).

- `dayjs`:
dayjs is a lightweight and fast date manipulation library. It is used to transform and format dates in various formats, providing a simple API for working with dates and times. It's often used as a more efficient alternative to moment.js.

- `husky` and `lint-staged`:
husky is used to set up Git hooks, enabling automated processes like linting before committing code. lint-staged works alongside husky to run linters only on staged files, ensuring code quality is maintained without slowing down the entire repository. Together, they help enforce coding standards before code is committed to the repository.

- `next-runtime-env`:
next-runtime-env allows you to access environment variables at runtime, even on the client-side in a Next.js application. This package ensures that environment variables can be made available not only at build time but also at runtime, allowing you to adjust the environment-specific configurations dynamically during client-side navigation or API calls.

- `nextjs-toploader`:
nextjs-toploader provides a top-loading progress bar during page navigation in a Next.js application. It shows a visual loading indicator at the top of the page whenever the user navigates between pages, improving the user experience by indicating ongoing page transitions.

- `flowbite-react`:
flowbite-react is a set of pre-built React components that are designed to work seamlessly with Tailwind CSS. These components are styled in a modern UI fashion, making it easier to build visually appealing and responsive web applications with minimal effort.

- `tailwindcss`:
tailwindcss is a utility-first CSS framework that allows developers to create custom designs using predefined classes. It promotes rapid styling by providing utility classes for spacing, typography, layout, and more. It also supports responsive design, making it easy to create layouts that adapt to different screen sizes and devices.
