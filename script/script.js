let init = document.querySelector('.initial-data__button')
let info = document.querySelector('.info');

let inputT = document.querySelector('.inp-T');

let inputNiSi2_E = document.querySelector('.E_NiSi2');
let inputNiSi2_U = document.querySelector('.U_NiSi2');

let inputNiSi_E = document.querySelector('.E_NiSi');
let inputNiSi_U = document.querySelector('.U_NiSi');

let inputNi2Si_E = document.querySelector('.E_Ni2Si');
let inputNi2Si_U = document.querySelector('.U_Ni2Si');

let elementErr = document.querySelector('.error-el');
let element = document.querySelector('.table-el');

let elementCanvas = document.querySelector('.canvas-el');
let createElement = document.createElement(`div`);

init.addEventListener('click', initValue);

let NiSi2 = [];
let NiSi = [];
let Ni2Si = [];

function initValue() {
	let inpT = inputT.value;

	let NiSi2_E = inputNiSi2_E.value;
	let NiSi2_U = inputNiSi2_U.value;

	let NiSi_E = inputNiSi_E.value;
	let NiSi_U = inputNiSi_U.value;

	let Ni2Si_E = inputNi2Si_E.value;
	let Ni2Si_U = inputNi2Si_U.value;

	if (inpT === "" || NiSi2_E === "" || NiSi2_U === "" || NiSi_U === "" || NiSi_E === "" || Ni2Si_U === "" || Ni2Si_E === "") {
		createElement.innerHTML = `<section class="error"> <p class="error">Введите исходные данные! </p> </section>`;
		elementErr.appendChild(createElement);
	} else {
		NiSi2.push(inpT, NiSi2_E, NiSi2_U);
		NiSi.push(inpT, NiSi_E, NiSi_U);
		Ni2Si.push(inpT, Ni2Si_E, Ni2Si_U);

		console.log(`исходные данные Ni2Si: ${NiSi2}`);
		console.log(`исходные данные NiSi: ${NiSi}`);
		console.log(`исходные данные Ni2Si: ${Ni2Si}`);

		createElement.innerHTML = `	
        <button class="new-data__button">Ввести данные заново</button>
        <section class="table">			
        <table class="table-info" border="1">
    
        <caption>
            <h3>Проверьте исходные данные:</h3>
        </caption>
        
    	<tr>
    	<td></td>
    	<td></td>
    	<td>NiSi<sub>2</sub></td>
    	<td>NiSi</td>
    	<td>Ni<sub>2</sub>Si</td>
		</tr>
        <tr  width="25%">
            <td>Температура</td>
            <td>T</td>
            <td>${inpT} &degC</td>
            <td>${inpT} &degC</td>
            <td>${inpT} &degC</td>
        </tr>
        <tr  width="25%">
            <td>Энергия</td>
            <td>E<sub>a</sub></td>
            <td>${NiSi2_E} эВ</td>
            <td>${NiSi_E} эВ</td>
            <td>${Ni2Si_E} эВ</td>
        </tr>
        <tr  width="25%">
            <td>Константа</td>
            <td>U</td>
            <td>${NiSi2_U} см&sup2/с</td>
            <td>${NiSi_U} см&sup2/с</td>
            <td>${Ni2Si_U} см&sup2/с</td>
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

	inputNiSi2_E.value = '';
	inputNiSi2_U.value = '';

	inputNiSi_E.value = '';
	inputNiSi_U.value = '';

	inputNi2Si_E.value = '';
	inputNi2Si_U.value = '';

	let newInfo = document.querySelector('.new-data__button')
	let start = document.querySelector('.start__button');

	try {
		newInfo.addEventListener('click', () => {
			info.classList.remove('none');
			element.classList.add('none');
			elementErr.classList.remove('none');

			NiSi2 = [];
			NiSi = [];
			Ni2Si = [];

			console.log(`исходные данные обнулены!`)
		});
	} catch (err) {
		console.log(err);
	}
	try {
		start.addEventListener('click', startModel);
	} catch (err) {
		console.log(err)
	}
}

function startModel() {
	console.log("NiSi2 " + NiSi2);
	console.log("NiSi " + NiSi);
	console.log("Ni2Si " + Ni2Si);

	createElement.innerHTML = `
    <button class="new-data__button">Ввести данные заново</button>
    <canvas class="canvas" id="canvas"></canvas>`;
	elementCanvas.appendChild(createElement);

	let newInfo = document.querySelector('.new-data__button');
	let canvas = document.getElementById('canvas');

	newInfo.addEventListener('click', () => {
		info.classList.remove('none');
		newInfo.classList.add('none');
		canvas.classList.add('none');
		canvas.style.display= "none";
		elementErr.classList.remove('none');
		NiSi2 = [];
		NiSi = [];
		Ni2Si = [];
		console.log(`исходные данные обнулены`);

	});

	const conditionTheory = (8.9 / 58.7) * Math.pow(10, -5); //Рассчитанная константа до которой выполняется рост

	console.log(`Теоретическое условие роста <= ${Math.ceil(conditionTheory * Math.pow(10, 7))} нм`);

	let conditionPractical = 0;

	let x1 = 0; //Толщина фазы NiSi2
	let x2 = 0; //Толщина фазы NiSi
	let x3 = 0; //Толщина фазы Ni2Si
	let t = 0;  //Время

	let res_t = [];
	let powRes_t = [];

	let resNiSi2 = [];
	let resNiSi = [];
	let resNi2Si = [];

	let nmResNiSi2 = [];
	let nmResNiSi = [];
	let nmResNi2Si = [];

	while (conditionPractical <= conditionTheory) {
		x1 = Math.pow((t * NiSi2[2] * Math.exp((-NiSi2[1] * 1.6 * Math.pow(10, -19)) / (1.38 * Math.pow(10, -23) * NiSi2[0]))), .5);
		x2 = Math.pow((t * NiSi[2] * Math.exp((-NiSi[1] * 1.6 * Math.pow(10, -19)) / (1.38 * Math.pow(10, -23) * NiSi[0]))), .5);
		x3 = Math.pow((t * Ni2Si[2] * Math.exp((-Ni2Si[1] * 1.6 * Math.pow(10, -19)) / (1.38 * Math.pow(10, -23) * Ni2Si[0]))), .5);

		conditionPractical = ((8.9 / 58.7) * x1) + ((8.9 / 58.7) * (x2 - x1)) + ((8.9 / 58.7) * (x3 - x2));

		resNiSi2.push(x1);
		resNiSi.push(x2);
		resNi2Si.push(x3);
		res_t.push(t);
		t = t + 100;
	}

	console.log('Выходные данные толщины NiSi2 ');
	console.log(nmResNiSi2);

	console.log('Выходные данные толщины NiSi');
	console.log(nmResNiSi);

	console.log('Выходные данные толщины Ni2Si');
	console.log(nmResNiSi);

	console.log('Выходные данные времени');
	console.log(res_t);

	resNiSi2.forEach(item => {
		nmResNiSi2.push(Math.ceil(item * Math.pow(10, 7)));
	})
	resNiSi.forEach(item => {
		nmResNiSi.push(Math.ceil(item * Math.pow(10, 7)));
	})
	resNi2Si.forEach(item => {
		nmResNi2Si.push(Math.ceil(item * Math.pow(10, 7)));
	})

	res_t.forEach(item => {
		powRes_t.push((Math.ceil(Math.pow(item, .5))));
	})
	console.log(powRes_t);

	function modeling(dataY) {
		let dataX = powRes_t;
		dataY = [{
			label: 'NiSi2',
			data: nmResNiSi2,
			borderColor: 'red',
			backgroundColor: 'rgba(0, 0, 0, 0)',
			showLine: true
		}, {
			label: 'NiSi',
			data: nmResNiSi,
			borderColor: 'Blue',
			backgroundColor: 'rgba(0, 0, 0, 0)',
			showLine: true
		},
			{
				label: 'Ni2Si',
				data: nmResNi2Si,
				borderColor: 'green',
				backgroundColor: 'rgba(0, 0, 0, 0)',
				showLine: true
			}
		]
		return {
			dataX: dataX,
			dataY: dataY
		}
	}

	let {dataX, dataY} = modeling();

	let buildGraph = {
		labels: dataX,
		datasets: dataY
	}
	const ctx = document.getElementById('canvas').getContext('2d');
	const myChart = new Chart(ctx, {
		type: 'line',
		data: buildGraph,
		options: {
			plugins: {
				legend: {
					title: {
						display: true,
						text: 'Зависимость толщины силицида от времени',
					}
				}
			}
		},
	});

}

//labels = t

// start.addEventListener('click', a => {
//     console.log(NiSi2)
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
//         NiSi2 = []
//     });
// });


