// functions
const loadPic = (subject, number) => {
    const xhrRequest = new XMLHttpRequest();

    xhrRequest.open('GET', `https://api.tenor.com/v1/search?q=${subject}&key=LIVDSRZULELA&limit=${number}`, true);

    xhrRequest.onload = () => {
        if(xhrRequest.status === 200){
            const loadedResult = JSON.parse(xhrRequest.responseText).results;
            let outPutPics = '';
            if(loadedResult.length !== 0){
                loadedResult.forEach( pic => {
                    // console.log(pic.media[0].gif.url);
                    // outPutPics = outPutPics + pic.media[0].gif.url;
                    // outPutPics += pic.media[0].gif.url;
                    outPutPics += `<div class="card" style="width: 18rem;">
                                        <img src="${pic.media[0].gif.url}" class="card-img-top" alt="${subject} ID: ${pic.id}">
                                    </div>`;
                });
                document.getElementById('container').innerHTML = outPutPics;
            } else {
                const warningMsg = '<p id="war_para">Please Try again. You received nothing</p>';
                document.getElementById('warning').innerHTML = warningMsg;
            }
        } else if (xhrRequest.status === 404){
            const warningMsg = '<p id="war_para">Please Try again with another topic!</p>';
            document.getElementById('warning').innerHTML = warningMsg;
        };
    }

    xhrRequest.send();
}

const checkInputs = (subject, number) => {
    number = parseInt(number);
    if(subject != '' && number > 0 && number <= 20){
        loadPic(subject, number);
    } else if (isNaN(number) || number < 1 || number > 20){
        const warningMsg = '<p id="war_para">Please enter a number between 1 & 20.</p>';
        document.getElementById('warning').innerHTML = warningMsg;
    // } else if(subject === ''){
    } else if(!subject){
        const warningMsg = '<p id="war_para">Please enter a topic!</p>';
        document.getElementById('warning').innerHTML = warningMsg;
    }
}


// Selection elements and adding event listener
// document.getElementById('form').addEventListener('submit', () =>{

// })
document.getElementById('search-btn').addEventListener('click', (event) => {
    event.preventDefault();
    document.getElementById('warning').innerHTML = '';
    document.getElementById('container').innerHTML = '';
    const mySubject = document.getElementById('subject-input').value;
    const myQuantity = document.getElementById('pic-number').value;
    checkInputs(mySubject, myQuantity);
    document.getElementById('subject-input').value = '';
    document.getElementById('pic-number').value = '';
});
