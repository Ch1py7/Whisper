<div align="center">
    <a href="https://whisper-theta.vercel.app/">
        <img src="https://raw.githubusercontent.com/Ch1py7/Whisper/main/public/readme/whisper_desktop.webp" alt="Gitlytics Screenshot">
    </a>
    <p></p>
</div>

<div align="center">
    <a href="https://whisper-theta.vercel.app/" target="_blank">Website</a>
    <span>&nbsp;❖&nbsp;</span>
    <a href="https://github.com/Ch1py7/Whisper?tab=readme-ov-file#-project-structure">Structure</a>
    <span>&nbsp;❖&nbsp;</span>
    <a href="https://github.com/Ch1py7/Whisper?tab=readme-ov-file#-built-with">Built with</a>
    <span>&nbsp;❖&nbsp;</span>
    <a href="https://github.com/Ch1py7/Whisper?tab=readme-ov-file#-contributing">Contribute</a>
    <br/>
    <a href="https://raw.githubusercontent.com/Ch1py7/Whisper/main/public/readme/whisper_mobile.webp" target="_blank">👉 Mobile 📸 </a>
</div>

# 🌟 Whisper

**Whisper** is a application for securely sharing messages. It allows public messages stored in MongoDB and encrypted messages, where a link with an access key is generated. Encrypted messages can only be decrypted once—after they are read, they are permanently deleted. 🔒

## 🎯 Features
- 🔒 **Encryptation** – Usage of aes 256 cbc for private message encryptation.

## 🛠 Installation

### 1️⃣ **Set Up Your Environment**  
Create a `.env` file in secrets-api directory and add your **Access Tokens**:  
```ini
MONGO_URI=your_personal_mongo_uri
MONGO_DB_NAME=your_personal_mongo_db_name
PORT=your_personal_port
PRIVATE_KEY=your_personal_private_key
```

### 2️⃣ **Clone and Install**
```bash
# Clone this repository
git clone https://github.com/Ch1py7/Whisper.git

# Navigate into the project directory
cd Gitlytics

# Install pnpm globally if you haven't already
npm install -g pnpm

# Install dependencies
pnpm install

# Start the development server
pnpm dev
```

## 🏗️ Project Structure
```plaintext
📂 / Project
├── 📁 apps
│   ├── 📁 frontend
│   │   └── 📁 src
│   │       ├── 📁 compoents
│   │       ├── 📁 layout
│   │       ├── 📁 libs
│   │       ├── 📁 pages
│   │       ├── 📁 services
│   │       ├── 📁 types
│   │       ├── 📁 utils
│   │       ├── 📄 App
│   │       └── 📄 main
│   └── 📁 secrets-api
│       └── 📁 src
│           ├── 📁 application
│           ├── 📁 domain
│           ├── 📁 infrastructure
│           ├── 📁 types
│           ├── 📄 container
│           └── 📄 index
├── 📄 package.json
├── 📄 README.md
└── 🔑 LICENSE
```

## 🛠 Built With
### Frontend:
- **[React](https://react.dev/):** JavaScript library for building user interfaces.
- **[TypeScript](https://www.typescriptlang.org/):** A strongly typed programming language that builds on JavaScript.
- **[Tailwind CSS](https://tailwindcss.com/):** Utility-first CSS framework for rapid UI development.
- **[React Hook Form](https://react-hook-form.com/):** Performant and easy-to-use form validation library.
- **[Lucide React](https://lucide.dev/):** Open-source icon library for React.
- **[React Toastify](https://fkhadra.github.io/react-toastify/):** Toast notifications for React applications.

### Backend:
- **[Node.js](https://nodejs.org/):** JavaScript runtime for building scalable server-side applications.
- **[Express](https://expressjs.com/):** Minimalist web framework for Node.js.
- **[MongoDB](https://www.mongodb.com/):** NoSQL database for flexible and scalable data storage.
- **[Awilix](https://github.com/jeffijoe/awilix):** Dependency injection container for Node.js.
- **[Module Alias](https://www.npmjs.com/package/module-alias):** Simplifies module imports with custom paths.

## 🤝 Contributing
Pull requests are welcome! Feel free to open an issue or submit a PR

## 📚 License
This project is licensed under the [MIT License](https://github.com/Ch1py7/Whisper/blob/main/LICENSE).
