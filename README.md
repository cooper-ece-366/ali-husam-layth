# Camel

## ECE 366 Spring 2022 -- Ali Ghuman, Husam Almanakly, Layth Yassin

### What is Camel?

Camel is an application built for muslims on the go. One of the most common issues for a muslim comes in the form of being unfamiliar in a new area. Camel strives to remedy this by putting everything in one place... After logging in or creating a new account, a camel user can browse nearby restaurants that serve halal food, mosques, and prayer information related to their location! Camel also offers users the choice to find similar results in a provided location! Based on zip code, address, or a city/general area, Camel leverages the Google Places and IslamicFinder API's to search for all your islamic needs.

The option to save restaurants and mosques will allow us in the future to develop learning algorithms that offer users recommendations based on their search location! Furthermore, we strive to take camel further and provide functionality to share islamic resources and thoughts. Although this is not yet implemented, we hope to expand on our application and generalize it for large scale use. 

### Purpose

Being muslims ourselves, we noticed that whenever we were in a new area or planning to visit a different city, it usually involved alot of thinking on your feet. Asking locals in the area, scrolling through google pages, even using other apps for some information! The biggest issue always came in the fact that everything is all over the place...

Camel solves this and brings the user an all you need application with all the necessities.


### Relevant Links

[Camel Wiki](https://github.com/cooper-ece-366/ali-husam-layth/wiki/Camel)

[Camel Project Board](https://github.com/cooper-ece-366/ali-husam-layth/projects/1)

[Camel Demo](https://youtu.be/fRt0oaLVwwA)

[Social Login System Used](https://github.com/callicoder/spring-boot-react-oauth2-social-login-demo)


### Using Camel 

1. Install npm and node to run the front end. Ensure mysql is also installed on your machine and that an instance is running on your machine
2. Clone this repo 
3. Update the configuration files with your information. In the server/src/main/resources directory, update the application.properties-template file to a Google API Key (in the google.api attribute). If you haven't been provided one you can make an account at [this link](https://developers.google.com/maps/documentation/places/web-service/get-api-key)
4. Also update the application.yml file in the same directory with your mysql password (underneath spring.datasource.password). The database will run on port 3306, which can also be altered here if needed
5. On the front end side, change directories to camel-app/.env and update your API Key there in the REACT_APP_API field
6. Once you've updated the configuration files, you run the application. Start the server using the bash files in the main directory. Run the command to run the server on port 8080
    *./clean.sh && ./build.sh && ./run.sh*
7. To start the React App, change directories to camel-app. Install any dependencies using *npm install*. Run the applicaiton with *npm start*. The application will run on port 3000