# Voynow AI

Welcome to the Voynow AI project, a dynamic fusion of cutting-edge technology and engaging user interface design. This repository serves as the backbone for a sophisticated web application that leverages powerful AI models and a sleek, intuitive front end to provide users with a compelling experience.

## Table of Contents

- [About](#about)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies](#technologies)
- [Contributing](#contributing)
- [License](#license)

## About

Voynow AI is designed to be a flexible, robust foundational system for developing AI-driven applications. It combines the power of FastAPI for back-end functionality with the elegance and responsiveness of a Next.js front-end, integrated seamlessly with various tools and libraries aimed at enhancing performance and user interaction.

## Features

- **AI-Powered Chat Interface**: Engage with AI that provides insights in the style of Jamie Voynow.
- **Responsive Design**: Built with Next.js and Tailwind CSS for a smooth, flexible, and user-friendly experience.
- **Real-Time Communication**: Uses FastAPI and asynchronous OpenAI calls for real-time interactions.
- **Cool Stuff Timeline**: Display of past achievements and highlights with engaging animations.

## Installation

To run Voynow AI locally, ensure you have [Python 3.11+](https://www.python.org/downloads/) and [Node.js](https://nodejs.org/) installed.

1. Clone this repository:
   ```sh
   git clone https://github.com/yourusername/voynow_ai.git
   cd voynow_ai
   ```

2. Set up the Python environment:
   ```sh
   pip install pdm
   pdm install
   ```

3. Set up the Node environment:
   ```sh
   npm install
   ```

4. Configuration:
   - Create a `.env` file in the root directory and add your environment variables, including your OpenAI API key.

## Usage

1. Start the backend server with FastAPI:
   ```sh
   pdm run start
   ```

2. Start the Next.js frontend in development mode:
   ```sh
   npm run dev
   ```

3. Open your browser to `http://localhost:3000` to view the application.

## Technologies

- **Backend**: FastAPI, Python, OpenAI API
- **Frontend**: Next.js, React, Tailwind CSS
- **State Management**: useState, useEffect hooks
- **Deployment**: Vercel, DigitalOcean

## Contributing

We welcome contributions from the community! If you have an idea or improvement, please fork the project and submit a pull request:

1. Fork the Project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a pull request

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

---

For further details or questions, please reach out via email: voynow99@gmail.com. Let's build something amazing together!