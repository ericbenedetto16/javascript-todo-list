var itemArr = [];
var priorityArr = [];
var hArr = [];
var lArr = [];
var nArr = [];
var length = 0;
var sorted = false;
var hEle = 0;
var lEle = 0;
var nEle = 0;
var hsArr = [];
var lsArr = [];
var nsArr = [];

function add() {
  if(!sorted) {
    showOnReg();
  }else if(getPriority() != "null" && getTodo() != "") {
    console.log("Sorted Already...adding");
    addToArr();
    showOnSorted();
    setTodo();
    setPriority();
  }else{
    alert("Error: Enter Valid Arguments");
  }
}

function showOnReg() {
  if(getPriority() != "null" && getTodo() != "") {
    itemArr.push(getTodo());
    priorityArr.push(getPriority());
    revealSuccess();
    length++;
    setPriority();
    if(!sorted) {
      showOnList("not_sorted", getTodo(), length);
    }else{
      console.log("Sorting....");
      sortList();
    }
    setTodo();
    console.log(itemArr);
    console.log(priorityArr);
  }else if(getTodo() == "") {
    alert("Error: Please enter a valid item");
  }else{
    alert("Error: Please Select A Priority. If no priorty, please select 'None'");
  }
}

function showOnSorted() {
  for(var i = 0; i < hArr.length; i++) {
    if(hsArr[i] == 0) {
      showOnList("high", hArr[i], "high" + (i+1));
      hsArr[i] = 1;
    }
  }
  for(var i = 0; i < lArr.length; i++) {
    if(lsArr[i] == 0) {
      showOnList("low", lArr[i], "low" + (i+1));
      lsArr[i] = 1;
    }
  }
  for(var i = 0; i < nArr.length; i++) {
    if(nsArr[i] == 0) {
      showOnList("none", nArr[i], "none" + (i+1));
      nsArr[i] = 1;
    }
  }
}

function sortList() {
  if(!sorted) {
    sorted = true;
    revealSortedList();
    hArr = [];
    lArr = [];
    nArr = [];
    hEle = 0;
    lEle = 0;
    nEle = 0;
    for(var i = 0; i < length; i++) {
      if(priorityArr[i] == "high_priority") {
        hArr.push(itemArr[i]);
        hsArr[i] = 0;
        hEle++;
      }else if(priorityArr[i] == "low_priority") {
        lArr.push(itemArr[i]);
        lsArr[i] = 0;
        lEle++;
      }else {
        nArr.push(itemArr[i]);
        nsArr[i] = 0;
        nEle++;
      }
    }
  }
  showOnSorted();
}

function addToArr() {
  itemArr.push(getTodo());
  priortrArr.push(getPriority());
  if(getPriority() == "high_priority") {
    hArr.push(getTodo());
    hsArr.push(0);
    hEle++;
    length++;
  }else if(getPriority() == "low_priority") {
    lArr.push(getTodo());
    lsArr.push(0);
    lEle++;
    length++;
  }else {
    nArr.push(getTodo());
    nsArr.push(0);
    nEle++;
    length++;
  }
}

function remove() {
  if(sorted) {
    if(priorityArr[priorityArr.length-1] == "high_priority") {
      deleteEle("high" + hEle);
      hArr.pop();
      hsArr.pop();
      hEle--;
      itemArr.pop();
      priorityArr.pop();
    }else if(priorityArr[priorityArr.length-1] == "low_priority") {
      deleteEle("low" + lEle);
      lArr.pop();
      lsArr.pop();
      lEle--;
      itemArr.pop();
      priorityArr.pop();
    }else {
      deleteEle("none" + nEle);
      nArr.pop();
      nsArr.pop();
      nEle--;
      itemArr.pop();
      priorityArr.pop();
    }
  }else{
    var elem = document.getElementById(length);
    elem.parentNode.removeChild(elem);
    priorityArr.pop();
    itemArr.pop();
    length--;
  }
}

function deleteEle(id) {
  var elem = document.getElementById(id);
  elem.parentNode.removeChild(elem);
}

function showOnList(listId, item, id) {
  var parent = document.getElementById(listId);
  var newel = document.createElement('tr');
  newel.setAttribute('id', id);
  newel.innerHTML = item;
  parent.appendChild(newel);
}

function revealSortedList() {
  document.getElementById("unsorted").style.width="100%";
  document.getElementById("unsorted").style.margin="0";
  document.getElementById("unsorted").style.visibility="hidden";
  document.getElementById("list_content").style.visibility="visible";
}

function revealSuccess() {
  document.getElementById("success").style.visibility="visible";
}

function hideSuccess() {
  document.getElementById("success").style.visibility="hidden";
}

function hideList() {
  document.getElementById("list_content").style.visibility="hidden";
}

function getTodo() {
  return document.getElementById("todo").value;
}

function setTodo() {
  document.getElementById("todo").value = "";
}

function getPriority() {
  return document.getElementById("priority").value;
}

function setPriority() {
  document.getElementById("priority").value = "null";
}
