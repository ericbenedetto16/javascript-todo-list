//Initialize Global Varibles
var itemArr = [];
var priorityArr = [];
var hArr = [];
var lArr = [];
var nArr = [];
var hsArr = [];
var lsArr = [];
var nsArr = [];
var length = 0;
var hEle = 0;
var lEle = 0;
var nEle = 0;
var sorted = false;

/****************************
 ****************************
 *****Add Core Functions*****
 ****************************
 ****************************/
function add() {
  if(!sorted) {
    showOnReg();
  }else if(getPriority() != "null" && getTodo() != "") {
    // console.log("Sorted Already...adding");
    addShowSorted();
  }else{
    alert("Error: Enter Valid Arguments");
    resetInput();
  }
}

function showOnReg() {
  if(getPriority() != "null" && getTodo() != "") {
    itemArr.push(getTodo());
    priorityArr.push(getPriority());
    revealSuccess();
    length++;
    if(!sorted) {
      showOnList("not_sorted", getTodo(), length);
    }else{
      // console.log("Sorting....");
      sortList();
    }
    resetInput();
    // console.log(itemArr);
    // console.log(priorityArr);
  }else if(getTodo() == "") {
    resetInput();
    alert("Error: Enter a valid item");
  }else{
    resetInput();
    alert("Error: Please Select A Priority. If no priorty, please select 'None'");
  }
}

function showOnSorted() {
  reveal(hArr, hsArr, "high");
  reveal(lArr, lsArr, "low");
  reveal(nArr, nsArr, "none");
}

function sortList() {
  if(!sorted) {
    sorted = true;
    revealSortedList();
    resetArr();
    for(var i = 0; i < length; i++) {
      if(priorityArr[i] == "high_priority") {
        addItem(hArr, hsArr, i);
        hEle++;
      }else if(priorityArr[i] == "low_priority") {
        addItem(lArr, lsArr, i);
        lEle++;
      }else {
        addItem(nArr, nsArr, i);
        nEle++
      }
    }
      showOnSorted();
  }else{
    alert("Error: Lists Already Sorted. You can continue to add items and they will be placed according to their appointed priority.");
  }
}

function remove() {
  if(length > 0) {
    if(sorted) {
      if(priorityArr[priorityArr.length-1] == "high_priority") {
        deleteEle("high" + hEle);
        removeLast("high");
      }else if(priorityArr[priorityArr.length-1] == "low_priority") {
        deleteEle("low" + lEle);
        removeLast("low");
      }else{
        deleteEle("none" + nEle);
        removeLast("none");
      }
    }else{
      deleteEle(length);
      removeLast("not_sorted");
    }
    revealSuccess();
  }else{
    alert("Error: No More Items To Remove");
  }
}

/************************************
 ************************************
 ******** Helper Functions **********
 ************************************
 ************************************/
function removeLast(id) {
  if(id == "high") {
    hArr.pop();
    hsArr.pop();
    hEle--;
    itemArr.pop();
    priorityArr.pop();
    length--;
  }
  if(id == "low") {
    lArr.pop();
    lsArr.pop();
    lEle--;
    itemArr.pop();
    priorityArr.pop();
    length--;
  }
  if(id == "none") {
    nArr.pop();
    nsArr.pop();
    nEle--;
    itemArr.pop();
    priorityArr.pop();
    length--;
  }
  if(id == "not_sorted") {
    priorityArr.pop();
    itemArr.pop();
    length--;
  }
}

function addToArr() {
  itemArr.push(getTodo());
  priorityArr.push(getPriority());
  if(getPriority() == "high_priority") {
    pushTo("high");
  }else if(getPriority() == "low_priority") {
    pushTo("low");
  }else{
    pushTo("none");
  }
}

function pushTo(id) {
  if(id == "high") {
    hArr.push(getTodo());
    hsArr.push(0);
    hEle++;
    length++;
  }
  if(id == "low") {
    lArr.push(getTodo());
    lsArr.push(0);
    lEle++;
    length++;
  }
  if(id == "none") {
    nArr.push(getTodo());
    nsArr.push(0);
    nEle++;
    length++;
  }
}

function addItem(mainArr, secondary, num) {
  mainArr.push(itemArr[num]);
  secondary.push(0);
}

function reveal(mainArr, secondary, id) {
  for(var i = 0; i < mainArr.length; i++) {
    if(secondary[i] == 0) {
      showOnList(id, mainArr[i], id + (i+1));
      secondary[i] = 1;
    }else{
      // console.log("Already Shown" + mainArr[i]);
    }
  }
}

function resetArr() {
  hArr = [];
  lArr = [];
  nArr = [];
  hEle = 0;
  lEle = 0;
  nEle = 0;
}

function addShowSorted() {
  addToArr();
  showOnSorted();
  resetInput();
}

function resetInput() {
  setPriority();
  setTodo();
}

function showOnList(listId, item, id) {
  var parent = document.getElementById(listId);
  var newel = document.createElement('tr');
  newel.setAttribute('id', id);
  newel.innerHTML = item;
  parent.appendChild(newel);
}

function deleteEle(id) {
  var elem = document.getElementById(id);
  elem.parentNode.removeChild(elem);
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
