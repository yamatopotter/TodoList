var idItem=0;
var storage = localStorage;
var listItem = [{}];

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

function addList(storage, array){
    storage.setItem('list', JSON.stringify(array));
    return "Dados atualizados";
}

function firstLoad(storage){
    listItem = getList(storage);
    if (listItem.length > 0){
        for(let i=0; i < listItem.length; i++){
            addItemListFirstLoad(listItem[i].item);
        }
    }   
    return true;
}

function addItemListFirstLoad(content){
    let listToDo = document.getElementById("todoList");
    let checkboxName = `chkItem${idItem}`;

    listToDo.insertAdjacentHTML("beforeend",`<div class="item animate__animated animate__bounceIn" id="item${idItem}"><input type="checkbox" name="${checkboxName}" id="${checkboxName}" class="todoCheckbox" onchange="remItem(${idItem})"><label for="${checkboxName}" id="label${idItem}">${content}</label></div>`);

    // document.getElementById(checkboxName).addEventListener('change', remItem(idItem));
    idItem++;
}

function addItemList(){
    let content = document.getElementById("newListContent");
    let listToDo = document.getElementById("todoList");
    let checkboxName = `chkItem${idItem}`;
    let item = {item: `${content.value}`};

    let divEfeito = document.createElement('div');
    let checkboxTarefa = document.createElement('input');
    let labelCheckbox = document.createElement('label');

    // Criação da div
    divEfeito.classList.add("item", "animate__animated", "animate__bounceIn");
    divEfeito.id = `item${idItem}`;
    // Criação do checkbox
    checkboxTarefa.type='checkbox';
    checkboxTarefa.name=checkboxName;
    checkboxTarefa.id=checkboxName;
    checkboxTarefa.classList.add("todoCheckbox");
    // Criação da label
    labelCheckbox.htmlFor = checkboxName;
    labelCheckbox.id = `label${idItem}`;
    labelCheckbox.appendChild(document.createTextNode(content.value))

    divEfeito.appendChild(checkboxTarefa);
    divEfeito.appendChild(labelCheckbox);
    listToDo.appendChild(divEfeito);

    checkboxTarefa.addEventListener('change', () => remItem(idItem));
    console.log(checkboxTarefa);
    // listToDo.insertAdjacentHTML("beforeend",`<div class="item animate__animated animate__bounceIn" id="item${idItem}"><input type="checkbox" name="${checkboxName}" id="${checkboxName}" class="todoCheckbox" onchange="remItem(${idItem})" ><label for="${checkboxName}" id="label${idItem}">${content.value}</label></div>`);
    content.value = '';
    listItem.push(item);
    console.log(listItem);
    console.log(JSON.stringify(listItem));

    addList(storage, listItem);
    // document.getElementById(checkboxName).addEventListener('change', remItem(idItem));
    idItem++;

    return true;
}

function remItem(id){
    let divId = "item"+id;
    let checkbox = document.getElementById(`chkItem${id}`);
    let labelValue =  document.getElementById(`label${id}`).innerHTML;
    let arrayCopy = listItem;

    listItem = arrayCopy.filter((value) => {
        return value.item !== labelValue;
    })

    addList(storage, listItem);
    

    if(checkbox.checked == true){
        let div = document.getElementById(divId);
        div.classList.remove("animate__bounceIn");
        div.classList.add("animate__bounceOut");
        setTimeout(()=>{div.remove()}, 500);
    }
    return true;
}

var btn = document.getElementById("btnAddItem");
btn.addEventListener("click",function(idItem){addItemList(idItem)}, false);

firstLoad(storage);
