
# Roadmap Chat Client 0.1.2b (beta)
### DISCLAIMER
THIS PROJECT COMES WITH ABSOLUTELY NO WARRANTY.
THERE ARE BUGS, THIS SOFTWARE IS STILL VERY EXPERIMENTAL.
## Info
Thank you for checking out this project! My goal is to experiment with a client/server Restful API Model in the form of a chat application.

Looking forward, the entire structure and model of chat will have to be revised. The structure and feature-set will be experimented with until the app is fairly convincing.

Please contact me at [kaz@rdmap.dev] if you come across any issues while using the software.

## Version 0.1.2b

The last version left a lot to be desired for me, in my free time I have been expanding the UI of chat.

This version also adds unofficial PWA support! It is currently disabled for development but passes Chrome's PWA lighthouse test for installation. To re-enable PWA support: check rename manifest.json reference (check console)

Design Update:
- Menu Button in top left to access the drop-down menu.
- Functional settings page (just allows changing text color currently).
- Various UI fixes.
- Stricter character limit enforced by the server.
- Switch Rooms menu button added (planned feature).

I am working on MySQL support, the server will be given more attention than the client for some time.

## Version 0.1.1b

Some big improvements:
- Loads more than a single message upon initial start.
- A new settings page!

Many small improvements to UI have been made. Here are some of the noteable ones:
- Pressing Enter sends the message.
- Improved UI scalability.
- Fixed iPhone UI.
- Cleaned up login.html

Known bugs:
- "Sometimes images will mess up scrolling into view on first boot."
- "UI is a bit dodgy"
    - I am working on this. I want to start using bootstrap soon.


## Version 0.1.0b

This is the first release of the chat client. I have been slowly fixing things while keeping the same version number, I am going to pause for a little while and work on a slighly larger 0.1.1b and then eventually a 0.2.0b. Just hang on for a little longer.

Known bugs:
- "Pressing Enter does not send my message."
    - Solved.
- "The login page text is behind the login window."
    - I have decided to remove that text and plop the version number in the main login window.
- "My text does not clear after I click send."
    - Working on it.
- "The send button dissapears at ceartain window sizes."
    - This is because of the css for the chat bar is weird. Working on it.

Goals for 0.1.1b
- Better input support.
- More scaleable UI.
- Login Announcements.


Please contact me at [kaz@rdmap.dev] if you come across any issues while using the software.

## API Resources:
/chat, /chat/log, /chat/log/numberof, /chat/submit

