import './style.css';
import { App } from "./ToDos/app.js";
import toDoStore from "./store/todo.store.js";
import todoStore from './store/todo.store.js';

todoStore.initStore();

App('#app');