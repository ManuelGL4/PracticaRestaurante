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
    // Método toString
    toString() {
      return `Allergen: ${this.name}, Description: ${this.description}`;
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
        toString() {
          return `Menu: ${this.name}, Description: ${this.description}`;
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
    // Método toString
    toString() {
      return `Restaurant: ${this.name}, Description: ${this.description}, Location: ${this.location}`;
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
    // Método toString
    toString() {
      return `Coordinate: Latitude: ${this.latitude}, Longitude: ${this.longitude}`;
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
  //Getter de menus
  getMenus(){
    return this.menusMap.values();
  }
// Método addCategory
addCategory(...categories) {
  for (const newCategory of categories) {
    if (!newCategory || !(newCategory instanceof Category)) {
      throw new Error('Las categorías deben ser objetos Category');
    }

    const categoryName = newCategory.getName();

    if (this.categoriesMap.has(categoryName)) {
      throw new Error('La categoría ya existe en la colección');
    }

    this.categoriesMap.set(categoryName, newCategory);
  }

  return this; // Para poder encadenar
}

// Método addMenu
addMenu(...menus) {
  for (const newMenu of menus) {
    if (!newMenu || !(newMenu instanceof Menu)) {
      throw new Error('Los menús deben ser objetos Menu');
    }

    const menuName = newMenu.getName();

    if (this.menusMap.has(menuName)) {
      throw new Error('El menú ya existe en la colección');
    }

    this.menusMap.set(menuName, newMenu);
  }

  return this; // Para poder encadenar
}
  
}//Fin clase RestaurantsManager
  
  const dish1 = new Dish('Pasta Carbonara', 'Plato italiano', ['pasta', 'bacon', 'salsa'], '/images/pasta.jpg');
  const category1 = new Category('Italiano', 'Cocina Italiana');

  const allergen1 = new Allergen('Gluten', 'Tiene gluten');
  
  const menu1 = new Menu('Menu 1', 'El primer menu del restaurante');
  const coordinate1 = new Coordinate(40.7128, -74.0060);
  const restaurant1 = new Restaurant('Restaurante 1', 'El mejor restaurante', coordinate1);

  const restaurantsManager = new RestaurantsManager('Sistema del restaurante');
  restaurantsManager.addCategory(category1, new Category('Mexicano', 'Cocina Mexicana'));  
//  restaurantsManager.addCategory(new Category('Mexicano', 'Cocina Mexicana'))

  const categoriesIterator = restaurantsManager.getCategories();
  for (const category of categoriesIterator) {
  console.log(category.toString());
  }

// Añadir menús
restaurantsManager.addMenu(menu1, new Menu('Menu 2', 'Descripción del Menú 2'));

// Obtener el iterador de menús y mostrar la información correctamente
const menusIterator = restaurantsManager.getMenus();
for (const menu of menusIterator) {
  console.log(menu.toString());
}

/*
  console.log(allergen1);
  console.log(dish1.toString());
  console.log(category1.toString());
  console.log(menu1);
  console.log(restaurant1);
  */