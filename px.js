function replacer(match, p1) {
  return p1/100+'rem'
}
var s=a.replace(/(\d+)px/gm,replacer)
