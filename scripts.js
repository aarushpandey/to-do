
const listspace = document.getElementById("listspace")
var start_sno = localStorage.length +1
function addTask(){
    const task_name = document.getElementById("task-box").value
    const category = document.getElementById("category").value
    const priority = document.getElementById("priority").value
    const due_date = document.getElementById("due").value 
    const task = {"sno": start_sno, "task": task_name, "category": category, "priority" : priority, "due" : due_date, "completion": false}
    const task_s = JSON.stringify(task)
    localStorage.setItem("task"+start_sno, task_s)
    start_sno += 1
    console.log("Added Task!")
    alert("Task Created!")
    
}


function refresh(){
    listspace.innerHTML=""
    for (let index = 0; index < localStorage.length; index++) {
        const key = localStorage.key(index)
        const task = localStorage.getItem(key)
        let task_check = document.createElement("input")
        const task_content = JSON.parse(task)
        task_check.type="checkbox"
        task_check.id="task"+index
        
        const task_label = document.createElement("label")
        task_label.htmlFor = "task"+index
        task_label.textContent = task_content.task
        
        listspace.appendChild(task_check)
        listspace.appendChild(task_label)
        listspace.appendChild(document.createElement("br"))
        console.log(task)
        
        task_check.addEventListener("change" , func=>
            {   
                
                console.log(task_check.checked)
                task_content.completion = task_check.checked
            localStorage.setItem(key, JSON.stringify(task_content))
            console.log(localStorage.getItem(key))
            
            
        }
    )
    if (task_content.completion === true) {
    task_check.checked = true

    
    
}
}}

function deleteCompletedTasks() {
    let deleted = false
    // alert("Working on it...")
    for (let index = localStorage.length-1; index >=0; index = index-1) {
        const key = localStorage.key(index)
        const task = localStorage.getItem(key)
        let task_check = document.createElement("input")
        const task_content = JSON.parse(task)
        if (task_content.completion === true){
            localStorage.removeItem(key)
            deleted=true
        }
        
    }
    if (deleted === false){
        alert("No Tasks Completed Yet!")
    }}
    
    function task_completion(task) {
        
        alert("Working on it...")
    }
    
    