//= ../../bower_components/jquery/dist/jquery.js
//= ../../bower_components/foundation-sites/dist/foundation.min.js

//= partials/app.js


$(document).ready(function() {
  $(document).foundation();


  var indicator = $(".js_level-indicator_scale");
  var toggle = $(".js_level-indicator_toggle");
  var value = $(".js_level-showing_value");
  var baseLeftX = 0;
  var baseLeftY = 127;
  var baseRightX = 126.5;
  var baseRightY = 127;
  var bottomSide = 127;

  var topX;
  var topY;
  var leftSide;
  var rightSide;
  var angle;
  var deg;
  var level;

  function indicating(x, y) { // функция расчета угла треугольника, передвижения указателя и изменения угла
    leftSide = Math.round(Math.sqrt(Math.pow(x - baseLeftX, 2) + Math.pow(-(y - baseLeftY), 2)));  // формула расчета стороны треугольника
    rightSide = Math.round(Math.sqrt(Math.pow(x - baseRightX, 2) + Math.pow(-(y - baseRightY), 2))); // формула расчета стороны треугольника
    angle = Math.round(Math.acos((Math.pow(rightSide, 2) + Math.pow(bottomSide, 2) - Math.pow(leftSide, 2)) / (2 * rightSide * bottomSide)) * 100 * 0.59);
    deg = "rotate("+ angle + "deg)";
    toggle.css("transform", deg);
    level = Math.round(angle * 5.715);
    value.text(level);
  }

  indicator.on("mousedown", function(e) { // следим за событием нажатия, расчитываем угол, поворачиваем указатель
    e = e || event;
    indicating(e.offsetX, e.offsetY);

    indicator.on("mousemove", function(e) { // следим за событием движения, расчитываем угол, поворачиваем указатель
      e = e || event;
      indicating(e.offsetX, e.offsetY);
    });
  });

  $(document).on("mouseup", function() { // следим за событием отжатия, прекращаем слежение за событием движения
    indicator.off("mousemove");
  });
});
