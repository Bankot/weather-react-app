function closeAllLists(elmnt) {
  /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
  var x = document.getElementsByClassName("autocomplete-items");
  for (var i = 0; i < x.length; i++) {
    if (elmnt != x[i] && elmnt != e) {
      x[i].parentNode.removeChild(x[i]);
    }
  }
}
export default closeAllLists;
