import { ToDo } from "../ToDos/models/to-do.models.js";

export const Filters = {
    All: 'all',
    Completed: 'Completed',
    Pending: 'Pending',
}
const state = {
    todos: [
        new ToDo('Piedra del alma'),
        new ToDo('Piedra del infinito'),
        new ToDo('Piedra del tiempo'),
        new ToDo('Piedra del realidad'),
        new ToDo('Piedra del espacio'),
    ],
    filter: Filters.All,
}

const initStore = () => {
    loadStore()

    console.log( 'InitStore 🥑' );
}


/**
 * Sirve para cargar los elementos de nuestro ToDo poniendo por defecto los filtros en All
 * Y si no hay elementos en la lista de ToDo's entonces pone nada
 */
const loadStore = () => {

    if (!localStorage.getItem('state')) return;

    const { todos = [], filters = Filters.All } = JSON.parse(localStorage.getItem('state'));

    state.todos = todos;

    state.filter = filters;

}


const saveStateToLocalStorage = () => {

    //Metodo del objeto global JSON que va a serializar como un string lo que tenga lo que le ponemos 
    localStorage.setItem('state',JSON.stringify(state));
}

const getToDos = ( filter = Filters.All) => {
    switch (filter) {
        case Filters.All:
            return state.todos;

        case Filters.Completed:
            return state.todos.filter(todo => todo.done );
        
        case Filters.Pending:
            return state.todos.filter(todo => !todo.done);

        default:
            throw new Error(`Option ${ filter } is not valid`);
            
    }
}

/**
 * 
 * @param {String} description 
 */
const addToDo = ( description ) => {

    if (!description) throw new Error('Argument description is required');

    state.todos.push(new ToDo(description));

    saveStateToLocalStorage();
}

/**
 * Se encarga de modificar el estado de una tarea, es decir si le daclick la cambia a false y si vuelve 
 * a darle click la cambia a true atravez de su propiedad @property {done}
 * @param {String} todoId 
 */
const toggleToDo = ( todoId ) => {

    state.todos = state.todos.map( todo => {
        if (todo.id === todoId) {
            todo.done = !todo.done;
        }
        return todo;
    })

    saveStateToLocalStorage();
}


/**
 * Se pasa el parametro todoId de la tarea que se quiere eliminar
 * @param {String} todoId 
 */
const deleteToDo = (todoId) => {

    /**
     * @method filter lo usa para filtrar las tareas exeptuando si un el todoId es igual a una tarea existente en 
    * el listado de todos iterando una a una con todo.id
     */
    state.todos = state.todos.filter(todo => todo.id !== todoId);
    saveStateToLocalStorage();
}

/**
 * Metodo que nos sirve para eliminar las tareas completadas con metodo filter, regresando una nueva lista de ToDo's con
 * las tareas que no tiene la propiedad done en true. 
 * Por lo que se actualizan las tareas y solo se quedan las tareas pendientes eliminandose las completadas
 */
const deleteCompletedToDo = () => {
    state.todos = state.todos.filter(todo => !todo.done);
    saveStateToLocalStorage();
}

/**
 * 
 * @param {Filters} newFilter 
 */
const setFilter = ( newFilter = Filters.All) => {

    //Hacer investigacion para hacer validacion 
    //Object.keys(Filters).includes(newFilter) algo como esto para hacer lavalidacion 
    state.filter = newFilter;
    saveStateToLocalStorage();
}

const getCurrentFilter = () => {
    return state.filter;
}

export default {
    addToDo,
    deleteCompletedToDo,
    deleteToDo,
    getCurrentFilter,
    getToDos,
    initStore,
    setFilter,
    toggleToDo,
    
}
