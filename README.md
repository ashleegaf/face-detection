<p align="center">An AI Face Detection <a href="https://ecommerce-sales-dashboard.vercel.app/"></a>web application.</p>

<p align="center">
    <a href="https://www.typescriptlang.org/">
        <img src="https://skillicons.dev/icons?i=ts" />
    </a>
    <a href="https://react.dev/">
        <img src="https://skillicons.dev/icons?i=react" />
    </a>
    <a href="https://nextjs.org/">
        <img src="https://skillicons.dev/icons?i=nextjs" />
    </a>
    <a href="https://nextjs.org/">
        <img src="https://skillicons.dev/icons?i=tailwind" />
    </a>
    <a href="https://nextjs.org/">
        <img src="https://skillicons.dev/icons?i=docker" />
    </a>
    <a href="https://nextjs.org/">
        <img src="https://skillicons.dev/icons?i=githubactions" />
    </a>
</p>

## Features

-   Process an uploaded image with AI face detection via [face-api.js](https://github.com/justadudewhohacks/face-api.js)
-   View loading indicators while images are processed by the face detection service
-   Browse a list of uploaded thumbnails, each annotated with the number of detected faces
-   View a standard, full-sized image with bounding boxes around detected faces
-   Cache face detection results for quick re-display of previously-uploaded images
-   Re-display previously-uploaded images via clicking on a new thumbnail
-   Prevent the upload and AI processing of duplicate images and display a warning message

## Getting Started

Before running the container, ensure [Docker Desktop and Docker Compose](https://docs.docker.com/compose/install/) are installed on your computer. Then open Docker Desktop to run the Docker engine.

**Clone the repo:**

```bash
docker compose up -d
```

**Build the image and start the application's container:**

```bash
docker compose up --build
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the app. Build locally within your IDE. Manage the image and container from Docker Desktop.

## Roadmap

-   [ ] Replace AI face detection service provider
-   [ ] Testing
-   [ ] Deploy

## Acknowledgements

-   [Skill Icons](https://skillicons.dev)
-   This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

<p align="right">(<a href="#readme-top">back to top</a>)</p>