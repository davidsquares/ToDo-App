import { createToDoHTML } from './create-todo-html';
import {ToDo } from '../models/to-do.models'

let element;

/**
 * 
 * @param {String} elementId 
 * @param {ToDo} todos 
 */
export const renderToDos = ( elementId, todos = [] ) => {

    if (!element) {
        element = document.querySelector(elementId);
    }
    
    if (!element) throw new Error(`Element ${elementId} not found`);

    element.innerHTML = '';

    todos.forEach(todo => {
        element.append(createToDoHTML(todo));
    });
}