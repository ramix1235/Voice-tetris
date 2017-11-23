function animateME(options) {
    var start = performance.now();
    requestAnimationFrame(function animate(time) {
        var timeFraction = (time - start) / options.duration;
        if (timeFraction > 1) timeFraction = 1;
        var progress = options.timing(timeFraction)
        options.draw(progress);
        if (timeFraction < 1) {
            requestAnimationFrame(animate);
        }
    });
};

  // EXAMPLE
  // animateME({
  //   duration: 5000,
  //   timing: function(timeFraction) {
  //     // return timeFraction;
  //     return 1 - Math.sin(Math.acos(timeFraction));
  //   },
  //   draw: function(progress) {
  //     activeObj.THREE.rotation.x = progress * 1.57;
  //   }
  // });