function data() {
  var weekday
  var weekDay = {
    "Mon": "一",
    "Tue": "二",
    "Wed": "三",
    "Thu": "四",
    "Fri": "五",
    "Sat": "六",
    "Sun": "日"
  }
  for (i in weekDay) {
    if (i = Date().substr(0, 3)) {
      weekday = "星期" + weekDay[i]
      break;
    }
  }
  var months = {
    "Jan": "一",
    "Feb": "二",
    "Mar": "三",
    "Apr": "四",
    "May": "五",
    "Jun": "六",
    "Jul": "七",
    "Aug": "八",
    "Sep": "九",
    "Oct": "十",
    "Nov": "十一",
    "Dec": "十二"
  }
  for (i in months) {
    if (i = Date().substr(4, 3)) {
      document.getElementById("p1").innerHTML = Date().substr(11, 5) + months[i] + "月 " + Date().substr(8, 2) + " " + weekday
      break;
    }
  }
}

function time() {
  document.getElementById("p2").innerHTML = Date().substr(15, 9)
}