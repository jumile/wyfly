const mes=['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const dateTo = document.getElementById('flyout');
const dateBack = document.getElementById('flyback');
const tableCurrentFrom = document.querySelector('.dateFrom table');
const tableCurrentBack = document.querySelector('.dateBack table');
const prevMonthFrom = document.querySelector('.dateFrom .prev');
const nextMonthFrom = document.querySelector('.dateFrom .next');
const prevMonthBack = document.querySelector('.dateBack .prev');
const nextMonthBack = document.querySelector('.dateBack .next');
let d = new Date();
let y = d.getFullYear();
let m = d.getMonth();
let xFrom = 0, xBack = 0; // для перехода по месяцам
let countFrom = 0, countBack = 0;
let arrFrom = calendarFrom(y, m); // в arrFrom получаем год и месяц, для к-ых сделан календарь
let arrBack = calendarBack(y, m); // аналогично arrFrom

//отображение календаря по щелчку на текст. поле: добавляем или убираем класс .hid, к-ый скрывает таблицу
dateTo.addEventListener('click', () => {	
	tableCurrentFrom.classList.toggle('hid');	
});
dateBack.addEventListener('click', () => {
	tableCurrentBack.classList.toggle('hid');
});

//прокручивание месяцев в таблице 
/*добавление щелчков на стрелки возле месяца
	count - считает кол-во щелчков по стрелке. При достижении опред. числа стрелка исчезает (крутить календарь можно не больше чем на год)
*/
prevMonthFrom.addEventListener('click', () => {	
	countFrom--;
	nextMonthFrom.classList.remove('hid')
	if(countFrom<=-11) prevMonthFrom.classList.add('hid');	
	openMonthFrom(prevMonthFrom);
});
nextMonthFrom.addEventListener('click', () => {	
	countFrom++;
	prevMonthFrom.classList.remove('hid');
	if(countFrom>=11) nextMonthFrom.classList.add('hid');		
	openMonthFrom(nextMonthFrom);	
});
prevMonthBack.addEventListener('click', () => {	
	countBack--;
	nextMonthBack.classList.remove('hid')
	if(countBack<=-11) prevMonthBack.classList.add('hid');	
	openMonthBack(prevMonthBack);
});
nextMonthBack.addEventListener('click', () => {	
	countBack++;
	prevMonthBack.classList.remove('hid');
	if(countBack>=11) nextMonthBack.classList.add('hid');		
	openMonthBack(nextMonthBack);	
});

/*смотрим, на какую стрелку нажали (назад/вперед) и с помощью х определяем, на какой месяц нужен календарь. х меняется при каждом нажатии на стрелку.
В arrFrom / arrBack получаем, для какого года и месяца сделан календарь (в виде массива)
*/
function openMonthFrom(arrow) {
	if(arrow == prevMonthFrom) xFrom++;				
	else xFrom--;	
	arrFrom = calendarFrom(y, m-xFrom);
}
function openMonthBack(arrow) {
	if(arrow == prevMonthBack) xBack++;				
	else xBack--;	
	arrBack = calendarBack(y, m-xBack);
}

function calendarFrom(year, month) {
	// если в рез-те нажатия на стрелку вперед мы дошли до декабря (month=11), то надо перейти на январь след. года --> изменить номер месяца (на 0) и год
	if(month > 11) {
		month = month%12;
		year++;		
	}
	if(month < 0) {
		month = month+12;
		year--;		
	}
	let days=Date.UTC(year, month+1)-Date.UTC(year, month); 
	days/=1000*60*60*24;
	let startDay = new Date(year,month);
	let index=(startDay.getDay()+6)%7;	
	let caption = document.querySelector('.dateFrom .caption');
		caption.innerHTML = `${mes[month]} ${year}`;
	let td = document.querySelectorAll('.dateFrom tbody td');	
	let k=1-index;
	for(let i=0; i<td.length; i++) {
		td[i].innerHTML='';
		if(k>0 && k<=days) td[i].innerHTML = k;	
		k++;		
	};	
	return [year, month+1];	// для какого года и месяца сделан календарь	
};

function calendarBack(year, month) {
	// если в рез-те нажатия на стрелку вперед мы дошли до декабря (month=11), то надо перейти на январь след. года --> изменить номер месяца (на 0) и год
	if(month > 11) {
		month = month%12;
		year++;		
	}
	if(month < 0) {
		month = month+12;
		year--;		
	}
	let days=Date.UTC(year, month+1)-Date.UTC(year, month); 
	days/=1000*60*60*24;
	let startDay = new Date(year,month);
	let index=(startDay.getDay()+6)%7;	
	let caption = document.querySelector('.dateBack .caption');
		caption.innerHTML = `${mes[month]} ${year}`;
	let td = document.querySelectorAll('.dateBack tbody td');	
	let k=1-index;
	for(let i=0; i<td.length; i++) {
		td[i].innerHTML='';
		if(k>0 && k<=days) td[i].innerHTML = k;	
		k++;		
	};
	return [year, month+1]; // для какого года и месяца сделан календарь
};

const datasFrom = document.querySelectorAll('.dateFrom tbody td');
const datasBack = document.querySelectorAll('.dateBack tbody td');

datasFrom.forEach((data) => {
	data.addEventListener('click', () => {
		let selection = data.textContent+'.';
		selection += arrFrom[1]+'.'+arrFrom[0];
		dateTo.value = selection;
		tableCurrentFrom.classList.add('hid');	
	})
});
datasBack.forEach((data) => {
	data.addEventListener('click', () => {
		let selection = data.textContent+'.';
		selection += arrBack[1]+'.'+arrBack[0];
		dateBack.value = selection;
		tableCurrentBack.classList.add('hid');
	})
});