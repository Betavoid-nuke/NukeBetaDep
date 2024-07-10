THIS IS NUKE BY BETAVOID, AN ENGINEERING PLATFORM.

____________________________________________Running the project on local machine
How to install all dependencies:
```bash
1. Open the project in VSCode
2. In the terminal, run "npm install"
3. Download and install the node for windows - https://nodejs.org/dist/v20.11.1/win-x64/node.exe (Project uses nodejs V20.11.1)

Dependencies used by the projects are listed in the package-json.lock, when you run the npm install, it will install all those listed dependencies automatically yet keep an eye on the terminal for dependencies not getting installed or throwing errors, is there are errors during this step, the solution will depend on the error, in which case you should either use ChatGPT to figure out what is happening or drop a message here - dev-help@betavoid.com
```

First, run the development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.




____________________________________________Using the platform

Nuke is an engineering platform which will alow you to create and build engineering projects and will genertate CAD scripts that you can run in Ansys Spaceclaim (For now we only support spaceclaimn, in future we will support all CAD softwares).

You will have to install the Ansys Spaceclaim on your machine in order to run the CAD script and produce a CAD model.

Download Spaceclaim:
    1. Download the Spaceclaim from here if you are a using this for commertial use - https://www.ansys.com/en-in/products/3d-design/ansys-spaceclaim

    2. Download the Spaceclaim from here if you are using this for non-commertial use - https://getintopc.com/softwares/3d-designing/ansys-spaceclaim-2023-free-download/


Make your first project:
    1. Signup for the platform using Google.
    2. In case you get to 404 not found page just go to localhost:3000 (remove /dash).
    3. On left side pannel, go to 'Assemblies'.
    4. Click on the '+' sign to create new project.
    5. Once new project created successfully, click on the project to open it.
    6. click on the '+ New Project' at top right and open the project.
    7. Now you should be in a node based editor, there input the prompt, here is an example: 
        
        "Design a gear that can transmit 400N force and withstand 20N stress and has 2mm thickness keywordmodule budget pitch torque"
    
    8. Click on submit asfter copy pasting the example to see the inputs you gave and change any value you want to change.
    9. Click on 'continue' button on right to generate the calculations and documentation and edit it as you like. You can scroll the documentation using the black scrollbar on the right side of the texteditor node (new node that has the documentation in it)
    10. Once done with the changes in the calculations if you had any, now you can either -
        1. Download - this will download the documentation in the .docx formate
        2. Pack - which will pack the .docx in the file structure of the assembly you created, so when you download the assembly it will be in the folder that contains the current project you are working on.
        3. Continue - this will genrate the CAD script that you can paste in the spaceclaim and genrate the CAD model of the example gear.
    
    11. Once you have clicked on continue, it will genarete the CAD script for you and copy it automatically.
    12. Open the spaceclaim, open 'Design' tab at top, click on 'script', and paste the script in the window on right and on green play button on the right in the toolbar of the script widnow.
    13. Chill for few seconds and watch it build the CAD model for you.




____________________________________________Troubleshooting

if you are not able to run the project even after following the instructions above, it probably will be the nodejs issue.
Here are things you need do:

1. open cmd and check the version of nodejs - "npm node -v", if the version of node js is lower then 10.2.4 or if it says file not found. then you need to install the latest nodekjs on your windows. just google "download nodejs for windows" and install it.

2. once you have installed the latest nodejs, you need to set the envirounment variable on your windows so it can use the latest nodejs. folloe these instructions to do that - https://codedamn.com/news/javascript/fix-npm-command-not-found-error-in-node-js

3. restart your pc and then try running the "npm run dev" again.


Other reason why you might not be able to run the project on your local machine is that you are missing .env.local file. this file is noprmally ignored by git and you wil have to create a new one for yourself if you are not a part of betavoid. if you are part of betavoid, please mail here dev-help@betavoid.com for .env.local file.

if you are not part of betavoid, please make a new env file with these credentials: 

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/onboarding
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=
MONGODB_URL=
UPLOADTHING_SECRET=


