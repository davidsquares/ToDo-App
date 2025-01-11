import todoStore, { Filters } from '../store/todo.store';  //Recordar que al exportar esto se exporta un objeto y lo puedo llamar como quiera y al ponerlo y despues un . nos desplegara los posbiles metodos que puedo usar que estan en el export

import html from './app.html?raw';
import { renderToDos, renderPending as renderPendingCount } from './usecases';

const ElementIds = {
    TodoList: '.todo-list',
    NewToDoInput: '#new-todo-input',
    ClearCompleted: '.clear-completed',
    TodoFilters: '.filtro',
    PendingCountLabel: '#pending-count',
}

/**
 * 
 * @param {String} elementId 
 */
export const App = ( elementId ) => {

    const displayToDos = () => {

        const todos = todoStore.getToDos( todoStore.getCurrentFilter());
        console.log( todos );

        renderToDos(ElementIds.TodoList, todos );
        updatePendingCount();
    }


    const updatePendingCount = () => {
        renderPendingCount(ElementIds.PendingCountLabel);
    }


    
    //Se hace cuando la fucnion App se manda llamar funcion sincrona
    (()=>{
        const app = document.createElement('div');
        app.innerHTML = html;
        document.querySelector(elementId).append(app);

        displayToDos();
    })();


    //Referencias html
    const newDescriptionInput = document.querySelector(ElementIds.NewToDoInput);

    const todoLisUl = document.querySelector(ElementIds.TodoList);

    const clearCompletedButton = document.querySelector(ElementIds.ClearCompleted);

    const filtersLi = document.querySelectorAll(ElementIds.TodoFilters);


    newDescriptionInput.addEventListener('keyup', (event) => {
        if (event.keyCode !== 13) return;

        if(event.target.value.trim().length === 0) return;


        todoStore.addToDo(event.target.value);
        displayToDos();

        event.target.value = '';        
    });

    todoLisUl.addEventListener('click', (event) => {
        console.log( event.target );

        const elementFather = event.target.closest('[data-id]');

        todoStore.toggleToDo(( elementFather.getAttribute('data-id') ));
        displayToDos();
    });

    todoLisUl.addEventListener('click', (event) => {
        const isDestroyElement = event.target.className === 'destroy';
        const element = event.target.closest('[data-id]');

        if(!element || !isDestroyElement) return;

        todoStore.deleteToDo(element.getAttribute('data-id'));
        displayToDos();
    });

    clearCompletedButton.addEventListener('click', (event) => {

        todoStore.deleteCompletedToDo();
        displayToDos();
    });

    filtersLi.forEach(element => {
        element.addEventListener('click', (element)=>{
            
            filtersLi.forEach(el => {
                el.classList.remove('selected');

            });

            element.target.classList.add('selected');

            switch (element.target.text) {
                case 'Todos':
                    todoStore.setFilter(Filters.All);
                    break;
                case 'Pendientes':
                    todoStore.setFilter(Filters.Pending);
                    break;
                case 'Completados':
                    todoStore.setFilter(Filters.Completed);
                    break;
                default:
                    break;
            }

            displayToDos();


        })
    })
}