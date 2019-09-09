

var form = document.getElementById('form');

form.addEventListener('submit',(e)=>{
    e.preventDefault();
  
    const body = { 
        id:form.id.value,
        name:form.name.value,
        director:form.director.value,
        year:form.year.value
     };

    fetch('http://127.0.0.1:3000/movies',{
       
        method: 'post',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      }).then(res=>res.json())
        .then(res => console.log(res));
})


var movielist = document.getElementById('movielist');


function renderItem(element){
    moviename = element.name
    moviedir = element.director;
    movieyear = element.year;
    movieid = element.id;
    var heading  = document.createElement('li')
    heading.setAttribute('id',movieid)


    

    heading.innerText = `${moviename} by ${moviedir}`
    

    

    heading.addEventListener('click',(e)=>{
        console.log(heading.getAttribute('id'))
        location.href=`detailed.html?var=${heading.getAttribute('id')}`
    })

    movielist.appendChild(heading)

}


fetch('http://127.0.0.1:3000/movies').then(
    (response)=>{
        if(response.status == 200){
            console.log("Success");
        }
        response.json().then(data=>{
            data.forEach(element => {
                renderItem(element)
                
            });

          
          


            

        })
    }

).catch(
    (err)=>{
        console.log(err)
    }
)