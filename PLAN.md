# INNIT
 npm install express dotenv npm install -D typescript ts-node @types/node @types/express nodemon eslint prettier

# MAIN
    Make event and object with a spredsheet
        Method 1 - can do individual entry
            &
        Method 2 - can have other users be invited and enter their own expenses

        After:
            M1 - each person gets a + and - cell indicating the net differences
            M2 - Indicate for each user the +/- and whom(other invited users) they owe or are owed

# EXPENSES
    List of event object references
        - each one has + & - to indicate the total sum they owe and the total sum they are owed
            - ON CLICK - 
                -more detailed breakdown of total sum (who specifically they owe or are owed)
                -a navigation button to go to actual object to see full spredsheet in MAIN


# QUESTIONS:
    1 - everyone is forced to make an account? Or tool for one person to make a spredsheet?
    2 - if A owes B $20 and B owes A $20 but from different events. Button to initiate an settle up beetween the two so no transactions actually need to be made?
    3 - Server? or Local tool?


# Today:
    - build server directory structure      (monorepo concept)
        - write index.ts for server
        - plan dir for other tools for server

https://www.youtube.com/watch?v=patkLXskt88&ab_channel=AlexRusin

POSTMAN



# WIN 11 BUG:
win + space to toggle keyboard languages (fucking anoying)



# SERVER 
    cd to /server:
        npm run start
    - make single port connection for Splitwise app (easier to change to server later)
        - currently npx runs to local host
    - server:
        - stores events, users, languages?
    - make lots of endpoints
                - make api.ts router have all endpoints
                    or
                - make router for each section (friends, main, settings...)
        - make each one clear
        - functions are re-usable and endpoints use functions so just make many endpoints

    1 - start with writing to memory (build databases later)
        - see if they console log correctly
    2 - how to implement database
        - mongodb? SQL?
