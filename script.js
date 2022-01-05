var idItem=0;

function addItemList(){
    let content = document.getElementById("newListContent").value;
    let listToDo = document.getElementById("todoList");
    let checkboxName = `chkItem${idItem}`;
    listToDo.insertAdjacentHTML("beforeend",`<div class="item animate__animated animate__bounceIn"><input type="checkbox" name="${checkboxName}" id="${checkboxName}" class="todoCheckbox"><label for="${checkboxName}">${content}</label></div>`);
    idItem++;
}

var btn = document.getElementById("btnAddItem");
btn.addEventListener("click",function(idItem){addItemList(idItem)}, false);