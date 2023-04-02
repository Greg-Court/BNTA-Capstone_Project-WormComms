How to access the backend:

# Users
accessing user at /api/users will return:

User {
    "id": 3,
    "username": "Greg",
    "firstName": null,
    "lastName": null,
    "profilePicture": null,
    "bio": null,
    "email": "greg@bnta.com",
    "password": null,
    "createdAt": null,
    "updatedAt": null,
    "chats": [
        {
            "id": 1,
            "name": "testchat9000",
            "createdAt": null,
            "updatedAt": null
        }
    ],
    "friends": [
        {
            "id": 3,
            "user2": {
                "id": 1,
                "username": "Hansine",
                "firstName": null,
                "lastName": null,
                "profilePicture": null,
                "bio": null,
                "email": "hansine@bnta.com",
                "createdAt": null,
                "updatedAt": null
            },
            "status": "FRIEND",
            "createdAt": null,
            "updatedAt": null
        },
        {
            "id": 4,
            "user2": {
                "id": 2,
                "username": "James",
                "firstName": null,
                "lastName": null,
                "profilePicture": null,
                "bio": null,
                "email": "james@bnta.com",
                "createdAt": null,
                "updatedAt": null
        },
            "status": "FRIEND",
            "createdAt": null,
            "updatedAt": null
        }
    ]
}

# Chats
accessing the chats will return objects with these properties:

Chat {
    "id": 1,
    "name": "testchat9000",
    "messages": [
        {
            "id": 1,
            "sender": {
                "id": 2,
                "username": "James",
                "firstName": null,
                "lastName": null,
                "profilePicture": null,
                "bio": null,
                "email": "james@bnta.com",
                "createdAt": null,
                "updatedAt": null
            },
            "content": "hello",
            "createdAt": null,
            "updatedAt": null,
            "read": false
        },
        {
            "id": 2,
            "sender": {
                "id": 3,
                "username": "Greg",
                "firstName": null,
                "lastName": null,
                "profilePicture": null,
                "bio": null,
                "email": "greg@bnta.com",
                "createdAt": null,
                "updatedAt": null
            },
            "content": "hi",
            "createdAt": null,
            "updatedAt": null,
            "read": false
        }
    ],
    "createdAt": null,
    "updatedAt": null
}


```
worm-comms-frontend
├─ .gitignore
├─ README.md
├─ index.html
├─ package-lock.json
├─ package.json
├─ postcss.config.js
├─ public
│  └─ vite.svg
├─ src
│  ├─ App.jsx
│  ├─ Components
│  │  ├─ Contact.jsx
│  │  ├─ LoginPortal.jsx
│  │  ├─ Messages.jsx
│  │  └─ TextArea.jsx
│  ├─ Containers
│  │  ├─ Contacts.jsx
│  │  ├─ MainPage.jsx
│  │  └─ MessageContainer.jsx
│  ├─ assets
│  │  └─ react.svg
│  ├─ index.css
│  └─ main.jsx
├─ tailwind.config.cjs
└─ vite.config.js

```
```
worm-comms-frontend
├─ .gitignore
├─ README.md
├─ index.html
├─ package-lock.json
├─ package.json
├─ postcss.config.js
├─ public
│  └─ vite.svg
├─ src
│  ├─ App.jsx
│  ├─ ChatContext.jsx
│  ├─ Components
│  │  ├─ Chat.jsx
│  │  ├─ Friend.jsx
│  │  ├─ Input.jsx
│  │  ├─ LoginHeader.jsx
│  │  ├─ LoginPortal.jsx
│  │  ├─ MainPageNavbar.jsx
│  │  ├─ Message.jsx
│  │  ├─ Messages.jsx
│  │  ├─ SignUpPortal.jsx
│  │  └─ TextArea.jsx
│  ├─ Containers
│  │  ├─ Chats.jsx
│  │  ├─ MainPage.jsx
│  │  └─ MessageContainer.jsx
│  ├─ UserContext.jsx
│  ├─ api.js
│  ├─ assets
│  │  ├─ close-circle-outline.svg
│  │  ├─ menu-outline.svg
│  │  └─ worm.jpeg
│  ├─ constants
│  │  └─ loginFormFields.jsx
│  ├─ index.css
│  ├─ main.jsx
│  ├─ pages
│  │  ├─ LoginPage.jsx
│  │  └─ SignUpPage.jsx
│  └─ socket.js
├─ tailwind.config.cjs
└─ vite.config.js

```