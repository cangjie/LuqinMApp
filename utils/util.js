const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}


const getQueryValue = (query, name) =>{
  let reg = new RegExp("(\\?|&)" + name + "=([^&]*)(&|$)", "i");
    let r = query.substr(1).match(reg);
    if (r != null) {
        return decodeURIComponent(r[2]);
    };
    return null;
}

const isBlank = (value)=>{
  if (value==undefined){
    return true
  }
  else if (isNaN(value) && value == ''){
    return true
  }
  else{
    return false
  }
}

module.exports = {
  formatTime,
  getQueryValue,
  isBlank
}
