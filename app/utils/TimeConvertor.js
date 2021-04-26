


export default function TimeConvertor (time) {
  //console.log(time)
  return new Date (time * 1000).toLocaleDateString("en-US", {
    hour: 'numeric' ,
    minute: 'numeric'
  })
}
