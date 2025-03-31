// const searchField = document.getElementById('insertYourText');
const insertField = document.getElementById('insertField');
const idInputField = document.getElementById('idInputField');

// const searchButton = document.getElementById('searchButton');
const getOneButton = document.getElementById('getOneButton');
const getAllButton = document.getElementById('getAllButton');
const updateOneButton = document.getElementById('updateOneButton');
const deleteOneButton = document.getElementById('deleteOneButton');
const insertButton = document.getElementById('insertButton');
const outputField = document.getElementById('outputField');

const resultField = document.getElementById('resultField');


insertButton.addEventListener('click', () => {
    const dataToInsert = insertField.value;
    if (!dataToInsert){
        return;
    }
    else{
    fetch('/data' ,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({data:dataToInsert})
    })
    .then(response => response.json())
    .then(result=>{
        outputField.innerText = result._id;
        console.log(result._id)
    })}
    
    } )
    



getOneButton.addEventListener("click",() =>{
    const idValue = idInputField.value;
    fetch(`http://localhost:3000/data/${idValue}`)
    .then(res=>res.json())
    .then(data=>{outputField.innerText = JSON.stringify(data, null, 2)});   

})

updateOneButton.addEventListener("click",() =>{
    const idValue= idInputField.value;
    const updatingValue = {data: insertField.value};
    fetch(`http://localhost:3000/data/${idValue}`, {
        method:"PATCH",
        headers:{"content-type":"application/json"},
        body: JSON.stringify(updatingValue)
    })
    .then(res=>res.text())
    .then(data=>alert(data));
    
    idInputField.value = " ";
    insertField.value = " ";
    outputField.innerText = " ";
})

getAllButton.addEventListener("click",()=>{
    fetch('http://localhost:3000/data')
    .then(res=>res.json())
    .then(data=>{outputField.innerText = JSON.stringify(data, null, 2)});
})

deleteOneButton.addEventListener("click",() =>{
    outputField.innerText = " ";
    const idValue = idInputField.value;
    idInputField.innerText = " ";
    fetch(`http://localhost:3000/data/${idValue}`, {
        method:"DELETE"
    })
    .then(res=>res.json())
    .then(data=>console.log(data));
    
})