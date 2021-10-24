const datetime = document.getElementById('datetime')
console.log(ShowTime())

// show now
function ShowTime() {
  let NowDate = new Date()
  let Y = NowDate.getFullYear()
  let M = zeroTen(NowDate.getMonth()+1) 
  let D = zeroTen(NowDate.getDate())
  let h = zeroTen(NowDate.getHours())
  let m = zeroTen(NowDate.getMinutes())
  let s = zeroTen(NowDate.getSeconds())
  let time = `日期時間： ${Y}年 ${M}月 ${D}日 ${h}:${m}:${s}`
  datetime.innerHTML = time
  setTimeout('ShowTime', 1000)
}

function zeroTen(number) {
  if (number < 10) {
    return '0' + number
  } else {
    return number
  }
}

