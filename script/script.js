let init = document.querySelector('.initial-data__button')
let info = document.querySelector('.info');

let inputT = document.querySelector('.inp-T');
let inputE = document.querySelector('.inp-E');
let inputU = document.querySelector('.inp-U');

let elementErr = document.querySelector('.error-el');
let element = document.querySelector('.table-el');

let elementCanvas = document.querySelector('.canvas-el');
let createElement = document.createElement(`div`);

init.addEventListener('click', initValue);

let arr = [];

function initValue() {
    let inpT = inputT.value;
    let inpE = inputE.value;
    let inpU = inputU.value;

    if (inpT === "" || inpE === "" || inpU === "") {
        createElement.innerHTML = `<section class="error"> <p class="error">Введите исходные данные! </p> </section>`;
        elementErr.appendChild(createElement);
    } else {
        arr.push(inpT, inpE, inpU);
        console.log(`исходные данные: ${arr}`);
        createElement.innerHTML = `	
        <button class="new-data__button">Ввести данные заново</button>
        <section class="table">			
        <table class="table-info" border="1">
    
        <caption>
            <h3>Проверьте исходные данные:</h3>
        </caption>
    
        <tr  width="25%">
            <td>Температура</td>
            <td>T</td>
            <td>${inpT} &degC</td>
        </tr>
        <tr  width="25%">
            <td>Энергия</td>
            <td>Ea</td>
            <td>${inpE} эВ</td>
        </tr>
        <tr  width="25%">
            <td>Константа</td>
            <td>U</td>
            <td>${inpU} см&sup2/с</td>
        </tr>
    </table>
    <button class="start__button">Начать Моделирование</button>
    </section>`;
        element.appendChild(createElement);
        elementErr.classList.add('none');
        info.classList.add('none');
        element.classList.remove('none');
    }
    inputT.value = '';
    inputE.value = '';
    inputU.value = '';

    let newInfo = document.querySelector('.new-data__button')
    let start = document.querySelector('.start__button');

    try {
        newInfo.addEventListener('click', () => {
            info.classList.remove('none');
            element.classList.add('none');
            elementErr.classList.remove('none');
            arr = [];
            console.log(`исходные данные обнулены`)
        });
    } catch (err) {
        console.log(err)
    }
    try {
        start.addEventListener('click', startModel);
    } catch (err) {
        console.log(err)
    }

}

function startModel() {
    console.log(`исходные данные: ${arr}`);

    createElement.innerHTML = `
    <button class="new-data__button">Ввести данные заново</button>
    <canvas class="canvas"></canvas>`;
    elementCanvas.appendChild(createElement);

    let newInfo = document.querySelector('.new-data__button');
    let canvas = document.querySelector('canvas');

    newInfo.addEventListener('click', () => {
        info.classList.remove('none');
        newInfo.classList.add('none');
        canvas.classList.add('none');
        elementErr.classList.remove('none');
        arr = [];
        console.log(`исходные данные обнулены`);
    });
}


// start.addEventListener('click', a => {
//     console.log(arr)
//     createElement.innerHTML = `
//     <button class="new-data__button">Ввести данные заново</button>
//     <canvas class="canvas">sdfdsfsd</canvas>`;
//     elementCanvas.appendChild(createElement);

//     let newInfo = document.querySelector('.new-data__button');
//     let canvas = document.querySelector('canvas')
//     newInfo.addEventListener('click', () => {
//         info.classList.remove('none');
//         newInfo.classList.add('none');
//         canvas.classList.add('none');
//         elementErr.classList.remove('none');
//         arr = []
//     });
// });