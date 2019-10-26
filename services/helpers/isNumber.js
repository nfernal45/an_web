export default function(number) {
  return !isNaN(parseFloat(number)) && isFinite(number)
}
