/********************************************************
Copyright 2016 Google Inc. All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*********************************************************/

'use strict'

var spec3D = {
  cxRot: 90,
  prevX: 0,

  start: function (source, canvas) {
    this.canvas = canvas;

    // analyze source
    var audioCtx = new AudioContext();
    if (source.tagName === "AUDIO") {
      source = audioCtx.createMediaElementSource(source); // creates source from audio tag with at least 2channels
      source.connect(audioCtx.destination); // route source to destination
    }

    // Analyser
    this.analyser = source.context.createAnalyser();
    this.analyser.fftSize = 4096;
    this.analyser.smoothingTimeConstant = 0;
    source.connect(this.analyser);

    // Visualizer
    spec3D.attached();
    spec3D.startRender();
  },

  attached: function() {
    console.log('spectrogram-3d attached');
    spec3D.onResize_();
    spec3D.init_();

    window.addEventListener('resize', spec3D.onResize_.bind(spec3D));
  },

  stopRender: function() {
    spec3D.isRendering = false;
  },

  startRender: function() {
    if (spec3D.isRendering) {
      return;
    }
    spec3D.isRendering = true;
    spec3D.draw_();
  },

  init_: function() {
    // Initialize everything.
    var analyserView = new AnalyserView(this.canvas);
    analyserView.setAnalyserNode(this.analyser);
    analyserView.initByteBuffer();
    spec3D.analyserView = analyserView;
  },

  onResize_: function() {
    console.log('onResize_');
    spec3D.canvas.width = spec3D.canvas.clientWidth;
    spec3D.canvas.height = spec3D.canvas.clientHeight;
  },

  draw_: function() {
    if (!spec3D.isRendering) {
      console.log('stopped draw_');
      return;
    }

    spec3D.analyserView.doFrequencyAnalysis();
    requestAnimationFrame(spec3D.draw_.bind(spec3D));
  }
};
