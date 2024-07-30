// 값 입력
// + 버튼 누르면 할일 추가

// check 버튼 누르면 밑줄
// 1. check 버튼 누르면 false > true
// 2. true이면 밑줄
// 3. false이면 밑줄제거

// delete 버튼 누르면 삭제

// 진행중, 끝남 탭 누르면 언더바 이동
// 진행중, 끝남 탭 누르면 해당 항목만 나옴
// 전체탭 누르면 전채 항목으로 돌아옴

let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let tabs = document.querySelectorAll(".task-tabs div");
let taskList = [];
let mode = 'all';
let filterList = [];

addButton.addEventListener("click", addTask);

function enterKeyPressed(event) {
    if (event.keyCode == 13) {
       addTask();
       return true;
    } else {
       return false;
    }
  }

for(let i=1; i<tabs.length; i++){
    tabs[i].addEventListener("click", function(event){
        filter(event);
    });
}

function addTask(){
    // let taskContent = taskInput.value;
    let task = {
        id : randomIDGenerate(),
        taskContent : taskInput.value,
        isComplete : false
    }
    taskList.push(task);
    console.log(taskList);
    taskInput.value = "";
    render();
}

function render(){
    let list = [];
    // 1. 내가 선택한 탭에 따라서
    // 2. 리스트를 달리 보여준다.
    // all - taskList
    // ongoing, done - filterList
    if(mode === "all"){
        list = taskList;
    }else if(mode === "ongoing" || mode === "done"){
        list = filterList;
    }
    
    let resultHTML = "";
    for(let i=0; i<list.length; i++){
        if(list[i].isComplete == true){
            resultHTML += `<div class="task">
            <div class="task-done">${list[i].taskContent}</div>
            <div>
                <button onClick = "toggleComplete('${list[i].id}')">Check</button>
                <button onClick = "deleteTask('${list[i].id}')">Delete</button>
            </div>
        </div>`;
        }else{
            resultHTML += `<div class="task">
            <div>${list[i].taskContent}</div>
            <div>
                <button onClick = "toggleComplete('${list[i].id}')">Check</button>
                <button onClick = "deleteTask('${list[i].id}')">Delete</button>
            </div>
        </div>`;
        }
    }

    document.getElementById("task-board").innerHTML = resultHTML;
}

//여기서 객채 각각에 대한 랜덤 id값을 줘야함
function toggleComplete(id){
    // console.log("id:", id);
    for(let i=0; i<taskList.length; i++){
        if(taskList[i].id == id){
            taskList[i].isComplete = !taskList[i].isComplete;
            break;
        }
    }
    render();
    console.log(taskList);
}

function deleteTask(id){
    for(let i=0; i<taskList.length; i++){
        if(taskList[i].id == id){
            taskList.splice(i,1);
            break;
        }
    }
    // render();
    if(mode == "all"){
        render();
    }else{
        filter({target: {id:mode}});
        // 진행중 끝남에서 바로 삭제 됨... 왜??
    }
    console.log(taskList);
}

function filter(event){
    mode = event.target.id;
    filterList = [];
    // console.log("filter", event.target.id);
    if(mode == "all"){
        //전체 리스트 보여주기
        render();
        console.log("모두", filterList);
    }else if(mode == "ongoing"){
        //task.isComplete = false인 값이 진행중
        for(let i=0; i<taskList.length; i++){
            if(taskList[i].isComplete === false){
                filterList.push(taskList[i]);
            }
        }
        render();
        console.log("진행중", filterList);
    }else if(mode == "done"){
        //task.isComplete = true인 값이 끝
        for(let i=0; i<taskList.length; i++){
            if(taskList[i].isComplete === true){
                filterList.push(taskList[i]);
            }
        }
        render();
        console.log("끝남", filterList);
    }
}

function randomIDGenerate(){
    return Math.random().toString(36).substr(2, 16);
}