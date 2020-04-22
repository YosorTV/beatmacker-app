class DrumKit {
	constructor() {
		this.pads = document.querySelectorAll('.pad');
		this.playBtn = document.querySelector('.play');
		this.currentKick = './sounds/kick-classic.wav';
		this.currentSnare = './sounds/snare-acoustic01.wav';
		this.currentHihat = './sounds/hihat-acoustic01.wav';
		this.kickAudio = document.querySelector('.kick-sound');
		this.snareAudio = document.querySelector('.snare-sound');
		this.hihatAudio = document.querySelector('.hihat-sound');
		this.index = 0;
		this.bpm = 150;
		this.isPlaying = null;
		this.selects = document.querySelectorAll('select');
		this.muteBtn = document.querySelectorAll('.mute');
		this.tempoSlider = document.querySelector('.tempo-slider');
	}
	activePad() {
		this.classList.toggle('active');
	}
	repeat() {
		let step = this.index % 8;
		const activeBars = document.querySelectorAll(`.b${step}`);
		//Loop over the pads;
		activeBars.forEach(bar => {
			bar.style.animation = `playTrack 0.3s alternate ease-in-out 2`;
			if (bar.classList.contains('active')) {
				// Check each sound
				if (bar.classList.contains('kick-pad')) {
					this.kickAudio.currentTime = 0;
					this.kickAudio.play();
				};
				if (bar.classList.contains('snare-pad')) {
					this.snareAudio.currentTime = 0;
					this.snareAudio.play();
				};
				if (bar.classList.contains('hihat-pad')) {
					this.hihatAudio.currentTime = 0;
					this.hihatAudio.play();
				};
			};
		});
		this.index++;
	};
	start() {
		const inteval = (60 / this.bpm) * 1000;
		// Check if its playing
		//Null
		if (!this.isPlaying) {
			this.isPlaying = setInterval(() => {
				this.repeat();
			}, inteval);
		} else {
			//Clear the interval
			clearInterval(this.isPlaying);
			this.isPlaying = null;
		};
	};
	updateBtn() {
		if (!this.isPlaying) {
			this.playBtn.innerHTML = '<i class="fas fa-play"></i>';
			this.playBtn.classList.add('active');
		} else {
			this.playBtn.innerHTML = '<i class="fas fa-pause"></i>';
			this.playBtn.classList.remove('active');
		};
	};

	changeSound({target}) {
		const selectionName = target.name;
		const selectionValue = target.value;
		switch (selectionName) {
			case "kick-select":
				this.kickAudio.src = selectionValue;
				break;
			case "snare-select":
				this.snareAudio.src = selectionValue;
				break;
			case "hihat-select":
				this.hihatAudio.src = selectionValue;
				break;
		}
	}

	mute({target}) {
		const muteIndex = target.getAttribute('data-track');
		target.classList.toggle('active');

		if (target.classList.contains('active')) {
			switch (muteIndex) {
				case "0":
					this.kickAudio.volume = 0;
					break;
				case "1":
					this.snareAudio.volume = 0;
					break;
				case "2":
					this.hihatAudio.volume = 0;
					break;
			};
		} else {
			switch (muteIndex) {
				case "0":
					this.kickAudio.volume = 1;
					break;
				case "1":
					this.snareAudio.volume = 1;
					break;
				case "2":
					this.hihatAudio.volume = 1;
					break;
			};
		};
	};

	changeTempo({target}) {
		const tempoText = document.querySelector('.tempo-nr');
		this.bpm = target.value;
		tempoText.innerText = target.value;
	};

	updateTempo() {
		clearInterval(this.isPlaying);
		this.isPlaying = null;
		const playBtn = document.querySelector('.play');
		if (playBtn.classList.contains('active')) {
			this.start();
		};
	};
};

const drumkit = new DrumKit();
// Event Listeners
drumkit.pads.forEach(pad => {
	pad.addEventListener('click', drumkit.activePad);
	pad.addEventListener('animationend', function () {
		this.style.animation = '';
	});
});

drumkit.playBtn.addEventListener('click', function () {
	drumkit.start();
	drumkit.updateBtn();
});

drumkit.selects.forEach(select => {
	select.addEventListener('change', function (e) {
		drumkit.changeSound(e);
	});
});
drumkit.muteBtn.forEach(btn => {
	btn.addEventListener('click', function (e) {
		drumkit.mute(e);
	});
});

drumkit.tempoSlider.addEventListener('input', function (e) {
	drumkit.changeTempo(e);
});

drumkit.tempoSlider.addEventListener('change', function (e) {
	drumkit.updateTempo(e);
});