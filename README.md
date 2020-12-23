# Pics Backend Server API

---

#### Pics: Web Browser Photo Sharing Application


This React with Javascript based application allows users to share and like pictures through an authenticated user ownership system.

---

## Table of Contents

 - Important Links
 - Instructions for Local Use
 - Application Screenshots
 - Planning Story
 - User Stories
 - Technologies Used
 - Unsolved Problems
 - Entity Relationship Diagram

---

## Instructions for Local Use

 1. Fork & Clone this repository
 2. Checkout to a new branch & ``` git init ```
 3. Install Dependancies via ``` npm install ```

---

## Application Screenshots

#### Landing Page (Unauthenticated Route)

![Image of Unauthenticated Landing Page](blob:https://imgur.com/5de1b299-cbc4-444c-9208-0ed0d3416abb)

#### Primary Picture Gallery (Authenticated)

![Image of Authenticated Primary Picture Gallery](https://i.imgur.com/iw1dytq.png)

#### Rendering on a small screen (Authenticated)

![Image of Small Screen Gallery](https://i.imgur.com/d3qA4Sq.png)

---

## Important Links

[Deployed Client](https://ttamsmas.github.io/pics_app/)

[Heroku git URL](https://git.heroku.com/pics-api2020.git)

[Client Repository](https://github.com/ttamsmas/pics_app)

[Server Repository](https://github.com/ttamsmas/pics_api)

---

## Planning Story

My rudimentary goal was to create an operational photo-sharing application, with the stretch goal of creating a pixel perfect Pinterest.

I developed Wireframes of standard and cellphone screens and set to work with the following goals:

#### Base Goals:

 - Connect Client Application to Server API
    - Establish CRUD Routes for Users and Picture Resources
 - Create visual representation of CRUD Actions
 - Develop User Interface Logic to navigate application routes
 - Clear Input Fields following CRUD Actions
 - Ensure Ownership is enforced for resource manipulation:
    - Uploader is only one capable of Updating or Deleting a Picture Resource

#### Stretch Goals:

 - Add Like/Unlike Resource & pin it to mapped photo resources
 - Create method to display total likes accumulated on one photo across multiple users
 - Create Multiple Image Views e.g. only yours, all images, potentially users you've followed
 - Pixel Match Pinterest
 - Establish Follow/Unfollow Resource
 - Use picture uploading to create pictures rather than url links to photos

---

## User Stories

1. As a regular user, I would like to upload photos
2. As a regular user, I would like to edit or delete photos I post
3. As a regular user, I would like to follow other accounts
4. As a mobile user, I would like the application scale relative to my screen size
5. As a new user, I would like to be able to see all photos, not just those I follow

---

## Technologies Used

 - React with Javascript
 - React Bootstrap & React Router DOM
 - CSS

---

## Unsolved Problems

- Users are unable to follow other Users
- The Update and Delete Picture Buttons appear whether or not you are the owner of a picture
- Heroku isn't designed to hold pictures so users are adding links to images rather than uploading them

---

## Wireframes

[Landing Page for Sign In & Up](https://i.imgur.com/Kp5O9Zi.jpg)
[Primary Photo Display Page](https://i.imgur.com/tFdiBhq.jpg)
[Primary Page with Create/Upload Module Toggled](https://i.imgur.com/fnlNlCi.jpg)
[Cell Phone View](https://i.imgur.com/jzdoyef.jpg)
