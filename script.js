import $ from "https://esm.sh/jquery";

function nextValInArr(arr, current) {
  let i = arr.findIndex(x => x.cls == current);
  if (i < 0 || i+1 >= arr.length) {
    return arr[0];
  } else {
    return arr[i+1];
  }
}

let mics = {
  vals: [
    {cls: "mics-on", content: "MICS ON"},
    {cls: "mics-off", content: "MICS OFF"},
  ],
  baseClass: "mics",
}

let cls = {
  vals: [
    {cls: "class-u", content: "UNCLASSIFIED"},
    {cls: "class-cui", content: "CONTROLLED"},
    {cls: "class-c", content: "CONFIDENTIAL"},
    {cls: "class-s", content: "SECRET"},
    {cls: "class-ts", content: "TOP SECRET"},
    {cls: "class-tssci", content: "TS SCI"}
  ],
  preContent: function(c) { return c.replaceAll(" ", "<br><br>");},
  baseClass: "class",
  textClass: "class-text",
}

function cssStateValue(el, baseClass) {
  return el[0].className.split(/\s+/).filter((i) => i != baseClass)[0];
}

function setupSet(set) {
  let el = $("." + set.baseClass);
  let textEl = "textClass" in set ? $("." + set.textClass) : el;
  
  el.click(function() {
    let current = cssStateValue(el, set.baseClass);
    let next = nextValInArr(set.vals, current);
    el.removeClass(current).addClass(next.cls);
    textEl.html("preContent" in set ? set.preContent(next.content) : next.content);
  });
}

setupSet(mics);
setupSet(cls);

// set all clock names editable
$('.clock-label').attr('contenteditable','true');

function updateClocks() {
  let currentDate = new Date();
  var hours = currentDate.getHours();
  var minutes = currentDate.getMinutes();
  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var timeString = hours + ":" + minutes;

  $(".clock-time").html(timeString);
  setTimeout(updateClocks, 1000); // do it again in another second
}

updateClocks();