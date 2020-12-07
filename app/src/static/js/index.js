let emojiApp
let choiceApp

let mainWindow
let emotionWindow
let captureWindow
let choiceWindow
let congratsWindow
let qnaWindow

let clickAudio = new Audio('/static/audio/click.mp3')
let confettiAudio = new Audio('/static/audio/confetti.mp3')
let bgmAudio = new Audio('/static/audio/bgm.mp3')

let darkMode = true

let userID

window.onload = function() {
    let captureButton
    let captureInput
    
    mainWindow = document.getElementById('main-window')
    emotionWindow = document.getElementById('emotion-window')
    captureWindow = document.getElementById('capture-window')
    choiceWindow = document.getElementById('choice-window')
    congratsWindow = document.getElementById('congrats-window')
    qnaWindow = document.getElementById('qna-window')

    loadChoice()
    loadEmotions()
    loadCapture()
    loadQna()

    bgmAudio.loop = true
    bgmAudio.volume = 0.6

    if (localStorage.userID === undefined) {
        localStorage.userID = uuidv4()
    }
    userID = localStorage.userID

    document.getElementById('main-start')
    .addEventListener('click', function () {
        bgmAudio.play()
        clickAudio.play()
        nextWindow(mainWindow, emotionWindow)
    })

    emojiButtons = document.getElementsByClassName('emoji-img')
    for (button of emojiButtons) {
        button.addEventListener('click', function() {
            clickAudio.play()
            nextWindow(emotionWindow, captureWindow)
            setChoiceButtons(this, setChoiceEvents)
            postEmotion(this)
        })
    }

    document.getElementById('capture-input')
        .addEventListener('change', function () {
            postImage(this.files[0])
            clickAudio.play()
            nextWindow(captureWindow, choiceWindow, 200)
        })
    
    document.getElementById('pass-button')
        .addEventListener('click', function () {
            clickAudio.play()
            nextWindow(captureWindow, qnaWindow)
        })

    document.getElementById('qna-response')
        .addEventListener('input', function() {
            let qnaLengthText = 'Short and sweet, but try to express more!'
            let qnaLengthColor = 'lightcoral'

            document.getElementById('qna-button').disabled = 1

            if (this.value.length > 30 && this.value.length < 50) {
                document.getElementById
                qnaLengthText = 'Great stuff! Now we have an interesting read!'
                qnaLengthColor = 'lightblue'
                document.getElementById('qna-button').disabled = 0
            } else if (this.value.length >= 50) {
                qnaLengthText = 'Thats a lot! Amazing work!'
                qnaLengthColor = 'darkgoldenrod'
                document.getElementById('qna-button').disabled = 0
            }

            document.getElementById('qna-length').textContent = qnaLengthText
            document.getElementById('qna-length').style.color = qnaLengthColor
        })
    
    document.getElementById('qna-button')
        .addEventListener('click', function () {
            let qnaQuestion = document.getElementById('qna-question').textContent
            let qnaAnswer = document.getElementById('qna-response').value
            postAnswer(qnaQuestion, qnaAnswer)
            nextWindow(qnaWindow, choiceWindow)
            clickAudio.play()
        })

    document.getElementById('brightness-control')
        .addEventListener('click', function() {
            windowButtons = document.getElementsByClassName('window-button')
            windowLabels = document.getElementsByClassName('window-label')
            if (darkMode == true) {
                darkMode = false
                this.style.filter = 'invert(0)'
                document.body.style.backgroundColor = '#EEE'
                document.body.style.color = 'black'
                for (button of windowButtons) {
                    button.style.border = 'black 2px solid'
                }
                for (label of windowLabels) {
                    label.style.border = 'black 2px solid'
                }
            } else {
                darkMode = true
                this.style.filter = 'invert(1)'
                document.body.style.backgroundColor = '#212121'
                document.body.style.color = 'white'
                for (button of windowButtons) {
                    button.style.border = 'none'
                }
                for (label of windowLabels) {
                    label.style.border = 'none'
                }
            }
        })
}

function nextWindow(firstWindow, secondWindow, delay=10) {
    firstWindow.style.opacity = 0
    setTimeout(function() {
        firstWindow.style.display = 'none'
        secondWindow.style.display = 'flex'
        setTimeout(function () {
            secondWindow.style.opacity = 1
        }, delay)
    }, 500)
}

function setChoiceButtons (element, callback) {
    let imgPath = element.getAttribute('alt')
    for (let i of Array(6).keys()) {
        j = i+1
        choiceApp.images.push({
            'url': 'static/img/stock/'+imgPath+'/'+j+'.jpg'
        })
    }

    let choiceButtons = document.getElementsByClassName('choice-img')
    let waitForChoice = setInterval(function() {
        if (choiceButtons.length>0) {
            clearInterval(waitForChoice)
            callback(choiceButtons)
        }
    })
}

function setChoiceEvents (choiceButtons) {
    for (button of choiceButtons) {
        button.addEventListener('click', function() {
            openCongratsWindow(choiceWindow)
        })
    }
}

function openCongratsWindow (currentWindow) {
    clickAudio.play()
    nextWindow(currentWindow, congratsWindow)
    setTimeout(function() {
        confettis = document.getElementsByClassName('confetti')
        for (confetti of confettis) {
            confetti.style.animationPlayState = 'running'
        }
        confettiAudio.play()
    }, 500)
}

function postAnswer (question, answer) {
    fetch('api/answers', {
        method: 'POST',
        headers:{'X-CSRFToken': csrfToken},
        credentials: 'same-origin',
        body: JSON.stringify({
            uuid: userID,
            question: question,
            answer: answer
        })
    })
}

function postEmotion (element) {
    let emotion = element.getAttribute('alt')

    fetch('api/emotionLog', {
        method: 'POST',
        headers:{'X-CSRFToken': csrfToken},
        credentials: 'same-origin',
        body: JSON.stringify({
            uuid: userID,
            emotion: emotion,
        })
    })
}

function postImage (file) {
    let formData = new FormData()

    formData.append('userID', userID)
    formData.append('image', file)

    fetch('api/uploadImage', {
        method: 'POST',
        headers: {'X-CSRFToken': csrfToken},
        credentials: 'same-origin',
        body: formData
    })
}

function uuidv4() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}