// Importar las clases
import { Dish, Coordinate, Allergen, Restaurant, Menu, Category } from './clases.js';

const RestaurantsManager = (function () {
    let instantiated;
  
    const categories = [];
    const menus = [];
    const allergens = [];
    const restaurants = [];
    const dishes = [];
  
    function init() {
      return {
        //OK
        getCategories: function () {
          return categories[Symbol.iterator]();
        },
        //OK
        getMenus: function () {
          return menus[Symbol.iterator]();
        },
        //OK
        getAllergens: function () {
          return allergens[Symbol.iterator]();
        },
        //OK
        getRestaurants: function () {
          return restaurants[Symbol.iterator]();
        },
        getDishes: function () {
          return dishes[Symbol.iterator]();
        },
        //OK
        addCategory: function (...newCategories) {
          newCategories.forEach(function (newCategory) {
            if (!newCategory || !(newCategory instanceof Category)) {
              throw new Error('La categoría debe ser un objeto Category y no puede ser nula.');
            }
    
            const categoryName = newCategory.getName();
            if (categories.some(function (category) { return category.getName() === categoryName; })) {
              throw new Error('La categoría ya existe en el sistema.');
            }
    
            categories.push(newCategory);
          });
    
          return this;
        },
        //OK
        removeCategory: function (...categoriesToRemove) {
          categoriesToRemove.forEach(function (categoryToRemove) {
            if (!categoryToRemove || !(categoryToRemove instanceof Category) || !categories.includes(categoryToRemove)) {
              throw new Error('La categoría no está registrada.');
            }
    
            // Desasignar platos de la categoría
            dishes.forEach(function (dish) {
              dish.setCategories(dish.getCategories().filter(function (cat) {
                return cat !== categoryToRemove;
              }));
            });
    
            // Eliminar la categoría
            const index = categories.indexOf(categoryToRemove);
            categories.splice(index, 1);
          });
    
          return this;
        },
        //OK FALTA MULTIARGUMENTO
        addMenu: function (...newMenus) {
          newMenus.forEach(function (newMenu) {
            if (!newMenu || !(newMenu instanceof Menu)) {
              throw new Error('El menú debe ser un objeto Menu y no puede ser nulo.');
            }
    
            const menuName = newMenu.getName();
            if (menus.some(function (menu) { return menu.getName() === menuName; })) {
              throw new Error('El menú ya existe en el sistema.');
            }
    
            menus.push(newMenu);
          });
    
          return this;
        },
        //Error: dish.getMenus is not a function
        //(anonymous) @ resturantManager.js:270
        removeMenu: function (menu) {
          if (!menu || !(menu instanceof Menu) || !menus.includes(menu)) {
            throw new Error('El menú no está registrado.');
          }
          // Desasignar platos del menú
          dishes.forEach(function (dish) {
            dish.setMenus(dish.getMenus().filter(function (m) {
              return m !== menu;
            }));
          });
  
          // Eliminar el menú
          const index = menus.indexOf(menu);
          menus.splice(index, 1);
  
          return this;
        },
        //OK
        addAllergen: function (...newAllergens) {
          newAllergens.forEach(function (newAllergen) {
            if (!newAllergen || !(newAllergen instanceof Allergen)) {
              throw new Error('El alérgeno debe ser un objeto Allergen y no puede ser nulo.');
            }
    
            const allergenName = newAllergen.getName();
            if (allergens.some(function (allergen) { return allergen.getName() === allergenName; })) {
              throw new Error('El alérgeno ya existe en el sistema.');
            }
    
            allergens.push(newAllergen);
          });
    
          return this;
        },
        //OK
        removeAllergen: function (...allergensToRemove) {
          allergensToRemove.forEach(function (allergenToRemove) {
            if (!allergenToRemove || !(allergenToRemove instanceof Allergen) || !allergens.includes(allergenToRemove)) {
              throw new Error('El alérgeno no está registrado.');
            }
    
            // Desasignar platos del alérgeno
            dishes.forEach(function (dish) {
              dish.setAllergens(dish.getAllergens().filter(function (a) {
                return a !== allergenToRemove;
              }));
            });
    
            // Eliminar el alérgeno
            const index = allergens.indexOf(allergenToRemove);
            allergens.splice(index, 1);
          });
    
          return this;
        },
    
        //OK
        addDish: function (...newDishes) {
          newDishes.forEach(function (newDish) {
            if (!newDish || !(newDish instanceof Dish)) {
              throw new Error('El plato debe ser un objeto Dish y no puede ser nulo.');
            }
    
            const dishName = newDish.getName();
            if (dishes.some(function (dish) { return dish.getName() === dishName; })) {
              throw new Error('El plato ya existe en el sistema.');
            }
    
            dishes.push(newDish);
          });
    
          return this;
        },

        //OK
        removeDish: function (...dishesToRemove) {
          dishesToRemove.forEach(function (dishToRemove) {
            if (!dishToRemove || !(dishToRemove instanceof Dish) || !dishes.includes(dishToRemove)) {
              throw new Error('El plato no está registrado.');
            }
    
            // Desasignar platos de categorías, menús y alérgenos
            categories.forEach(function (category) {
              category.setDishes(category.getDishes().filter(function (d) {
                return d !== dishToRemove;
              }));
            });
    
            menus.forEach(function (menu) {
              menu.setDishes(menu.getDishes().filter(function (d) {
                return d !== dishToRemove;
              }));
            });
    
            allergens.forEach(function (allergen) {
              allergen.setDishes(allergen.getDishes().filter(function (d) {
                return d !== dishToRemove;
              }));
            });
    
            // Eliminar el plato
            const index = dishes.indexOf(dishToRemove);
            dishes.splice(index, 1);
          });
    
          return this;
        },

        //OK
        addRestaurant: function (...newRestaurants) {
          newRestaurants.forEach(function (newRestaurant) {
            if (!newRestaurant || !(newRestaurant instanceof Restaurant)) {
              throw new Error('El restaurante debe ser un objeto Restaurant y no puede ser nulo.');
            }
    
            const restaurantName = newRestaurant.getName();
            if (restaurants.some(function (restaurant) { return restaurant.getName() === restaurantName; })) {
              throw new Error('El restaurante ya existe en el sistema.');
            }
    
            restaurants.push(newRestaurant);
          });
    
          return this;
        },

        //OK
        removeRestaurant: function (...restaurantsToRemove) {
          restaurantsToRemove.forEach(function (restaurantToRemove) {
            if (!restaurantToRemove || !(restaurantToRemove instanceof Restaurant) || !restaurants.includes(restaurantToRemove)) {
              throw new Error('El restaurante no está registrado.');
            }
    
            // Eliminar el restaurante
            const index = restaurants.indexOf(restaurantToRemove);
            restaurants.splice(index, 1);
          });
    
          return this;
        },

        //OK
        assignCategoryToDish: function (category, dish) {
          // Verificar si category es nulo o no es una instancia de Category
          if (!category || !(category instanceof Category)) {
              throw new Error('La categoría debe ser un objeto Category y no puede ser nula.');
          }
      
          // Verificar si dish es nulo o no es una instancia de Dish
          if (!dish || !(dish instanceof Dish)) {
              throw new Error('El plato debe ser un objeto Dish y no puede ser nulo.');
          }
      
          // Si la categoría no está, añadirla
          if (!categories.includes(category)) {
              categories.push(category);
          }
      
          // Si el plato no está, añadirlo
          if (!dishes.includes(dish)) {
              dishes.push(dish);
          }
      
          // Crear una relación entre la categoría y el plato
          const categoryDish = {
              dish: dish
          };
      
          // Agregar la relación al array de dishes en la categoría
          category.setDishes(...category.getDishes(), categoryDish);
      
          return this;
      },
      /*
      deassignCategoryToDish: function (category, dish) {
        // Verificar si category es nulo o no está registrada
        if (!category || !(category instanceof Category) || !categories.includes(category)) {
            throw new Error('La categoría no está registrada.');
        }
    
        // Verificar si dish es nulo o no está registrado
        if (!dish || !(dish instanceof Dish) || !dishes.includes(dish)) {
            throw new Error('El plato no está registrado.');
        }
    
        // Array de platos de la categoría 
        const categoryDishes = [...category.getDishes()];
    
        // Desasignar el plato de la categoría
        category.setDishes(categoryDishes.filter(function (d) {
            return d !== dish;
        }));
    
        return this;
    }*/
    
    

      



      };
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
const dish1 = new Dish('Ensalada', 'Descripcion ensalada', [category1], [allergen1]);
const dish2 = new Dish('Pasta', 'Espagetis', [category2], [allergen1, allergen2]);
const menu1 = new Menu('Primer Menu', 'Nuestro mejor menu');
const menu2 = new Menu('SEGUNDO Menu', 'Nuestro peor menu');

const restaurant1 = new Restaurant('Restaurante1', 'El mejor restaurante');

// Pruebas de las funciones de RestaurantsManager
try {
  // Añadir categorías
  manager.addCategory(category1,category2);
  // Eliminar categorias
  manager.removeCategory(category1,category2);

  manager.addCategory(category1)
  // Añadir alérgenos
  manager.addAllergen(allergen1,allergen2);
  // Eliminar alergeno
  manager.removeAllergen(allergen1,allergen2);
  manager.addAllergen(allergen1);
  // Añadir platos
  manager.addDish(dish1,dish2);
  // Eliminar platos
  //manager.removeDish(dish1,dish2);
  // Añadir menú
  manager.addMenu(menu1,menu2);
  //Eliminar menu
  //manager.removeMenu(menu1);

  // Asignar platos a menú
  menu1.setDishes(dish1, dish2);

  // Añadir restaurante
  manager.addRestaurant(restaurant1);
  // Elminiar restaurante
  //manager.removeRestaurant(restaurant1);
  //Asignar categorie al plato
  manager.assignCategoryToDish(category1, dish1);
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
  