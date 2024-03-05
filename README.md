# Cool Tech Credential Manager

Cool Tech Credential Manager is a web application designed to securely manage and store credentials for various services and platforms within an organization. It allows users to easily access and manage organizational units (OUs), divisions, and credential repositories, ensuring efficient handling of sensitive information.

## Features

- **User Authentication**: Secure login system to ensure that only authorized users can access the application.
- **Organizational Units Management**: Organize and manage different organizational units within your company.
- **Divisions Management**: Categorize and manage divisions within each organizational unit.
- **Credential Repositories**: Securely store and manage credentials for different platforms and services.
- **User Management**: Admins can add, update, and remove users, assigning them specific roles and permissions.
- **Password Protection**: View passwords securely with password protection features.
- **Last Login Tracking**: Keep track of user activities with last login date recording for each user.

## Getting Started

For instalation guide see below.

### Instructions,

Creating a new Credential Repository, Division, Organisational units. Only Admin has access to creating this.

1. Start by adding a Credential Repositories by clicking on the purple plus, bottom right corner of the screen.
2. Add repositories name and description.
3. Add however many Credentials you require.
4. Save.
5. Add a division and select the Credential Repository you just created to link it.
6. Add an OU and select the Division you just created to link it.

New user.

1. User should register.
2. The user will only be able to view Credential Repositories and add Credentials to it.
3. Admin can grant more permissions to users.
   Admin
4. Admin can change user permissions and link them to Ous, Divisions and Credential repositories.
5. Go to user page and select the user to Edit.
6. Change or add access, click save.

### Prerequisites

- Node.js
- MongoDB
- A modern web browser

### Installation

1. Clone the repository to your local machine:

   ```
   git clone https://github.com/IanIsKing/L4T35-cred_management.git
   ```

2. Navigate to the project directory:

   ```
   cd cool-tech-credential-manager
   ```

3. Install the required dependencies: both front end and back end

   ```
   npm install
   ```

4. Create a `.env` file in the root directory and add the following environment variables:

   ```
   See dropbox
   ```

5. Start the server and run the front end:

   ```
   npm start
   ```

6. Open your web browser and navigate to `http://localhost:3000` to access the application.

## Usage

After logging in, users can navigate through different sections of the application to manage organizational units, divisions, and credential repositories. Admin users have additional capabilities to manage user accounts and their roles within the application.
Please see dropbox for login details

## Contact

Ian Basson - ianbasson@gmail.com

Project Link: [https://github.com/your-username/cool-tech-credential-manager](https://github.com/your-username/cool-tech-credential-manager)

---

This README provides a basic overview of the Cool Tech Credential Manager application. You can customize each section according to the specific functionalities and details of your application.
