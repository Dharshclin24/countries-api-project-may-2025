style project by placing data in correct groups...parents and children. 



# Countries API Application - Version 1

## 👋 Welcome!

Your challenge is to build a website with React.js that pulls country data from the [REST Countries API](https://restcountries.com) and displays it like the designs.

## 🎯 Requirements for Version 1

In Version 1, you'll build a mobile-responsive React app that:

- [x]Displays country data from the [REST Countries API](https://restcountries.com), or from `localData.js` file as a backup when the API is down
- Is styled according to provided Figma designs
- [x]Uses `react-router` to navigate between pages
- [x]Includes: Home, SavedCountries, and CountryDetail pages
- Deployed to a Netlify URL
- [x]As a user, I can see all countries on the Home page, with data displayed about each country
- [x]As a user, I can submit a form with my profile information on the Saved Countries page 
- As a user, I can click on a country to see more detailed information on a separate page 

Stretch goals for the project (not required)

- As a user, I can search for a country using an `input` field
- As a user, I can filter countries by region
- As a user, I can toggle the color scheme between light and dark mode
- As a user, I can click through to the bordering countries on the detail page

![Example of Version 1 of Countries API Project](https://github.com/user-attachments/assets/79094b58-6856-4491-8fa5-0a394f85f0b9)


## 🔗 Resources

- **Designs:** You will need to use this [Figma file](https://www.figma.com/design/YuEMNteoQic0h6RRiYprpV/Countries-API-Project?node-id=1045-2&p=f&t=T2oSD2lU7TuxaG13-0) for the designs
- **Style Guide:** Refer to the `style-guide.md` file for info about the color palette, fonts, and design.
- **API:** You will use the [REST Countries API](https://restcountries.com) to get the country data and flag images

## 📝 Tips for building your project

1. **Pseudo-code before you write any code!** Look through the designs to plan out how you'll tackle the project. Write down your plan somewhere in this README or in your code.
2. **Work on one feature at a time.** Finish one feature first before you move onto the next thing. Test as you go, routinely checking your site in the browser and making sure there are no errors before moving on. 
3. **Comment your code generously — Future You will thank you.** You’ll be building on top of this project over the next 3 months, so help yourself out by writing clear, helpful comments that explain what your code is doing. Trust us, it will save you time and confusion later.
4. **Clean up your code as you go**. Rename confusing variables, remove unused code, and organize your logic. Your code should read like a newspaper: clear, easy to follow, and understandable at a glance.

## 🚀 Roadmap: Step-by-step guide to building your project
Make sure you've finished Version 0 before moving on with the following steps.

### Project Setup: Copy your files over 
1. Copy all of the files inside of your `version-0` folder
2. Paste all of the files into your `version-1` folder
3. Push your code to Github! You will use your `version-0` code as the starting point for your `version-1`. 

### Create API Call to REST Countries API
1. In App.jsx, create API call that pulls countries data from the [REST Countries API](https://restcountries.com) using the `useEffect` hook
2. Display countries data from API call on the Home page, instead of displaying data from `data.json`
3. Push your code to Github!

### Build the SavedCountries Page
1. In SavedCountries.jsx, create the Form so that the user can submit their profile information
2. Style the Form according to the designs
3. Push your code to Github!

### Create the CountryDetail page
1. Create the CountryDetail page and and style it according to the designs.
2. Push your code to Github!

### Clean and Comment your code 
1. Clean up your code by renaming confusing variables, removing unused code, and organizing your logic. Your code should read like a newspaper: clear, easy to follow, and understandable at a glance.
2. Comment your code generously — Future You will thank you. You’ll be building on top of this project over the next 3 months, so help yourself out by writing clear, helpful comments that explain what your code is doing. Trust us, it will save you time and confusion later.
3. Push your code to Github!

### Deploy project to Netlify
1. Deploy your completed project to [Netlify](https://www.netlify.com/) via your Github repo. In your Netlify Deploy settings, you will need to specify which version you want to deploy. Check out [this deployment guide to help you](https://docs.google.com/document/d/18jxCUA0bebCyYaIHy8aaKMgOQH4w5-b-iCGDWpV4K4M/edit?tab=t.jnwta4jrhylr#heading=h.scmsi7a6s9yz).

### Stretch Goals (optional — only do these if you have completed _all_ of the above steps)

Finished all the above steps? Fantastic! 

Here are a few next-level challenges to tackle:
1. Create the search bar on the Home page
2. Filter countries by region on the Home page
3. Bordering countries on Country Detail page
4. Light & Dark Mode
You can find the [designs for all of these Stretch Goals in the Figma file.](https://www.figma.com/design/YuEMNteoQic0h6RRiYprpV/Countries-API-Project?node-id=1032-2&p=f&t=63CpCVNtkWIFmrAK-0) 
