const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"

const fillWithRecipe = async () => {

mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(self => console.log(`Connected to the database: "${self.connection.name}"`))
  .catch(error => console.error('Error connecting to the database', error))
    // Before adding any recipes to the database, let's remove all existing ones
  Recipe.deleteMany()

  // Iteration 2
  try {
    const recipe =
    {
      title: "Lasagna",
      level: "Amateur Chef",
      ingredients: ["Pasta", "Beef", "Cheese", "Tomato"],
      cuisine: "Italian",
      dishType: "main_course",
      image: "https://thestayathomechef.com/wp-content/uploads/2017/08/Most-Amazing-Lasagna-2-e1574792735811.jpg",
      duration: 60,
      creator: "Tom & Dani"
    }

    const newRecipe = await Recipe.create(recipe)
    console.log(recipe);

  }

  catch (error) {
    console.log(error)
  }

  // Iteration 3
  try {
    const manyRecipes = await Recipe.insertMany(data)
    console.log(manyRecipes)
  }

  catch (error) {
    console.log(error)
  }


  // Iteration 4
  try {
    let updatedRecipe = await Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese"}, { duration: 100}, {new: true})
  }

  catch (error){
    console.log(error)
  }


  // Iteration 5
  try {
    await Recipe.remove({title: "Carrot Cake"})
  }

  catch (error){
    console.log(error)
  }

  // Iteration 6
  mongoose.disconnect()
  console.log("Disconnecting from the db...")

}

fillWithRecipe();