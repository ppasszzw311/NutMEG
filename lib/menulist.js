const menuitem = [
  { id: 0, name: "打卡", dir: "checkin"},
  { id: 0, name: "交班", dir: "checkout"},
  { id: 0, name: "列印標籤與銷售", dir: "PrintAndSale"},
  { id: 0, name: "打卡記錄查詢", dir: "checkinList"},
  { id: 0, name: "交班紀錄查詢", dir: "Record"},
  { id: 0, name: "老闆管理", dir: "mangager"},
]

exports.getMenglist = () => {
  return menuitem
}