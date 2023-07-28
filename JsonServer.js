// fetch 
// jsonserver (FAKE)


var JsonAPI= "http://localhost:3000/courses";
fetch(JsonAPI)
    .then(function(response){
        return response.json();
    })
    .then(function(posts){
        var htmls=posts.map(function(post){
            return `<li>
                <h2>${post.id}</h2>
                <h2>${post.name}</h2>
                <h2>${post.description}</h2>
            </li>`
        })
        var html=htmls.join();
        document.getElementById('show').innerHTML=html;
    })
    .catch(function(err){
        console.log(err);
    })