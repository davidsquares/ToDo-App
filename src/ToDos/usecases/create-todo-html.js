import { ToDo } from "../models/to-do.models.js";


/**
 * 
 * @param {ToDo} todo 
 */
export const createToDoHTML = (todo) => {
    if(!todo) throw new Error('todo is an object required');

    //Usando la desestruccturacion pra no tener que poner el objeto . atributo "todo.id"
    const {description, done, id} = todo;

    const html = `
            <div class="view">
            <input class="toggle" type="checkbox" ${done ? 'checked': ''} />
            <label>${description}</label>
            <button class="destroy"></button>
            </div>
            <input class="edit" value="Create a TodoMVC template" />
        `;

    const liElement = document.createElement('li');

    liElement.innerHTML = html;

    liElement.setAttribute('data-id', id);

    if(done) 
        liElement.classList.add('completed');

    
    return liElement;
}