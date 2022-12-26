let level = 0;
let debugEnabled = false;
let memelevel = 0;
let rickrolled = false;

document.addEventListener('keypress', (event) => {

	if (!debugEnabled)
	{
		let code = event.code;
	
		if (level == 0 && code == 'KeyD') level++;
		else if (level == 1 && code == 'KeyE') level++;
		else if (level == 2 && code == 'KeyB') level++;
		else if (level == 3 && code == 'KeyU') level++;
		else if (level == 4 && code == 'KeyG') level++;
		else level = 0;
	
		if (level == 5)
		{
			debugEnabled = true;

			let wrapper = document.createElement('div');
			wrapper.id = 'model-debug-wrapper';
			document.querySelector('.footer').appendChild(wrapper);

			let list = document.createElement('div');
			list.id = 'model-debug-list';
			wrapper.appendChild(list);

			ASTRO_modelSettings.forEach(item => {
				let button = document.createElement('div');
				button.classList.add('tile');
				button.innerHTML += item.name;

				button.onclick = () => {
					document.querySelector('model-viewer').setAttribute('src', `models/${item.name}.glb`);
				};

				list.appendChild(button);
			});

			setTimeout(() => {
				wrapper.style.opacity = '1';
				wrapper.style.top = '-70px';
			}, 0);
		}
	}


	if (!rickrolled)
	{
		let code = event.code;
	
		if (memelevel == 0 && code == 'KeyY') memelevel++;
		else if (memelevel == 1 && code == 'KeyO') memelevel++;
		else if (memelevel == 2 && code == 'KeyU') memelevel++;
		else if (memelevel == 3 && code == 'KeyR') memelevel++;
		else if (memelevel == 4 && code == 'KeyM') memelevel++;
        else if (memelevel == 5 && code == 'KeyO') memelevel++;
        else if (memelevel == 6 && code == 'KeyM') memelevel++;
        else if (memelevel == 7 && code == 'KeyG') memelevel++;
        else if (memelevel == 8 && code == 'KeyA') memelevel++;
        else if (memelevel == 9 && code == 'KeyY') memelevel++;

		else memelevel = 0;
	
		if (memelevel == 10)
		{
			console.log("your mom gay")
            window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ")
		}
	}

}, false);