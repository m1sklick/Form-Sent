const from = document.getElementById('form')
from.addEventListener('submit', formSent)

async function formSent (e) {
    e.preventDefault()

    let error = formValidate(form)

    let formData = new FormData(form)
    formData.append('application', formFile.files[0])

    if(error == '0'){
        form.classList.add('sending')
        let response = await fetch('sendmail.php', {
            method: 'POST',
            body: formData
        })
        if(response.ok){
            let result = await response.json()
            alert(result.message)
            form.reset()
            form.classList.remove('sending')
        }
        else {
            alert('Error')
            form.classList.remove('sending')
        }
    }
    else {
        alert('You have to fill the forms!')
    }
}

function formValidate (form) {
    let error = 0
    let formReq = document.querySelectorAll('.req')
    
    for(let i = 0; i < formReq.length; i++){
        const input = formReq[i]
        removeError(input)
        if(input.classList.contains('email')){
            if(emailTest(input)){
                addError(input)
                error++
            }
        }
        else {
            if(input.value === ''){
                addError(input)
                error++
            }
        }
    }
    return error
}

function addError (input) {
    input.parentElement.classList.add('error')
    input.classList.add('error')
}

function removeError (input) {
    input.parentElement.classList.remove('error')
    input.classList.remove('error')
}

function emailTest (input) {
    return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value)
}

const formFile = document.getElementById('formFile')

formFile.addEventListener('change', () => {
    uploadFile(formFile.files[0])
})

function uploadFile(file) {
    if(!['application/pdf'].includes(file.type)) {
        alert('Only pdf files can be attached!')
        formFile.value = ''
        return;
    }
    if(file.size > 10 * 1024 * 1024){
        alert('Your file has to be less than 10 mb!')
        return;
    }
}