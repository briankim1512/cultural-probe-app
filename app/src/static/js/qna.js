function loadQna() {
    qnaApp = new Vue({
        el: '#qna-app',
        delimiters: ['[[',']]'],
        data: {
            question: ''
        }
    })

    questionNumber = Math.floor(
        Math.random() * questionList.length
    )

    qnaApp.question = questionList[questionNumber]
}
