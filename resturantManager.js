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
        getCategories: function () {
          return categories[Symbol.iterator]();
        },
  
        getMenus: function () {
          return menus[Symbol.iterator]();
        },
  
        getAllergens: function () {
          return allergens[Symbol.iterator]();
        },
  
        getRestaurants: function () {
          return restaurants[Symbol.iterator]();
        },
  
        addCategory: function (newCategory) {
          if (!newCategory || !(newCategory instanceof Category)) {
            throw new Error('La categoría debe ser un objeto Category y no puede ser nula.');
          }
  
          const categoryName = newCategory.getName();
          if (categories.some(function (category) { return category.getName() === categoryName; })) {
            throw new Error('La categoría ya existe en el sistema.');
          }
  
          categories.push(newCategory);
          return this;
        },
  
        removeCategory: function (category) {
          if (!category || !(category instanceof Category) || !categories.includes(category)) {
            throw new Error('La categoría no está registrada.');
          }
  
          // Desasignar platos de la categoría
          dishes.forEach(function (dish) {
            dish.setCategories(dish.getCategories().filter(function (cat) {
              return cat !== category;
            }));
          });
  
          // Eliminar la categoría
          const index = categories.indexOf(category);
          categories.splice(index, 1);
  
          return this;
        },
  
        addMenu: function (newMenu) {
          if (!newMenu || !(newMenu instanceof Menu)) {
            throw new Error('El menú debe ser un objeto Menu y no puede ser nulo.');
          }
  
          const menuName = newMenu.getName();
          if (menus.some(function (menu) { return menu.getName() === menuName; })) {
            throw new Error('El menú ya existe en el sistema.');
          }
  
          menus.push(newMenu);
          return this;
        },
  
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
  
        addAllergen: function (newAllergen) {
          if (!newAllergen || !(newAllergen instanceof Allergen)) {
            throw new Error('El alérgeno debe ser un objeto Allergen y no puede ser nulo.');
          }
  
          const allergenName = newAllergen.getName();
          if (allergens.some(function (allergen) { return allergen.getName() === allergenName; })) {
            throw new Error('El alérgeno ya existe en el sistema.');
          }
  
          allergens.push(newAllergen);
          return this;
        },
  
        removeAllergen: function (allergen) {
          if (!allergen || !(allergen instanceof Allergen) || !allergens.includes(allergen)) {
            throw new Error('El alérgeno no está registrado.');
          }
  
          // Desasignar platos del alérgeno
          dishes.forEach(function (dish) {
            dish.setAllergens(dish.getAllergens().filter(function (a) {
              return a !== allergen;
            }));
          });
  
          // Eliminar el alérgeno
          const index = allergens.indexOf(allergen);
          allergens.splice(index, 1);
  
          return this;
        },
  
        addDish: function (newDish) {
          if (!newDish || !(newDish instanceof Dish)) {
            throw new Error('El plato debe ser un objeto Dish y no puede ser nulo.');
          }
  
          const dishName = newDish.getName();
          if (dishes.some(function (dish) { return dish.getName() === dishName; })) {
            throw new Error('El plato ya existe en el sistema.');
          }
  
          dishes.push(newDish);
          return this;
        },
  
        removeDish: function (dish) {
          if (!dish || !(dish instanceof Dish) || !dishes.includes(dish)) {
            throw new Error('El plato no está registrado.');
          }
  
          // Desasignar platos de categorías, menús y alérgenos
          categories.forEach(function (category) {
            category.setDishes(category.getDishes().filter(function (d) {
              return d !== dish;
            }));
          });
  
          menus.forEach(function (menu) {
            menu.setDishes(menu.getDishes().filter(function (d) {
              return d !== dish;
            }));
          });
  
          allergens.forEach(function (allergen) {
            allergen.setDishes(allergen.getDishes().filter(function (d) {
              return d !== dish;
            }));
          });
  
          // Eliminar el plato
          const index = dishes.indexOf(dish);
          dishes.splice(index, 1);
  
          return this;
        },
        getDishesInCategory: function (category) {
            if (!category || !(category instanceof Category) || !categories.includes(category)) {
              throw new Error('La categoría no está registrada.');
            }
    
            return category.getDishes()[Symbol.iterator]();
          },
    
          deassignCategoryToDish: function (category, dish) {
            if (!category || !(category instanceof Category) || !categories.includes(category)) {
              throw new Error('La categoría no está registrada.');
            }
    
            if (!dish || !(dish instanceof Dish) || !dishes.includes(dish)) {
              throw new Error('El plato no está registrado.');
            }
    
            dish.setCategories(dish.getCategories().filter(function (cat) {
              return cat !== category;
            }));
    
            return this;
          },
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
const restaurant1 = new Restaurant('Restaurante1', 'El mejor restaurante');

// Pruebas de las funciones de RestaurantsManager
try {
  // Añadir categorías
  manager.addCategory(category1).addCategory(category2);

  // Añadir alérgenos
  manager.addAllergen(allergen1).addAllergen(allergen2);

  // Añadir platos
  manager.addDish(dish1).addDish(dish2);

  // Añadir menú
  manager.addMenu(menu1);

  // Asignar platos a menú
  menu1.setDishes([dish1, dish2]);

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
  

} catch (error) {
  console.error('Error:', error.message);
}
  