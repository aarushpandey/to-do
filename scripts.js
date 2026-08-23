
function getLargest() {
    let largest_no = 0
    for (let index = 0; index < localStorage.length; index++) {
        const key = localStorage.key(index)
        const task = JSON.parse(localStorage.getItem(key))
        if (task.sno > largest_no) {
            largest_no = task.sno
        }
    }
    return largest_no
}


function addTask() {
    var start_sno = getLargest() + 1
    const task_name = document.getElementById("task-box").value
    const category = document.getElementById("category").value
    const priority = document.getElementById("priority").value
    const due_date = document.getElementById("due").value
    const task = { "sno": start_sno, "task": task_name, "category": category, "priority": priority, "due": due_date, "completion": false }
    const task_s = JSON.stringify(task)
    localStorage.setItem("task" + start_sno, task_s)
    console.log("Added Task!")
    alert("Task Created!")
    
}


function refresh() {
    if (localStorage.length === 0) {
        
        listspace.innerHTML = `Nothing to see here...
        <br>
        
        Here are two things you may do
        <br>
        &bull; Press "Refresh" if you already added your tasks in current or previous sessions. 
        <br>
        &bull; Press "Add New Task" if you have not yet created your tasks.`
    }
    else {
        listspace.innerHTML = ""
        let tasks = [];
        for (let index = 0; index < localStorage.length; index++) {
            const key = localStorage.key(index);
            tasks.push(JSON.parse(localStorage.getItem(key)));
        }
        
        // Now you can sort them easily in one line:
        tasks.sort((a, b) => b.priority - a.priority);
        for (const task_content of tasks) {
            const key = "task" + task_content.sno
            const task_div = document.createElement("div")
            task_div.className = "task_div"
            
            const task_label_and_check = document.createElement("div")
            task_label_and_check.className = "task_label_and_check"
            
            let task_check = document.createElement("input")
            task_check.type = "checkbox"
            task_check.className = "task_check"
            task_check.id = "task" + task_content.sno
            
            const task_label = document.createElement("label")
            task_label.htmlFor = "task" + task_content.sno
            task_label.className = ("task_label")
            task_label.textContent = task_content.task
            
            const task_priority = document.createElement("label")
            task_priority.className = "due"
            task_priority.htmlFor = "task" + task_content.sno
            
            const task_due = document.createElement("label")
            task_due.className = "due"
            task_due.htmlFor = "task" + task_content.sno
            task_due.textContent = task_content.due
            
            if (task_content.priority === "1") {
                task_priority.innerHTML = "Low"
            }
            else if (task_content.priority === "2") {
                task_priority.textContent = "Medium"
            }

            else if (task_content.priority === "3") {
                task_priority.textContent = "High"
            }
            
            
            
            listspace.appendChild(task_div)
            task_div.appendChild(task_label_and_check)
            task_label_and_check.appendChild(task_check)
            task_label_and_check.appendChild(task_label)
            task_div.appendChild(task_priority)
            task_div.appendChild(task_due)
            
            task_check.addEventListener("change", func => {
                
                console.log(task_check.checked)
                task_content.completion = task_check.checked
                localStorage.setItem(key, JSON.stringify(task_content))
                console.log(localStorage.getItem(key))
                
                
            }
        )
        if (task_content.completion === true) {
            task_check.checked = true
        }
        
        
        
    }
}
}

function deleteCompletedTasks() {
    let deleted = false
    for (let index = localStorage.length - 1; index >= 0; index = index - 1) {
        const key = localStorage.key(index)
        const task = localStorage.getItem(key)
        const task_content = JSON.parse(task)
        if (task_content.completion === true) {
            localStorage.removeItem(key)
            deleted = true
        }
        
    }
    if (deleted === false) {
        alert("No Tasks Completed Yet!")
        
    }
    refresh()
}

const listspace = document.getElementById("listspace")
const src = window.location.pathname.split("/").pop()

if (src === "index.html") {
    // alert("Hi")
    document.addEventListener("DOMContentLoaded", () => {
        refresh()
    })

    document.addEventListener("keydown", (e) => {
        if (e.shiftKey && e.key.toLowerCase() === "t") {
            window.location.href = "addTask.html"

        }
        if (e.shiftKey && e.key.toLowerCase() === "r") {
            refresh()

        }

    })
}

else if (src === "addTask.html") {

    document.addEventListener("keydown", (event) => {
        if (event.key == "Enter") {
            addTask()
        }

        if (event.shiftKey && event.key.toLowerCase() === "v") {
            window.location.href = "index.html"

        }
        if (event.shiftKey && event.key.toLowerCase() === "r") {
            refresh()

        }
        if (event.key == "/") {
            event.preventDefault()
            document.getElementById("task-box").focus()
        }
    })
    let date = new Date
    date = date.getFullYear() + "-" + String(date.getMonth() + 1).padStart(2, 0) + "-" + date.getDate()
    const date_box = document.getElementById("due")
    date_box.value = date
}


