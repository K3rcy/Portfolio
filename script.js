function changeMainPanel(clickedPanel){
    if(clickedPanel === 'bio'){
        document.getElementById('bio').style.display = 'block';
        document.getElementById('contact').style.display = 'none';
        document.getElementById('projects').style.display = 'none';
    }
    else if(clickedPanel === 'contact'){
        document.getElementById('bio').style.display = 'none';
        document.getElementById('contact').style.display = 'block';
        document.getElementById('projects').style.display = 'none';
    }
    else {
        document.getElementById('bio').style.display = 'none';
        document.getElementById('contact').style.display = 'none';
        document.getElementById('projects').style.display = 'block';
    }
}
