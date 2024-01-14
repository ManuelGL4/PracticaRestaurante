// Importar las clases
import { Dish, Coordinate, Allergen, Restaurant, Menu, Category } from './clases.js';

const RestaurantsManager = (function () {
  let instantiated;

  class RestaurantsManager {
    #categories = [];
    #menus = [];
    #allergens = [];
    #restaurants = [];
    #dishes = [];
  
    constructor() {}
  
    getCategories() {
      return this.#categories[Symbol.iterator]();
    }
  
    getMenus() {
      return this.#menus[Symbol.iterator]();
    }
  
    getAllergens() {
      return this.#allergens[Symbol.iterator]();
    }
  
    getRestaurants() {
      return this.#restaurants[Symbol.iterator]();
    }
  
    getDishes() {
      return this.#dishes[Symbol.iterator]();
    }
  
    addCategory(...newCategories) {
      newCategories.forEach((newCategory) => {
        if (!newCategory || !(newCategory instanceof Category)) {
          throw new Error('La categoría debe ser un objeto Category y no puede ser nula.');
        }
  
        const categoryName = newCategory.getName();
        if (this.#categories.some((category) => category.getName() === categoryName)) {
          throw new Error('La categoría ya existe en el sistema.');
        }
  
        this.#categories.push(newCategory);
      });
  
      return this;
    }
  
    removeCategory(...categoriesToRemove) {
      categoriesToRemove.forEach((categoryToRemove) => {
        if (!categoryToRemove || !(categoryToRemove instanceof Category) || !this.#categories.includes(categoryToRemove)) {
          throw new Error('La categoría no está registrada.');
        }
  
        // Desasignar platos de la categoría
        this.#dishes.forEach((dish) => {
          dish.setCategories(dish.getCategories().filter((cat) => cat !== categoryToRemove));
        });
  
        // Eliminar la categoría
        const index = this.#categories.indexOf(categoryToRemove);
        this.#categories.splice(index, 1);
      });
  
      return this;
    }
    addMenu(...newMenus) {
      newMenus.forEach(function (newMenu) {
        if (!newMenu || !(newMenu instanceof Menu)) {
          throw new Error('El menú debe ser un objeto Menu y no puede ser nulo.');
        }

        const menuName = newMenu.getName();
        if (this.#menus.some(function (menu) { return menu.getName() === menuName; })) {
          throw new Error('El menú ya existe en el sistema.');
        }

        this.#menus.push(newMenu);
      }, this);

      return this;
    }
    removeMenu(menu) {
      if (!menu || !(menu instanceof Menu) || !this.#menus.includes(menu)) {
        throw new Error('El menú no está registrado.');
      }

      // Desasignar platos del menú
      this.#dishes.forEach(function (dish) {
        dish.setMenus(dish.getMenus().filter(function (m) {
          return m !== menu;
        }));
      });

      // Eliminar el menú
      const index = this.#menus.indexOf(menu);
      this.#menus.splice(index, 1);

      return this;
    }
    addAllergen(...newAllergens) {
      newAllergens.forEach(function (newAllergen) {
        if (!newAllergen || !(newAllergen instanceof Allergen)) {
          throw new Error('El alérgeno debe ser un objeto Allergen y no puede ser nulo.');
        }

        const allergenName = newAllergen.getName();
        if (this.#allergens.some(function (allergen) { return allergen.getName() === allergenName; })) {
          throw new Error('El alérgeno ya existe en el sistema.');
        }

        this.#allergens.push(newAllergen);
      }, this);

      return this;
    }

    removeAllergen(...allergensToRemove) {
      allergensToRemove.forEach(function (allergenToRemove) {
        if (!allergenToRemove || !(allergenToRemove instanceof Allergen) || !this.#allergens.includes(allergenToRemove)) {
          throw new Error('El alérgeno no está registrado.');
        }

        // Desasignar platos del alérgeno
        this.#dishes.forEach(function (dish) {
          dish.setAllergens(dish.getAllergens().filter(function (a) {
            return a !== allergenToRemove;
          }));
        });

        // Eliminar el alérgeno
        const index = this.#allergens.indexOf(allergenToRemove);
        this.#allergens.splice(index, 1);
      }, this);

      return this;
    }

    addDish(...newDishes) {
      newDishes.forEach(function (newDish) {
        if (!newDish || !(newDish instanceof Dish)) {
          throw new Error('El plato debe ser un objeto Dish y no puede ser nulo.');
        }

        const dishName = newDish.getName();
        if (this.#dishes.some(function (dish) { return dish.getName() === dishName; })) {
          throw new Error('El plato ya existe en el sistema.');
        }

        this.#dishes.push(newDish);
      }, this);

      return this;
    }

    removeDish(...dishesToRemove) {
      dishesToRemove.forEach(function (dishToRemove) {
        if (!dishToRemove || !(dishToRemove instanceof Dish) || !this.#dishes.includes(dishToRemove)) {
          throw new Error('El plato no está registrado.');
        }

        // Desasignar platos de categorías, menús y alérgenos
        this.#categories.forEach(function (category) {
          category.setDishes(category.getDishes().filter(function (d) {
            return d !== dishToRemove;
          }));
        });

        this.#menus.forEach(function (menu) {
          menu.setDishes(menu.getDishes().filter(function (d) {
            return d !== dishToRemove;
          }));
        });

        this.#allergens.forEach(function (allergen) {
          allergen.setDishes(allergen.getDishes().filter(function (d) {
            return d !== dishToRemove;
          }));
        });

        // Eliminar el plato
        const index = this.#dishes.indexOf(dishToRemove);
        this.#dishes.splice(index, 1);
      }, this);

      return this;
    }

    addRestaurant(...newRestaurants) {
      newRestaurants.forEach(function (newRestaurant) {
        if (!newRestaurant || !(newRestaurant instanceof Restaurant)) {
          throw new Error('El restaurante debe ser un objeto Restaurant y no puede ser nulo.');
        }

        const restaurantName = newRestaurant.getName();
        if (this.#restaurants.some(function (restaurant) { return restaurant.getName() === restaurantName; })) {
          throw new Error('El restaurante ya existe en el sistema.');
        }

        this.#restaurants.push(newRestaurant);
      }, this);

      return this;
    }

    removeRestaurant(...restaurantsToRemove) {
      restaurantsToRemove.forEach(function (restaurantToRemove) {
        if (!restaurantToRemove || !(restaurantToRemove instanceof Restaurant) || !this.#restaurants.includes(restaurantToRemove)) {
          throw new Error('El restaurante no está registrado.');
        }

        // Eliminar el restaurante
        const index = this.#restaurants.indexOf(restaurantToRemove);
        this.#restaurants.splice(index, 1);
      }, this);

      return this;
    }
    assignCategoryToDish(category, dish) {
      // Verificar si category es nulo o no es una instancia de Category
      if (!category || !(category instanceof Category)) {
        throw new Error('La categoría debe ser un objeto Category y no puede ser nula.');
      }

      // Verificar si dish es nulo o no es una instancia de Dish
      if (!dish || !(dish instanceof Dish)) {
        throw new Error('El plato debe ser un objeto Dish y no puede ser nulo.');
      }

      // Si la categoría no está, añadirla
      if (!this.#categories.includes(category)) {
        this.#categories.push(category);
      }

      // Si el plato no está, añadirlo
      if (!this.#dishes.includes(dish)) {
        this.#dishes.push(dish);
      }

      // Crear una relación entre la categoría y el plato
      const categoryDish = {
        dish: dish
      };

      // Agregar la relación al array de dishes en la categoría
      category.setDishes(...category.getDishes(), categoryDish);

      return this;
    }

    deassignCategoryToDish(category, dish) {
      // Verificar si category es nulo o no está registrada
      if (!category || !(category instanceof Category) || !this.#categories.includes(category)) {
        throw new Error('La categoría no está registrada.');
      }
  
      // Verificar si dish es nulo o no está registrado
      if (!dish || !(dish instanceof Dish) || !this.#dishes.includes(dish)) {
        throw new Error('El plato no está registrado.');
      }
  
      // Obtener el array de platos de la categoría
      const categoryDishes = category.getDishes();
  
      // Encontrar y eliminar la relación con el plato
      for (let i = 0; i < categoryDishes.length; i++) {
        if (categoryDishes[i] === dish) {
          categoryDishes.splice(i, 1);
        }
      }
  
      return this;
    }

    assignAllergenToDish(allergen, dish) {
      // Verificar si allergen es nulo o no es una instancia de Allergen
      if (!allergen || !(allergen instanceof Allergen)) {
        throw new Error('El alérgeno debe ser un objeto Allergen y no puede ser nulo.');
      }
    
      // Verificar si dish es nulo o no es una instancia de Dish
      if (!dish || !(dish instanceof Dish)) {
        throw new Error('El plato debe ser un objeto Dish y no puede ser nulo.');
      }
    
      // Si el alérgeno no está registrado, añadirlo al sistema
      if (!this.#allergens.includes(allergen)) {
        this.#allergens.push(allergen);
      }
    
      // Si el plato no está registrado, añadirlo al sistema
      if (!this.#dishes.includes(dish)) {
        this.#dishes.push(dish);
      }
    
      // Crear una relación entre el alérgeno y el plato
      const allergenDish = {
        dish: dish
      };
    
      // Agregar la relación al array de platos en el alérgeno
      allergen.setDishes(...allergen.getDishes(), allergenDish);
    
      return this;
    }
    
    deassignAllergenToDish(allergen, dish) {
      // Verificar si allergen es nulo o no está registrado
      if (!allergen || !(allergen instanceof Allergen) || !this.#allergens.includes(allergen)) {
        throw new Error('El alérgeno no está registrado.');
      }
    
      // Verificar si dish es nulo o no está registrado
      if (!dish || !(dish instanceof Dish) || !this.#dishes.includes(dish)) {
        throw new Error('El plato no está registrado.');
      }
    
      // Desasignar el alérgeno del plato
      dish.setAllergens([]);
    
      // Desasignar el plato del alérgeno
      const updatedDishes = allergen.getDishes().filter(function (d) {
        return d !== dish;
      });
      allergen.setDishes(updatedDishes);
    
      return this;
    }

    assignDishToMenu(menu, dish) {
      // Verificar si menu es nulo o no es una instancia de Menu
      if (!menu || !(menu instanceof Menu)) {
        throw new Error('El menú debe ser un objeto Menu y no puede ser nulo.');
      }
    
      // Verificar si dish es nulo o no es una instancia de Dish
      if (!dish || !(dish instanceof Dish)) {
        throw new Error('El plato debe ser un objeto Dish y no puede ser nulo.');
      }
    
      // Si el menú no está registrado, añadirlo al sistema
      if (!this.#menus.includes(menu)) {
        this.#menus.push(menu);
      }
    
      // Si el plato no está registrado, añadirlo al sistema
      if (!this.#dishes.includes(dish)) {
        this.#dishes.push(dish);
      }
    
      // Obtener los platos del menú como un array
      const menuDishesArray = [...menu.getDishes()];
    
      // Crear una relación entre el menú y el plato
      const menuDish = {
        dish: dish
      };
    
      // Agregar la relación al array de platos en el menú
      menuDishesArray.push(menuDish);
      
      // Establecer los platos actualizados en el menú
      menu.setDishes(menuDishesArray);
    
      return this;
    }
    //NO VA
    changeDishesPositionsInMenu(menu, dish1, dish2) {
      // Verificar si menu es nulo o no es una instancia de Menu
      if (!menu || !(menu instanceof Menu)) {
        throw new Error('El menú debe ser un objeto Menu y no puede ser nulo.');
      }
    
      // Verificar si dish1 es nulo o no es una instancia de Dish
      if (!dish1 || !(dish1 instanceof Dish)) {
        throw new Error('El primer plato debe ser un objeto Dish y no puede ser nulo.');
      }
    
      // Verificar si dish2 es nulo o no es una instancia de Dish
      if (!dish2 || !(dish2 instanceof Dish)) {
        throw new Error('El segundo plato debe ser un objeto Dish y no puede ser nulo.');
      }
    
      // Verificar si los platos están registrados en el menú
      if (!menu.getDishes().includes(dish1) || !menu.getDishes().includes(dish2)) {
        throw new Error('Uno o ambos platos no están registrados en el menú.');
      }
    
      // Obtener la posición de los platos en el array
      const index1 = menu.getDishes().indexOf(dish1);
      const index2 = menu.getDishes().indexOf(dish2);
    
      // Intercambiar las posiciones de los platos
      const updatedDishes = [...menu.getDishes()];
      const temp = updatedDishes[index1];
      updatedDishes[index1] = updatedDishes[index2];
      updatedDishes[index2] = temp;
    
      // Actualizar el array de platos en el menú
      menu.setDishes(updatedDishes);
    
      return this;
    }
    //NO VA
    getDishesInCategory(category) {
      if (!category || !(category instanceof Category)) {
        throw new Error('La categoría debe ser un objeto Category y no puede ser nula.');
      }
    
      const categoryDishes = category.getDishes();
    
      return {
        [Symbol.iterator]: function* () {
          for (const dish of categoryDishes) {
            yield dish;
          }
        }
      };
    }

    //NO VA
    getDishesWithAllergen(allergen) {
      if (!allergen || !(allergen instanceof Allergen)) {
        throw new Error('El alérgeno debe ser un objeto Allergen y no puede ser nulo.');
      }
    
      const allergenDishes = allergen.getDishes();
    
      return {
        [Symbol.iterator]: function* () {
          for (const dish of allergenDishes) {
            yield dish;
          }
        }
      };
    }
    
    findDishes(callback, sortFunction) {
      if (typeof callback !== 'function' || typeof sortFunction !== 'function') {
        throw new Error('Las funciones de callback y ordenación deben ser proporcionadas.');
      }
    
      // Filtrar los platos basados en la función de callback
      const filteredDishes = this.#dishes.filter(callback);
    
      // Ordenar los platos si se proporciona una función de ordenación
      if (sortFunction) {
        filteredDishes.sort(sortFunction);
      }
    
      return {
        [Symbol.iterator]: function* () {
          for (const dish of filteredDishes) {
            yield dish;
          }
        }
      };
    }
    
    
    
    
    
    
  
    
    
    

    createDish(name, description = '', ingredients = [], image = '') {
      const existDish=this.#dishes.find((dish) => dish.getName() === name);
      if(existDish){
        return existDish
      }else{//No esta
        let newDish = new Dish(name, description, ingredients, image);
        return newDish;
      }
    }

    createMenu(name, description = '') {
      const existMenu = this.#menus.find((menu) => menu.getName() === name);
      if (existMenu) {
        return existMenu;
      } else {
        let newMenu = new Menu(name, description);
        this.#menus.push(newMenu);
        return newMenu;
      }
    }

    createAllergen(name, description = '') {
      const existAllergen = this.#allergens.find((allergen) => allergen.getName() === name);
      if (existAllergen) {
        return existAllergen;
      } else {
        let newAllergen = new Allergen(name, description);
        this.#allergens.push(newAllergen);
        return newAllergen;
      }
    }
  }




  function init() {
      return new RestaurantsManager();
  }

  return {
    getInstance: function () {
        if (!instantiated) {
            instantiated = init();
        }
        return instantiated;
    },
};
})();

