# Using an IDE to contribute

Usually people would immediately think "nah" upon getting suggested to use an IDE for contributing. However, we suggest it for several reasons:
1) Better code
2) More up to date code
3) Able to lint and fix problems before they even arise in the Travis check

So, this guide will walk you through EVERY step of choosing an IDE, and developing on Yuga with it actively.

1) Choosing your IDE
For this one we advise you use [VSCode](https://code.visualstudio.com/), as it is our personal IDE of choice. Download and install it, and then you can move onto configuring your actual program

2) Setting up ESLint and Beautifier
On the side bar of the home page of VSCode you'll find at the bottom there's a very nice button which allows you to install extensions. For this step, you want to install Beautify by HookyQR and ESLint by Dirk Baeumer. Search for Beautify and install that, then search for ESLint and install that to. For Beautify, you'll want to add a hotkey so you can beautify your code quickly. Do this by opening up the settings in the bottom left corner and clicking on keyboard shortcuts. Search for the Beautify keybindings, and edit the one that says Beautify Selection by double clicking CTRL and K. Press the keys you want the keybind to be locked to (we use CTRL + B) and then you're done.
Also, you'll wanna save this file if autosave is not enabled (you can mess around in User Settings to set this up)

3) Cloning your repo with Git
Install [Git](https://git-scm.com/downloads) and then in VSCode open up the terminal via CTRL + ' then you can clone your repo. On github you want to have a fork of the Yuga repo, and then you can clone it via "git clone https://github.com/YOURUSERNAME/yuga.git" (don't put the quote marks ofc)

4) Setting up and upstream link so you can keep your repo up to date
This bit can cause problems, but just follow with us. First in the terminal, run "git remote -v". You should see 2 links with fetch and push in brackets. Now, add a new remote via "git remote add upstream https://github.com/strikerrr/yuga.git" and then you're done. On github whenever your fork says it's behind master, come to your terminal in VSCode (with your yuga folder open ofc) and run "git checkout master" and then "git fetch upstream" and "git pull upstream". The first command may error or say something, but that's fine. For the second and third one, this should pull everything we have added to master since your PR was last up to date. Another easier way to keep your fork up to date would be to create a pull request and just title that you're pulling the latest info and we'll merge that for you. Either works, also in VSCode make sure you're keeping your local repo up to date by pressing the little refresh button when it has the arrows saying you need to pull stuff. 

5) Install NodeJS so you can then install ESLint and lint your files
Just download and install NodeJS, just go [here](https://nodejs.org/en/download/) and make sure with the installer you have NPM also enabled to install. To install ESLint, open up in your VSCode whilst in the yuga folder and type in terminal "npm install eslint". That's it.

6) Edit files and commit them then sync to your repo
Edit the files you wish to, and satisfy ESLint since you now have it installed. Make sure you've beautified the files, and when done, click on the 3rd icon to the left and type in a commit message (doesn't have to be anything fancy) and then click the tick. When it's done, click the refresh button to sync your changes and bam, you just used an IDE to commit to your own repo.

Sure, this guide is long. But damn it's detailed

Also, make sure to check out our [contributing guide](https://github.com/Strikerrr/yuga/blob/master/.github/CONTRIBUTING.md) to then take these commits to Yuga itself!

Have fun!