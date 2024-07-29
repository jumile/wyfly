/*смена городов туда-обратно*/
let fromCity = document.getElementById('from'); 
let toCity = document.getElementById('to');
const switchCity = document.querySelector('.switch');

switchCity.addEventListener('click', () => {
	let x = fromCity.value;
	fromCity.value = toCity.value;
	toCity.value = x;	
});

/*скрытие календаря "Обратно"*/
const singleFlight = document.querySelector('input[value="single"]');
const returnFlight = document.querySelector('input[value="return"]');
const returnCalendar = document.querySelector('.dateBack');

singleFlight.addEventListener('click', () => {
	returnCalendar.style.visibility='hidden';
});
returnFlight.addEventListener('click', () => {
	returnCalendar.style.visibility='visible';
});



/*работа счетчиков */
const adults = document.querySelectorAll('.adults img');
const children = document.querySelectorAll('.children a');
const babies = document.querySelectorAll('.babies a');
const totalAdult = document.getElementById('totalAdult');
const totalChilds = document.getElementById('totalChilds');
const totalBabies = document.getElementById('totalBabies');

//добавление щелчка на человечков
adults.forEach((adult, index) => {
	adult.addEventListener('click', () => {			
		counterAdult(index);		
	});
});
//добавление щелчка на цифры и отмена станд. поведения у ссылок у детей
children.forEach((child, index) => {
	child.addEventListener('click', (e) => {
		e.preventDefault();
		counterChildren(index);		
	})	
});
babies.forEach((baby, index) => {
	baby.addEventListener('click', (e) => {		
		e.preventDefault();
		counterBabies(index);		
	})	
});

/* изменение цвета человечка и запись значения в поле со счетчиком
	id - индекс человечка, по к-ому щелкнули; приходит в момент щелчка
*/
function counterAdult(id) {
	adults.forEach((adult, index) => {
		if(id >= index) adult.src = 'img/adult_select.png';
		else adult.src='img/adult.png';
	})
	totalAdult.value = id+1;
}
// подсветка цифр у детей и передача значения в счетчики
function counterChildren(id) {
	children.forEach((child, index) => {
		if(id === index) child.classList.add('active');
		else child.classList.remove('active');
	});
	totalChilds.value = id;
}
function counterBabies(id) {
	babies.forEach((baby, index) => {
		if(id === index) baby.classList.add('active');
		else baby.classList.remove('active');
	});
	totalBabies.value = id;
}
