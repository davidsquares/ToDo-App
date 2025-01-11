import todoStore, { Filters } from "../../store/todo.store";

let element;

/**
 * 
 * @param {String} elementId Clase del elemento al que se quiere aplicar estos cambios de html
 */
export const renderPending = ( elementId ) => {

    if( !element)
        element = document.querySelector(elementId);

    if(!element)
        throw new Error(`Element ${elementId} not found`);

    element.innerHTML = todoStore.getToDos(Filters.Pending).length;


}