export function GenerateRandomColor() {
	let colorList = [
		'#ff9994',
		'#ffab94',
		'#ffc894',
		'#ffe194',
		'#fff894',
		'#e6ff94',
		'#caff94',
		'#abff94',
		'#94ffa2',
		'#94ffcf',
		'#94ffe6',
		'#94f1ff',
		'#94d1ff',
		'#94abff',
		'#9994ff',
		'#b994ff',
		'#db94ff',
		'#fd94ff',
		'#ff94bf',
	]

	return colorList[Math.floor(Math.random()*colorList.length)];
}