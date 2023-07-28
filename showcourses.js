// fetch 
// jsonserver (FAKE)
var RestAPI='http://localhost:3000/courses'
// function start(){
//     getCourses(function(courses){
//         renderCourses(courses);
//     });
// }
function start(){
    getCourses(renderCourses);
    handleCreateForm();
}

start();

// functions

function getCourses(callback){
    fetch(RestAPI)
        .then(function(response){
            return response.json();
        })
        .then(callback) ;
}

function createCourse(data, callback){
    var options={
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(data)
    };
    fetch(RestAPI,options)
        .then(function(response){
            response.json();
        })
        .then(callback);
}

function handleDeleteCourse(id){
    var options={
        method:'DELETE',
        headers:{
            'Content-Type':'application/json'
        },
      
    };
    fetch(RestAPI + '/'+ id,options)
        .then(function(response){
            response.json();
        })
        // cách này là const API
        // .then(function(){
        //     getCourses(renderCourses);
        // });

        // cách này lấy id từ class
        .then(function(){
           var courseItem= document.querySelector('.course-item-'+ id);
           if(courseItem){
            courseItem.remove();
           }
        })
}


function renderCourses(courses){
    var listCoursesBlock= document.querySelector('#list_courses')
    var htmls= courses.map(function(course){
        
        return ` <li class="course-item-${course.id}">
            <h4>${course.name}</h4>
            <p>${course.description}</p>
            <button  onclick="handleDeleteCourse(${course.id})">xóa</button>
        </li>`
        
    });
    listCoursesBlock.innerHTML=htmls.join('');
}


// create 1 course
function handleCreateForm(){
    var createBtn= document.querySelector('#create');
    createBtn.onclick=function(){
        var name= document.querySelector('input[name="name"]').value;
        var description= document.querySelector('input[name="description"]').value;
        var formData= {
            name:name,
            description: description
        };
        createCourse(formData, function(){
            getCourses(renderCourses);
        });
    }
}