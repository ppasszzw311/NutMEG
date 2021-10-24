const number = document.querySelector('#number10')
const dateTime = document.querySelector('#datetime')
const id = document.querySelector('#id_input')
const numberid = document.querySelector('#numberid')
let id_n = ""

number.addEventListener("click", e => {
  let target = e.target;
  let a = target.innerText
  // console.log(a)
  if (a.length < 2) {
    id_n = id_n + a
  } else if (a === "倒退") {
    id_n = id_n.substring(0, id_n.length - 1)
  } else if (a === "刪除") {
    id_n = ""
  }
  id.value = id_n
  numberid.innerHTML = `員工編號：${id_n}`
})

console.log(ShowTime())
let menuButton = document.addEventListener('click' , e => {
  console.log(Target.innerHTML)
})

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
  dateTime.innerHTML = time
  setTimeout('ShowTime()', 1000)
}

function zeroTen(number) {
  if (number < 10) {
    return '0' + number
  } else {
    return number
  }
}
