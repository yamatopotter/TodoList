var idItem=0;
var storage = localStorage;
var listItem = [{}];
let formToDo = document.getElementById('formToDoList')

// Get list on LocalStorage and parse JSON
function getList(storage){
    console.log("Dados carregados.")
    let listStored = JSON.parse(storage.getItem('list'));
    if(listStored===null){
        return [];
    }
    else{
        return listStored;
    }
}

// Update list on LocalStorage
function addList(storage, array){
    storage.setItem('list', JSON.stringify(array));
    return "Dados atualizados";
}

// Load items on LocalStorage to screen
function firstLoad(storage){
    listItem = getList(storage);
    if (listItem.length > 0){
        for(let i=0; i < listItem.length; i++){
            addItemListFirstLoad(listItem[i].item);
        }
    }   
}

// Function used to create a div element with submited content
function createDivElement(content, id){
    let divContent = document.createElement('div');
    let labelContent = document.createTextNode(content);
    let iconElement = document.createElement('i');

    iconElement.classList.add('bi', 'bi-hourglass-split');

    divContent.classList.add("item", "animate__animated", "animate__bounceIn", "undone");
    divContent.id = id;

    divContent.appendChild(iconElement);
    divContent.appendChild(labelContent);
    divContent.addEventListener('dblclick', (element) => remItem(element));
    divContent.addEventListener('click', (element) => checkItem(element));

    return divContent
}

// Load the content when the site is loaded
function addItemListFirstLoad(content){
    let listToDo = document.getElementById("todoList");
    let divContent = createDivElement(content, idItem);

    listToDo.appendChild(divContent);
    
    idItem++;
}

// Add an Item to the list and update the LocalStorage
function addItemList(content){
    let listToDo = document.getElementById("todoList");

    let item = {item: `${content}`};

    let divContent = createDivElement(content, idItem);
    listToDo.appendChild(divContent);

    listItem.push(item);
    addList(storage, listItem);
    
    idItem++;
}

function remItem(element){

    let divContent = element.target;
    let labelValue =  divContent.innerText;
    let arrayCopy = listItem;

    listItem = arrayCopy.filter((value) => {
        return value.item !== labelValue;
    })

    addList(storage, listItem);

    divContent.classList.remove("animate__bounceIn");
    divContent.classList.add("animate__bounceOut");
    setTimeout(()=>{divContent.remove()}, 500);
}

function checkItem(element){

    let elemento = element.target;
    let icon = elemento.children[0];

    if(elemento.classList.contains('undone')){
        elemento.classList.remove('undone');
        elemento.classList.add('done');
        icon.classList.remove('bi-hourglass-split');
        icon.classList.add('bi-check');
    }
    else{
        elemento.classList.remove('done');
        elemento.classList.add('undone');
        icon.classList.remove('bi-check');
        icon.classList.add('bi-hourglass-split');
    }
    
}

firstLoad(storage);

formToDo.addEventListener('submit', (e)=>{
    e.preventDefault();

    let content = e.target['todo'].value;
    addItemList(content);    
    content.value='';
});

