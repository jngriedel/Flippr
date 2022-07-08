# Flippr
### A Flickr clone built using Javascript, React, Redux, and Express. 

### Explore and comment on your favorite photos of undersea wildlife, or post your own!  
#### https://flippr-appacademy.herokuapp.com/




# Home Page

### View photos from all users, and click them to navigate to that image's page. 

![image](https://user-images.githubusercontent.com/19957902/176944561-4e9af97b-6a65-409a-bbc6-aef7eef56634.png)


# Image Detail Page

### View single image details and leave comments. Comments are only available to logged in users, and users can edit their image descriptions, or comments.

![image](https://user-images.githubusercontent.com/19957902/176944910-0fa5d6c0-acdc-4abf-a537-60e1f54409ea.png)


# List of Languages and Plugins
* CSS
* HTML
* Javascript
* Node JS
* REACT
* Express
* REDUX
* Postgres
* SEQEULIZE

# Features
* Sign-in/Log-in with own creditionals or Demo User
* Create, Read, Update, and Destroy Images with Error Handling
* Create, Read, Update, and Destroy Comments with Error Handling

### To-Do:
* [ ] Albums
* [ ] Favorites
* [ ] Tags
* [ ] Google Maps


# Technical Implementation

#### I had some troubles where previous states of images would render for a half-second on new pages, such as all database images rendering on a user's page, or the user's images rendering instead of all images on the Home Page. This was due to previous states loading before the page ran its dispatch functions. 

#### To fix this, I implented a whole page conditional render variable, and created a nested asynchronous function inside the main render UseEffect, preventing any flashes of unwanted content. The same could be accomplished with a .then.

```
function HomePage () {

 const [renderPage, setRenderPage] = useState(false)
 
 useEffect(()=> {

    const homepagestartup = async()=> {
    
      await dispatch(getAllImages())
      dispatch(clearComments())
      setRenderPage(true)
      
    }

    homepagestartup()

  },[dispatch])
  
  return (
    renderPage &&
    ... Page JSX
  );

}

```
