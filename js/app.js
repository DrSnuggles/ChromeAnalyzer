/*
	DrSnuggles: Trying to re-create my 2D canvas FFMPG style visualizer
*/

import { spec3D } from './spectrogram.js'

onload = () => {
	window.spec3D = spec3D
	document.body.innerHTML = `<canvas id="myCanvas"></canvas>
<audio controls autoplay loop id="myAudio" onplay="spec3D.start(myAudio, myCanvas)" src="snd/WulleWulle.mp3"></audio><br/>
<select style="position:relative" onchange="spec3D.analyserView.analysisType = this.selectedIndex">
	<option>Frequency</option>
	<option>Sonogram</option>
	<option selected>3D Sonogram</option>
	<option>Waveform</option>
</select>`
}