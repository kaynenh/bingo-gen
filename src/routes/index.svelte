<script>
	import { fade, scale } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	let calledNum = 0;
	let calledLetter = '';
	let called = [0];
	let calledFull = [];
	let bingoInterval = {};

	function playBingo(maxNums) {
		callNumber(maxNums);
	}

	function callNumber(maxNums) {
		if (called.length === maxNums) {
			console.log('All numbers called');
			clearInterval(bingoInterval);
			return;
		}
		var randomInteger = function (pow) {
			let tempCall = Math.floor(Math.random() * pow);
			if (called.includes(tempCall)) {
				tempCall = randomInteger(maxNums);
			}
			return tempCall;
		};
		let rand = randomInteger(maxNums);
		called.push(rand);
		calledLetter = getLetter(rand);
		calledNum = rand;
		calledFull.push({call: calledLetter + calledNum});
		calledFull = calledFull;
		console.table(calledFull);
	}

	function inRange(x, min, max) {
		return (x - min) * (x - max) <= 0;
	}

	function getLetter(num) {
		if (inRange(num, 1, 15)) {
			return 'B';
		}
		if (inRange(num, 16, 30)) {
			return 'I';
		}
		if (inRange(num, 31, 45)) {
			return 'N';
		}
		if (inRange(num, 46, 60)) {
			return 'G';
		}
		if (inRange(num, 61, 75)) {
			return 'O';
		}
	}

	function handleClick() {
		callNumber(76);
	}

	function handlePlay() {
		bingoInterval = setInterval(playBingo, 500, 76);
	}

	function stopPlay() {
		clearInterval(bingoInterval);
	}

	function handleReset() {
		called = [];
	}
</script>

<!--<button on:click={handleClick}> Random </button>-->
<button
	class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
	on:click={handleClick}
>
	Call Number
</button>
<button
	class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
	on:click={handlePlay}
>
	Autoplay
</button>
<button
	class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
	on:click={handleReset}
>
	Reset
</button>

<p class="text-2xl mt-10 mb-10 text-gray-800 text-center">{calledLetter}{calledNum}</p>

<div>
	{#if calledFull.length > 0}
	<p>Previously Called:</p>
	{/if}
	<ul>
	{#each calledFull as element, i (element)}
		<div animate:flip="{{ duration: 300 }}" out:scale="{{ duration: 250 }}" in:scale="{{ duration: 250 }}" class="element">{element.call}</div>
	{/each}
	</ul>
</div>
