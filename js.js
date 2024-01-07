 // Objeto Dish
 class Dish {
    //SI,NO,NO,NO
    constructor(name, description = '', ingredients = [], image = '') {
      this.name = name;
      this.description = description;
      this.ingredients = ingredients;
      this.image = image;
    }
  
    // Getter y Setter para name
    getName() {
      return this.name;
    }
  
    setName(newName) {
      this.name = newName;
    }
  
    // Getter y Setter para description
    getDescription() {
      return this.description;
    }
  
    setDescription(newDescription) {
      this.description = newDescription;
    }
  
    // Getter y Setter para ingredients
    getIngredients() {
      return this.ingredients;
    }
  
    setIngredients(newIngredients) {
      this.ingredients = newIngredients;
    }
  
    // Getter y Setter para image
    getImage() {
      return this.image;
    }
  
    setImage(newImage) {
      this.image = newImage;
    }
  
    // Método toString
    toString() {
      return `Dish: ${this.name}, Description: ${this.description}, Ingredients: [${this.ingredients.join(', ')}], Image: ${this.image}`;
    }
  }
  
  // Objeto Category
  class Category {
    //SI,NO
    constructor(name, description = '') {
      this.name = name;
      this.description = description;
    }
  
    // Getter y Setter para name
    getName() {
      return this.name;
    }
  
    setName(newName) {
      this.name = newName;
    }
  
    // Getter y Setter para description
    getDescription() {
      return this.description;
    }
  
    setDescription(newDescription) {
      this.description = newDescription;
    }
  
    // Método toString
    toString() {
      return `Category: ${this.name}, Description: ${this.description}`;
    }
  }
  

// Objeto Allergen
class Allergen {
    //SI,NO
    constructor(name, description = '') {
      this.name = name;
      this.description = description;
    }
  
    // Getter y Setter para name
    getName() {
      return this.name;
    }
  
    setName(newName) {
      this.name = newName;
    }
  
    // Getter y Setter para description
    getDescription() {
      return this.description;
    }
  
    setDescription(newDescription) {
      this.description = newDescription;
    }
  }

    // Objeto Menu
    class Menu {
        //SI,NO
        constructor(name, description = '') {
          this.name = name;
          this.description = description;
        }
      
        // Getter y Setter para name
        getName() {
          return this.name;
        }
      
        setName(newName) {
          this.name = newName;
        }
      
        // Getter y Setter para description
        getDescription() {
          return this.description;
        }
      
        setDescription(newDescription) {
          this.description = newDescription;
        }
      }
  
 // Objeto Restaurant
 class Restaurant {
    //SI,NO,NO
    constructor(name, description = '', location = null) {
      this.name = name;
      this.description = description;
      this.location = location;
    }
  
    // Getter y Setter para name
    getName() {
      return this.name;
    }
  
    setName(newName) {
      this.name = newName;
    }
  
    // Getter y Setter para description
    getDescription() {
      return this.description;
    }
  
    setDescription(newDescription) {
      this.description = newDescription;
    }
  
    // Getter y Setter para location
    getLocation() {
      return this.location;
    }
  
    setLocation(newLocation) {
      this.location = newLocation;
    }
  }


  
  // Objeto Coordinate
  class Coordinate {
    //SI,SI
    constructor(latitude, longitude) {
      this.latitude = latitude;
      this.longitude = longitude;
    }
  
    // Getter y Setter para latitude
    getLatitude() {
      return this.latitude;
    }
  
    setLatitude(newLatitude) {
      this.latitude = newLatitude;
    }
  
    // Getter y Setter para longitude
    getLongitude() {
      return this.longitude;
    }
  
    setLongitude(newLongitude) {
      this.longitude = newLongitude;
    }
  }

  
 // Objeto RestaurantsManager
 class RestaurantsManager {
  constructor(systemName) {
    if (RestaurantsManager.instance) {
      return RestaurantsManager.instance;
    }

    this.systemName = systemName;
    this.categoriesMap = new Map(); // coleccion para almacenar categorias
    this.menusMap = new Map(); // coleccion para almacenar menús 
    this.allergensMap = new Map(); // coleccion para almacenar alérgenos
    this.dishesMap = new Map(); //coleccion  para almacenar platos
    this.restaurantsMap = new Map(); // coleccion para almacenar restaurantes 
    RestaurantsManager.instance = this;
  }//Fin constructor

  //Getter de categories
  getCategories() {
    //El .values del mapa devuelve un iterable con los valores del mapa
    return this.categoriesMap.values();
  }

  //Metodo addCategory
  addCategory(newCategory) {
    if (!newCategory || !(newCategory instanceof Category)) {
      throw new Error('La categoría debe ser un objeto Category');
    }

    const categoryName = newCategory.getName();
    
    if (this.categoriesMap.has(categoryName)) {
      throw new Error('La categoría ya existe en la coleccion');
    }

    this.categoriesMap.set(categoryName, newCategory);

    return this; // Para poder encadenar
  }

}
  
  const dish1 = new Dish('Pasta Carbonara', 'Plato italiano', ['pasta', 'bacon', 'salsa'], '/images/pasta.jpg');
  const category1 = new Category('Italiano', 'Cocina Italiana');

  const allergen1 = new Allergen('Gluten', 'Tiene gluten');
  
  const menu1 = new Menu('Menu 1', 'El primer menu del restaurante');
  const coordinate1 = new Coordinate(40.7128, -74.0060);
  const restaurant1 = new Restaurant('Restaurante 1', 'El mejor restaurante', coordinate1);

  const restaurantsManager = new RestaurantsManager('Sistema del restaurante');
  restaurantsManager.addCategory(category1);
  restaurantsManager.addCategory(new Category('Mexicano', 'Cocina Mexicana'))
//  restaurantsManager.addCategory(new Category('Mexicano', 'Cocina Mexicana'))

  const categoriesIterator = restaurantsManager.getCategories();
  for (const category of categoriesIterator) {
  console.log(category.toString());
  }

  console.log(allergen1);
  console.log(dish1.toString());
  console.log(category1.toString());
  console.log(menu1);
  console.log(restaurant1);