// Crear RestaurantsManager
const manager = RestaurantsManager.getInstance();

const category1 = new Category('CAT1', 'Descripcion cat 1');
const category2 = new Category('CAT2', 'Esta es la categoria1');
const allergen1 = new Allergen('Gluten', 'Contiene gluten');
const allergen2 = new Allergen('Pescado', 'Contiene Pescado');
const dish1 = new Dish('Ensalada', 'Descripcion ensalada', "Ingredientes de ensalada", "ensalada.jpg");
const dish2 = new Dish('Pasta', 'Espagetis', "Ingredientes de espagetis", "foto.jpg");
const coord = new Coordinate(140.40, -140.40);
const menu1 = new Menu('Primer Menu', 'Nuestro mejor menu');
const menu2 = new Menu('SEGUNDO Menu', 'Nuestro peor menu');

const restaurant1 = new Restaurant('Restaurante1', 'El mejor restaurante', coord);

// Pruebas de las funciones de RestaurantsManager
try {
  // Añadir categorías
  manager.addCategory(category1, category2);
  // Eliminar categorias
  manager.removeCategory(category1, category2);

  manager.addCategory(category1)
  // Añadir alérgenos
  manager.addAllergen(allergen1, allergen2);
  // Eliminar alergeno
  manager.removeAllergen(allergen1, allergen2);
  manager.addAllergen(allergen1);
  // Añadir platos
  manager.addDish(dish1, dish2);
  // Añadir menú
  manager.addMenu(menu1, menu2);
  //Eliminar menu
  //manager.removeMenu(menu1);

  // Añadir restaurante
  manager.addRestaurant(restaurant1);
  // Elminiar restaurante
  //manager.removeRestaurant(restaurant1);
  //Asignar categorie al plato
  manager.assignCategoryToDish(category1, dish1);
  // Eliminar platos
  //manager.removeDish(dish1, dish2);

  manager.assignAllergenToDish(allergen1,dish1);
  //Crear objetos
  let newDish = manager.createDish('Ensalada2', 'Descripcion ensalada2', "Ingredientes de ensalada2", "ensalada2.jpg");
  console.log(newDish);
  //manager.deassignAllergenToDish(allergen1,dish1);
  manager.assignDishToMenu(menu1,dish1);
  manager.assignDishToMenu(menu1,dish2);
  //manager.changeDishesPositionsInMenu(menu1,dish2,dish1);


// Obtener los platos con un alérgeno específico y ordenarlos por nombre
const sortedDishesWithAllergen = manager.getDishesWithAllergen(allergen1);

// Recorrer e imprimir los platos con el alérgeno específico
console.log('Dishes with Allergen');
for (const dish of sortedDishesWithAllergen) {
  console.log(dish.getName());
}


  //manager.deassignCategoryToDish(category1,dish1);
  // Obtener y mostrar las categorías
  console.log('Categories:');
  for (const category of manager.getCategories()) {
    console.log(category);
  }

  // Obtener y mostrar los menús
  console.log('Menus:');
  for (const menu of manager.getMenus()) {
    console.log(menu);
  }

  // Obtener y mostrar los alérgenos
  console.log('Allergens:');
  for (const allergen of manager.getAllergens()) {
    console.log(allergen);
  }

  // Obtener y mostrar los restaurantes
  console.log('Restaurants:');
  for (const restaurant of manager.getRestaurants()) {
    console.log(restaurant);
  }

  console.log('Dishes:');
  for (const dish of manager.getDishes()) {
    console.log(dish);
  }

  

} catch (error) {
  console.error('Error:', error.message);
}
